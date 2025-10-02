'use client';

import { Switch } from '@headlessui/react';
import { useTheme } from '@/context/ThemeContext';

interface SettingsPanelProps {
  notifications: {
    serviceReminders: boolean;
    urgentAlerts: boolean;
  };
  onToggleNotification: (type: 'serviceReminders' | 'urgentAlerts') => void;
  payments: {
    enabled: boolean;
  };
  onTogglePayments: () => void;
}

export default function SettingsPanel({
  notifications,
  onToggleNotification,
  payments,
  onTogglePayments,
}: SettingsPanelProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md divide-y divide-gray-200 dark:divide-gray-700">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 dark:text-white">Service Reminders</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Get notified about upcoming services
              </p>
            </div>
            <Switch
              checked={notifications.serviceReminders}
              onChange={() => onToggleNotification('serviceReminders')}
              className={`${
                notifications.serviceReminders ? 'bg-[#4A2B83]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  notifications.serviceReminders ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 dark:text-white">Urgent Alerts</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Important updates about your vehicle
              </p>
            </div>
            <Switch
              checked={notifications.urgentAlerts}
              onChange={() => onToggleNotification('urgentAlerts')}
              className={`${
                notifications.urgentAlerts ? 'bg-[#4A2B83]' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
            >
              <span
                className={`${
                  notifications.urgentAlerts ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-900 dark:text-white">Payment Options</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Enable online payments
            </p>
          </div>
          <Switch
            checked={payments.enabled}
            onChange={onTogglePayments}
            className={`${
              payments.enabled ? 'bg-[#4A2B83]' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                payments.enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-900 dark:text-white">Dark Mode</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Switch between light and dark themes
            </p>
          </div>
          <Switch
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className={`${
              theme === 'dark' ? 'bg-[#4A2B83]' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
          >
            <span
              className={`${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}