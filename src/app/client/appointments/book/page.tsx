'use client';

import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
}

interface ServiceType {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
}

const BookServicePage = () => {
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Sample data - replace with real data from your backend
  const vehicles: Vehicle[] = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2022, licensePlate: 'ABC123' },
    { id: 2, make: 'Honda', model: 'Accord', year: 2023, licensePlate: 'XYZ789' },
  ];

  const services: ServiceType[] = [
    { 
      id: 1, 
      name: 'Oil Change', 
      description: 'Full synthetic oil change with filter replacement',
      duration: '45 mins',
      price: '$89.99'
    },
    { 
      id: 2, 
      name: 'Tire Rotation', 
      description: 'Complete tire rotation and balance',
      duration: '30 mins',
      price: '$49.99'
    },
    {
      id: 3,
      name: 'AI Recommended Service',
      description: 'Based on your vehicle\'s telemetry data',
      duration: '60 mins',
      price: 'Varies'
    }
  ];

  const availableSlots = [
    { date: 'FRI, DEC 3', time: '9:00 AM', isRecommended: true },
    { date: 'FRI, DEC 3', time: '11:00 AM', isRecommended: false },
    { date: 'FRI, DEC 8', time: '9:30 AM', isRecommended: true },
    { date: 'FRI, DEC 8', time: '2:00 PM', isRecommended: false },
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Select Vehicle</h2>
            {vehicles.map((vehicle) => (
              <button
                key={vehicle.id}
                onClick={() => {
                  setSelectedVehicle(vehicle.id);
                  setStep(2);
                }}
                className={clsx(
                  'w-full bg-white rounded-xl p-4 text-left shadow-sm',
                  selectedVehicle === vehicle.id && 'ring-2 ring-[#4A2B83]'
                )}
              >
                <h3 className="font-medium">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  License Plate: {vehicle.licensePlate}
                </p>
              </button>
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Choose Service</h2>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service.id);
                  setStep(3);
                }}
                className={clsx(
                  'w-full bg-white rounded-xl p-4 text-left shadow-sm',
                  selectedService === service.id && 'ring-2 ring-[#4A2B83]'
                )}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {service.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{service.price}</p>
                    <p className="text-sm text-gray-600">{service.duration}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Select Time Slot</h2>
            <p className="text-sm text-gray-600 mb-4">AI recommended slots based on shop availability and your vehicle's needs:</p>
            {availableSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedSlot(`${slot.date} ${slot.time}`);
                  setStep(4);
                }}
                className={clsx(
                  'w-full bg-white rounded-xl p-4 text-left shadow-sm',
                  selectedSlot === `${slot.date} ${slot.time}` && 'ring-2 ring-[#4A2B83]',
                  slot.isRecommended && 'border-2 border-[#4A2B83]'
                )}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{slot.date}</h3>
                    <p className="text-sm text-gray-600">{slot.time}</p>
                  </div>
                  {slot.isRecommended && (
                    <span className="text-xs text-[#4A2B83] bg-purple-50 px-2 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        );

      case 4:
        const vehicle = vehicles.find(v => v.id === selectedVehicle);
        const service = services.find(s => s.id === selectedService);
        
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">Confirm Booking</h2>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-medium mb-2">Vehicle</h3>
              <p className="text-sm text-gray-600">
                {vehicle?.year} {vehicle?.make} {vehicle?.model}
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-medium mb-2">Service</h3>
              <p className="text-sm text-gray-600">{service?.name}</p>
              <p className="text-sm text-gray-600 mt-1">{service?.description}</p>
              <div className="flex justify-between mt-2 text-sm">
                <span>Duration</span>
                <span className="font-medium">{service?.duration}</span>
              </div>
              <div className="flex justify-between mt-1 text-sm">
                <span>Price</span>
                <span className="font-medium">{service?.price}</span>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm">
              <h3 className="font-medium mb-2">Time</h3>
              <p className="text-sm text-gray-600">{selectedSlot}</p>
            </div>

            <button 
              onClick={() => {
                // Handle booking confirmation
                console.log('Booking confirmed:', {
                  vehicleId: selectedVehicle,
                  serviceId: selectedService,
                  timeSlot: selectedSlot
                });
              }}
              className="w-full bg-[#4A2B83] text-white rounded-full py-3 font-medium"
            >
              Confirm Booking
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/client/appointments">
            <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
          </Link>
          <h1 className="text-xl font-semibold">Book Service</h1>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="px-4 py-6">
        <div className="flex justify-between mb-8">
          {['Vehicle', 'Service', 'Time', 'Confirm'].map((label, index) => (
            <div 
              key={index}
              className="flex flex-col items-center"
            >
              <div 
                className={clsx(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mb-2',
                  step > index + 1 && 'bg-[#4A2B83] text-white',
                  step === index + 1 && 'bg-purple-100 text-[#4A2B83] ring-2 ring-[#4A2B83]',
                  step < index + 1 && 'bg-gray-100 text-gray-400'
                )}
              >
                {index + 1}
              </div>
              <span className={clsx(
                'text-xs',
                step >= index + 1 ? 'text-[#4A2B83]' : 'text-gray-400'
              )}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mb-20">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default BookServicePage;