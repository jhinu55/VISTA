"use client";

import { Vehicle, Prediction } from "@/types";
import {
  calculateVehicleHealth,
  generateIssueMessages,
  getHealthStatus,
} from "@/lib/utils";
import { Car, Activity, Fuel } from "lucide-react";
import { useRouter } from "next/navigation";

interface VehicleCardProps {
  vehicle: Vehicle;
  predictions: Prediction[];
}

export default function VehicleCard({
  vehicle,
  predictions,
}: VehicleCardProps) {
  const router = useRouter();

  const vehiclePredictions = predictions.filter(
    (p) => p.device_id === vehicle.deviceId
  );

  const latestPrediction = vehiclePredictions
    .slice()
    .sort(
      (a, b) =>
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
    )[0];
  const latestIssues = latestPrediction
    ? generateIssueMessages(latestPrediction).slice(0, 2)
    : [];
  const health = calculateVehicleHealth(vehiclePredictions);
  const status = getHealthStatus(health);

  const statusConfig = {
    healthy: {
      color: "bg-green-100 text-green-800 border-green-200",
      label: "Healthy",
    },
    attention: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      label: "Attention Needed",
    },
    warning: {
      color: "bg-orange-100 text-orange-800 border-orange-200",
      label: "Warning",
    },
    critical: {
      color: "bg-red-100 text-red-800 border-red-200",
      label: "Critical",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      onClick={() => router.push(`/vehicles/${vehicle.id}`)}
      className="bg-white border border-purple-100 rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-strong transition-all cursor-pointer active:scale-98"
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="bg-purple-800 rounded-lg p-2 sm:p-2.5 md:p-3 flex-shrink-0">
            <Car className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base md:text-lg text-gray-900">
              {vehicle.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">{vehicle.model}</p>
            <p className="text-xs text-gray-500">{vehicle.licensePlate}</p>
          </div>
        </div>
        <span
          className={`px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold border ${config.color} flex-shrink-0`}
        >
          {config.label}
        </span>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-gray-600">Health Score</span>
          <div className="flex items-center gap-2">
            <div className="w-16 sm:w-20 md:w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  health >= 80
                    ? "bg-green-500"
                    : health >= 60
                    ? "bg-blue-500"
                    : health >= 40
                    ? "bg-orange-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${health}%` }}
              />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-900">
              {health}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 sm:pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Mileage</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">
                {vehicle.mileage.toLocaleString()} km
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Fuel className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Fuel</p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">
                {vehicle.fuelLevel}%
              </p>
            </div>
          </div>
        </div>

        {vehiclePredictions.length > 0 && (
          <div className="pt-2 sm:pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              {vehiclePredictions.length} active alert
              {vehiclePredictions.length !== 1 ? "s" : ""}
            </p>

            {latestIssues.length > 0 && (
              <div className="mt-2 space-y-1">
                {latestIssues.map((issue, idx) => (
                  <p key={idx} className="text-xs text-gray-700 line-clamp-1">
                    • {issue}
                  </p>
                ))}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push("/schedule");
                  }}
                  className="mt-2 text-xs font-semibold text-purple-800 hover:text-purple-900"
                >
                  Schedule service →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
