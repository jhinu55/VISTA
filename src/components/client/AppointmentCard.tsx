'use client';

import Link from 'next/link';

interface AppointmentCardProps {
  appointment: {
    id: number;
    date: string;
    time: string;
    location: string;
    service: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    vehicle?: {
      make: string;
      model: string;
      year: number;
    };
  };
  onReschedule: (id: number) => void;
  onCancel: (id: number) => void;
}

const AppointmentCard = ({ 
  appointment,
  onReschedule,
  onCancel
}: AppointmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-purple-100 text-[#4A2B83]';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <Link href={`/client/appointments/${appointment.id}`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium">
                {appointment.date} • {appointment.time}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(appointment.status)}`}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-slate-800">{appointment.location}</p>
            {appointment.vehicle && (
              <p className="text-sm text-slate-800 mt-1">
                {appointment.vehicle.year} {appointment.vehicle.make} {appointment.vehicle.model}
              </p>
            )}
            <p className="text-sm font-medium mt-2 text-slate-800">{appointment.service}</p>
          </div>
          {appointment.status === 'scheduled' && (
            <button 
              onClick={(e) => {
                e.preventDefault();
                onReschedule(appointment.id);
              }}
              className="text-[#4A2B83] text-sm font-medium"
            >
              Reschedule
            </button>
          )}
        </div>
      </Link>
      {appointment.status === 'scheduled' && (
        <button 
          onClick={() => onCancel(appointment.id)}
          className="w-full py-2 mt-3 border border-gray-300 rounded-full text-sm font-medium text-slate-800"
        >
          Cancel
        </button>
      )}
    </div>
  );
};

export default AppointmentCard;