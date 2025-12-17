'use client';

import { ArrowLeftIcon, HomeIcon, ClockIcon, ChatBubbleLeftIcon, UserIcon, TruckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-[#F0F1F2] pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/client/dashboard">
              <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <ChatBubbleLeftIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Messages Yet</h2>
          <p className="text-gray-600">Your conversations with service centers will appear here.</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <Link href="/client/dashboard" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/client/vehicles" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <TruckIcon className="w-6 h-6" />
            <span className="text-xs">Vehicles</span>
          </Link>
          <Link href="/client/appointments" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <ClockIcon className="w-6 h-6" />
            <span className="text-xs">Appointments</span>
          </Link>
          <Link href="/client/messages" className="flex flex-col items-center gap-1 text-[#4A2B83]">
            <ChatBubbleLeftIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Messages</span>
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
