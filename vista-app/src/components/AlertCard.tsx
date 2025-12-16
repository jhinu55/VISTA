"use client";

import { Prediction } from "@/types";
import {
  getSeverityColor,
  generateIssueMessages,
  formatDateTime,
} from "@/lib/utils";
import { AlertTriangle, Activity } from "lucide-react";

interface AlertCardProps {
  prediction: Prediction;
  vehicleName?: string;
  onClick?: () => void;
}

export default function AlertCard({
  prediction,
  vehicleName,
  onClick,
}: AlertCardProps) {
  const messages = generateIssueMessages(prediction);

  return (
    <div
      onClick={onClick}
      className={`border rounded-lg p-3 sm:p-4 ${getSeverityColor(
        prediction.severity
      )} cursor-pointer hover:shadow-md transition-shadow active:scale-98`}
    >
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="mt-0.5 sm:mt-1 flex-shrink-0">
            {prediction.severity === "CRITICAL" ||
            prediction.severity === "HIGH" ? (
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-sm sm:text-base md:text-lg">
              {vehicleName || `Vehicle ${prediction.device_id}`}
            </h3>
            <p className="text-xs sm:text-sm opacity-75">
              {formatDateTime(prediction.start_time)}
            </p>
          </div>
        </div>
        <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold bg-white/20 flex-shrink-0">
          {prediction.severity}
        </span>
      </div>

      <div className="space-y-1.5 sm:space-y-2">
        {messages.slice(0, 2).map((message, idx) => (
          <p key={idx} className="text-xs sm:text-sm">
            • {message}
          </p>
        ))}
        {messages.length > 2 && (
          <p className="text-xs sm:text-sm font-semibold">
            +{messages.length - 2} more issues
          </p>
        )}
      </div>

      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-black/10">
        <p className="text-xs opacity-75">
          {prediction.anomaly_count} anomalies detected •{" "}
          {prediction.factors.length} systems affected
        </p>
      </div>
    </div>
  );
}
