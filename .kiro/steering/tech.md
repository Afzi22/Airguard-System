# Tech Stack & Build System

## Core Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS (dark theme, custom colors: emerald, amber, rose, slate) |
| Icons | Lucide React |
| Data Visualization | Recharts (`AreaChart`, `LineChart`, `ReferenceLine`, `Tooltip`) |
| Map | Placeholder UI (Mapbox GL / Leaflet integration optional) |

## Testing

| Purpose | Library |
|---|---|
| Unit & Integration | Vitest + React Testing Library |
| Property-Based Testing | `fast-check` |
| Accessibility | `jest-axe` |
| Snapshots | Vitest built-in |

- Test environment: `jsdom`
- PBT minimum: **100 iterations** per property (`numRuns: 100`)
- Coverage target: ≥ 80% line coverage for all components

## Common Commands

```bash
# Start dev server
npm run dev

# Run tests (single pass, no watch)
npx vitest --run

# Run tests with coverage
npx vitest --run --coverage

# Build for production
npm run build

# Type check
npx tsc --noEmit
```

## Key Configuration Files

- `vite.config.ts` — Vite + React plugin setup
- `vitest.config.ts` — jsdom environment, jest-axe setup file
- `tailwind.config.ts` — custom color tokens (emerald, amber, rose, slate palette)
- `tsconfig.json` — strict TypeScript config
- `src/types/index.ts` — all shared TypeScript types/interfaces
- `src/data/mockData.ts` — centralized dummy data (single source of truth for all components)
