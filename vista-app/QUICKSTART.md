# VISTA Quick Start Guide

## 🚀 Fast Setup (5 minutes)

### Step 1: Install Dependencies

```bash
cd vista-app
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Open Browser

Navigate to: **http://localhost:3000**

That's it! 🎉

## 📋 What to Explore

### 1. Landing Page

- Overview of all features
- Quick navigation cards

### 2. Dashboard (`/dashboard`)

- View critical alerts
- Monitor vehicle fleet
- Quick action buttons

### 3. Vehicles (`/vehicles`)

- Browse all vehicles
- Search and filter
- Click any vehicle for details

### 4. Vehicle Detail (`/vehicles/[id]`)

- Live sensor readings
- Active alerts
- Service history
- Book maintenance

### 5. Schedule Service (`/schedule`)

- Select vehicle
- Choose date & time
- Book appointment
- Manage existing appointments

### 6. AI Insights (`/ai-insights`)

- Predictive maintenance recommendations
- Cost estimates
- Confidence scores
- Filter by type and severity

## 🔄 Regenerate ML Predictions

If you want to run the Python ML model:

```bash
cd model
python data_analysis_agent.py
```

This analyzes `telemetry_sampled.csv` and creates fresh predictions.

## 🎨 Customization

### Add New Vehicles

Edit `src/lib/mockData.ts`:

```typescript
export const mockVehicles: Vehicle[] = [
  {
    id: 5, // New unique ID
    deviceId: 15, // Must match ML model device_id
    name: "Your Vehicle",
    model: "Model Name",
    year: 2024,
    licensePlate: "ABC 123",
    vin: "VIN123456789",
    lastService: "2024-12-01",
    nextService: "2025-03-01",
    mileage: 10000,
    fuelLevel: 80,
  },
  // ... existing vehicles
];
```

### Modify Sensor Thresholds

Edit `src/lib/mockData.ts`:

```typescript
export const sensorThresholds = {
  cTemp: { min: 70, max: 110, unit: "°C", name: "Coolant Temperature" },
  // Adjust values as needed
};
```

### Add AI Recommendations

Edit `src/lib/mockData.ts`:

```typescript
export const mockAIRecommendations: AIRecommendation[] = [
  {
    id: 7, // New unique ID
    vehicleId: 1,
    deviceId: 12,
    type: "maintenance",
    severity: "WARNING",
    title: "Your Custom Recommendation",
    description: "Details about the issue...",
    confidence: 85,
    suggestedAction: "What to do...",
    // ... other fields
  },
];
```

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Use a different port
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

### Python ML Model Issues

```bash
# Install Python dependencies
pip install pandas
```

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🔧 Development Tips

### Hot Reload

- Changes auto-reload in development
- Edit any `.tsx` or `.ts` file and see instant updates

### Component Structure

- `src/app/` - Pages (one folder per route)
- `src/components/` - Reusable UI components
- `src/lib/` - Utilities and mock data
- `src/types/` - TypeScript definitions

### Adding New Pages

1. Create folder in `src/app/new-page/`
2. Add `page.tsx` file
3. Wrap content in `<AppLayout>`
4. Add navigation link in `AppLayout.tsx`

### API Routes

Create new endpoints in `src/app/api/`:

```typescript
// src/app/api/my-endpoint/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello!" });
}
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## ✅ Checklist

- [x] Project created
- [x] Dependencies installed
- [x] Development server running
- [ ] Explore all pages
- [ ] Customize mock data
- [ ] Add your own vehicles
- [ ] Test booking appointments
- [ ] Review AI insights
- [ ] Check ML predictions

---

**Happy coding! 🚗💨**
