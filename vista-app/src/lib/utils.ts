import { Prediction, SeverityLevel } from '@/types';
import { sensorThresholds, patternDescriptions } from './mockData';

export function getSeverityColor(severity: SeverityLevel): string {
  const colors = {
    INFO: 'bg-blue-100 text-blue-800 border-blue-200',
    WARNING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-200',
    CRITICAL: 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[severity];
}

export function getSeverityBadgeColor(severity: SeverityLevel): string {
  const colors = {
    INFO: 'bg-blue-500',
    WARNING: 'bg-yellow-500',
    HIGH: 'bg-orange-500',
    CRITICAL: 'bg-red-500'
  };
  return colors[severity];
}

export function generateIssueMessages(prediction: Prediction): string[] {
  const messages: string[] = [];
  const { issues, min_values, max_values } = prediction;

  issues.forEach(issue => {
    if (issue.startsWith('THRESHOLD_')) {
      const sensor = issue.split('_')[1] as keyof typeof sensorThresholds;
      if (sensorThresholds[sensor]) {
        const threshold = sensorThresholds[sensor];
        const minVal = min_values[sensor];
        const maxVal = max_values[sensor];

        if (minVal !== null && minVal < threshold.min) {
          messages.push(
            `${threshold.name} dropped to ${minVal}${threshold.unit} (Below safe minimum of ${threshold.min}${threshold.unit})`
          );
        }

        if (maxVal !== null && maxVal > threshold.max) {
          messages.push(
            `${threshold.name} reached ${maxVal}${threshold.unit} (Above safe maximum of ${threshold.max}${threshold.unit})`
          );
        }
      }
    } else if (issue.startsWith('ROC_')) {
      const sensor = issue.split('_')[1];
      const sensorKey = sensor as keyof typeof sensorThresholds;
      const name = sensorThresholds[sensorKey]?.name || sensor;
      messages.push(`Rapid ${name} fluctuation detected`);
    } else if (issue.startsWith('PATTERN_')) {
      const description = patternDescriptions[issue];
      if (description) {
        messages.push(description);
      } else {
        messages.push(`${issue} detected`);
      }
    } else {
      messages.push(issue);
    }
  });

  return messages;
}

export function calculateVehicleHealth(predictions: Prediction[]): number {
  if (predictions.length === 0) return 100;

  const severityWeights = {
    INFO: 0,
    WARNING: 5,
    HIGH: 15,
    CRITICAL: 30
  };

  const recentPredictions = predictions.slice(0, 10);
  const totalDeduction = recentPredictions.reduce((acc, pred) => {
    return acc + severityWeights[pred.severity];
  }, 0);

  const health = Math.max(0, 100 - totalDeduction);
  return Math.round(health);
}

export function getHealthStatus(health: number): 'healthy' | 'attention' | 'warning' | 'critical' {
  if (health >= 80) return 'healthy';
  if (health >= 60) return 'attention';
  if (health >= 40) return 'warning';
  return 'critical';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getTimeSince(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays < 7) return `${diffDays} days ago`;
  return formatDate(dateString);
}
