"""
Data Analysis Agent - Vehicle Health Monitoring
Detects anomalies using threshold, rate-of-change, and pattern-based methods,
with smart deduplication to prevent alert flooding.
"""

import pandas as pd
import json
from datetime import datetime

class DataAnalysisAgent:
    def __init__(self):
        """
        Initializes the agent with predefined thresholds for anomaly detection
        and storage for time-windowed alerts.
        """
        self.anomaly_thresholds = {
            'cTemp': {'min': 70, 'max': 110},
            'rpm': {'min': 500, 'max': 6500},
            'speed': {'min': 0, 'max': 200},
            'eLoad': {'min': 10, 'max': 90},
            'maf': {'min': 2, 'max': 15},
            'battery': {'min': 11.5, 'max': 14.5}
        }
        
        self.roc_thresholds = {
            'rpm': 1500,
            'speed': 30,
            'cTemp': 15
        }
        
        # Severity ranking for aggregation
        self.severity_rank = {'INFO': 0, 'WARNING': 1, 'HIGH': 2, 'CRITICAL': 3}
        
        # Storage for alerts
        self.history_alerts = []
        self.current_windows = {} # { device_id: alert_object }
    
    def detect_threshold_anomalies(self, row):
        """Detects anomalies where sensor values exceed predefined min/max thresholds."""
        anomalies = []
        for sensor, limits in self.anomaly_thresholds.items():
            value = row.get(sensor)
            if value is None:
                continue
            
            if value < limits['min']:
                anomalies.append({
                    'type': f'THRESHOLD_{sensor}',
                    'severity': 'HIGH' if sensor in ['battery', 'cTemp'] else 'WARNING',
                })
            elif value > limits['max']:
                anomalies.append({
                    'type': f'THRESHOLD_{sensor}',
                    'severity': 'CRITICAL' if sensor == 'cTemp' else 'HIGH',
                })
        return anomalies
    
    def detect_rate_of_change(self, df, idx):
        """Detects anomalies based on a rapid change in sensor values between readings."""
        if idx == 0:
            return []
        
        current = df.iloc[idx]
        previous = df.iloc[idx-1]
        
        if current['deviceID'] != previous['deviceID']:
            return []
        
        anomalies = []
        for sensor, threshold in self.roc_thresholds.items():
            if sensor not in current or sensor not in previous:
                continue
            change = abs(current[sensor] - previous[sensor])
            if change > threshold:
                anomalies.append({
                    'type': f'ROC_{sensor}',
                    'severity': 'WARNING',
                })
        return anomalies
    
    def detect_patterns(self, row):
        """Detects complex anomalies based on patterns across multiple sensors."""
        anomalies = []
        
        # Pattern 1: Alternator issue
        if row.get('battery') is not None and row.get('rpm') is not None:
            if row['battery'] < 12.5 and row['rpm'] > 2000:
                anomalies.append({
                    'type': 'PATTERN_ALTERNATOR',
                    'severity': 'HIGH',
                })
        
        # Pattern 2: Transmission slipping
        if row.get('rpm') is not None and row.get('speed') is not None:
            if row['rpm'] > 4000 and row['speed'] < 60:
                anomalies.append({
                    'type': 'PATTERN_TRANSMISSION',
                    'severity': 'CRITICAL',
                })
        
        # Pattern 3: Engine overload
        if row.get('eLoad') is not None and row.get('maf') is not None:
            if row['eLoad'] > 80 and row['maf'] < 3:
                anomalies.append({
                    'type': 'PATTERN_ENGINE',
                    'severity': 'HIGH',
                })
        
        return anomalies
    
    def get_max_severity(self, s1, s2):
        """Helper to compare severity levels."""
        if self.severity_rank.get(s1, 0) > self.severity_rank.get(s2, 0):
            return s1
        return s2

    def process_anomalies(self, device_id, anomalies, row):
        """
        Aggregates anomalies into time-windowed alerts (1-2 minutes).
        """
        timestamp = row['timeStamp']
        
        # Check if we have an active window for this device
        if device_id in self.current_windows:
            window = self.current_windows[device_id]
            # Check if within 2 minutes (120 seconds) of the window start
            # Ensure we are working with datetime objects
            time_diff = (timestamp - window['start_time']).total_seconds()
            if time_diff <= 120:
                self.update_window(window, anomalies, row)
                return
            else:
                # Close current window and move to history
                self.history_alerts.append(window)
                del self.current_windows[device_id]
        
        # Start a new window
        self.create_window(device_id, anomalies, row)

    def create_window(self, device_id, anomalies, row):
        """Creates a new alert window."""
        # Calculate initial severity and issues
        max_severity = 'INFO'
        issues = set()
        factors = set()
        
        for a in anomalies:
            max_severity = self.get_max_severity(max_severity, a['severity'])
            issues.add(a['type'])
            # Extract factor from type (e.g., THRESHOLD_rpm -> rpm)
            if '_' in a['type']:
                factors.add(a['type'].split('_')[-1])
            else:
                factors.add('system')

        self.current_windows[device_id] = {
            'alert_id': len(self.history_alerts) + len(self.current_windows) + 1,
            'device_id': device_id,
            'start_time': row['timeStamp'],
            'end_time': row['timeStamp'],
            'severity': max_severity,
            'issues': list(issues),
            'factors': list(factors),
            'sensor_snapshot': {
                'cTemp': row.get('cTemp'),
                'rpm': row.get('rpm'),
                'speed': row.get('speed'),
                'battery': row.get('battery'),
                'eLoad': row.get('eLoad'),
                'maf': row.get('maf')
            },
            'min_values': {
                'cTemp': row.get('cTemp'),
                'rpm': row.get('rpm'),
                'speed': row.get('speed'),
                'battery': row.get('battery'),
                'eLoad': row.get('eLoad'),
                'maf': row.get('maf')
            },
            'max_values': {
                'cTemp': row.get('cTemp'),
                'rpm': row.get('rpm'),
                'speed': row.get('speed'),
                'battery': row.get('battery'),
                'eLoad': row.get('eLoad'),
                'maf': row.get('maf')
            },
            'anomaly_count': len(anomalies)
        }

    def update_window(self, window, anomalies, row):
        """Updates an existing alert window with new anomalies."""
        window['end_time'] = row['timeStamp']
        window['anomaly_count'] += len(anomalies)
        
        current_issues = set(window['issues'])
        current_factors = set(window['factors'])
        
        # Update min/max values
        for sensor in ['cTemp', 'rpm', 'speed', 'battery', 'eLoad', 'maf']:
            val = row.get(sensor)
            if val is not None:
                if val < window['min_values'].get(sensor, float('inf')):
                    window['min_values'][sensor] = val
                if val > window['max_values'].get(sensor, float('-inf')):
                    window['max_values'][sensor] = val
        
        for a in anomalies:
            window['severity'] = self.get_max_severity(window['severity'], a['severity'])
            current_issues.add(a['type'])
            if '_' in a['type']:
                current_factors.add(a['type'].split('_')[-1])
        
        window['issues'] = list(current_issues)
        window['factors'] = list(current_factors)
    
    def analyze(self, telemetry_data):
        """
        Analyzes the entire telemetry dataframe to detect and consolidate anomalies.
        """
        print("🔍 Analyzing telemetry data for anomalies...")
        
        total_anomalies_found = 0
        self.history_alerts = []
        self.current_windows = {}
        
        # Ensure timestamp is sorted
        telemetry_data = telemetry_data.sort_values('timeStamp').reset_index(drop=True)
        
        for idx, row in telemetry_data.iterrows():
            device_id = row['deviceID']
            
            # Combine all detection methods
            threshold_anomalies = self.detect_threshold_anomalies(row)
            roc_anomalies = self.detect_rate_of_change(telemetry_data, idx)
            pattern_anomalies = self.detect_patterns(row)
            
            all_anomalies = threshold_anomalies + roc_anomalies + pattern_anomalies
            
            if all_anomalies:
                total_anomalies_found += len(all_anomalies)
                self.process_anomalies(device_id, all_anomalies, row)
        
        # Flush any remaining open windows
        for window in self.current_windows.values():
            self.history_alerts.append(window)
            
        # Convert timestamps to strings for JSON serialization
        for alert in self.history_alerts:
            if not isinstance(alert['start_time'], str):
                alert['start_time'] = alert['start_time'].isoformat()
            if not isinstance(alert['end_time'], str):
                alert['end_time'] = alert['end_time'].isoformat()

        print(f"✓ Detected {len(self.history_alerts)} consolidated alerts from {total_anomalies_found} raw anomaly events.")
        return self.history_alerts

