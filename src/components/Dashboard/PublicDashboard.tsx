import { useState, useEffect, useCallback } from 'react';
import { PublicNavbar } from '../Navbar/PublicNavbar';
import { MainLayout } from './MainLayout';
import { GISMap } from '../GISMap/GISMap';
import { NodeTicker } from '../NodeTicker/NodeTicker';
import { PublicForecast } from '../LSTMForecast/PublicForecast';
import { PublicPolicyPanel } from '../PolicyPanel/PublicPolicyPanel';
import { CITIES } from '../../data/mockData';
import { fetchNodes } from '../../api/nodeService';
import { fetchForecast } from '../../api/forecastService';
import { fetchPublicAdvices } from '../../api/policyService';
import type { IoTNode, ForecastDataPoint, PublicHealthAdvice } from '../../types';

interface PublicDashboardProps {
  onLogout: () => void;
}

export function PublicDashboard({ onLogout }: PublicDashboardProps) {
  const [activeCity, setActiveCity] = useState<string>(CITIES[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const [nodes, setNodes] = useState<IoTNode[]>([]);
  const [forecastData, setForecastData] = useState<ForecastDataPoint[]>([]);
  const [advices, setAdvices] = useState<PublicHealthAdvice[]>([]);

  const [nodesLoading, setNodesLoading] = useState(true);
  const [forecastLoading, setForecastLoading] = useState(true);
  const [advicesLoading, setAdvicesLoading] = useState(true);
  const [forecastError, setForecastError] = useState<string | null>(null);

  // ── Load data whenever city changes ──────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    setNodesLoading(true);
    setForecastLoading(true);
    setAdvicesLoading(true);
    setForecastError(null);
    setSelectedNodeId(null);

    fetchNodes(activeCity)
      .then((data) => { if (!cancelled) { setNodes(data); setNodesLoading(false); } })
      .catch(() => { if (!cancelled) setNodesLoading(false); });

    fetchForecast(activeCity)
      .then((data) => { if (!cancelled) { setForecastData(data); setForecastLoading(false); } })
      .catch(() => {
        if (!cancelled) {
          setForecastError('Gagal memuat data. Silakan coba lagi nanti.');
          setForecastLoading(false);
        }
      });

    fetchPublicAdvices(activeCity)
      .then((data) => { if (!cancelled) { setAdvices(data); setAdvicesLoading(false); } })
      .catch(() => { if (!cancelled) setAdvicesLoading(false); });

    return () => { cancelled = true; };
  }, [activeCity]);

  const handleCityChange = useCallback((cityId: string) => {
    setActiveCity(cityId);
  }, []);

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  }, []);

  const leftColumn = (
    <>
      <div className="flex-1 min-h-0">
        <GISMap
          nodes={nodes}
          selectedNodeId={selectedNodeId}
          onNodeSelect={handleNodeSelect}
          activeCity={activeCity}
          isLoading={nodesLoading}
        />
      </div>
      <NodeTicker
        nodes={nodes}
        selectedNodeId={selectedNodeId}
        onNodeSelect={handleNodeSelect}
      />
    </>
  );

  const rightColumn = (
    <>
      <PublicForecast
        forecastData={forecastData}
        isLoading={forecastLoading}
        error={forecastError}
      />
      <PublicPolicyPanel
        advices={advices}
        isLoading={advicesLoading}
      />
    </>
  );

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col text-white">
      <PublicNavbar
        activeCity={activeCity}
        onCityChange={handleCityChange}
        onLogout={onLogout}
      />
      <MainLayout
        leftColumn={leftColumn}
        rightColumn={rightColumn}
      />
    </div>
  );
}

export default PublicDashboard;
