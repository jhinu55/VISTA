"use client";

import AppLayout from "@/components/AppLayout";
import { useRouter } from "next/navigation";
import {
  Car,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Wrench,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();

  // Featured vehicle data
  const featuredVehicles = [
    {
      id: 1,
      name: "Vehicle 001",
      status: "Healthy",
      speed: "65 mph",
      distance: "1,234 km",
      statusColor: "green",
      icon: CheckCircle,
    },
    {
      id: 2,
      name: "Vehicle 002",
      status: "Needs Attention",
      speed: "45 mph",
      distance: "892 km",
      statusColor: "orange",
      icon: AlertTriangle,
    },
  ];

  // Overall health data
  const healthyCount = 8;
  const attentionCount = 2;
  const totalVehicles = healthyCount + attentionCount;
  const healthPercentage = Math.round((healthyCount / totalVehicles) * 100);

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Monitor your fleet's health and performance
          </p>
        </div>

        {/* Featured Vehicles */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Featured Vehicles
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredVehicles.map((vehicle) => {
              const StatusIcon = vehicle.icon;
              return (
                <div
                  key={vehicle.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {vehicle.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <StatusIcon
                          className={`w-4 h-4 ${
                            vehicle.statusColor === "green"
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            vehicle.statusColor === "green"
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </div>
                    </div>
                    <Car className="w-8 h-8 text-navy-600" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Speed</p>
                      <p className="text-base font-semibold text-gray-900">
                        {vehicle.speed}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Distance</p>
                      <p className="text-base font-semibold text-gray-900">
                        {vehicle.distance}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Overall Health Status */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Overall Health Status
          </h2>
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Healthy
                </span>
                <span className="text-sm font-semibold text-green-600">
                  {healthyCount} vehicles
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-500"
                  style={{ width: `${healthPercentage}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Needs Attention
                </span>
                <span className="text-sm font-semibold text-orange-600">
                  {attentionCount} vehicles
                </span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 transition-all duration-500"
                  style={{
                    width: `${Math.round(
                      (attentionCount / totalVehicles) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push("/ai-insights")}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left group"
            >
              <div className="bg-navy-100 rounded-full w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-navy-200 transition-colors">
                <TrendingUp className="w-6 h-6 text-navy-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">AI Insights</h3>
              <p className="text-sm text-gray-600">View predictive analytics</p>
            </button>

            <button
              onClick={() => router.push("/schedule")}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left group"
            >
              <div className="bg-navy-100 rounded-full w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-navy-200 transition-colors">
                <Calendar className="w-6 h-6 text-navy-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Schedule</h3>
              <p className="text-sm text-gray-600">Maintenance calendar</p>
            </button>

            <button
              onClick={() => router.push("/vehicles")}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left group"
            >
              <div className="bg-navy-100 rounded-full w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-navy-200 transition-colors">
                <Car className="w-6 h-6 text-navy-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Track Vehicles</h3>
              <p className="text-sm text-gray-600">Monitor fleet status</p>
            </button>

            <button
              onClick={() => router.push("/vehicles")}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left group"
            >
              <div className="bg-navy-100 rounded-full w-12 h-12 flex items-center justify-center mb-3 group-hover:bg-navy-200 transition-colors">
                <Wrench className="w-6 h-6 text-navy-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Maintenance</h3>
              <p className="text-sm text-gray-600">Service history</p>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
