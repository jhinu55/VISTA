'use client';

import { ArrowLeftIcon, BellIcon, MagnifyingGlassIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

// Mock data for vehicles
const vehicles = [
  {
    id: 1,
    make: 'Make & Camry',
    year: '2020',
    mileage: '35,000 mi',
    lastService: '01/15/2024',
    status: 'Healthy'
  },
  {
    id: 2,
    make: 'Make & Camry',
    year: '2020',
    mileage: '35,000 mi',
    lastService: '01/15/2024',
    status: 'Healthy'
  },
  {
    id: 3,
    make: 'Make & Camry',
    year: '2020',
    mileage: '35,000 mi',
    lastService: '01/15/2024',
    status: 'Service Due'
  },
  {
    id: 4,
    make: 'Make & Camry',
    year: '2020',
    mileage: '35,000 mi',
    lastService: '01/15/2024',
    status: 'Needs Attention'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Healthy':
      return 'bg-[#4A2B83] text-white';
    case 'Service Due':
      return 'bg-[#4A2B83] text-white';
    case 'Needs Attention':
      return 'bg-[#4A2B83] text-white';
    default:
      return 'bg-gray-200 text-gray-700';
  }
};

const VehiclesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link href="/client/dashboard">
              <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">My Vehicles</h1>
          </div>
          <div className="flex items-center gap-4">
            <button>
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-800" />
            </button>
            <button className="relative">
              <BellIcon className="w-6 h-6 text-gray-800" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#4A2B83] rounded-full"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Vehicle List */}
      <div className="p-4 space-y-4">
        {vehicles.map((vehicle) => (
          <Link 
            key={vehicle.id}
            href={`/client/vehicles/${vehicle.id}`}
            className="block bg-white rounded-xl shadow-sm transition-transform active:scale-[0.99]"
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="font-semibold text-gray-800">{vehicle.make}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  vehicle.status === 'Healthy' ? 'bg-[#4A2B83] text-white' :
                  vehicle.status === 'Service Due' ? 'bg-[#6B21A8] text-white' :
                  'bg-[#7C3AED] text-white'
                }`}>
                  {vehicle.status}
                </span>
              </div>
              <div className="ml-9">
                <p className="text-sm text-gray-500">{vehicle.year} • {vehicle.mileage}</p>
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                  <WrenchScrewdriverIcon className="w-4 h-4" />
                  <span>Last Service: {vehicle.lastService}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VehiclesPage;