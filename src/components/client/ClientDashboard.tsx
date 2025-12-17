'use client';

import Image from 'next/image';
import Link from 'next/link';
import SettingsMenu from '@/components/common/SettingsMenu';
import CompactAlertCard from '@/components/client/CompactAlertCard';
import { 
  HomeIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  TruckIcon,
  BellIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { Prediction } from '@/types/predictions';
import { mockVehicles } from '@/lib/mockData';

const ClientDashboard = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    fetch('/api/predictions')
      .then(res => res.json())
      .then(data => {
        // Get top 3 most recent critical/high alerts
        const criticalAlerts = data
          .filter((p: Prediction) => ['CRITICAL', 'HIGH'].includes(p.severity))
          .sort((a: Prediction, b: Prediction) => 
            new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
          )
          .slice(0, 3);
        setPredictions(criticalAlerts);
      })
      .catch(err => console.error('Failed to fetch predictions:', err));
  }, []);

  return (
    <div className="min-h-screen bg-[#F0F1F2] pb-20">
      {/* Header with Background Image */}
      <div className="relative h-48 md:h-64">
        <div className="absolute inset-0">
          <Image
            src="/img/landing_back.png"
            alt="Dashboard Background"
            fill
            className="object-cover object-top"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent">
          <div className="flex justify-between items-start p-5 max-w-7xl mx-auto w-full">
            <div>
              <h1 className="text-white text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-white/80 text-sm mt-1">Welcome back!</p>
            </div>
            <SettingsMenu />
          </div>
        </div>
      </div>

      {/* Content with negative margin to overlay */}
      <div className="px-4 -mt-16 md:-mt-20 max-w-7xl mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">4</div>
            <div className="text-sm text-gray-600">My Vehicles</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">3</div>
            <div className="text-sm text-gray-600">Upcoming Services</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-1">{predictions.length}</div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Completed Services</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-4 max-w-7xl mx-auto">
        {/* Active Alerts Section */}
        {predictions.length > 0 && (
          <div className="space-y-3">
            <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              <BellIcon className="w-6 h-6 text-orange-600" />
              Critical Alerts
            </h2>
            {predictions.map((prediction) => {
              const vehicle = mockVehicles.find(v => v.deviceId === prediction.device_id);
              return (
                <CompactAlertCard
                  key={prediction.alert_id}
                  prediction={prediction}
                  vehicleName={vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : `Vehicle ${prediction.device_id}`}
                  vehicleId={vehicle?.id || 0}
                />
              );
            })}
          </div>
        )}

        {/* Notifications Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 bg-white rounded-xl p-4 shadow-sm">
            <BellIcon className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">{predictions.length + 1} New Notifications</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl p-4 shadow-sm">
            <EnvelopeIcon className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">2 New Messages</span>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">Today&apos;s Schedule</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-4 border-b border-gray-100">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#F0F1F2] rounded-full flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Battery Replacement</p>
                  <p className="text-sm text-gray-500 mt-0.5">10:00 AM - Toyota Camry</p>
                </div>
              </div>
              <Link href="/client/appointments">
                <span className="text-xs text-[#4A2B83] bg-purple-50 px-3 py-1 rounded-full hover:bg-purple-100 cursor-pointer">View</span>
              </Link>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#F0F1F2] rounded-full flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Engine Check</p>
                  <p className="text-sm text-gray-500 mt-0.5">2:00 PM - Honda Accord</p>
                </div>
              </div>
              <Link href="/client/appointments">
                <span className="text-xs text-[#4A2B83] bg-purple-50 px-3 py-1 rounded-full hover:bg-purple-100 cursor-pointer">View</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Vehicle Health Overview */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-4 text-lg">Vehicle Health Overview</h2>
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {[30, 50, 35, 45, 70, 55, 60, 85, 75].map((height, index) => (
              <div 
                key={index}
                className="flex-1 bg-gradient-to-t from-[#4A2B83] to-[#6B4BA3] rounded-t-lg transition-all hover:opacity-80"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-400">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <Link href="/client/dashboard" className="flex flex-col items-center gap-1 text-[#4A2B83]">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Home</span>
          </Link>
          <Link href="/client/vehicles" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <TruckIcon className="w-6 h-6" />
            <span className="text-xs">Vehicles</span>
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
};

export default ClientDashboard;