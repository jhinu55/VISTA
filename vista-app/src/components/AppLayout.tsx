"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Calendar,
  Sparkles,
  Home,
  TrendingUp,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: LayoutProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/vehicles", label: "Track", icon: Car },
    { href: "/schedule", label: "Schedule", icon: Calendar },
    { href: "/ai-insights", label: "Insights", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                VISTA
              </span>
              <Car className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
            </div>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-purple-800 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="font-medium text-sm lg:text-base">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-800 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-2xl">
        <div className="flex justify-around items-center py-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 min-w-[64px] rounded-xl transition-all ${
                  isActive ? "bg-purple-50" : ""
                }`}
              >
                <div
                  className={`p-1.5 rounded-lg transition-all ${
                    isActive ? "bg-purple-800" : "bg-transparent"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-purple-900" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="pb-20 md:pb-8">{children}</main>
    </div>
  );
}
