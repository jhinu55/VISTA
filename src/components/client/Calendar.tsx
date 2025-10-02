'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

interface CalendarProps {
  mode: 'month' | 'week';
  onDaySelect: (date: Date) => void;
  appointments?: Array<{
    date: Date;
    type: string;
  }>;
}

const Calendar = ({ mode, onDaySelect, appointments = [] }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);

  useEffect(() => {
    const days = generateCalendarDays(currentDate, mode);
    setCalendarDays(days);
  }, [currentDate, mode]);

  const generateCalendarDays = (date: Date, viewMode: 'month' | 'week'): Date[] => {
    const days: Date[] = [];
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    
    if (viewMode === 'month') {
      // Start from the first day of the week containing the first day of the month
      const startDay = start.getDay();
      start.setDate(start.getDate() - (startDay === 0 ? 6 : startDay - 1));
      
      // Generate 42 days (6 weeks) to ensure we cover the full month view
      for (let i = 0; i < 42; i++) {
        days.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }
    } else {
      // Week view - start from Monday of the current week
      const current = new Date(date);
      const dayOfWeek = current.getDay();
      current.setDate(current.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
      
      // Generate 7 days for the week view
      for (let i = 0; i < 7; i++) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    }

    return days;
  };

  const hasAppointment = (date: Date) => {
    return appointments.some(app => 
      app.date.getDate() === date.getDate() &&
      app.date.getMonth() === date.getMonth() &&
      app.date.getFullYear() === date.getFullYear()
    );
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      {/* Month/Year Header */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => {
            const newDate = new Date(currentDate);
            mode === 'month' 
              ? newDate.setMonth(currentDate.getMonth() - 1)
              : newDate.setDate(currentDate.getDate() - 7);
            setCurrentDate(newDate);
          }}
          className="p-2 text-gray-600 hover:text-[#4A2B83]"
        >
          &lt;
        </button>
        <h3 className="font-medium">
          {currentDate.toLocaleString('default', { 
            month: 'long',
            year: 'numeric'
          })}
        </h3>
        <button 
          onClick={() => {
            const newDate = new Date(currentDate);
            mode === 'month' 
              ? newDate.setMonth(currentDate.getMonth() + 1)
              : newDate.setDate(currentDate.getDate() + 7);
            setCurrentDate(newDate);
          }}
          className="p-2 text-gray-600 hover:text-[#4A2B83]"
        >
          &gt;
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Weekday Headers */}
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
          <div key={day} className="text-center text-xs text-gray-500 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {calendarDays.map((date, index) => (
          <button
            key={index}
            onClick={() => onDaySelect(date)}
            disabled={isPastDate(date)}
            className={clsx(
              'aspect-square flex flex-col items-center justify-center p-1 rounded-lg relative',
              isToday(date) && 'bg-[#4A2B83] text-white',
              !isToday(date) && !isPastDate(date) && 'hover:bg-purple-50',
              isPastDate(date) && 'text-gray-300',
              !isCurrentMonth(date) && mode === 'month' && 'text-gray-300',
            )}
          >
            <span className="text-sm">
              {date.getDate()}
            </span>
            {hasAppointment(date) && (
              <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#4A2B83]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;