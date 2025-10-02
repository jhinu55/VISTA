'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import clsx from 'clsx';

interface FloatingActionButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export default function FloatingActionButton({ 
  href, 
  icon, 
  label 
}: FloatingActionButtonProps) {
  const { theme } = useTheme();

  return (
    <Link
      href={href}
      className={clsx(
        'fixed bottom-20 right-4 z-50',
        'w-14 h-14 rounded-full shadow-lg',
        'flex items-center justify-center',
        'bg-[#4A2B83] hover:bg-[#3A1F73]',
        'transition-transform duration-200 hover:scale-105',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4A2B83]',
        theme === 'dark' && 'focus:ring-offset-gray-900'
      )}
      aria-label={label}
    >
      <div className="w-6 h-6 text-white">
        {icon}
      </div>
    </Link>
  );
}