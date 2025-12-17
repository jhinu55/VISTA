import { Vehicle } from '@/types/predictions';

export const mockVehicles: Vehicle[] = [
    {
        id: 1,
        deviceId: 12,
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        mileage: '35,420 mi',
        lastService: '11/15/2024',
        status: 'Critical',
        vin: '1HGBH41JXMN109186',
        licensePlate: 'ABC-1234'
    },
    {
        id: 2,
        deviceId: 9,
        make: 'Honda',
        model: 'Accord',
        year: 2019,
        mileage: '48,230 mi',
        lastService: '10/20/2024',
        status: 'Warning',
        vin: '2HGFC2F59MH501234',
        licensePlate: 'XYZ-5678'
    },
    {
        id: 3,
        deviceId: 5,
        make: 'Ford',
        model: 'F-150',
        year: 2021,
        mileage: '22,100 mi',
        lastService: '12/01/2024',
        status: 'Healthy',
        vin: '1FTEW1EP5MKE12345',
        licensePlate: 'DEF-9012'
    },
    {
        id: 4,
        deviceId: 15,
        make: 'Chevrolet',
        model: 'Silverado',
        year: 2018,
        mileage: '67,890 mi',
        lastService: '09/10/2024',
        status: 'Service Due',
        vin: '3GCUKREC1JG123456',
        licensePlate: 'GHI-3456'
    }
];

export const mockAppointments = [
    {
        id: 1,
        date: 'WED, DEC 18',
        time: '10:00 AM',
        location: 'AutoCare Center - Downtown',
        service: 'Battery Replacement & Diagnostic',
        status: 'scheduled' as const,
        vehicleId: 1,
        vehicle: {
            make: 'Toyota',
            model: 'Camry',
            year: 2020
        }
    },
    {
        id: 2,
        date: 'THU, DEC 19',
        time: '2:00 PM',
        location: 'Premium Auto Service',
        service: 'Engine Temperature Check',
        status: 'scheduled' as const,
        vehicleId: 2,
        vehicle: {
            make: 'Honda',
            model: 'Accord',
            year: 2019
        }
    },
    {
        id: 3,
        date: 'FRI, DEC 20',
        time: '11:30 AM',
        location: 'Quick Fix Auto',
        service: 'Oil Change & Filter',
        status: 'scheduled' as const,
        vehicleId: 3,
        vehicle: {
            make: 'Ford',
            model: 'F-150',
            year: 2021
        }
    },
    {
        id: 4,
        date: 'MON, DEC 9',
        time: '9:00 AM',
        location: 'AutoCare Center - Downtown',
        service: 'Tire Rotation',
        status: 'completed' as const,
        vehicleId: 4,
        vehicle: {
            make: 'Chevrolet',
            model: 'Silverado',
            year: 2018
        }
    }
];
