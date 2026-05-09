import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '../Navbar/Navbar';
import { MainLayout } from './MainLayout';
import { GISMap } from '../GISMap/GISMap';
import { NodeTicker } from '../NodeTicker/NodeTicker';
import { LSTMForecast } from '../LSTMForecast/LSTMForecast';
import { PolicyPanel } from '../PolicyPanel/PolicyPanel';
import { Toast } from '../shared/Toast';
import { CITIES } from '../../data/mockData';
import { fetchNodes } from '../../api/nodeService';
import { fetchForecast } from '../../api/forecastService';
import { fetchAlerts } from '../../api/policyService';
import { exportPDFReport } from '../../utils/pdfExport';
import type { IoTNode, ForecastDataPoint, AlertCard } from '../../types';

interface DashboardProps {
  onLogout?: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeCity, setActiveCity] = useState<string>(CITIES[0].id);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const [nodes, setNodes] = useState<IoTNode[]>([]);
  const [forecastData, setForecastData] = useState<ForecastDataPoint[]>([]);
  const [alerts, setAlerts] = useState<AlertCard[]>([]);

  const [nodesLoading, setNodesLoading] = useState(true);
  const [forecastLoading, setForecastLoading] = useState(true);
  const [alertsLoading, setAlertsLoading] = useState(true);
  const [forecastError, setForecastError] = useState<string | null>(null);

  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // ── Load data whenever city changes ─────────────────────────`─────────────
  useEffect(() => {
    let cancelled = false;

    setNodesLoading(true);
    setForecastLoading(true);
    setAlertsLoading(true);
    setForecastError(null);
    setSelectedNodeId(null);

    fetchNodes(activeCity)
      .then((data) => { if (!cancelled) { setNodes(data); setNodesLoading(false); } })
      .catch(() => { if (!cancelled) setNodesLoading(false); });

    fetchForecast(activeCity)
      .then((data) => { if (!cancelled) { setForecastData(data); setForecastLoading(false); } })
      .catch(() => {
        if (!cancelled) {
          setForecastError('Gagal memuat prediksi AI. Silakan coba lagi.');
          setForecastLoading(false);
        }
      });

    fetchAlerts(activeCity)
      .then((data) => { if (!cancelled) { setAlerts(data); setAlertsLoading(false); } })
      .catch(() => { if (!cancelled) setAlertsLoading(false); });

    return () => { cancelled = true; };
  }, [activeCity]);

  const handleCityChange = useCallback((cityId: string) => {
    setActiveCity(cityId);
  }, []);

  const handleNodeSelect = useCallback((nodeId: string) => {
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  }, []);

  const handleExportReport = useCallback(async () => {
    if (isExporting) return;
    setIsExporting(true);
    setToastMessage('Mempersiapkan laporan PDF kualitas udara...');
    setIsToastVisible(true);

    try {
      const city = CITIES.find((c) => c.id === activeCity) ?? CITIES[0];
      await exportPDFReport({ city, nodes, forecastData, alerts });
      setToastMessage('Laporan PDF berhasil diunduh!');
    } catch {
      setToastMessage('Gagal membuat laporan PDF. Silakan coba lagi.');
    } finally {
      setIsExporting(false);
      setTimeout(() => setIsToastVisible(false), 4000);
    }
  }, [activeCity, nodes, forecastData, alerts, isExporting]);

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
      {/* Wrap chart in a div with id so html2canvas can capture it */}
      <div id="forecast-chart-container">
        <LSTMForecast
          forecastData={forecastData}
          isLoading={forecastLoading}
          error={forecastError}
        />
      </div>
      <PolicyPanel
        alerts={alerts}
        isLoading={alertsLoading}
      />
    </>
  );

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col text-white">
      <Navbar
        activeCity={activeCity}
        onCityChange={handleCityChange}
        onExportReport={handleExportReport}
        onLogout={onLogout}
      />
      <MainLayout
        leftColumn={leftColumn}
        rightColumn={rightColumn}
      />
      <Toast
        message={toastMessage}
        isVisible={isToastVisible}
        onClose={() => setIsToastVisible(false)}
      />
    </div>
  );
}

export default Dashboard;
