'use client';

import Image from 'next/image';
import Link from 'next/link';

const ClientLandingPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between px-6 py-8 md:py-12">
      {/* Logo Section */}
      <div className="w-full flex flex-col items-center justify-center flex-grow max-w-2xl mx-auto">
        <div className="w-full max-w-md h-40 md:h-48 relative mb-6">
          <Image
            src="/vista-logo.png"
            alt="VISTA"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="drop-shadow-xl object-contain"
          />
        </div>

        <p className="text-gray-600 text-center mb-12 text-sm md:text-base">
          Your trusted vehicle repair tracking solution
        </p>

        {/* Primary Action Button */}
        <Link 
          href="/client/dashboard"
          className="w-full max-w-md bg-[#4A2B83] text-white rounded-full py-4 px-8 text-lg font-semibold text-center 
                   shadow-lg hover:bg-[#3a2266] active:transform active:scale-95 transition-all mb-6"
        >
          Track My Repair
        </Link>

        {/* Secondary Link */}
        <Link 
          href="/shop/login"
          className="text-[#4A2B83] hover:text-[#3a2266] text-sm underline underline-offset-4"
        >
          Are you a Repair Shop? Login here
        </Link>
      </div>

      {/* Footer */}
      <div className="w-full text-center text-sm text-gray-500 mt-8">
        © 2025 VISTA. All rights reserved.
      </div>
    </div>
  );
};

export default ClientLandingPage;