"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import VehicleCard from "@/components/VehicleCard";
import { Prediction, Vehicle } from "@/types";
import { Search, Filter, RefreshCw, Clock } from "lucide-react";

export default function VehiclesPage() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "healthy" | "attention" | "warning" | "critical"
  >("all");

  useEffect(() => {
    async function fetchData(isRefresh = false) {
      try {
        if (isRefresh) {
          setRefreshing(true);
        }

        const [predictionsRes, vehiclesRes] = await Promise.all([
          fetch("/api/predictions", { cache: "no-store" }),
          fetch("/api/vehicles"),
        ]);

        const predictionsData = await predictionsRes.json();
        const vehiclesData = await vehiclesRes.json();

        // Handle both old and new API response format
        const predictions = predictionsData.predictions || predictionsData;

        setPredictions(predictions);
        setVehicles(vehiclesData);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    }

    fetchData();

    const interval = setInterval(() => {
      fetchData(true);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getVehicleStatus = (vehicle: Vehicle) => {
    const vehiclePredictions = predictions.filter(
      (p) => p.device_id === vehicle.deviceId
    );
    const hasCritical = vehiclePredictions.some(
      (p) => p.severity === "CRITICAL"
    );
    const hasHigh = vehiclePredictions.some((p) => p.severity === "HIGH");
    const hasWarning = vehiclePredictions.some((p) => p.severity === "WARNING");

    if (hasCritical) return "critical";
    if (hasHigh) return "warning";
    if (hasWarning) return "attention";
    return "healthy";
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearch =
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === "all") return true;

    return getVehicleStatus(vehicle) === filterStatus;
  });

  if (loading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            Vehicle Fleet
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage and monitor your vehicles
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white border border-purple-100 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-soft">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search vehicles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Status</option>
                <option value="healthy">Healthy</option>
                <option value="attention">Attention</option>
                <option value="warning">Warning</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="bg-white border border-purple-100 rounded-xl p-8 sm:p-12 text-center shadow-soft">
            <p className="text-sm sm:text-base text-gray-600">
              No vehicles found matching your criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                predictions={predictions}
              />
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-green-600 mb-1">Healthy</p>
            <p className="text-xl sm:text-2xl font-bold text-green-700">
              {vehicles.filter((v) => getVehicleStatus(v) === "healthy").length}
            </p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-purple-600 mb-1">Attention</p>
            <p className="text-xl sm:text-2xl font-bold text-purple-700">
              {
                vehicles.filter((v) => getVehicleStatus(v) === "attention")
                  .length
              }
            </p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-orange-600 mb-1">Warning</p>
            <p className="text-xl sm:text-2xl font-bold text-orange-700">
              {vehicles.filter((v) => getVehicleStatus(v) === "warning").length}
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-red-600 mb-1">Critical</p>
            <p className="text-xl sm:text-2xl font-bold text-red-700">
              {
                vehicles.filter((v) => getVehicleStatus(v) === "critical")
                  .length
              }
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
