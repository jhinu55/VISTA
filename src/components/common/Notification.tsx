'use client';

import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';
import clsx from 'clsx';

export interface NotificationProps {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'urgent';
  timestamp: Date;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function Notification({
  id,
  title,
  message,
  type,
  timestamp,
  onClose,
  action
}: NotificationProps) {
  const { theme } = useTheme();

  const getTypeStyles = () => {
    switch (type) {
      case 'urgent':
        return 'bg-red-50 dark:bg-red-900/20 border-red-500';
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500';
      default:
        return 'bg-[#4A2B83]/10 dark:bg-[#4A2B83]/20 border-[#4A2B83]';
    }
  };

  return (
    <Transition
      as={Fragment}
      appear={true}
      show={true}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0"
      enterTo="translate-y-0 opacity-100"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={clsx(
          'max-w-sm w-full border-l-4 rounded-lg shadow-lg',
          'pointer-events-auto overflow-hidden',
          theme === 'dark' ? 'bg-gray-800' : 'bg-white',
          getTypeStyles()
        )}
      >
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-1">
              <p className={clsx(
                'text-sm font-medium',
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              )}>
                {title}
              </p>
              <p className={clsx(
                'mt-1 text-sm',
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              )}>
                {message}
              </p>
              {action && (
                <div className="mt-3">
                  <button
                    onClick={action.onClick}
                    className={clsx(
                      'text-sm font-medium text-[#4A2B83]',
                      'hover:text-[#3A1F73]'
                    )}
                  >
                    {action.label}
                  </button>
                </div>
              )}
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className={clsx(
                  'rounded-md inline-flex text-gray-400',
                  'hover:text-gray-500 focus:outline-none',
                  'focus:ring-2 focus:ring-[#4A2B83]'
                )}
                onClick={() => onClose(id)}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className={clsx(
          'border-t',
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        )}>
          <div className={clsx(
            'px-4 py-2 text-xs',
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          )}>
            {new Intl.DateTimeFormat('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true
            }).format(timestamp)}
          </div>
        </div>
      </div>
    </Transition>
  );
}