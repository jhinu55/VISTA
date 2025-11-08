'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  Cog6ToothIcon, 
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
      <div className="relative h-52">
        <Image
          src="/landing_back.png"
          alt="Dashboard Background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40">
          <div className="flex justify-between items-start p-5">
            <div className="mt-2">
              <h1 className="text-white text-xl font-bold">Dashboard</h1>
              <p className="text-white/90 text-sm mt-1">Welcome back, John!</p>
            </div>
            <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
              <Cog6ToothIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Overlapping Stats Cards */}
      <div className="px-5 -mt-12">
        {/* Statistics Cards */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="text-3xl font-bold text-gray-900 mb-1">9</div>
            <div className="text-sm text-gray-600">Upcoming Services</div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
            <div className="text-sm text-gray-600">Completed Services</div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <BellIcon className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700 font-medium">4 New Notifications</span>
          </div>
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700 font-medium">2 New Messages</span>
          </div>
        </div>

        {/* Premium Upgrade Button */}
        <button className="w-full bg-[#4A2B83] text-white rounded-full py-4 font-bold text-sm shadow-lg hover:bg-[#3A1B63] transition-all hover:shadow-xl mb-5">
          UPGRADE TO PREMIUM
        </button>

        {/* Today's Schedule */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-5">
          <h2 className="font-bold text-gray-900 mb-4 text-base">Today&apos;s Schedule</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-start pb-4 border-b border-gray-100">
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-[#F0F1F2] rounded-full flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-base">Oil Change</p>
                  <p className="text-sm text-gray-500 mt-0.5">11:30 AM</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">Reschedulable</span>
            </div>
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-11 h-11 bg-[#F0F1F2] rounded-full flex items-center justify-center flex-shrink-0">
                  <ClockIcon className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-base">Tire Rotation</p>
                  <p className="text-sm text-gray-500 mt-0.5">2:00 PM</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">Reschedulable</span>
            </div>
          </div>
        </div>

        {/* Vehicle Health Overview */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-24">
          <h2 className="font-bold text-gray-900 mb-5 text-base">Vehicle Health Overview</h2>
          <div className="h-44 flex items-end justify-between gap-1.5">
            {[32, 52, 38, 48, 72, 58, 62, 88, 78].map((height, index) => (
              <div 
                key={index}
                className="flex-1 bg-gradient-to-t from-[#4A2B83] to-[#6B4BA3] rounded-t-md"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-gray-500">
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
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
        <div className="flex justify-around items-center h-16">
          <Link href="/client/dashboard" className="flex flex-col items-center justify-center gap-1 text-[#4A2B83] min-w-[60px]">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs font-semibold">Home</span>
          </Link>
          <Link href="/client/vehicles" className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-gray-600 min-w-[60px]">
            <TruckIcon className="w-6 h-6" />
            <span className="text-xs">Vehicles</span>
          </Link>
          <Link href="/client/appointments" className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-gray-600 min-w-[60px]">
            <ClockIcon className="w-6 h-6" />
            <span className="text-xs">Appointments</span>
          </Link>
          <Link href="/client/messages" className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-gray-600 min-w-[60px]">
            <ChatBubbleLeftIcon className="w-6 h-6" />
            <span className="text-xs">Messages</span>
          </Link>
          <Link href="/client/profile" className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-gray-600 min-w-[60px]">
            <UserIcon className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default ClientDashboard;