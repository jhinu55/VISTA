import { Vehicle, Appointment, AIRecommendation } from '@/types';

// Mock vehicles matching device IDs from the ML model
export const mockVehicles: Vehicle[] = [
  {
    id: 1,
    deviceId: 12,
    name: 'Toyota Camry',
    model: 'Camry XLE',
    year: 2020,
    licensePlate: 'CA 1234 AB',
    vin: '1HGBH41JXMN109186',
    lastService: '2024-10-15',
    nextService: '2025-01-15',
    mileage: 45320,
    fuelLevel: 75,
    imageUrl: '/vehicles/camry.jpg'
  },
  {
    id: 2,
    deviceId: 9,
    name: 'Tesla Model 3',
    model: 'Model 3 Long Range',
    year: 2022,
    licensePlate: 'EV 5678 CD',
    vin: '5YJ3E1EA1KF123456',
    lastService: '2024-11-20',
    nextService: '2025-02-20',
    mileage: 28500,
    fuelLevel: 82,
    imageUrl: '/vehicles/tesla.jpg'
  },
  {
    id: 3,
    deviceId: 8,
    name: 'Honda Accord',
    model: 'Accord Sport',
    year: 2021,
    licensePlate: 'HA 9012 EF',
    vin: '1HGCV1F3XLA012345',
    lastService: '2024-09-10',
    nextService: '2024-12-10',
    mileage: 52100,
    fuelLevel: 60,
    imageUrl: '/vehicles/accord.jpg'
  },
  {
    id: 4,
    deviceId: 10,
    name: 'Ford F-150',
    model: 'F-150 XLT',
    year: 2019,
    licensePlate: 'FT 3456 GH',
    vin: '1FTEW1EP5KFA12345',
    lastService: '2024-11-01',
    nextService: '2025-02-01',
    mileage: 68900,
    fuelLevel: 45,
    imageUrl: '/vehicles/f150.jpg'
  }
];

// Mock appointments
export const mockAppointments: Appointment[] = [
  {
    id: 1,
    vehicleId: 1,
    deviceId: 12,
    date: '2024-12-20',
    time: '10:00 AM',
    type: 'Diagnostic',
    status: 'Scheduled',
    notes: 'Battery and coolant check',
    serviceCenter: 'Downtown Auto Service'
  },
  {
    id: 2,
    vehicleId: 2,
    deviceId: 9,
    date: '2024-12-18',
    time: '2:00 PM',
    type: 'Routine Maintenance',
    status: 'Scheduled',
    notes: 'Tire rotation and brake inspection',
    serviceCenter: 'Tesla Service Center'
  },
  {
    id: 3,
    vehicleId: 3,
    deviceId: 8,
    date: '2024-12-15',
    time: '9:00 AM',
    type: 'Inspection',
    status: 'Completed',
    notes: 'Annual safety inspection',
    serviceCenter: 'Honda Certified Service'
  },
  {
    id: 4,
    vehicleId: 1,
    deviceId: 12,
    date: '2024-10-15',
    time: '11:00 AM',
    type: 'Routine Maintenance',
    status: 'Completed',
    notes: 'Oil change and filter replacement',
    serviceCenter: 'Downtown Auto Service'
  }
];

