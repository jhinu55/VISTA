import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns

# Set style for professional/pitch-deck look
plt.style.use('seaborn-v0_8-whitegrid')
sns.set_context("talk")

def plot_rul_degradation_curve(filename):
    print(f"📊 Generating {filename}...")
    plt.figure(figsize=(12, 7))
    
    # Simulate degradation data
    time = np.linspace(0, 100, 100)
    # Health starts at 100, stays flat, then drops exponentially
    health = 100 - (np.exp(time/20) - 1) * 1.5
    health = np.clip(health, 0, 100)
    
    # Plot the curve
    plt.plot(time, health, color='#2980b9', linewidth=3, label='Component Health')
    
    # Add "Current Time" marker
    current_time = 80
    current_health = health[80]
    plt.plot(current_time, current_health, 'ro', markersize=10, label='Current Status')
    plt.axvline(x=current_time, color='gray', linestyle='--', alpha=0.5)
    
    # Add Prediction
    plt.annotate(f'Anomaly Detected\nHealth: {int(current_health)}%', 
                 xy=(current_time, current_health), 
                 xytext=(current_time-20, current_health-20),
                 arrowprops=dict(facecolor='black', shrink=0.05))
    
    # Add Failure Threshold
    plt.axhline(y=20, color='#c0392b', linestyle='--', linewidth=2, label='Failure Threshold')
    
    # Add Predicted Failure Time
    failure_time = 92 # approx where it hits 20
    plt.axvspan(current_time, failure_time, color='#f1c40f', alpha=0.2, label='Remaining Useful Life (12 Days)')
    
    plt.title('AI Prediction: Component Degradation Curve', fontsize=18, fontweight='bold')
    plt.xlabel('Operating Days')
    plt.ylabel('Health Score (%)')
    plt.legend(loc='lower left')
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()

def plot_feature_importance(filename):
    print(f"📊 Generating {filename}...")
    plt.figure(figsize=(12, 7))
    
    features = ['Battery Voltage Trend', 'Engine RPM Variance', 'Coolant Temp Peak', 'MAF Sensor Drift', 'Engine Load Avg', 'Vehicle Speed']
    importance = [0.35, 0.25, 0.15, 0.12, 0.08, 0.05]
    
    # Create horizontal bar chart
    sns.barplot(x=importance, y=features, palette='viridis')
    
    plt.title('Model Logic: Top Predictors of Failure', fontsize=18, fontweight='bold')
    plt.xlabel('Importance Score (Impact on Prediction)')
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()

def plot_cost_savings(filename):
    print(f"📊 Generating {filename}...")
    plt.figure(figsize=(12, 7))
    
    months = np.arange(1, 13)
    # Reactive: Costs jump randomly (failures)
    reactive_costs = np.cumsum([1000, 1200, 5000, 1000, 1000, 8000, 1000, 1200, 1000, 6000, 1000, 1000])
    # Predictive: Costs are steady and lower (maintenance)
    predictive_costs = np.cumsum([500, 500, 1500, 500, 500, 1500, 500, 500, 500, 1500, 500, 500])
    
    plt.plot(months, reactive_costs, color='#e74c3c', linewidth=3, marker='o', label='Traditional (Reactive) Maintenance')
    plt.plot(months, predictive_costs, color='#27ae60', linewidth=3, marker='o', label='AI-Driven (Predictive) Maintenance')
    
    # Fill area between
    plt.fill_between(months, reactive_costs, predictive_costs, color='#27ae60', alpha=0.1, label='Net Savings')
    
    plt.title('Projected ROI: Cumulative Maintenance Costs', fontsize=18, fontweight='bold')
    plt.xlabel('Month')
    plt.ylabel('Cumulative Cost ($)')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()

def plot_fleet_health_dashboard(filename):
    print(f"📊 Generating {filename}...")
    plt.figure(figsize=(10, 10))
    
    labels = ['Healthy (No Action)', 'Monitor (Low Risk)', 'Warning (Maintenance Soon)', 'Critical (Immediate Action)']
    sizes = [75, 15, 7, 3]
    colors = ['#2ecc71', '#3498db', '#f1c40f', '#e74c3c']
    explode = (0, 0, 0.1, 0.2)  # explode the critical slice
    
    plt.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%',
            shadow=True, startangle=90, textprops={'fontsize': 14})
    
    plt.title('Real-Time Fleet Health Status', fontsize=18, fontweight='bold')
    plt.tight_layout()
    plt.savefig(filename)
    plt.close()

if __name__ == "__main__":
    try:
        plot_rul_degradation_curve('concept_rul_curve.png')
        plot_feature_importance('concept_feature_importance.png')
        plot_cost_savings('concept_roi_projection.png')
        plot_fleet_health_dashboard('concept_fleet_status.png')
        print("\n✅ Concept plots generated successfully!")
    except Exception as e:
        print(f"\n❌ Error: {e}")
