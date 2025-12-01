'use client';

import { TruckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface VehicleCardProps {
  make: string;
  model: string;
  year: number;
  mileage: string;
  status: 'Healthy' | 'Service Due';
  vehicleId: string;
}

export default function VehicleCard({
  make,
  model,
  year,
  mileage,
  status,
  vehicleId,
}: VehicleCardProps) {
  return (
    <Link
      href={`/client/vehicles/${vehicleId}`}
      className="block bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TruckIcon className="w-6 h-6 text-gray-400" />
          <div>
            <h3 className="font-medium text-gray-900">
              {make} {model}
            </h3>
            <p className="text-sm text-gray-600">
              {year} • {mileage}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${
            status === 'Healthy'
              ? 'bg-[#4A2B83]/10 text-[#4A2B83]'
              : 'bg-amber-100 text-amber-700'
          }`}
        >
          {status}
        </span>
      </div>
    </Link>
  );
}