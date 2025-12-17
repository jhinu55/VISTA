import json

def generate_human_readable_alerts():
    try:
        with open('detected_anomalies.json', 'r') as f:
            alerts = json.load(f)
    except FileNotFoundError:
        print("❌ Error: 'detected_anomalies.json' not found. Run data_analysis_agent.py first.")
        return

    # Thresholds for reference (matching data_analysis_agent.py)
    thresholds = {
        'cTemp': {'min': 70, 'max': 110, 'unit': '°C'},
        'rpm': {'min': 500, 'max': 6500, 'unit': 'RPM'},
        'speed': {'min': 0, 'max': 200, 'unit': 'km/h'},
        'eLoad': {'min': 10, 'max': 90, 'unit': '%'},
        'maf': {'min': 2, 'max': 15, 'unit': 'g/s'},
        'battery': {'min': 11.5, 'max': 14.5, 'unit': 'V'}
    }

    # ANSI colors
    RED = '\033[91m'
    RESET = '\033[0m'

    print(f"📢 GENERATING ALERTS FROM {len(alerts)} RECORDS\n")

    for i, alert in enumerate(alerts):
        device_id = alert['device_id']
        severity = alert['severity']
        snapshot = alert['sensor_snapshot']
        min_vals = alert.get('min_values', snapshot) # Fallback to snapshot if old json
        max_vals = alert.get('max_values', snapshot)
        
        print(f"[{severity}] Vehicle {device_id} - Alert #{alert['alert_id']}")
        
        messages = []
        
        for issue in alert['issues']:
            # Handle Threshold Issues
            if issue.startswith('THRESHOLD_'):
                sensor = issue.split('_')[1]
                if sensor in thresholds:
                    t = thresholds[sensor]
                    unit = t['unit']
                    
                    # Check min/max violations
                    min_v = min_vals.get(sensor)
                    max_v = max_vals.get(sensor)
                    
                    if min_v is not None and min_v < t['min']:
                        messages.append(f"  • {sensor} dropped to {min_v}{unit} (Too Low, Min: {t['min']}{unit})")
                    
                    if max_v is not None and max_v > t['max']:
                        messages.append(f"  • {sensor} spiked to {max_v}{unit} (Too High, Max: {t['max']}{unit})")
            
            # Handle Rate of Change Issues
            elif issue.startswith('ROC_'):
                sensor = issue.split('_')[1]
                val = snapshot.get(sensor, 'N/A')
                unit = thresholds.get(sensor, {}).get('unit', '')
                messages.append(f"  • {sensor} showed sudden spike/drop (Current: {val}{unit})")
            
            # Handle Patterns
            elif issue == 'PATTERN_ALTERNATOR':
                batt = snapshot.get('battery')
                rpm = snapshot.get('rpm')
                messages.append(f"  • Alternator Failure {RED}Pattern{RESET}: Battery ({batt}V) not charging despite Engine Running ({rpm} RPM)")
            
            elif issue == 'PATTERN_TRANSMISSION':
                speed = snapshot.get('speed')
                rpm = snapshot.get('rpm')
                messages.append(f"  • Transmission Slip {RED}Pattern{RESET}: High RPM ({rpm}) with Low Speed ({speed} km/h)")
                
            elif issue == 'PATTERN_ENGINE':
                load = snapshot.get('eLoad')
                maf = snapshot.get('maf')
                messages.append(f"  • Engine Overload {RED}Pattern{RESET}: High Load ({load}%) with Low Air Flow ({maf} g/s)")
            
            else:
                messages.append(f"  • {issue} detected")

        # Print all generated messages for this alert
        for msg in messages:
            print(msg)
        print("-" * 50)

if __name__ == "__main__":
    generate_human_readable_alerts()
