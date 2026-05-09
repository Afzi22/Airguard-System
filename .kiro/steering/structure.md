# Project Structure

## Directory Layout

```
src/
├── api/                        # API service stubs (swap mockData → real endpoints here)
│   ├── apiClient.ts            # Base fetch config (timeout, interceptors)
│   ├── nodeService.ts          # fetchNodes()
│   ├── forecastService.ts      # fetchForecast()
│   └── policyService.ts        # fetchAlerts()
├── components/
│   ├── Navbar/
│   │   ├── Navbar.tsx          # Top bar: logo, city selector, clock, status, export button
│   │   ├── CitySelector.tsx    # Searchable dropdown for 7 cities
│   │   ├── LiveClock.tsx       # setInterval-based live clock
│   │   └── StatusIndicator.tsx # "AI Engine: Online" / "IoT Nodes: 45 Active"
│   ├── GISMap/
│   │   ├── GISMap.tsx          # Map container, manages isHeatmapActive state
│   │   ├── MapPlaceholder.tsx  # Visual map area (no external lib dependency)
│   │   ├── NodePin.tsx         # AQI-colored badge + tooltip on selection
│   │   ├── HeatmapToggle.tsx   # Toggle switch for heatmap overlay
│   │   └── MapControls.tsx     # Floating zoom-in / zoom-out / recenter buttons
│   ├── NodeTicker/
│   │   ├── NodeTicker.tsx      # Horizontal row of NodeCards below the map
│   │   └── NodeCard.tsx        # Mini card: Node ID, PM2.5, status color
│   ├── LSTMForecast/
│   │   ├── LSTMForecast.tsx    # Card wrapper: title, loading/error states
│   │   └── ForecastChart.tsx   # Recharts AreaChart with hazard threshold line
│   ├── PolicyPanel/
│   │   ├── PolicyPanel.tsx     # Alert list + empty state
│   │   └── AlertCard.tsx       # Severity-colored card with icon
│   ├── Dashboard/
│   │   ├── Dashboard.tsx       # Root layout, owns activeCity / selectedNodeId state
│   │   └── MainLayout.tsx      # CSS Grid 65/35 split, responsive stacking < 1024px
│   └── shared/
│       ├── GlassCard.tsx       # Reusable glassmorphism wrapper
│       ├── SkeletonLoader.tsx  # Dark-mode pulse skeleton
│       ├── Toast.tsx           # Corner notification toast
│       └── ErrorBoundary.tsx   # Global error boundary (class component)
├── data/
│   └── mockData.ts             # CITIES, IOT_NODES, FORECAST_DATA, POLICY_ALERTS
├── types/
│   └── index.ts                # AQILevel, NodeStatus, AlertSeverity, IoTNode, ForecastDataPoint, AlertCard, CityConfig
├── utils/
│   └── aqiUtils.ts             # getAQILevel, getAQIColor, getStatusColor, getSeverityColor
└── App.tsx                     # Mounts <ErrorBoundary><Dashboard /></ErrorBoundary>
```

## Architecture Patterns

- **Presentational / Container split**: `Dashboard.tsx` owns shared state (`activeCity`, `selectedNodeId`); leaf components are pure/presentational.
- **Centralized mock data**: All dummy data lives in `mockData.ts`. Components never hardcode data — they receive it via props. Replacing with real API calls only requires updating the `api/` layer.
- **One component per file**: Each component has its own file. No barrel re-exports unless explicitly needed.
- **Shared state flow**: `activeCity` and `selectedNodeId` flow down as props; callbacks (`onCityChange`, `onNodeSelect`) flow up to `Dashboard.tsx`.
- **Error isolation**: `ErrorBoundary` wraps the full dashboard so a single component crash doesn't break the rest of the UI.
- **Loading/error state pattern**: Every data-fetching component manages its own `isLoading` and `error` state; renders `SkeletonLoader` or an inline error message accordingly.

## Naming Conventions

- Components: `PascalCase` filenames and function names
- Utilities / services: `camelCase` filenames
- Types / interfaces: `PascalCase`; union string literals use `'PascalCase'` values (e.g., `'Critical' | 'Warning' | 'Insight'`)
- Test files: co-located or in `__tests__/`, named `ComponentName.test.tsx`
