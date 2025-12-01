'use client';

import Image from 'next/image';
import Link from 'next/link';
import SettingsMenu from '@/components/common/SettingsMenu';
import { 
  HomeIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  TruckIcon,
  BellIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const ClientDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F0F1F2]">
      {/* Header with Background Image */}
      <div className="relative h-64">
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
          <div className="flex justify-between items-start p-5">
            <div>
              <h1 className="text-white text-2xl font-bold">Dashboard</h1>
              <p className="text-white/80 text-sm mt-1">Welcome back!</p>
            </div>
            <SettingsMenu />
          </div>
        </div>
      </div>

      {/* Content with negative margin to overlay */}
      <div className="px-4 -mt-20">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-4xl font-bold text-gray-900 mb-1">9</div>
            <div className="text-sm text-gray-600">Upcoming Services</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-4xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Completed Services</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-4">
        {/* Notifications Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BellIcon className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">4 New Notifications</span>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700">2 New Messages</span>
          </div>
        </div>

        {/* Premium Upgrade Button */}
        <button className="w-full bg-[#4A2B83] text-white rounded-full py-4 font-semibold text-sm shadow-lg hover:bg-[#3A1B63] transition-colors">
          UPGRADE TO PREMIUM
        </button>

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
                  <p className="font-semibold text-gray-900">Oil Change</p>
                  <p className="text-sm text-gray-500 mt-0.5">11:30 AM</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">Reschedulable</span>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-[#F0F1F2] rounded-full flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Tire Rotation</p>
                  <p className="text-sm text-gray-500 mt-0.5">2:00 PM</p>
                </div>
              </div>
              <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">Reschedulable</span>
            </div>
          </div>
        </div>

        {/* Vehicle Health Overview */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-20">
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
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
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