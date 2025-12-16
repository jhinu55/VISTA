# VISTA - Vehicle Intelligence System for Telematics & Analytics

A production-ready full-stack vehicle health monitoring application with ML-powered predictive maintenance, built with Next.js 15, React 19, and TypeScript.

![VISTA Dashboard](./docs/dashboard-preview.png)

## 🚗 Overview

VISTA is an intelligent vehicle telematics platform that uses machine learning to detect anomalies, predict maintenance needs, and provide AI-driven recommendations for vehicle fleet management.

### Key Features

- **Real-time Anomaly Detection**: Multi-tier ML algorithm detecting threshold violations, rate-of-change anomalies, and pattern-based failures
- **Predictive Maintenance**: AI-powered recommendations to prevent breakdowns before they occur
- **Fleet Management Dashboard**: Monitor multiple vehicles with comprehensive health metrics
- **Intelligent Scheduling**: Book service appointments with smart slot management
- **Sensor Monitoring**: Live tracking of 6 critical vehicle sensors (temperature, RPM, battery, etc.)
- **Historical Analytics**: Track service history and maintenance patterns

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend**: Next.js API Routes (Node.js)
- **ML Model**: Python 3.x with Pandas
- **Data Format**: JSON (ML outputs), CSV (telemetry data)

### Project Structure

```
vista-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── predictions/   # ML predictions endpoint
│   │   │   ├── appointments/  # Appointment management
│   │   │   ├── vehicles/      # Vehicle data
│   │   │   ├── ai-recommendations/
│   │   │   └── time-slots/    # Scheduling slots
│   │   ├── dashboard/         # Main dashboard
│   │   ├── vehicles/          # Vehicle list & details
│   │   │   └── [id]/         # Dynamic vehicle detail page
│   │   ├── schedule/          # Appointment booking
│   │   ├── ai-insights/       # AI recommendations
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable React components
│   │   ├── AppLayout.tsx      # Main app layout with nav
│   │   ├── AlertCard.tsx      # Alert display component
│   │   └── VehicleCard.tsx    # Vehicle summary card
│   ├── lib/                   # Utility functions & mock data
│   │   ├── mockData.ts        # Mock vehicles, appointments, AI recs
│   │   └── utils.ts           # Helper functions
│   └── types/                 # TypeScript type definitions
│       └── index.ts           # All type interfaces
├── model/                     # Python ML model files
│   ├── data_analysis_agent.py # ML anomaly detection engine
│   ├── detected_anomalies.json # ML output (predictions)
│   ├── telemetry_sampled.csv  # Sample sensor data
│   └── generate_alerts.py     # Alert generation script
├── public/                    # Static assets
├── package.json               # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind CSS config
└── next.config.js            # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Python 3.8+ (for ML model)
- Git

### Installation

1. **Clone the repository**

   ```bash
   cd vista-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Running the ML Model (Optional)

To regenerate predictions from fresh telemetry data:

```bash
cd model
python data_analysis_agent.py
```

This will analyze `telemetry_sampled.csv` and generate a new `detected_anomalies.json` file.

## 📊 Data Flow

```
1. Vehicle Sensors → Telemetry Data (CSV)
2. Python ML Agent → Anomaly Detection → Predictions (JSON)
3. Next.js API Routes → Read Predictions → Serve to Frontend
4. React Components → Display Alerts & Insights → User Interface
```

## 🧠 ML Model Logic

### Three-Tier Anomaly Detection

1. **Threshold-Based Detection**

   - Monitors sensor values against predefined safe ranges
   - Example: Battery < 11.5V or Coolant Temp > 110°C

2. **Rate-of-Change Detection**

   - Identifies rapid fluctuations between consecutive readings
   - Example: Engine RPM changes by >1500 in one reading

3. **Pattern-Based Detection**
   - Multi-sensor correlation analysis
   - **Alternator Failure**: Battery < 12.5V AND RPM > 2000
   - **Transmission Slip**: RPM > 4000 AND Speed < 60 km/h
   - **Engine Overload**: Load > 80% AND Air Flow < 3 g/s

### Alert Aggregation

