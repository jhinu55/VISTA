'use client';

import { ArrowLeftIcon, ShareIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const AppointmentDetailsPage = () => {
  // This would come from your data source
  const appointment = {
    id: 1,
    date: 'OCTOBER 18',
    startTime: '10:00',
    endTime: '11:30',
    provider: 'Maintenance Center 3 USA',
    type: 'Vehicle Maintenance',
    status: 'scheduled',
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
    },
    services: [
      'Oil Change',
      'Tire Rotation',
      'Brake Inspection'
    ],
    notes: 'Regular maintenance service',
    estimatedCost: '$120.00',
    duration: '90 minutes'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/client/appointments">
            <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-xl font-semibold">Service Details</h1>
        </div>
        <button>
          <ShareIcon className="w-6 h-6 text-gray-700" />
        </button>
      </header>

      <div className="p-4 space-y-6">
        {/* Service Banner */}
        <div className="relative h-48 rounded-xl overflow-hidden">
          <Image
            src="/workshop.jpg"
            alt="Workshop"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-end">
            <h2 className="text-white text-2xl font-bold">
              {appointment.date}
            </h2>
            <p className="text-white">
              {appointment.startTime} - {appointment.endTime}
            </p>
          </div>
        </div>

        {/* Service Provider */}
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Service Provider</h3>
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">🚗</span>
              <p className="font-medium">{appointment.provider}</p>
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Vehicle</h3>
          <div className="bg-white rounded-xl p-4">
            <p className="font-medium">
              {appointment.vehicle.year} {appointment.vehicle.make} {appointment.vehicle.model}
            </p>
          </div>
        </div>

        {/* Service Details */}
        <div>
          <h3 className="text-sm text-gray-500 mb-2">Service Details</h3>
          <div className="bg-white rounded-xl p-4">
            <h4 className="font-medium mb-2">{appointment.type}</h4>
            <ul className="space-y-2">
              {appointment.services.map((service, index) => (
                <li key={index} className="text-sm text-gray-600">
                  • {service}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Estimated Cost</span>
                <span className="font-medium">{appointment.estimatedCost}</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium">{appointment.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {appointment.status === 'scheduled' && (
          <div className="flex gap-3">
            <button className="flex-1 bg-[#4A2B83] text-white rounded-full py-3 font-medium">
              Edit
            </button>
            <button className="flex-1 border border-gray-300 rounded-full py-3 font-medium text-gray-700">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetailsPage;