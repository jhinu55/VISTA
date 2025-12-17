'use client';

import { ExclamationTriangleIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import { Prediction } from '@/types/predictions';
import Link from 'next/link';

interface CompactAlertCardProps {
  prediction: Prediction;
  vehicleName: string;
  vehicleId: number;
}

export default function CompactAlertCard({ prediction, vehicleName, vehicleId }: CompactAlertCardProps) {
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
        return <ExclamationTriangleIcon className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <Link href={`/client/vehicles/${vehicleId}`}>
      <div className={`border-l-4 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${getSeverityStyles(prediction.severity)}`}>
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0">
            {getSeverityIcon(prediction.severity)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-base">{prediction.severity} Alert</h3>
            </div>
            <p className="text-sm font-medium truncate">{vehicleName}</p>
            <p className="text-xs opacity-75 mt-1">
              {prediction.issues.length} issue{prediction.issues.length > 1 ? 's' : ''} detected • Tap to view details
            </p>
          </div>
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