- **Time-Windowed Clustering**: Groups anomalies within 120-second windows
- **Severity Escalation**: Takes highest severity from aggregated anomalies
- **Deduplication**: Prevents alert flooding by consolidating similar events

### Sensor Thresholds

| Sensor              | Safe Min | Safe Max | Unit |
| ------------------- | -------- | -------- | ---- |
| Coolant Temperature | 70       | 110      | °C   |
| Engine RPM          | 500      | 6500     | RPM  |
| Vehicle Speed       | 0        | 200      | km/h |
| Engine Load         | 10       | 90       | %    |
| Mass Air Flow       | 2        | 15       | g/s  |
| Battery Voltage     | 11.5     | 14.5     | V    |

## 🎨 Features Walkthrough

### 1. Dashboard

- Overview of all vehicles and critical alerts
- Quick stats: Critical alerts, warnings, healthy vehicles
- Urgent alerts feed with severity indicators
- Fleet health summary

### 2. Vehicles

- Grid view of all vehicles with health scores
- Search and filter capabilities
- Color-coded status indicators
- Mileage and fuel level tracking

### 3. Vehicle Detail Page

- Live sensor readings with normal ranges
- Complete alert history with diagnostics
- Service appointment history
- System health breakdown
- Quick action buttons

### 4. Schedule Service

- Interactive appointment booking
- Available time slot selection
- Service type categorization
- Upcoming appointments management
- Complete service history

### 5. AI Insights

- AI-generated maintenance recommendations
- Confidence scores for each prediction
- Cost estimates for repairs
- Due date tracking
- Affected system indicators
- Filter by type (maintenance/driving/anomaly)
- Filter by severity

## 🔧 Configuration

### Device ID Mapping

Ensure frontend vehicles match ML model device IDs:

```typescript
// src/lib/mockData.ts
{
  id: 1,                    // Frontend ID
  deviceId: 12,            // MUST match ML model device_id
  name: 'Toyota Camry',
  // ... other properties
}
```

### Adding New Vehicles

1. Add vehicle to `mockData.ts` with unique `deviceId`
2. Ensure ML model generates predictions for that `device_id`
3. Vehicle will automatically appear in dashboard

## 📱 Responsive Design

- **Desktop**: Full-featured dashboard with side-by-side layouts
- **Tablet**: Optimized grid layouts
- **Mobile**: Bottom navigation bar, stacked views

## 🔐 API Endpoints

| Endpoint                  | Method            | Description             |
| ------------------------- | ----------------- | ----------------------- |
| `/api/predictions`        | GET               | Fetch ML predictions    |
| `/api/vehicles`           | GET               | Get vehicle list        |
| `/api/appointments`       | GET, POST, DELETE | Manage appointments     |
| `/api/ai-recommendations` | GET               | AI insights             |
| `/api/time-slots`         | GET               | Available booking slots |

## 🧪 Mock Data

The application includes comprehensive mock data for demonstration:

- 4 vehicles with realistic specifications
- Historical service appointments
- 6 AI-generated recommendations
- 14 days of available time slots

To use with real data:

1. Replace mock data in `src/lib/mockData.ts`
2. Update API routes to fetch from database
3. Ensure device ID consistency

## 🎯 Production Considerations

### Before Deployment

- [ ] Replace mock data with database integration
- [ ] Add authentication/authorization
- [ ] Implement real-time sensor data streaming
- [ ] Add error boundaries and logging
- [ ] Set up environment variables for API keys
- [ ] Configure CORS for production API
- [ ] Add rate limiting to API routes
- [ ] Implement data caching strategy

### Recommended Stack Additions

- **Database**: PostgreSQL or MongoDB
- **ORM**: Prisma or Mongoose
- **Auth**: NextAuth.js
- **Real-time**: Socket.io or Pusher
- **Monitoring**: Sentry
- **Analytics**: Vercel Analytics

## 📈 Performance

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Next.js Image component
- **API Response Caching**: Implement SWR or React Query
- **Lazy Loading**: Components load on-demand

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is built for educational and demonstration purposes.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons from [Lucide](https://lucide.dev/)
- ML algorithms inspired by automotive industry standards

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ for smarter vehicle management**
