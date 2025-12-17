'use client';

import { ArrowLeftIcon, Cog6ToothIcon, HomeIcon, ClockIcon, ChatBubbleLeftIcon, UserIcon, TruckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';
import Calendar from '@/components/client/Calendar';
import AppointmentCard from '@/components/client/AppointmentCard';
import { mockAppointments } from '@/lib/mockData';

const AppointmentsPage = () => {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const currentDate = new Date();

  const upcomingAppointments = mockAppointments.filter(a => a.status === 'scheduled');
  const pastAppointments = mockAppointments.filter(a => a.status !== 'scheduled');

  const handleReschedule = (id: number) => {
    console.log('Reschedule appointment:', id);
    // In a real app, this would open a modal or navigate to a rescheduling page
  };

  const handleCancel = (id: number) => {
    console.log('Cancel appointment:', id);
    // In a real app, this would show a confirmation dialog
  };

  return (
    <div className="min-h-screen bg-[#F0F1F2] pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link href="/client/dashboard">
                <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            </div>
            <Cog6ToothIcon className="w-6 h-6 text-gray-700 cursor-pointer" />
          </div>

          {/* View Toggle */}
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setViewMode('month')}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                viewMode === 'month' 
                  ? 'bg-[#4A2B83] text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              )}
            >
              Month
            </button>
            <button 
              onClick={() => setViewMode('week')}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                viewMode === 'week' 
                  ? 'bg-[#4A2B83] text-white' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              )}
            >
              Week
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 max-w-7xl mx-auto">
        {/* Calendar Section */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
          <div className="text-sm text-gray-600 mb-4">
            {currentDate.toLocaleDateString('en-US', { 
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            }).toUpperCase()}
          </div>
          <Calendar 
            mode={viewMode}
            onDaySelect={(date) => {
              console.log('Selected date:', date);
            }}
            appointments={upcomingAppointments.map(apt => ({
              date: new Date(),
              type: apt.service
            }))}
          />
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onReschedule={handleReschedule}
                onCancel={handleCancel}
              />
            ))}
          </div>
        </div>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Past Appointments</h2>
            <div className="space-y-4">
              {pastAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onReschedule={handleReschedule}
                  onCancel={handleCancel}
                />
              ))}
            </div>
          </div>
        )}

        {/* Book New Appointment Button */}
        <Link href="/client/appointments/book">
          <button className="w-full md:w-auto bg-[#4A2B83] text-white rounded-full py-4 px-8 font-semibold hover:bg-[#3A1B63] transition-colors shadow-lg">
            + Book New Appointment
          </button>
        </Link>
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
          <Link href="/client/appointments" className="flex flex-col items-center gap-1 text-[#4A2B83]">
            <ClockIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Appointments</span>
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

export default AppointmentsPage;