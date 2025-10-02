'use client';

import { ArrowLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';
import Calendar from '@/components/client/Calendar';
import AppointmentCard from '@/components/client/AppointmentCard';

const AppointmentsPage = () => {
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const currentDate = new Date();

  // Sample upcoming appointments data
  const upcomingAppointments = [
    {
      id: 1,
      date: 'WED, DEC 1',
      time: '10:00 AM',
      location: 'Repair Shop: Maintenance Center 3',
      service: 'Oil Change & Filter',
      status: 'scheduled',
      vehicle: {
        make: 'Toyota',
        model: 'Camry',
        year: 2022
      }
    },
    {
      id: 2,
      date: 'WED, DEC 1',
      time: '10:00 AM',
      location: 'Repair Shop: Maintenance Center 3',
      service: 'General Maintenance',
      status: 'scheduled',
      vehicle: {
        make: 'Honda',
        model: 'Accord',
        year: 2023
      }
    }
  ];

  // Sample suggested slots
  const suggestedSlots = [
    { date: 'FRI, DEC 3', time: '9:00 AM' },
    { date: 'FRI, DEC 8', time: '9:30 AM' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/client/dashboard">
            <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-800">Appointments</h1>
        </div>
        <button>
          <Cog6ToothIcon className="w-6 h-6 text-gray-700" />
        </button>
      </header>

      {/* View Toggle */}
      <div className="p-4 flex justify-center gap-4">
        <button 
          onClick={() => setViewMode('month')}
          className={clsx(
            'px-4 py-2 rounded-full text-sm font-medium',
            viewMode === 'month' 
              ? 'bg-[#4A2B83] text-white' 
              : 'bg-gray-200 text-gray-600'
          )}
        >
          Month
        </button>
        <button 
          onClick={() => setViewMode('week')}
          className={clsx(
            'px-4 py-2 rounded-full text-sm font-medium',
            viewMode === 'week' 
              ? 'bg-[#4A2B83] text-white' 
              : 'bg-gray-200 text-gray-600'
          )}
        >
          Week
        </button>
      </div>

      {/* Calendar Section */}
      <div className="p-4">
        <div className="text-sm text-slate-800 mb-2">
          {currentDate.toLocaleDateString('en-US', { 
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          }).toUpperCase()}
        </div>
        <Calendar 
          mode={viewMode}
          onDaySelect={(date) => {
            // Handle day selection
          }}
          appointments={[
            { date: new Date(2025, 11, 1), type: 'Oil Change' },
            { date: new Date(2025, 11, 1), type: 'General Maintenance' },
          ]}
        />

        {/* Upcoming Appointments */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-800">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onReschedule={(id) => {
                  // Handle reschedule
                  console.log('Reschedule appointment:', id);
                }}
                onCancel={(id) => {
                  // Handle cancel
                  console.log('Cancel appointment:', id);
                }}
              />
            ))}
          </div>
        </div>

        {/* Suggested Slots */}
        <div className="mb-20">
          <h2 className="text-lg font-semibold mb-4 text-slate-800">Suggested Slots</h2>
          <p className="text-sm text-slate-800 mb-4">AI recommended</p>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {suggestedSlots.map((slot, index) => (
              <button 
                key={index}
                className="flex-shrink-0 px-4 py-2 border border-[#4A2B83] rounded-full text-sm font-medium text-[#4A2B83]"
              >
                {slot.date} • {slot.time}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Action Button */}
        <Link 
          href="/client/appointments/book" 
          className="fixed bottom-20 right-4 w-14 h-14 bg-[#4A2B83] rounded-full flex items-center justify-center shadow-lg"
        >
          <span className="text-white text-2xl">+</span>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentsPage;