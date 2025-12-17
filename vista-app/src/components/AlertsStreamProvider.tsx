"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Prediction } from "@/types";

type BatchCounts = {
  critical: number;
  attention: number;
  warning: number;
  other: number;
};

type AlertsStreamValue = {
  loading: boolean;
  lastUpdatedLabel: string;
  totalUniqueStreamed: number;
  lastBatch: Prediction[];
  lastBatchCounts: BatchCounts;
  batchSize: number;
  refreshMs: number;
  latestByDevice: Record<number, Prediction | undefined>;
  uniqueCountByDevice: Record<number, number>;
  recentUniquePredictions: Prediction[];
};

const AlertsStreamContext = createContext<AlertsStreamValue | null>(null);

function countBatch(batch: Prediction[]): BatchCounts {
  let critical = 0;
  let attention = 0;
  let warning = 0;
  let other = 0;

  for (const alert of batch) {
    if (!alert) continue;
    if (alert.severity === "CRITICAL") {
      critical += 1;
    } else if (alert.severity === "HIGH") {
      attention += 1;
    } else if (alert.severity === "WARNING") {
      warning += 1;
    } else {
      other += 1;
    }
  }

  return { critical, attention, warning, other };
}

function getTimeLabel(date: Date | null) {
  return date ? date.toLocaleTimeString() : "";
}

export function AlertsStreamProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const batchSize = 5;
  const refreshMs = 30000;

  const [loading, setLoading] = useState(true);
  const [lastUpdatedLabel, setLastUpdatedLabel] = useState<string>("");
  const [lastBatch, setLastBatch] = useState<Prediction[]>([]);
  const [lastBatchCounts, setLastBatchCounts] = useState<BatchCounts>({
    critical: 0,
    attention: 0,
    warning: 0,
    other: 0,
  });
  const [totalUniqueStreamed, setTotalUniqueStreamed] = useState(0);
  const [latestByDevice, setLatestByDevice] = useState<
    Record<number, Prediction | undefined>
  >({});
  const [uniqueCountByDevice, setUniqueCountByDevice] = useState<
    Record<number, number>
  >({});
  const [recentUniquePredictions, setRecentUniquePredictions] = useState<
    Prediction[]
  >([]);

  const offsetRef = useRef(0);
  const seenAlertIdsRef = useRef<Set<number>>(new Set());
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchBatch(limit: number, offset: number) {
      const res = await fetch(
        `/api/predictions?limit=${limit}&offset=${offset}`,
        { cache: "no-store" }
      );
      const data = await res.json();
      return Array.isArray(data?.predictions)
        ? (data.predictions as Prediction[])
        : Array.isArray(data)
        ? (data as Prediction[])
        : [];
    }

    async function fetchTick() {
      try {
        const offset = offsetRef.current;
        let batch = await fetchBatch(batchSize, offset);

        // Ensure each tick represents a full batch of 5 when possible.
        // If we hit the end (short batch), wrap to offset 0 and top up.
        if (batch.length < batchSize) {
          const missing = batchSize - batch.length;
          const topUp = await fetchBatch(missing, 0);
          batch = batch.concat(topUp);
          offsetRef.current = missing;
        } else {
          offsetRef.current = offset + batchSize;
        }

        if (cancelled) return;

        setLastBatch(batch);
        setLastBatchCounts(countBatch(batch));

        // Count unique alerts only (by alert_id) so the counter doesn't jump around on wrap.
        let newlySeen = 0;
        const newlySeenByDevice = new Map<number, number>();
        for (const alert of batch) {
          if (!alert) continue;
          if (!seenAlertIdsRef.current.has(alert.alert_id)) {
            seenAlertIdsRef.current.add(alert.alert_id);
            newlySeen += 1;
            newlySeenByDevice.set(
              alert.device_id,
              (newlySeenByDevice.get(alert.device_id) ?? 0) + 1
            );
          }
        }
        if (newlySeen > 0) {
          setTotalUniqueStreamed((prev) => prev + newlySeen);
          if (newlySeenByDevice.size > 0) {
            setUniqueCountByDevice((prev) => {
              const next = { ...prev };
              for (const [deviceId, delta] of newlySeenByDevice.entries()) {
                next[deviceId] = (next[deviceId] ?? 0) + delta;
              }
              return next;
            });
          }
          setRecentUniquePredictions((prev) => {
            const next = batch
              .filter((a) => a && !prev.some((p) => p.alert_id === a.alert_id))
              .concat(prev);
            return next.slice(0, 200);
          });
        }

        setLatestByDevice((prev) => {
          const next = { ...prev };
          for (const alert of batch) {
            if (!alert) continue;
            const deviceId = alert.device_id;
            const existing = next[deviceId];
            if (!existing) {
              next[deviceId] = alert;
              continue;
            }
            if (
              new Date(alert.start_time).getTime() >
              new Date(existing.start_time).getTime()
            ) {
              next[deviceId] = alert;
            }
          }
          return next;
        });

        const now = new Date();
        setLastUpdatedLabel(getTimeLabel(now));
        setLoading(false);
      } catch (e) {
        console.error("Alerts stream fetch failed:", e);
        if (!cancelled) setLoading(false);
      }
    }

    // Start once per app session.
    fetchTick();
    if (intervalRef.current == null) {
      intervalRef.current = window.setInterval(fetchTick, refreshMs);
    }

    return () => {
      cancelled = true;
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const value = useMemo<AlertsStreamValue>(
    () => ({
      loading,
      lastUpdatedLabel,
      totalUniqueStreamed,
      lastBatch,
      lastBatchCounts,
      batchSize,
      refreshMs,
      latestByDevice,
      uniqueCountByDevice,
      recentUniquePredictions,
    }),
    [
      loading,
      lastUpdatedLabel,
      totalUniqueStreamed,
      lastBatch,
      lastBatchCounts,
      latestByDevice,
      uniqueCountByDevice,
      recentUniquePredictions,
    ]
  );

  return (
    <AlertsStreamContext.Provider value={value}>
      {children}
    </AlertsStreamContext.Provider>
  );
}

export function useAlertsStream() {
  const ctx = useContext(AlertsStreamContext);
  if (!ctx) {
    throw new Error("useAlertsStream must be used within AlertsStreamProvider");
  }
  return ctx;
}
