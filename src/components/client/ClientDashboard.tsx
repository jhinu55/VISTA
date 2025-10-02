'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  Cog6ToothIcon, 
  HomeIcon, 
  MagnifyingGlassIcon,
  ClockIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const ClientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Image Header */}
      <div className="relative h-48">
        <Image
          src="/landing_back.png"
          alt="Dashboard Background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/40">
          <div className="flex justify-between items-start p-4">
            <h1 className="text-white text-xl font-semibold mt-2">Welcome Back, [User&apos;s Name]</h1>
            <button className="p-2">
              <Cog6ToothIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-10">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#1C1B1F] rounded-xl p-4 text-white">
            <span className="text-3xl font-bold">9</span>
            <p className="text-sm text-gray-300">Upcoming Services</p>
          </div>
          <div className="bg-[#1C1B1F] rounded-xl p-4 text-white">
            <span className="text-3xl font-bold">12</span>
            <p className="text-sm text-gray-300">Pending Reports</p>
          </div>
        </div>

        {/* Notification Counters */}
        <div className="flex justify-between mb-6">
          <div className="text-sm text-slate-800">
            4 New Notifications
          </div>
          <div className="text-sm text-slate-800">
            2 New Messages
          </div>
        </div>

        {/* Premium Upgrade Button */}
        <button className="w-full bg-[#4A2B83] text-white rounded-full py-3 mb-6 font-semibold">
          UPGRADE TO PREMIUM
        </button>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl p-4 mb-6">
          <h2 className="font-semibold mb-4 text-slate-800">Today&apos;s Schedule</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <ClockIcon className="w-5 h-5 text-slate-800" />
                <div>
                  <p className="font-medium text-slate-800">Oil Change</p>
                  <p className="text-sm text-slate-700">11:30 AM</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Reschedulable</span>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <ClockIcon className="w-5 h-5 text-slate-800" />
                <div>
                  <p className="font-medium text-slate-800">Tire Rotation</p>
                  <p className="text-sm text-slate-700">2:00 PM</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">Reschedulable</span>
            </div>
          </div>
        </div>

        {/* Vehicle Health Overview */}
        <div className="bg-white rounded-xl p-4 mb-20">
          <h2 className="font-semibold mb-4 text-slate-800">Vehicle Health Overview</h2>
          <div className="h-40 flex items-end justify-between gap-1">
            {[20, 35, 25, 30, 60, 40, 45, 80, 90].map((height, index) => (
              <div 
                key={index}
                className="w-6 bg-[#4A2B83] rounded-t"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center h-16">
          <Link href="/client/dashboard" className="flex flex-col items-center text-[#4A2B83]">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/client/vehicles" className="flex flex-col items-center text-gray-500">
            <TruckIcon className="w-6 h-6" />
            <span className="text-xs">Vehicles</span>
          </Link>
          <Link href="/client/appointments" className="flex flex-col items-center text-gray-500">
            <ClockIcon className="w-6 h-6" />
            <span className="text-xs">Appointments</span>
          </Link>
          <Link href="/client/messages" className="flex flex-col items-center text-gray-500">
            <ChatBubbleLeftIcon className="w-6 h-6" />
            <span className="text-xs">Messages</span>
          </Link>
          <Link href="/client/profile" className="flex flex-col items-center text-gray-500">
            <UserIcon className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default ClientDashboard;