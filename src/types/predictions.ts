export interface Prediction {
    alert_id: number;
    device_id: number;
    start_time: string;
    end_time: string;
    severity: 'INFO' | 'WARNING' | 'HIGH' | 'CRITICAL';
    issues: string[];
    factors: string[];
    sensor_snapshot: {
        cTemp: number;
        rpm: number;
        speed: number;
        battery: number;
        eLoad: number;
        maf: number;
    };
    min_values: {
        cTemp: number;
        rpm: number;
        speed: number;
        battery: number;
        eLoad: number;
        maf: number;
    };
    max_values: {
        cTemp: number;
        rpm: number;
        speed: number;
        battery: number;
        eLoad: number;
        maf: number;
    };
    anomaly_count: number;
}

export interface Vehicle {
    id: number;
    deviceId: number;
    make: string;
    model: string;
    year: number;
    mileage: string;
    lastService: string;
    status: 'Healthy' | 'Service Due' | 'Critical' | 'Warning';
    vin?: string;
    licensePlate?: string;
}
