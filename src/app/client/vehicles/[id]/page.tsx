'use client';

import { ArrowLeftIcon, ExclamationTriangleIcon, CheckCircleIcon, ShieldExclamationIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Prediction, Vehicle } from '@/types/predictions';
import { mockVehicles } from '@/lib/mockData';

const thresholds = {
  cTemp: { min: 70, max: 110, unit: '°C', name: 'Coolant Temp' },
  rpm: { min: 500, max: 6500, unit: 'RPM', name: 'Engine RPM' },
  speed: { min: 0, max: 200, unit: 'km/h', name: 'Speed' },
  eLoad: { min: 10, max: 90, unit: '%', name: 'Engine Load' },
  maf: { min: 2, max: 15, unit: 'g/s', name: 'Air Flow' },
  battery: { min: 11.5, max: 14.5, unit: 'V', name: 'Battery' }
};

export default function VehicleDetail({ params }: { params: { id: string } }) {
  const vehicleId = parseInt(params.id);
  const vehicle = mockVehicles.find(v => v.id === vehicleId);
  
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    if (!vehicle) return;
    
    fetch('/api/predictions')
      .then(res => res.json())
      .then(data => {
        const vehiclePredictions = data.filter((p: Prediction) => p.device_id === vehicle.deviceId);
        setPredictions(vehiclePredictions);
      })
      .catch(err => console.error('Failed to fetch predictions:', err));
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-[#F0F1F2] flex items-center justify-center">
        <p>Vehicle not found</p>
      </div>
    );
  }

  const criticalAlerts = predictions.filter(p => ['CRITICAL', 'HIGH'].includes(p.severity));

  const generateIssueMessages = (prediction: Prediction) => {
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

  const serviceHistory = [
    {
      date: vehicle.lastService,
      service: 'Regular Maintenance',
      cost: '$125',
      notes: 'Routine check-up completed'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F0F1F2] pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <Link href="/client/vehicles" className="inline-flex items-center gap-2 text-gray-700 mb-4">
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Back to Vehicles</span>
          </Link>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-gray-500 mt-1">{vehicle.licensePlate}</p>
            </div>
            {criticalAlerts.length > 0 ? (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 px-4 py-2 rounded-full">
                <ExclamationTriangleIcon className="w-5 h-5" />
                <span className="font-medium text-sm">{criticalAlerts.length} Alert{criticalAlerts.length > 1 ? 's' : ''}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full">
                <CheckCircleIcon className="w-5 h-5" />
                <span className="font-medium text-sm">Healthy</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-7xl mx-auto space-y-6">
        {/* Critical Alerts */}
        {criticalAlerts.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldExclamationIcon className="w-6 h-6 text-red-600" />
              Active Critical Alerts
            </h2>
            <div className="space-y-4">
              {criticalAlerts.map(prediction => {
                const messages = generateIssueMessages(prediction);
                return (
                  <div 
                    key={prediction.alert_id} 
                    className={`border-l-4 rounded-lg p-5 shadow-sm ${
                      prediction.severity === 'CRITICAL' ? 'bg-red-50 border-red-500' :
                      'bg-orange-50 border-orange-500'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <ShieldExclamationIcon className={`w-6 h-6 flex-shrink-0 ${
                        prediction.severity === 'CRITICAL' ? 'text-red-600' : 'text-orange-600'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-bold text-lg">{prediction.severity} Alert</h3>
                          <span className="text-xs px-2 py-1 bg-white/50 rounded-full">
                            Alert #{prediction.alert_id}
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
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Vehicle Info */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">VIN</span>
              <span className="font-medium text-gray-900">{vehicle.vin}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">License Plate</span>
              <span className="font-medium text-gray-900">{vehicle.licensePlate}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Mileage</span>
              <span className="font-medium text-gray-900">{vehicle.mileage}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Last Service</span>
              <span className="font-medium text-gray-900">{vehicle.lastService}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Device ID</span>
              <span className="font-medium text-gray-900">{vehicle.deviceId}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600">Status</span>
              <span className={`font-medium ${
                vehicle.status === 'Critical' ? 'text-red-600' :
                vehicle.status === 'Warning' ? 'text-orange-600' :
                vehicle.status === 'Service Due' ? 'text-yellow-600' :
                'text-green-600'
              }`}>
                {vehicle.status}
              </span>
            </div>
          </div>
        </div>
        {/* All Predictions History */}
        {predictions.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Alert History ({predictions.length})</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {predictions.map(prediction => (
                <div key={prediction.alert_id} className="border-l-4 border-gray-300 pl-4 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      prediction.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                      prediction.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                      prediction.severity === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {prediction.severity}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(prediction.start_time).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    Issues: {prediction.issues.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service History */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Service History</h2>
          <div className="space-y-4">
            {serviceHistory.map((entry, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-900">{entry.service}</p>
                    <p className="text-sm text-gray-500">{entry.date}</p>
                  </div>
                  <span className="font-bold text-gray-900">{entry.cost}</span>
                </div>
                <p className="text-sm text-gray-600">{entry.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/client/appointments/book">
            <button className="w-full bg-[#4A2B83] text-white rounded-full py-4 px-6 font-semibold hover:bg-[#3A1B63] transition-colors shadow-lg">
              Schedule Service
            </button>
          </Link>
          <button className="w-full bg-white text-[#4A2B83] border-2 border-[#4A2B83] rounded-full py-4 px-6 font-semibold hover:bg-purple-50 transition-colors">
            View More History
          </button>
        </div>
      </div>
    </div>
  );
}
              <div className="text-sm">WED, DEC</div>
              <div className="text-2xl font-bold">1</div>
              <div className="text-xs">11:00 AM</div>
            </div>
            <div className="flex-1">
              <p className="text-base font-medium text-gray-900">Repair Shop: Maintenance Center 3</p>
              <p className="text-sm text-gray-500 mt-1">Tire Rotation & Balance</p>
              <button className="mt-2 text-sm text-[#4A2B83] font-medium">
                Cancel
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-6 py-4 bg-white border-t border-gray-100">
        <Link href="/client/dashboard" className="text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Link>
        <button className="bg-[#4A2B83] text-white px-12 py-3 rounded-full font-medium">
          BOOK SERVICE
        </button>
        <Link href="/client/profile" className="text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default VehicleDetail;