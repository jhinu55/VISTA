'use client';

import { XMarkIcon, ExclamationTriangleIcon, ShieldExclamationIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { Prediction } from '@/types/predictions';

interface AlertNotificationProps {
  prediction: Prediction;
  vehicleName: string;
  onClose: () => void;
}

const thresholds = {
  cTemp: { min: 70, max: 110, unit: '°C', name: 'Coolant Temp' },
  rpm: { min: 500, max: 6500, unit: 'RPM', name: 'Engine RPM' },
  speed: { min: 0, max: 200, unit: 'km/h', name: 'Speed' },
  eLoad: { min: 10, max: 90, unit: '%', name: 'Engine Load' },
  maf: { min: 2, max: 15, unit: 'g/s', name: 'Air Flow' },
  battery: { min: 11.5, max: 14.5, unit: 'V', name: 'Battery' }
};

export default function AlertNotification({ prediction, vehicleName, onClose }: AlertNotificationProps) {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-50 border-red-500 text-red-900';
      case 'HIGH':
        return 'bg-orange-50 border-orange-500 text-orange-900';
      case 'WARNING':
        return 'bg-yellow-50 border-yellow-500 text-yellow-900';
      default:
        return 'bg-blue-50 border-blue-500 text-blue-900';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
      case 'HIGH':
        return <ShieldExclamationIcon className="w-6 h-6 text-red-600" />;
      case 'WARNING':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />;
      default:
        return <InformationCircleIcon className="w-6 h-6 text-blue-600" />;
    }
  };

  const generateMessages = () => {
    const messages: string[] = [];
    const snapshot = prediction.sensor_snapshot;
    const minVals = prediction.min_values;
    const maxVals = prediction.max_values;

    prediction.issues.forEach((issue) => {
      if (issue.startsWith('THRESHOLD_')) {
        const sensor = issue.split('_')[1] as keyof typeof thresholds;
        if (sensor in thresholds) {
          const t = thresholds[sensor];
          
          if (minVals[sensor] < t.min) {
            messages.push(`${t.name} dropped to ${minVals[sensor]}${t.unit} (Below safe minimum of ${t.min}${t.unit})`);
          }
          
          if (maxVals[sensor] > t.max) {
            messages.push(`${t.name} spiked to ${maxVals[sensor]}${t.unit} (Above safe maximum of ${t.max}${t.unit})`);
          }
        }
      } else if (issue.startsWith('ROC_')) {
        const sensor = issue.split('_')[1] as keyof typeof thresholds;
        const t = thresholds[sensor];
        messages.push(`Rapid ${t?.name || sensor} fluctuation detected`);
      } else if (issue === 'PATTERN_ALTERNATOR') {
        messages.push(`⚠️ Alternator failure pattern: Battery not charging despite engine running`);
      } else if (issue === 'PATTERN_TRANSMISSION') {
        messages.push(`⚠️ Transmission slip pattern: High RPM with low speed`);
      } else if (issue === 'PATTERN_ENGINE') {
        messages.push(`⚠️ Engine overload pattern: High load with insufficient air flow`);
      }
    });

    return messages;
  };

  const messages = generateMessages();

  return (
    <div className={`border-l-4 rounded-lg p-4 shadow-lg ${getSeverityStyles(prediction.severity)} mb-4`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex-shrink-0 mt-0.5">
            {getSeverityIcon(prediction.severity)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-lg">{prediction.severity} Alert</h3>
              <span className="text-xs px-2 py-1 bg-white/50 rounded-full">
                {vehicleName}
              </span>
            </div>
            
            <div className="space-y-2 mb-3">
              {messages.map((msg, idx) => (
                <p key={idx} className="text-sm font-medium">• {msg}</p>
              ))}
            </div>

            <div className="text-xs opacity-75">
              Detected: {new Date(prediction.start_time).toLocaleString()}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700 flex-shrink-0"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
