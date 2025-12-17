"use client";

import AppLayout from "@/components/AppLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Prediction } from "@/types";
import {
  Car,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Calendar,
  Wrench,
  Activity,
  Zap,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [alertCounts, setAlertCounts] = useState({
    critical: 0,
    high: 0,
    warning: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch("/api/predictions");
        const data = await res.json();
        const predictions = Array.isArray(data?.predictions)
          ? data.predictions
          : Array.isArray(data)
          ? data
          : [];

        const critical = predictions.filter(
          (p: Prediction) => p.severity === "CRITICAL"
        ).length;
        const high = predictions.filter(
          (p: Prediction) => p.severity === "HIGH"
        ).length;
        const warning = predictions.filter(
          (p: Prediction) => p.severity === "WARNING"
        ).length;

        setAlertCounts({
          critical,
          high,
          warning,
          total: predictions.length,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching alerts:", error);
        setLoading(false);
      }
    }
    fetchAlerts();
  }, []);

  // Featured vehicle data
  const featuredVehicles = [
    {
      id: 1,
      name: "Toyota Camry",
      model: "Camry XLE 2020",
      status: "Healthy",
      speed: "65 mph",
      mileage: "45,320 km",
      statusColor: "green",
      icon: CheckCircle,
      imageUrl:
        "https://images.91wheels.com/assets/b_images/main/models/profile/profile1743676820.jpg?w=840&q=50",
    },
    {
      id: 2,
      name: "Tesla Model 3",
      model: "Long Range 2022",
      status: "Needs Attention",
      speed: "45 mph",
      mileage: "28,500 km",
      statusColor: "orange",
      icon: AlertTriangle,
      imageUrl: "https://imgd.aeplcdn.com/1056x594/n/lnk9cva_1595893.jpg?q=80",
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Featured Vehicles
            </h2>
            <button className="text-sm font-medium text-purple-800 hover:text-purple-900 flex items-center gap-1">
              View All
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featuredVehicles.map((vehicle) => {
              const StatusIcon = vehicle.icon;
              return (
                <div
                  key={vehicle.id}
                  className="group bg-white border border-gray-200 rounded-2xl p-3 hover:shadow-lg hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer"
                  onClick={() => router.push(`/vehicles/${vehicle.id}`)}
                >
                  {/* Car Image - Square */}
                  <div className="mb-3 relative overflow-hidden aspect-square w-full max-w-[200px] md:max-w-[180px] mx-auto flex items-center justify-center">
                    <img
                      src={vehicle.imageUrl}
                      alt={vehicle.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Vehicle Info */}
                  <div className="mb-3">
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-purple-800 transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {vehicle.model}
                      </p>
                      <div
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
                          vehicle.statusColor === "green"
                            ? "bg-green-50 border border-green-200"
                            : "bg-orange-50 border border-orange-200"
                        }`}
                      >
                        <StatusIcon
                          className={`w-3 h-3 ${
                            vehicle.statusColor === "green"
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        />
                        <span
                          className={`text-[10px] font-semibold ${
                            vehicle.statusColor === "green"
                              ? "text-green-700"
                              : "text-orange-700"
                          }`}
                        >
                          {vehicle.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-purple-50 rounded-lg p-2 group-hover:bg-purple-100 transition-colors">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Activity className="w-3 h-3 text-purple-700" />
                        <p className="text-[10px] font-medium text-gray-600">
                          Speed
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        {vehicle.speed}
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-2 group-hover:bg-purple-100 transition-colors">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Zap className="w-3 h-3 text-purple-700" />
                        <p className="text-[10px] font-medium text-gray-600">
                          Mileage
                        </p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        {vehicle.mileage}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Alerts Summary */}
        <div className="mb-8">
          <div className="bg-white border border-purple-100 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-800 rounded-lg p-2.5">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">
                    System Alerts
                  </h2>
                  {loading ? (
                    <p className="text-sm text-gray-600">Loading...</p>
                  ) : alertCounts.total === 0 ? (
                    <p className="text-sm text-green-600 font-medium">
                      All systems normal
                    </p>
                  ) : (
                    <div className="flex items-center gap-3 mt-1">
                      {alertCounts.critical > 0 && (
                        <span className="text-xs text-red-600 font-semibold">
                          {alertCounts.critical} Critical
                        </span>
                      )}
                      {alertCounts.high > 0 && (
                        <span className="text-xs text-orange-600 font-semibold">
                          {alertCounts.high} High
                        </span>
                      )}
                      {alertCounts.warning > 0 && (
                        <span className="text-xs text-yellow-600 font-semibold">
                          {alertCounts.warning} Warning
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {!loading && alertCounts.total > 0 && (
                <button
                  onClick={() => router.push("/vehicles")}
                  className="flex items-center gap-1.5 px-4 py-2 bg-purple-800 text-white text-sm font-medium rounded-lg hover:bg-purple-900 transition-colors"
                >
                  View Details
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Overall Health Status */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Overall Health Status
          </h2>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Healthy
                </span>
                <span className="text-sm font-semibold text-green-600">
                  {healthyCount} vehicles
                </span>
              </div>
              <div className="w-full h-4 bg-purple-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-purple-700 to-purple-800 transition-all duration-500 rounded-full"
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
              <div className="w-full h-4 bg-purple-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-purple-700 transition-all duration-500 rounded-full"
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
          <div className="grid grid-cols-2 gap-5">
            <button
              onClick={() => router.push("/ai-insights")}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-navy-300 hover:bg-navy-50 hover:-translate-y-1 transition-all text-left group"
            >
              <div className="bg-gradient-to-br from-navy-700 to-navy-800 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5 text-base group-hover:text-navy-800">
                AI Insights
              </h3>
              <p className="text-sm text-gray-600">View predictive analytics</p>
            </button>

            <button
              onClick={() => router.push("/schedule")}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-navy-300 hover:bg-navy-50 hover:-translate-y-1 transition-all text-left group"
            >
              <div className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5 text-base group-hover:text-navy-800">
                Schedule
              </h3>
              <p className="text-sm text-gray-600">Maintenance calendar</p>
            </button>

            <button
              onClick={() => router.push("/vehicles")}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-navy-300 hover:bg-navy-50 hover:-translate-y-1 transition-all text-left group"
            >
              <div className="bg-gradient-to-br from-navy-600 to-navy-800 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Car className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5 text-base group-hover:text-navy-800">
                Track Vehicles
              </h3>
              <p className="text-sm text-gray-600">Monitor fleet status</p>
            </button>

            <button
              onClick={() => router.push("/vehicles")}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-navy-300 hover:bg-navy-50 hover:-translate-y-1 transition-all text-left group"
            >
              <div className="bg-gradient-to-br from-navy-700 to-navy-800 rounded-xl w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1.5 text-base group-hover:text-navy-800">
                Maintenance
              </h3>
              <p className="text-sm text-gray-600">Service history</p>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
