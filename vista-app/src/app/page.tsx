"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Car, LayoutDashboard, Calendar, Sparkles } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-navy-800 rounded-2xl p-4 shadow-medium">
              <Car className="w-16 h-16 text-white" />
            </div>
          </div>
          <h1 className="text-7xl font-bold text-gray-900 mb-4">VISTA</h1>
          <p className="text-2xl text-gray-700 mb-4 font-medium">
            Vehicle Intelligence System for Telematics & Analytics
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            AI-powered predictive maintenance and real-time vehicle health
            monitoring
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-medium transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-navy-800 rounded-2xl p-4 mb-4 group-hover:bg-navy-900 transition-all shadow-soft">
                <LayoutDashboard className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Dashboard
              </h2>
              <p className="text-gray-600 text-sm">
                Monitor alerts, health metrics, and vehicle status
              </p>
            </div>
          </button>

          <button
            onClick={() => router.push("/vehicles")}
            className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-medium transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-navy-800 rounded-2xl p-4 mb-4 group-hover:bg-navy-900 transition-all shadow-soft">
                <Car className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Vehicles</h2>
              <p className="text-gray-600 text-sm">
                View detailed vehicle diagnostics and history
              </p>
            </div>
          </button>

          <button
            onClick={() => router.push("/schedule")}
            className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-medium transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-navy-800 rounded-2xl p-4 mb-4 group-hover:bg-navy-900 transition-all shadow-soft">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Schedule</h2>
              <p className="text-gray-600 text-sm">
                Book service appointments and manage slots
              </p>
            </div>
          </button>

          <button
            onClick={() => router.push("/ai-insights")}
            className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-medium transition-all duration-300 hover:scale-105 group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-navy-800 rounded-2xl p-4 mb-4 group-hover:bg-navy-900 transition-all shadow-soft">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                AI Insights
              </h2>
              <p className="text-gray-600 text-sm">
                AI-powered recommendations and predictions
              </p>
            </div>
          </button>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Key Features
            </h3>
            <ul className="grid md:grid-cols-2 gap-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-navy-800 mr-3 text-xl">✓</span>
                <span>Real-time anomaly detection using ML</span>
              </li>
              <li className="flex items-start">
                <span className="text-navy-800 mr-3 text-xl">✓</span>
                <span>Multi-sensor correlation analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-navy-800 mr-3 text-xl">✓</span>
                <span>Predictive maintenance alerts</span>
              </li>
              <li className="flex items-start">
                <span className="text-navy-800 mr-3 text-xl">✓</span>
                <span>Intelligent appointment scheduling</span>
              </li>
              <li className="flex items-start">
                <span className="text-navy-800 mr-3 text-xl">✓</span>
                <span>Comprehensive health tracking</span>
              </li>
              <li className="flex items-start">
                <span className="text-navy-800 mr-3 text-xl">✓</span>
                <span>AI-driven recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
