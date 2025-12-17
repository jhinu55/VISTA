// Type definitions for VISTA application

export type SeverityLevel = 'INFO' | 'WARNING' | 'HIGH' | 'CRITICAL';

export interface SensorSnapshot {
  cTemp: number | null;
  rpm: number | null;
  speed: number | null;
  battery: number | null;
  eLoad: number | null;
  maf: number | null;
}

export interface Prediction {
  alert_id: number;
  device_id: number;
  start_time: string;
  end_time: string;
  severity: SeverityLevel;
  issues: string[];
  factors: string[];
  sensor_snapshot: SensorSnapshot;
  min_values: SensorSnapshot;
  max_values: SensorSnapshot;
  anomaly_count: number;
}

export interface Vehicle {
  id: number;
  deviceId: number;
  name: string;
  model: string;
  year: number;
  licensePlate: string;
  vin: string;
  lastService: string;
  nextService: string;
  mileage: number;
  fuelLevel: number;
  imageUrl?: string;
}

export interface Appointment {
  id: number;
  vehicleId: number;
  deviceId: number;
  date: string;
  time: string;
  type: 'Routine Maintenance' | 'Diagnostic' | 'Repair' | 'Inspection';
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'In Progress';
  notes?: string;
  serviceCenter: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface AIRecommendation {
  id: number;
  vehicleId: number;
  deviceId: number;
  type: 'maintenance' | 'driving' | 'anomaly';
  severity: SeverityLevel;
  title: string;
  description: string;
  confidence: number;
  suggestedAction: string;
  estimatedCost?: {
    min: number;
    max: number;
  };
  dueDate?: string;
  affectedSystems: string[];
  createdAt: string;
}

export interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  threshold: {
    min: number;
    max: number;
  };
}

export interface VehicleStatus {
  overall: 'healthy' | 'attention' | 'warning' | 'critical';
  engine: number;
  battery: number;
  brakes: number;
  tyres: number;
  fluids: number;
}
