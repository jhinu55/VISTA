'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ProfileCardProps {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  onEditProfile: () => void;
}

export default function ProfileCard({
  name,
  email,
  phone,
  address,
  profileImage,
  onEditProfile,
}: ProfileCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {profileImage ? (
            <Image
              src={profileImage}
              alt={name}
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <UserCircleIcon className="w-16 h-16 text-gray-400" />
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">{email}</p>
            {phone && <p className="text-sm text-gray-600 dark:text-gray-300">{phone}</p>}
          </div>
        </div>
        <button
          onClick={onEditProfile}
          className="px-4 py-2 text-sm font-medium text-[#4A2B83] border border-[#4A2B83] rounded-lg hover:bg-[#4A2B83] hover:text-white transition-colors"
        >
          Edit Profile
        </button>
      </div>
      {address && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">{address}</p>
        </div>
      )}
    </div>
  );
}