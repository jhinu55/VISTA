"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AppLayout from "@/components/AppLayout";
import { Prediction, Vehicle, Appointment } from "@/types";
import {
  ArrowLeft,
  AlertTriangle,
  Activity,
  Gauge,
  Calendar,
  Wrench,
  Battery,
  Thermometer,
  Wind,
} from "lucide-react";
import {
  calculateVehicleHealth,
  getSeverityColor,
  generateIssueMessages,
  formatDateTime,
  formatDate,
} from "@/lib/utils";
import { sensorThresholds } from "@/lib/mockData";

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleId = parseInt(params.id as string);

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [vehiclesRes, predictionsRes, appointmentsRes] =
          await Promise.all([
            fetch("/api/vehicles"),
            fetch("/api/predictions"),
            fetch("/api/appointments"),
          ]);

        const vehiclesData = await vehiclesRes.json();
        const predictionsData = await predictionsRes.json();
        const appointmentsData = await appointmentsRes.json();

        const foundVehicle = vehiclesData.find(
          (v: Vehicle) => v.id === vehicleId
        );
        setVehicle(foundVehicle || null);
        setPredictions(predictionsData);
        setAppointments(appointmentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [vehicleId]);

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

  if (!vehicle) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Vehicle Not Found
            </h2>
            <button
              onClick={() => router.push("/vehicles")}
              className="text-blue-600 hover:text-blue-700"
            >
              ← Back to Vehicles
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const vehiclePredictions = predictions
    .filter((p) => p.device_id === vehicle.deviceId)
    .sort(
      (a, b) =>
        new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
    );

  const vehicleAppointments = appointments
    .filter((a) => a.vehicleId === vehicleId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const health = calculateVehicleHealth(vehiclePredictions);
  const latestSnapshot = vehiclePredictions[0]?.sensor_snapshot;

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <button
          onClick={() => router.push("/vehicles")}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Vehicles
        </button>

        {/* Vehicle Info Card */}
        <div className="bg-white border border-purple-100 rounded-xl p-6 mb-6 shadow-soft">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {vehicle.name}
              </h1>
              <p className="text-lg text-gray-600">
                {vehicle.model} ({vehicle.year})
              </p>
              <p className="text-sm text-gray-500 mt-1">
                VIN: {vehicle.vin} • {vehicle.licensePlate}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-2">Health Score</div>
              <div
                className="text-4xl font-bold"
                style={{
                  color:
                    health >= 80
                      ? "#10b981"
                      : health >= 60
                      ? "#3b82f6"
                      : health >= 40
                      ? "#f59e0b"
                      : "#ef4444",
                }}
              >
                {health}%
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Mileage</p>
              <p className="text-lg font-semibold text-gray-900">
                {vehicle.mileage.toLocaleString()} km
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Fuel Level</p>
              <p className="text-lg font-semibold text-gray-900">
                {vehicle.fuelLevel}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Last Service</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(vehicle.lastService)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Next Service</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(vehicle.nextService)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Live Sensor Data */}
          {latestSnapshot && (
            <div className="bg-white border border-purple-100 rounded-xl p-6 shadow-soft">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Live Sensor Readings
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Thermometer className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-sm text-gray-600">Coolant Temp</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {latestSnapshot.cTemp !== null
                      ? `${latestSnapshot.cTemp}°C`
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Normal: {sensorThresholds.cTemp.min}-
                    {sensorThresholds.cTemp.max}°C
                  </p>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Gauge className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">Engine RPM</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {latestSnapshot.rpm !== null
                      ? latestSnapshot.rpm.toFixed(0)
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Normal: {sensorThresholds.rpm.min}-
                    {sensorThresholds.rpm.max}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Battery className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm text-gray-600">Battery</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {latestSnapshot.battery !== null
                      ? `${latestSnapshot.battery}V`
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Normal: {sensorThresholds.battery.min}-
                    {sensorThresholds.battery.max}V
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Wind className="w-5 h-5 text-orange-600 mr-2" />
                    <span className="text-sm text-gray-600">Air Flow</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {latestSnapshot.maf !== null
                      ? `${latestSnapshot.maf} g/s`
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Normal: {sensorThresholds.maf.min}-
                    {sensorThresholds.maf.max} g/s
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Wrench className="w-5 h-5 text-yellow-600 mr-2" />
                    <span className="text-sm text-gray-600">Engine Load</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {latestSnapshot.eLoad !== null
                      ? `${latestSnapshot.eLoad.toFixed(1)}%`
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Normal: {sensorThresholds.eLoad.min}-
                    {sensorThresholds.eLoad.max}%
                  </p>
                </div>

                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Gauge className="w-5 h-5 text-red-600 mr-2" />
                    <span className="text-sm text-gray-600">Speed</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {latestSnapshot.speed !== null
                      ? `${latestSnapshot.speed} km/h`
                      : "N/A"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Max: {sensorThresholds.speed.max} km/h
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Appointments */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Service History
              </h2>
              <button
                onClick={() => router.push("/schedule")}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Book Service →
              </button>
            </div>
            <div className="space-y-3">
              {vehicleAppointments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No appointments scheduled
                </p>
              ) : (
                vehicleAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {apt.type}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatDate(apt.date)} at {apt.time}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          apt.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : apt.status === "Scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{apt.serviceCenter}</p>
                    {apt.notes && (
                      <p className="text-sm text-gray-500 mt-2">{apt.notes}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Alerts & Diagnostics */}
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Active Alerts & Diagnostics
          </h2>

          {vehiclePredictions.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-3">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600">All systems operating normally</p>
            </div>
          ) : (
            <div className="space-y-4">
              {vehiclePredictions.map((prediction) => {
                const messages = generateIssueMessages(prediction);
                return (
                  <div
                    key={prediction.alert_id}
                    className={`border rounded-lg p-4 ${getSeverityColor(
                      prediction.severity
                    )}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-lg">
                            Alert #{prediction.alert_id}
                          </span>
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-white/30">
                            {prediction.severity}
                          </span>
                        </div>
                        <p className="text-sm opacity-75">
                          {formatDateTime(prediction.start_time)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      {messages.map((message, idx) => (
                        <div key={idx} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span className="text-sm">{message}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-black/10 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="opacity-75">Affected Systems:</span>
                        <p className="font-semibold mt-1">
                          {prediction.factors.join(", ")}
                        </p>
                      </div>
                      <div>
                        <span className="opacity-75">Anomalies Detected:</span>
                        <p className="font-semibold mt-1">
                          {prediction.anomaly_count}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
