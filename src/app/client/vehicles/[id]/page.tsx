'use client';

import { ArrowLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const VehicleDetail = ({ params }: { params: { id: string } }) => {
  const serviceHistory = [
    {
      date: '10/26/2023',
      service: 'Oil Change & Filter',
      cost: '$95',
      notes: 'Fixed minor leak'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link href="/client/vehicles">
              <ArrowLeftIcon className="w-6 h-6 text-gray-900" />
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Toyota Camry</h1>
          </div>
          <button>
            <Cog6ToothIcon className="w-6 h-6 text-gray-900" />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 space-y-6 pb-24">
        {/* Telemetry Summary */}
        <div className="bg-white rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Telemetry Summary</h2>
          
          {/* Speed Trends */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#4A2B83] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-gray-900 font-medium">Speed Trends</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
            <div className="relative h-32 bg-white">
              <div className="absolute inset-0 flex items-end">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <path
                    d="M0 80 Q60 70, 120 75, T240 85"
                    fill="none"
                    stroke="#4A2B83"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="absolute bottom-0 w-full text-xs text-gray-400 text-center">
                LAST 7 DAYS
              </div>
            </div>
          </div>

          {/* Engine Temperature */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#4A2B83] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-gray-900 font-medium">Engine Temperature</span>
              </div>
              <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </div>
            <div className="relative h-32 bg-white">
              <div className="absolute inset-0 flex items-end">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <path
                    d="M0 60 Q60 60, 120 60, T240 60"
                    fill="none"
                    stroke="#4A2B83"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <div className="absolute bottom-0 w-full text-xs text-gray-400 text-center">
                LAST 7 DAYS
              </div>
            </div>
          </div>
        </div>

        {/* Service History */}
        <section className="bg-white rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Service History Log</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <p className="text-gray-900">10/26/2023 - Oil Change & Filter - $95</p>
              <p className="text-gray-500 text-sm mt-1">• Fixed minor leak</p>
            </div>
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section className="bg-white rounded-xl p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Upcoming Appointments</h2>
          <div className="flex gap-4">
            <div className="bg-[#4A2B83] rounded-xl p-3 text-white text-center w-24">
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