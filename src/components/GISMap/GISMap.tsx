import { useState, useCallback } from 'react';
import type { IoTNode } from '../../types/index';
import { LeafletMap } from './LeafletMap';
import { HeatmapToggle } from './HeatmapToggle';
import { MapControls } from './MapControls';
import { SkeletonLoader } from '../shared/SkeletonLoader';
import { CITIES } from '../../data/mockData';

interface GISMapProps {
  nodes: IoTNode[];
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
  activeCity: string;
  isLoading?: boolean;
}

const DEFAULT_ZOOM = 13;
const MIN_ZOOM = 5;
const MAX_ZOOM = 18;

function getCityCenter(cityId: string): [number, number] {
  const city = CITIES.find((c) => c.id === cityId);
  if (city) return [city.coordinates.lat, city.coordinates.lng];
  return [-6.1781, 106.6297]; // fallback: Tangerang
}

export function GISMap({
  nodes,
  selectedNodeId,
  onNodeSelect,
  activeCity,
  isLoading = false,
}: GISMapProps) {
  const [isHeatmapActive, setIsHeatmapActive] = useState(false);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);

  const center = getCityCenter(activeCity);

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 1, MAX_ZOOM));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - 1, MIN_ZOOM));
  }, []);

  const handleRecenter = useCallback(() => {
    setZoom(DEFAULT_ZOOM);
  }, []);

  if (isLoading) {
    return <SkeletonLoader height="h-full" className="min-h-[400px] rounded-xl" />;
  }

  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* Real Leaflet map */}
      <LeafletMap
        nodes={nodes}
        selectedNodeId={selectedNodeId}
        onNodeSelect={onNodeSelect}
        center={center}
        zoom={zoom}
        isHeatmapActive={isHeatmapActive}
      />

      {/* Heatmap toggle — floats over map */}
      <div className="absolute top-4 left-4 z-[1000] bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg px-3 py-2 shadow-lg">
        <HeatmapToggle
          isActive={isHeatmapActive}
          onToggle={() => setIsHeatmapActive((prev) => !prev)}
        />
      </div>

      {/* Map controls — floats over map */}
      <div className="absolute top-4 right-4 z-[1000]">
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onRecenter={handleRecenter}
        />
      </div>
    </div>
  );
}

export default GISMap;
