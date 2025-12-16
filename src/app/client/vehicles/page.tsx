'use client';

import { ArrowLeftIcon, BellIcon, MagnifyingGlassIcon, WrenchScrewdriverIcon, ExclamationTriangleIcon, HomeIcon, ClockIcon, ChatBubbleLeftIcon, UserIcon, TruckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Prediction, Vehicle } from '@/types/predictions';
import { mockVehicles } from '@/lib/mockData';

export default function VehiclesPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);

  useEffect(() => {
    fetch('/api/predictions')
      .then(res => res.json())
      .then(data => {
        setPredictions(data);
        
        // Update vehicle statuses based on predictions
        const updatedVehicles = mockVehicles.map(vehicle => {
          const vehiclePredictions = data.filter((p: Prediction) => p.device_id === vehicle.deviceId);
          
          if (vehiclePredictions.length === 0) return vehicle;
          
          const hasCritical = vehiclePredictions.some((p: Prediction) => p.severity === 'CRITICAL');
          const hasHigh = vehiclePredictions.some((p: Prediction) => p.severity === 'HIGH');
          const hasWarning = vehiclePredictions.some((p: Prediction) => p.severity === 'WARNING');
          
          let status: Vehicle['status'] = vehicle.status;
          if (hasCritical) status = 'Critical';
          else if (hasHigh) status = 'Warning';
          else if (hasWarning) status = 'Service Due';
          
          return { ...vehicle, status };
        });
        
        setVehicles(updatedVehicles);
      })
      .catch(err => console.error('Failed to fetch predictions:', err));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-100 text-green-800';
      case 'Service Due':
        return 'bg-yellow-100 text-yellow-800';
      case 'Warning':
        return 'bg-orange-100 text-orange-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getVehiclePredictions = (deviceId: number) => {
    return predictions.filter(p => p.device_id === deviceId);
  };

  return (
    <div className="min-h-screen bg-[#F0F1F2] pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/client/dashboard">
              <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">My Vehicles</h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search vehicles..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4A2B83]"
            />
          </div>
        </div>
      </div>

      {/* Vehicles List */}
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicles.map((vehicle) => {
            const vehiclePredictions = getVehiclePredictions(vehicle.deviceId);
            const criticalCount = vehiclePredictions.filter(p => ['CRITICAL', 'HIGH'].includes(p.severity)).length;
            
            return (
              <Link
                key={vehicle.id}
                href={`/client/vehicles/${vehicle.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-5 block"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <p className="text-sm text-gray-500">{vehicle.year}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(vehicle.status)}`}>
                    {vehicle.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Mileage:</span>
                    <span className="font-medium">{vehicle.mileage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Service:</span>
                    <span className="font-medium">{vehicle.lastService}</span>
                  </div>
                  {vehicle.licensePlate && (
                    <div className="flex justify-between">
                      <span>License:</span>
                      <span className="font-medium">{vehicle.licensePlate}</span>
                    </div>
                  )}
                </div>

                {criticalCount > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-red-600">
                      <ExclamationTriangleIcon className="w-5 h-5" />
                      <span className="text-sm font-medium">
                        {criticalCount} active alert{criticalCount > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Add Vehicle Button */}
        <button className="mt-6 w-full md:w-auto bg-[#4A2B83] text-white rounded-full py-4 px-8 font-semibold hover:bg-[#3A1B63] transition-colors shadow-lg">
          + Add New Vehicle
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <Link href="/client/dashboard" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/client/vehicles" className="flex flex-col items-center gap-1 text-[#4A2B83]">
            <TruckIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Vehicles</span>
          </Link>
          <Link href="/client/appointments" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <ClockIcon className="w-6 h-6" />
            <span className="text-xs">Appointments</span>
          </Link>
          <Link href="/client/messages" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <ChatBubbleLeftIcon className="w-6 h-6" />
            <span className="text-xs">Messages</span>
          </Link>
          <Link href="/client/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <UserIcon className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}