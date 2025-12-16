"use client";

import AppLayout from "@/components/AppLayout";
import { Filter } from "lucide-react";

export default function AIInsights() {
  const filters = ["All", "Engine", "Transmission", "Brakes", "Suspension"];

  const insights = [
    {
      id: 1,
      title: "Engine Performance Degradation",
      vehicle: "Vehicle 001",
      probability: 78,
      description:
        "Based on recent telemetry data, the engine is showing signs of wear. Recommend inspection within 500 km.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "Brake Pad Replacement Needed",
      vehicle: "Vehicle 002",
      probability: 92,
      description:
        "Brake pad thickness is below optimal levels. Schedule replacement to prevent damage to rotors.",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "Transmission Fluid Check Required",
      vehicle: "Vehicle 003",
      probability: 65,
      description:
        "Transmission temperature patterns suggest fluid levels may be low. Verify and top up if needed.",
      timestamp: "1 day ago",
    },
    {
      id: 4,
      title: "Suspension System Alert",
      vehicle: "Vehicle 004",
      probability: 71,
      description:
        "Unusual vibration patterns detected. Inspect suspension components for wear or damage.",
      timestamp: "1 day ago",
    },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Insights</h1>
          <p className="text-gray-600">
            Predictive maintenance recommendations powered by machine learning
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === "All"
                  ? "bg-navy-800 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {insights.map((insight, index) => {
            const isLast = index === insights.length - 1;
            return (
              <div key={insight.id} className="relative flex gap-6">
                {/* Timeline Dot and Line */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-navy-800 rounded-full flex-shrink-0 mt-2" />
                  {!isLast && <div className="w-px h-full bg-gray-200 mt-2" />}
                </div>

                {/* Card */}
                <div className="flex-1 bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow mb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-500">{insight.vehicle}</p>
                    </div>
                    {/* Circular Percentage Badge */}
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          className="fill-none stroke-gray-100"
                          strokeWidth="4"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          className="fill-none stroke-navy-800"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={`${insight.probability * 1.76} 176`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-bold text-navy-800">
                          {insight.probability}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{insight.description}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {insight.timestamp}
                    </span>
                  </div>

                  {/* Two Button Layout */}
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                      Explain More
                    </button>
                    <button className="flex-1 px-4 py-2 bg-navy-800 rounded-full text-sm font-medium text-white hover:bg-navy-900 transition-colors">
                      Schedule Service
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
