"use client";

import { useEffect, useState } from "react";
import { Play, Square, Activity } from "lucide-react";

export default function StreamControl() {
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkStatus();
    // Auto-start stream on mount
    startStream();
  }, []);

  const checkStatus = async () => {
    try {
      const res = await fetch("/api/stream");
      const data = await res.json();
      setIsRunning(data.running);
    } catch (error) {
      console.error("Failed to check stream status:", error);
    }
  };

  const startStream = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start" }),
      });
      const data = await res.json();
      if (data.success) {
        setIsRunning(true);
      }
    } catch (error) {
      console.error("Failed to start stream:", error);
    } finally {
      setLoading(false);
    }
  };

  const stopStream = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "stop" }),
      });
      const data = await res.json();
      if (data.success) {
        setIsRunning(false);
      }
    } catch (error) {
      console.error("Failed to stop stream:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-4 right-4 z-50">
      <div className="bg-white border border-purple-100 rounded-lg shadow-strong p-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Activity
            className={`w-4 h-4 ${
              isRunning ? "text-green-600 animate-pulse" : "text-gray-400"
            }`}
          />
          <span className="text-sm font-medium text-gray-700">
            Data Stream: {isRunning ? "Active" : "Stopped"}
          </span>
        </div>
        {isRunning ? (
          <button
            onClick={stopStream}
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded text-sm hover:bg-red-700 disabled:opacity-50"
          >
            <Square className="w-3 h-3" />
            Stop
          </button>
        ) : (
          <button
            onClick={startStream}
            disabled={loading}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
          >
            <Play className="w-3 h-3" />
            Start
          </button>
        )}
      </div>
    </div>
  );
}
