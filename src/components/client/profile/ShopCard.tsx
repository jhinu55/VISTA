'use client';

import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface ShopCardProps {
  name: string;
  address: string;
  phone: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onBookService: () => void;
}

export default function ShopCard({
  name,
  address,
  phone,
  isFavorite,
  onToggleFavorite,
  onBookService,
}: ShopCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">{name}</h3>
            <button onClick={onToggleFavorite}>
              {isFavorite ? (
                <StarIconSolid className="w-5 h-5 text-[#4A2B83]" />
              ) : (
                <StarIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
          </div>
          <p className="text-sm text-gray-600">{address}</p>
          <p className="text-sm text-gray-600">{phone}</p>
        </div>
        <button
          onClick={onBookService}
          className="px-4 py-2 text-sm font-medium text-white bg-[#4A2B83] rounded-lg hover:bg-[#4A2B83]/90 transition-colors"
        >
          Book Service
        </button>
      </div>
    </div>
  );
}