# Main execution block
if __name__ == "__main__":
    # Set UTF-8 encoding for Windows console
    import sys
    if sys.platform == 'win32':
        import io
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
    
    print("=" * 80)
    print("🚗 DATA ANALYSIS AGENT - VEHICLE HEALTH MONITORING")
    print("=" * 80)
    
    try:
        # Load the sampled telemetry data
        print("\n📂 Loading telemetry data from 'telemetry_sampled.csv'...")
        df = pd.read_csv('telemetry_sampled.csv')
        
        # Clean up data types that might be mixed
        for col in ['cTemp', 'rpm', 'speed', 'eLoad', 'maf', 'battery']:
            df[col] = pd.to_numeric(df[col], errors='coerce')
        
        # Convert timeStamp to datetime objects
        df['timeStamp'] = pd.to_datetime(df['timeStamp'])
        
        df = df.dropna(subset=['cTemp', 'rpm', 'speed', 'eLoad', 'maf', 'battery'])
        
        print(f"✓ Loaded and cleaned {len(df)} records from {df['deviceID'].nunique()} vehicles.")
        
        # Run the analysis
        agent = DataAnalysisAgent()
        final_alerts = agent.analyze(df)
        
        # Save the consolidated alerts to a JSON file
        output_filename = 'detected_anomalies.json'
        with open(output_filename, 'w') as f:
            json.dump(final_alerts, f, indent=2)
        
        print(f"\n✅ Analysis complete!")
        print(f"   Total unique alerts generated: {len(final_alerts)}")
        print(f"   Results saved to: {output_filename}")

    except FileNotFoundError:
        print("\n❌ ERROR: 'telemetry_sampled.csv' not found.")
        print("   Please ensure the data file is in the same directory.")
    except Exception as e:
        print(f"\n❌ An unexpected error occurred: {e}")

    print("\n" + "=" * 80)
