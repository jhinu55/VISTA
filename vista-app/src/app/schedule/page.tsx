"use client";

import { useEffect, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Vehicle, Appointment } from "@/types";
import { Calendar, Clock, CheckCircle, X } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function SchedulePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [selectedVehicle, setSelectedVehicle] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [serviceType, setServiceType] = useState<
    "Routine Maintenance" | "Diagnostic" | "Repair" | "Inspection"
  >("Routine Maintenance");
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [vehiclesRes, appointmentsRes, slotsRes] = await Promise.all([
          fetch("/api/vehicles"),
          fetch("/api/appointments"),
          fetch("/api/time-slots"),
        ]);

        const vehiclesData = await vehiclesRes.json();
        const appointmentsData = await appointmentsRes.json();
        const slotsData = await slotsRes.json();

        setVehicles(vehiclesData);
        setAppointments(appointmentsData);
        setTimeSlots(slotsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const availableDates = [
    ...new Set(timeSlots.map((slot) => slot.date)),
  ].sort();
  const availableTimesForDate = selectedDate
    ? timeSlots.filter((slot) => slot.date === selectedDate && slot.available)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVehicle || !selectedDate || !selectedTime) {
      alert("Please fill in all required fields");
      return;
    }

    const vehicle = vehicles.find((v) => v.id === selectedVehicle);
    if (!vehicle) return;

    const newAppointment = {
      vehicleId: selectedVehicle,
      deviceId: vehicle.deviceId,
      date: selectedDate,
      time: selectedTime,
      type: serviceType,
      notes,
      serviceCenter: "Downtown Auto Service",
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointment),
      });

      if (response.ok) {
        const createdAppointment = await response.json();
        setAppointments([...appointments, createdAppointment]);

        // Reset form
        setSelectedVehicle(null);
        setSelectedDate("");
        setSelectedTime("");
        setServiceType("Routine Maintenance");
        setNotes("");

        // Show success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment");
    }
  };

  const handleCancelAppointment = async (appointmentId: number) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const response = await fetch(`/api/appointments?id=${appointmentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAppointments(appointments.filter((apt) => apt.id !== appointmentId));
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Failed to cancel appointment");
    }
  };

  const upcomingAppointments = appointments
    .filter(
      (apt) => apt.status === "Scheduled" && new Date(apt.date) >= new Date()
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (loading) {
    return (
      <AppLayout>
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-purple-600"></div>
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
            Schedule Service
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Book maintenance appointments for your vehicles
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-4 sm:mb-6 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 flex items-center">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
            <span className="text-sm sm:text-base text-green-800">
              Appointment scheduled successfully!
            </span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Booking Form */}
          <div className="bg-white border border-purple-100 rounded-xl p-4 sm:p-5 md:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              New Appointment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Select Vehicle *
                </label>
                <select
                  value={selectedVehicle || ""}
                  onChange={(e) => setSelectedVehicle(parseInt(e.target.value))}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Choose a vehicle...</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} - {vehicle.licensePlate}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Service Type *
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as any)}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="Routine Maintenance">
                    Routine Maintenance
                  </option>
                  <option value="Diagnostic">Diagnostic</option>
                  <option value="Repair">Repair</option>
                  <option value="Inspection">Inspection</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Select Date *
                </label>
                <select
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setSelectedTime("");
                  }}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                >
                  <option value="">Choose a date...</option>
                  {availableDates.map((date) => (
                    <option key={date} value={date}>
                      {formatDate(date)}
                    </option>
                  ))}
                </select>
              </div>

              {selectedDate && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Select Time *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableTimesForDate.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        className={`px-2 sm:px-3 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors ${
                          selectedTime === slot.time
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-purple-500 active:bg-purple-50"
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                  {availableTimesForDate.length === 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      No available slots for this date
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Any specific concerns or requests..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-purple-700 active:bg-purple-800 transition-colors"
              >
                Schedule Appointment
              </button>
            </form>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white border border-purple-100 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Upcoming Appointments
            </h2>

            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No upcoming appointments</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((apt) => {
                  const vehicle = vehicles.find((v) => v.id === apt.vehicleId);
                  return (
                    <div
                      key={apt.id}
                      className="border border-purple-100 rounded-lg p-4 hover:shadow-medium transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-gray-900">
                            {vehicle?.name}
                          </p>
                          <p className="text-sm text-gray-600">{apt.type}</p>
                        </div>
                        <button
                          onClick={() => handleCancelAppointment(apt.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(apt.date)}
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Clock className="w-4 h-4 mr-2" />
                        {apt.time}
                      </div>

                      <div className="pt-3 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                          {apt.serviceCenter}
                        </p>
                        {apt.notes && (
                          <p className="text-sm text-gray-500 mt-2">
                            {apt.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Past Appointments */}
        <div className="mt-8 bg-white border border-purple-100 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Service History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-100">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Vehicle
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                    Service Center
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments
                  .filter((apt) => apt.status === "Completed")
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((apt) => {
                    const vehicle = vehicles.find(
                      (v) => v.id === apt.vehicleId
                    );
                    return (
                      <tr key={apt.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {vehicle?.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {apt.type}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {formatDate(apt.date)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded text-xs font-semibold bg-green-100 text-green-800">
                            {apt.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {apt.serviceCenter}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            {appointments.filter((apt) => apt.status === "Completed").length ===
              0 && (
              <p className="text-center text-gray-500 py-8">
                No service history available
              </p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
