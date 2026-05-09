import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Navbar } from '../components/Navbar/Navbar';
import { GISMap } from '../components/GISMap/GISMap';
import { NodeTicker } from '../components/NodeTicker/NodeTicker';
import { LSTMForecast } from '../components/LSTMForecast/LSTMForecast';
import { PolicyPanel } from '../components/PolicyPanel/PolicyPanel';
import { LoginPage } from '../components/Auth/LoginPage';
import { PublicDashboard } from '../components/Dashboard/PublicDashboard';
import { IOT_NODES, FORECAST_DATA, POLICY_ALERTS } from '../data/mockData';

expect.extend(toHaveNoViolations);

// Mock Recharts to avoid SVG rendering issues in jsdom
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="recharts-container">{children}</div>
  ),
  AreaChart: () => <div data-testid="area-chart" />,
  Area: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  ReferenceLine: () => null,
}));

// Mock LiveClock to avoid setInterval in tests
vi.mock('../components/Navbar/LiveClock', () => ({
  LiveClock: () => <div aria-label="Current date and time">12:00:00</div>,
}));

/**
 * Accessibility Tests (WCAG AA)
 * Validates: Requirements 7.4, 7.5
 *
 * These tests verify that each component and the full Dashboard
 * have zero WCAG AA accessibility violations using jest-axe.
 */
describe('Accessibility Tests (WCAG AA)', () => {
  it('Navbar has no accessibility violations', async () => {
    const { container } = render(
      <Navbar activeCity="tangerang" onCityChange={vi.fn()} onExportReport={vi.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('GISMap has no accessibility violations', async () => {
    const { container } = render(
      <GISMap
        nodes={IOT_NODES}
        selectedNodeId={null}
        onNodeSelect={vi.fn()}
        activeCity="tangerang"
        isLoading={false}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('GISMap with selected node has no accessibility violations', async () => {
    const { container } = render(
      <GISMap
        nodes={IOT_NODES}
        selectedNodeId="NODE-001"
        onNodeSelect={vi.fn()}
        activeCity="tangerang"
        isLoading={false}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('NodeTicker has no accessibility violations', async () => {
    const { container } = render(
      <NodeTicker nodes={IOT_NODES} selectedNodeId={null} onNodeSelect={vi.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('LSTMForecast has no accessibility violations', async () => {
    const { container } = render(
      <LSTMForecast forecastData={FORECAST_DATA} isLoading={false} error={null} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('LSTMForecast error state has no accessibility violations', async () => {
    const { container } = render(
      <LSTMForecast
        forecastData={[]}
        isLoading={false}
        error="Gagal memuat prediksi AI. Silakan coba lagi."
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('PolicyPanel has no accessibility violations', async () => {
    const { container } = render(
      <PolicyPanel alerts={POLICY_ALERTS} isLoading={false} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('PolicyPanel empty state has no accessibility violations', async () => {
    const { container } = render(
      <PolicyPanel alerts={[]} isLoading={false} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('LoginPage has no accessibility violations', async () => {
    const { container } = render(
      <LoginPage onLogin={vi.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('PublicDashboard has no accessibility violations', async () => {
    const { container } = render(
      <PublicDashboard onLogout={vi.fn()} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
