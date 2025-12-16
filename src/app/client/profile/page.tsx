'use client';

import { useState } from 'react';
import ProfileCard from '@/components/client/profile/ProfileCard';
import VehicleCard from '@/components/client/profile/VehicleCard';
import ShopCard from '@/components/client/profile/ShopCard';
import SettingsPanel from '@/components/client/profile/SettingsPanel';
import SettingsMenu from '@/components/common/SettingsMenu';
import { ChevronLeftIcon, HomeIcon, ClockIcon, ChatBubbleLeftIcon, UserIcon, TruckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function ProfilePage() {
  // Sample data - replace with actual data fetching
  const [notifications, setNotifications] = useState({
    serviceReminders: true,
    urgentAlerts: false,
  });

  const [payments, setPayments] = useState({
    enabled: false,
  });

  const vehicles = [
    {
      id: '1',
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      mileage: '35,000 mi',
      status: 'Healthy',
    },
    {
      id: '2',
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      mileage: '35,000 mi',
      status: 'Service Due',
    },
  ];

  const shops = [
    {
      id: '1',
      name: 'Maintenance Center 3',
      address: '123 Workshop Lane',
      phone: '0120 5067 56 9988',
      isFavorite: true,
    },
  ];

  const handleToggleNotification = (type: 'serviceReminders' | 'urgentAlerts') => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleTogglePayments = () => {
    setPayments((prev) => ({
      enabled: !prev.enabled,
    }));
  };

  return (
    <div className="min-h-screen bg-[#F0F1F2]">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/client/dashboard">
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
        </div>
        <SettingsMenu />
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <ProfileCard
          name="Jane Doe"
          email="janedoe@email.com"
          phone="Add: 7% 5400%"
          onEditProfile={() => {
            // Handle edit profile
          }}
        />

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Vehicles
          </h2>
          <div className="space-y-4">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicleId={vehicle.id}
                make={vehicle.make}
                model={vehicle.model}
                year={vehicle.year}
                mileage={vehicle.mileage}
                status={vehicle.status as 'Healthy' | 'Service Due'}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Favorite Repair Shops
          </h2>
          <div className="space-y-4">
            {shops.map((shop) => (
              <ShopCard
                key={shop.id}
                name={shop.name}
                address={shop.address}
                phone={shop.phone}
                isFavorite={shop.isFavorite}
                onToggleFavorite={() => {
                  // Handle toggle favorite
                }}
                onBookService={() => {
                  // Handle book service
                }}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Settings
          </h2>
          <SettingsPanel
            notifications={notifications}
            onToggleNotification={handleToggleNotification}
            payments={payments}
            onTogglePayments={handleTogglePayments}
          />
        </section>
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
          <Link href="/client/messages" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600">
            <ChatBubbleLeftIcon className="w-6 h-6" />
            <span className="text-xs">Messages</span>
          </Link>
          <Link href="/client/profile" className="flex flex-col items-center gap-1 text-[#4A2B83]">
            <UserIcon className="w-6 h-6" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}