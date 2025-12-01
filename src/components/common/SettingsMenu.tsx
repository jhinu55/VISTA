'use client';

import { Fragment, useState } from 'react';
import { Menu, Transition, Switch } from '@headlessui/react';
import { 
  Cog6ToothIcon, 
  LanguageIcon, 
  MoonIcon, 
  SunIcon,
  BellIcon,
  ShieldCheckIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
];

export default function SettingsMenu() {
  const { theme, setTheme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    // In a real app, you'd integrate with i18n library here
    console.log('Language changed to:', code);
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="p-2 rounded-lg hover:bg-white/20 backdrop-blur-sm transition-colors">
        <Cog6ToothIcon className="w-6 h-6 text-white" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 z-50">
          {/* Header */}
          <div className="px-4 py-3">
            <p className="text-sm font-semibold text-gray-900">Settings</p>
          </div>

          {/* Language Selection */}
          <div className="p-2">
            <Menu as="div" className="relative">
              <Menu.Button className="w-full px-3 py-2 flex items-center gap-3 rounded-lg hover:bg-gray-50 transition-colors">
                <LanguageIcon className="w-5 h-5 text-gray-600" />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">Language</p>
                  <p className="text-xs text-gray-600">
                    {currentLanguage?.flag} {currentLanguage?.name}
                  </p>
                </div>
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute left-0 mt-1 w-full origin-top-left bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {languages.map((language) => (
                    <Menu.Item key={language.code}>
                      {({ active }) => (
                        <button
                          onClick={() => handleLanguageChange(language.code)}
                          className={`${
                            active ? 'bg-gray-50' : ''
                          } ${
                            selectedLanguage === language.code ? 'bg-purple-50 text-[#4A2B83]' : 'text-gray-900'
                          } group flex w-full items-center gap-2 px-3 py-2 text-sm first:rounded-t-lg last:rounded-b-lg`}
                        >
                          <span className="text-lg">{language.flag}</span>
                          <span className="font-medium">{language.name}</span>
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          {/* Theme Toggle */}
          <div className="p-2">
            <div className="px-3 py-2 flex items-center justify-between rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? (
                  <MoonIcon className="w-5 h-5 text-gray-600" />
                ) : (
                  <SunIcon className="w-5 h-5 text-gray-600" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">Theme</p>
                  <p className="text-xs text-gray-600">
                    {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                  </p>
                </div>
              </div>
              <Switch
                checked={theme === 'dark'}
                onChange={handleThemeToggle}
                className={`${
                  theme === 'dark' ? 'bg-[#4A2B83]' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A2B83] focus:ring-offset-2`}
              >
                <span
                  className={`${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>

          {/* Notifications Toggle */}
          <div className="p-2">
            <div className="px-3 py-2 flex items-center justify-between rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <BellIcon className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Notifications</p>
                  <p className="text-xs text-gray-600">
                    Push notifications
                  </p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled}
                onChange={setNotificationsEnabled}
                className={`${
                  notificationsEnabled ? 'bg-[#4A2B83]' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A2B83] focus:ring-offset-2`}
              >
                <span
                  className={`${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>

          {/* Auto Update Toggle */}
          <div className="p-2">
            <div className="px-3 py-2 flex items-center justify-between rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Auto Update</p>
                  <p className="text-xs text-gray-600">
                    Automatic app updates
                  </p>
                </div>
              </div>
              <Switch
                checked={autoUpdateEnabled}
                onChange={setAutoUpdateEnabled}
                className={`${
                  autoUpdateEnabled ? 'bg-[#4A2B83]' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#4A2B83] focus:ring-offset-2`}
              >
                <span
                  className={`${
                    autoUpdateEnabled ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>
          </div>

          {/* Help & Support */}
          <div className="p-2">
            <button className="w-full px-3 py-2 flex items-center gap-3 rounded-lg hover:bg-gray-50 transition-colors">
              <QuestionMarkCircleIcon className="w-5 h-5 text-gray-600" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">Help & Support</p>
                <p className="text-xs text-gray-600">Get help or contact us</p>
              </div>
            </button>
          </div>

          {/* App Version */}
          <div className="px-4 py-3">
            <p className="text-xs text-gray-500 text-center">
              VISTA v1.0.0
            </p>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
