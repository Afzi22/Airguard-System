import { useEffect, useRef } from 'react';
import type { IoTNode } from '../../types/index';
import { getAQIColor } from '../../utils/aqiUtils';

// Leaflet CSS must be imported once globally — we do it here
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  nodes: IoTNode[];
  selectedNodeId: string | null;
  onNodeSelect: (nodeId: string) => void;
  center: [number, number];
  zoom: number;
  isHeatmapActive: boolean;
}

const AQI_HEX: Record<string, string> = {
  emerald: '#34d399',
  amber:   '#fbbf24',
  rose:    '#fb7185',
};

export function LeafletMap({
  nodes,
  selectedNodeId,
  onNodeSelect,
  center,
  zoom,
  isHeatmapActive,
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markersRef = useRef<Map<string, any>>(new Map());
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const heatLayerRef = useRef<any>(null);

  // ── Initialize map once ──────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Dynamic import so SSR / test environments don't break
    import('leaflet').then((L) => {
      const map = L.map(containerRef.current!, {
        center,
        zoom,
        zoomControl: false, // We use our own controls
        attributionControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapRef.current = map;
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Fly to new city center when center/zoom changes ──────────────────────
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom]);

  // ── Render node markers ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return;

    import('leaflet').then((L) => {
      // Remove old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();

      nodes.forEach((node) => {
        const color = getAQIColor(node.aqi);
        const hex = AQI_HEX[color];
        const isSelected = node.id === selectedNodeId;

        const icon = L.divIcon({
          className: '',
          html: `
            <div style="
              width:${isSelected ? 48 : 40}px;
              height:${isSelected ? 48 : 40}px;
              background:${hex};
              border-radius:50%;
              border:${isSelected ? '3px solid white' : '2px solid rgba(255,255,255,0.4)'};
              display:flex;
              align-items:center;
              justify-content:center;
              font-size:11px;
              font-weight:700;
              color:#0f172a;
              box-shadow:0 0 ${isSelected ? 12 : 6}px ${hex}88;
              transition:all 0.2s;
            ">${node.aqi}</div>
          `,
          iconSize: [isSelected ? 48 : 40, isSelected ? 48 : 40],
          iconAnchor: [isSelected ? 24 : 20, isSelected ? 24 : 20],
        });

        const marker = L.marker([node.coordinates.lat, node.coordinates.lng], { icon });

        const popupContent = `
          <div style="font-family:monospace;min-width:160px;background:#1e293b;color:#f1f5f9;padding:10px 12px;border-radius:8px;border:1px solid #334155;">
            <div style="font-weight:700;margin-bottom:6px;color:#fff">${node.name}</div>
            <div style="font-size:12px;color:#94a3b8">Node ID: <span style="color:#fff">${node.id}</span></div>
            <div style="font-size:12px;color:#94a3b8">AQI: <span style="color:${hex};font-weight:600">${node.aqi}</span></div>
            <div style="font-size:12px;color:#94a3b8">PM2.5: <span style="color:#fff">${node.pm25} µg/m³</span></div>
            <div style="font-size:12px;color:#94a3b8">Status: <span style="color:${hex}">${node.status}</span></div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          className: 'airguard-popup',
          closeButton: false,
          offset: [0, -10],
        });

        marker.on('click', () => {
          onNodeSelect(node.id);
          marker.openPopup();
        });

        marker.addTo(mapRef.current);
        markersRef.current.set(node.id, marker);
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, selectedNodeId]);

  // ── Pan to selected node ─────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || !selectedNodeId) return;
    const node = nodes.find((n) => n.id === selectedNodeId);
    if (node) {
      mapRef.current.panTo([node.coordinates.lat, node.coordinates.lng], { animate: true, duration: 0.8 });
      const marker = markersRef.current.get(selectedNodeId);
      if (marker) marker.openPopup();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNodeId]);

  // ── Heatmap overlay (CSS radial gradients — no extra plugin needed) ──────
  useEffect(() => {
    if (!mapRef.current) return;

    import('leaflet').then((L) => {
      // Remove existing heat layer
      if (heatLayerRef.current) {
        heatLayerRef.current.remove();
        heatLayerRef.current = null;
      }

      if (!isHeatmapActive || nodes.length === 0) return;

      // Build SVG-based heatmap overlay using node positions
      const bounds = L.latLngBounds(nodes.map((n) => [n.coordinates.lat, n.coordinates.lng]));
      bounds.pad(0.3);

      // Create a canvas overlay for the heatmap
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 400;
      const ctx = canvas.getContext('2d')!;

      // Map lat/lng to canvas coordinates
      const mapBounds = bounds;
      const toCanvas = (lat: number, lng: number) => {
        const x = ((lng - mapBounds.getWest()) / (mapBounds.getEast() - mapBounds.getWest())) * canvas.width;
        const y = ((mapBounds.getNorth() - lat) / (mapBounds.getNorth() - mapBounds.getSouth())) * canvas.height;
        return { x, y };
      };

      nodes.forEach((node) => {
        const { x, y } = toCanvas(node.coordinates.lat, node.coordinates.lng);
        const color = getAQIColor(node.aqi);
        const hex = AQI_HEX[color];
        const radius = 80 + (node.aqi / 200) * 60;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, hex + '66');
        gradient.addColorStop(1, hex + '00');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      const imageUrl = canvas.toDataURL();
      const overlay = L.imageOverlay(imageUrl, bounds, { opacity: 0.6 });
      overlay.addTo(mapRef.current);
      heatLayerRef.current = overlay;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHeatmapActive, nodes]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[400px] rounded-xl overflow-hidden"
      aria-label="Interactive GIS map"
      role="application"
    />
  );
}

export default LeafletMap;
