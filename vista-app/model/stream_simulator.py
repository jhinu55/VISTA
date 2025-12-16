"""
Real-time data streaming simulator
Reads CSV in chunks and triggers anomaly detection every 30 seconds
"""
import pandas as pd
import json
import time
import subprocess
from pathlib import Path
from datetime import datetime

# Configuration
CSV_FILE = "telemetry_sampled.csv"
CHUNK_SIZE = 10  # Process 10 rows at a time
INTERVAL = 30  # Seconds between updates
CURSOR_FILE = "stream_cursor.json"
TEMP_CSV = "temp_chunk.csv"

def load_cursor():
    """Load the current position in the CSV file"""
    if Path(CURSOR_FILE).exists():
        with open(CURSOR_FILE, 'r') as f:
            data = json.load(f)
            return data.get('position', 0), data.get('total_rows', 0)
    return 0, 0

def save_cursor(position, total_rows):
    """Save the current position"""
    with open(CURSOR_FILE, 'w') as f:
        json.dump({
            'position': position,
            'total_rows': total_rows,
            'last_update': datetime.now().isoformat()
        }, f, indent=2)

def process_chunk():
    """Read next chunk and run anomaly detection"""
    try:
        # Load full dataset
        df = pd.read_csv(CSV_FILE)
        total_rows = len(df)
        
        # Get current position
        position, _ = load_cursor()
        
        # Reset if we've reached the end
        if position >= total_rows:
            position = 0
            print(f"🔄 Reached end of data, restarting from beginning...")
        
        # Get next chunk
        end_position = min(position + CHUNK_SIZE, total_rows)
        chunk = df.iloc[position:end_position]
        
        # Save chunk to temporary CSV
        chunk.to_csv(TEMP_CSV, index=False)
        
        print(f"📊 Processing rows {position} to {end_position} of {total_rows}")
        print(f"   Devices in chunk: {chunk['deviceID'].unique().tolist()}")
        
        # Run anomaly detection on this chunk
        result = subprocess.run(
            ['python', 'data_analysis_agent.py', TEMP_CSV],
            capture_output=True,
            text=True,
            timeout=25  # Leave 5 seconds buffer
        )
        
        if result.returncode == 0:
            print(f"✅ Anomaly detection completed successfully")
            # Save new position
            save_cursor(end_position, total_rows)
            return True
        else:
            print(f"❌ Anomaly detection failed:")
            print(result.stderr)
            return False
            
    except Exception as e:
        print(f"❌ Error processing chunk: {e}")
        return False

def run_continuous():
    """Run the streaming simulator continuously"""
    print("🚀 Starting real-time data streaming simulator")
    print(f"   Chunk size: {CHUNK_SIZE} rows")
    print(f"   Update interval: {INTERVAL} seconds")
    print("   Press Ctrl+C to stop\n")
    
    iteration = 0
    try:
        while True:
            iteration += 1
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"\n{'='*60}")
            print(f"🕐 Iteration #{iteration} - {timestamp}")
            print('='*60)
            
            success = process_chunk()
            
            if success:
                print(f"⏳ Waiting {INTERVAL} seconds until next update...")
            else:
                print(f"⚠️  Error occurred, retrying in {INTERVAL} seconds...")
            
            time.sleep(INTERVAL)
            
    except KeyboardInterrupt:
        print("\n\n🛑 Streaming simulator stopped by user")
        print(f"   Total iterations: {iteration}")
    except Exception as e:
        print(f"\n\n💥 Fatal error: {e}")

def reset_cursor():
    """Reset the cursor to start from beginning"""
    if Path(CURSOR_FILE).exists():
        Path(CURSOR_FILE).unlink()
    print("✅ Cursor reset to beginning")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "reset":
        reset_cursor()
    else:
        run_continuous()
