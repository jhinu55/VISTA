"use client";

import AppLayout from "@/components/AppLayout";
import { Filter, AlertCircle, Clock, ArrowRight } from "lucide-react";

export default function AIInsights() {
  const filters = ["All", "Engine", "Transmission", "Brakes", "Suspension"];

  const insights = [
    {
      id: 1,
      title: "Engine Performance Degradation",
      vehicle: "Vehicle 001",
      probability: 78,
      priority: "high",
      description:
        "Based on recent telemetry data, the engine is showing signs of wear. Recommend inspection within 500 km.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      title: "Brake Pad Replacement Needed",
      vehicle: "Vehicle 002",
      probability: 92,
      priority: "critical",
      description:
        "Brake pad thickness is below optimal levels. Schedule replacement to prevent damage to rotors.",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      title: "Transmission Fluid Check Required",
      vehicle: "Vehicle 003",
      probability: 65,
      priority: "medium",
      description:
        "Transmission temperature patterns suggest fluid levels may be low. Verify and top up if needed.",
      timestamp: "1 day ago",
    },
    {
      id: 4,
      title: "Suspension System Alert",
      vehicle: "Vehicle 004",
      probability: 71,
      priority: "high",
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
            const priorityColors = {
              critical: "bg-red-100 text-red-700 border-red-200",
              high: "bg-orange-100 text-orange-700 border-orange-200",
              medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
            };
            return (
              <div key={insight.id} className="relative flex gap-6">
                {/* Timeline Dot and Line */}
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-navy-800 rounded-full flex-shrink-0 mt-2 ring-4 ring-navy-100" />
                  {!isLast && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-gray-300 to-gray-100 mt-2" />
                  )}
                </div>

                {/* Card */}
                <div className="flex-1 bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-navy-200 transition-all mb-4 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-navy-800 transition-colors">
                          {insight.title}
                        </h3>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
                            priorityColors[
                              insight.priority as keyof typeof priorityColors
                            ]
                          }`}
                        >
                          {insight.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <AlertCircle className="w-4 h-4" />
                        <span className="font-medium">{insight.vehicle}</span>
                        <span>•</span>
                        <Clock className="w-4 h-4" />
                        <span>{insight.timestamp}</span>
                      </div>
                    </div>
                    {/* Circular Percentage Badge */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          className="fill-none stroke-gray-100"
                          strokeWidth="6"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="34"
                          className="fill-none stroke-navy-800"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${insight.probability * 2.14} 214`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-bold text-navy-900">
                          {insight.probability}
                        </span>
                        <span className="text-[10px] font-medium text-gray-500">
                          %
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-5 leading-relaxed">
                    {insight.description}
                  </p>

                  {/* Two Button Layout */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-5 py-2.5 border-2 border-gray-300 rounded-full text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2 group/btn">
                      Explain More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button className="flex-1 px-5 py-2.5 bg-gradient-to-r from-navy-700 to-navy-900 rounded-full text-sm font-semibold text-white hover:from-navy-800 hover:to-navy-950 transition-all shadow-lg hover:shadow-xl">
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