// Mock AI recommendations
export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 1,
    vehicleId: 1,
    deviceId: 12,
    type: 'maintenance',
    severity: 'HIGH',
    title: 'Battery Replacement Recommended',
    description: 'AI analysis detects battery voltage consistently below optimal levels. Battery health has degraded to 45% capacity.',
    confidence: 92,
    suggestedAction: 'Schedule battery replacement within 2 weeks to prevent starting failures',
    estimatedCost: { min: 150, max: 300 },
    dueDate: '2024-12-30',
    affectedSystems: ['Electrical', 'Starting System'],
    createdAt: '2024-12-10T08:00:00Z'
  },
  {
    id: 2,
    vehicleId: 1,
    deviceId: 12,
    type: 'maintenance',
    severity: 'CRITICAL',
    title: 'Coolant System Attention Required',
    description: 'Temperature readings show coolant levels are critically low. Multiple instances of below-threshold temperatures detected.',
    confidence: 89,
    suggestedAction: 'Immediate coolant system inspection and refill required',
    estimatedCost: { min: 80, max: 150 },
    dueDate: '2024-12-17',
    affectedSystems: ['Cooling System', 'Engine'],
    createdAt: '2024-12-12T10:30:00Z'
  },
  {
    id: 3,
    vehicleId: 2,
    deviceId: 9,
    type: 'driving',
    severity: 'WARNING',
    title: 'Aggressive Acceleration Pattern Detected',
    description: 'Your driving patterns show frequent rapid acceleration events. This reduces energy efficiency by approximately 15%.',
    confidence: 78,
    suggestedAction: 'Practice smoother acceleration to improve range and reduce wear',
    affectedSystems: ['Battery', 'Drive Train'],
    createdAt: '2024-12-08T14:20:00Z'
  },
  {
    id: 4,
    vehicleId: 2,
    deviceId: 9,
    type: 'maintenance',
    severity: 'WARNING',
    title: 'Tire Rotation Due',
    description: 'Based on mileage and driving patterns, tire rotation is recommended to ensure even wear.',
    confidence: 85,
    suggestedAction: 'Schedule tire rotation in the next 500 miles',
    estimatedCost: { min: 50, max: 80 },
    dueDate: '2025-01-05',
    affectedSystems: ['Tires', 'Suspension'],
    createdAt: '2024-12-05T09:15:00Z'
  },
  {
    id: 5,
    vehicleId: 3,
    deviceId: 8,
    type: 'anomaly',
    severity: 'HIGH',
    title: 'Unusual Battery Drain Pattern',
    description: 'AI has detected abnormal battery discharge when vehicle is parked. Possible parasitic draw.',
    confidence: 81,
    suggestedAction: 'Electrical system diagnostic recommended',
    estimatedCost: { min: 100, max: 250 },
    dueDate: '2024-12-25',
    affectedSystems: ['Electrical', 'Battery'],
    createdAt: '2024-12-11T16:45:00Z'
  },
  {
    id: 6,
    vehicleId: 4,
    deviceId: 10,
    type: 'maintenance',
    severity: 'INFO',
    title: 'Brake Fluid Service Approaching',
    description: 'Based on vehicle age and mileage, brake fluid replacement recommended within 3 months.',
    confidence: 75,
    suggestedAction: 'Schedule brake fluid flush during next service',
    estimatedCost: { min: 70, max: 120 },
    dueDate: '2025-03-01',
    affectedSystems: ['Brakes', 'Hydraulic System'],
    createdAt: '2024-12-01T11:00:00Z'
  }
];

// Generate available time slots for scheduling
export function generateTimeSlots(startDate: Date, daysAhead: number = 14): any[] {
  const slots: any[] = [];
  const times = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
  
  for (let i = 0; i < daysAhead; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Skip Sundays (day 0)
    if (date.getDay() === 0) continue;
    
    const dateStr = date.toISOString().split('T')[0];
    
    times.forEach((time, idx) => {
      // Make some slots randomly unavailable for realism
      const isAvailable = Math.random() > 0.3;
      
      slots.push({
        id: `${dateStr}-${idx}`,
        date: dateStr,
        time: time,
        available: isAvailable
      });
    });
  }
  
  return slots;
}

// Sensor thresholds for health calculations
export const sensorThresholds = {
  cTemp: { min: 70, max: 110, unit: '°C', name: 'Coolant Temperature' },
  rpm: { min: 500, max: 6500, unit: 'RPM', name: 'Engine RPM' },
  speed: { min: 0, max: 200, unit: 'km/h', name: 'Vehicle Speed' },
  eLoad: { min: 10, max: 90, unit: '%', name: 'Engine Load' },
  maf: { min: 2, max: 15, unit: 'g/s', name: 'Mass Air Flow' },
  battery: { min: 11.5, max: 14.5, unit: 'V', name: 'Battery Voltage' }
};

export const patternDescriptions: Record<string, string> = {
  PATTERN_ALTERNATOR: 'Battery not charging despite engine running - possible alternator failure',
  PATTERN_TRANSMISSION: 'High RPM with low speed indicates transmission slip',
  PATTERN_ENGINE: 'Excessive engine load with insufficient air intake - engine overload detected'
};
