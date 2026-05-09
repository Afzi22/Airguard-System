# AirGuard Dashboard — Product Overview

AirGuard Dashboard is a React-based web "Command Center" for Smart City air quality monitoring. It provides city operators with a unified real-time view of:

- **IoT sensor data** from physical nodes measuring PM2.5 and AQI across multiple cities
- **Interactive GIS map** showing spatial distribution of IoT nodes with AQI-based color coding
- **48-hour AQI forecast** powered by an LSTM model, rendered as an area chart
- **Automated policy recommendations** (Critical / Warning / Insight alerts) derived from forecast data

### Target Users
City operators monitoring air quality across: Tangerang, Tangerang Selatan, Cikarang, Depok, Bekasi, Hanoi, Ho Chi Minh City.

### Key Domain Concepts
- **AQI ≤ 50** = Good (emerald green), **51–100** = Moderate (amber), **> 100** = Unhealthy (rose red)
- **IoT Node statuses**: Active (green), Warning (amber), Offline (red)
- **Alert severities**: Critical (rose), Warning (amber), Insight (emerald)
- All data is currently served from centralized mock data (`mockData.ts`), designed to be swapped for real API responses without changing component logic.

### Design Theme
Dark "Command Center" with glassmorphism cards (`backdrop-blur`, transparency, subtle borders on `bg-slate-900` background).
