import type { CityConfig, IoTNode, ForecastDataPoint, AlertCard, PublicHealthAdvice } from '../types/index';

// ─── Cities ───────────────────────────────────────────────────────────────────

export const CITIES: CityConfig[] = [
  { id: 'tangerang',  name: 'Tangerang',          coordinates: { lat: -6.1781,  lng: 106.6297 } },
  { id: 'tangsel',    name: 'Tangerang Selatan',   coordinates: { lat: -6.2882,  lng: 106.7133 } },
  { id: 'cikarang',   name: 'Cikarang',            coordinates: { lat: -6.2615,  lng: 107.1535 } },
  { id: 'depok',      name: 'Depok',               coordinates: { lat: -6.4025,  lng: 106.7942 } },
  { id: 'bekasi',     name: 'Bekasi',              coordinates: { lat: -6.2349,  lng: 106.9896 } },
  { id: 'hanoi',      name: 'Hanoi',               coordinates: { lat: 21.0285,  lng: 105.8542 } },
  { id: 'hcmc',       name: 'Ho Chi Minh City',    coordinates: { lat: 10.8231,  lng: 106.6297 } },
];

// ─── IoT Nodes per city ───────────────────────────────────────────────────────

const NODES_BY_CITY: Record<string, IoTNode[]> = {
  tangerang: [
    { id: 'TNG-001', name: 'Stasiun Pusat Tangerang',    coordinates: { lat: -6.1781, lng: 106.6297 }, aqi: 42,  pm25: 12.3, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'TNG-002', name: 'Kawasan Industri Jatake',    coordinates: { lat: -6.1900, lng: 106.6450 }, aqi: 87,  pm25: 35.6, status: 'Warning', lastUpdated: new Date().toISOString() },
    { id: 'TNG-003', name: 'Persimpangan Cikokol',       coordinates: { lat: -6.1650, lng: 106.6150 }, aqi: 134, pm25: 58.2, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'TNG-004', name: 'Taman Kota Tangerang',       coordinates: { lat: -6.1720, lng: 106.6380 }, aqi: 38,  pm25: 10.1, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'TNG-005', name: 'Terminal Poris Plawad',      coordinates: { lat: -6.1850, lng: 106.6200 }, aqi: 110, pm25: 47.8, status: 'Offline', lastUpdated: new Date().toISOString() },
  ],
  tangsel: [
    { id: 'TSL-001', name: 'BSD City Center',            coordinates: { lat: -6.2882, lng: 106.7133 }, aqi: 55,  pm25: 18.4, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'TSL-002', name: 'Pamulang Square',            coordinates: { lat: -6.3200, lng: 106.7300 }, aqi: 92,  pm25: 38.9, status: 'Warning', lastUpdated: new Date().toISOString() },
    { id: 'TSL-003', name: 'Serpong Utara',              coordinates: { lat: -6.2650, lng: 106.6950 }, aqi: 148, pm25: 65.1, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'TSL-004', name: 'Ciputat Timur',              coordinates: { lat: -6.3050, lng: 106.7500 }, aqi: 44,  pm25: 13.7, status: 'Active',  lastUpdated: new Date().toISOString() },
  ],
  cikarang: [
    { id: 'CKR-001', name: 'Kawasan Industri EJIP',      coordinates: { lat: -6.2615, lng: 107.1535 }, aqi: 162, pm25: 72.4, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'CKR-002', name: 'Cikarang Barat',             coordinates: { lat: -6.2500, lng: 107.1200 }, aqi: 118, pm25: 51.3, status: 'Warning', lastUpdated: new Date().toISOString() },
    { id: 'CKR-003', name: 'Lippo Cikarang',             coordinates: { lat: -6.2750, lng: 107.1650 }, aqi: 78,  pm25: 31.2, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'CKR-004', name: 'Cikarang Selatan',           coordinates: { lat: -6.2900, lng: 107.1400 }, aqi: 35,  pm25: 9.8,  status: 'Active',  lastUpdated: new Date().toISOString() },
  ],
  depok: [
    { id: 'DPK-001', name: 'Depok Town Square',          coordinates: { lat: -6.4025, lng: 106.7942 }, aqi: 68,  pm25: 24.6, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'DPK-002', name: 'Margonda Raya',              coordinates: { lat: -6.3850, lng: 106.8200 }, aqi: 95,  pm25: 40.2, status: 'Warning', lastUpdated: new Date().toISOString() },
    { id: 'DPK-003', name: 'Sawangan',                   coordinates: { lat: -6.4300, lng: 106.7600 }, aqi: 41,  pm25: 11.9, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'DPK-004', name: 'Cinere',                     coordinates: { lat: -6.3600, lng: 106.7800 }, aqi: 122, pm25: 53.7, status: 'Active',  lastUpdated: new Date().toISOString() },
  ],
  bekasi: [
    { id: 'BKS-001', name: 'Bekasi Kota',                coordinates: { lat: -6.2349, lng: 106.9896 }, aqi: 105, pm25: 45.1, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'BKS-002', name: 'Harapan Indah',              coordinates: { lat: -6.2100, lng: 106.9600 }, aqi: 73,  pm25: 28.4, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'BKS-003', name: 'Kawasan Industri MM2100',    coordinates: { lat: -6.2600, lng: 107.0300 }, aqi: 155, pm25: 68.9, status: 'Warning', lastUpdated: new Date().toISOString() },
    { id: 'BKS-004', name: 'Pondok Gede',                coordinates: { lat: -6.2700, lng: 106.9500 }, aqi: 48,  pm25: 14.2, status: 'Offline', lastUpdated: new Date().toISOString() },
    { id: 'BKS-005', name: 'Tambun Selatan',             coordinates: { lat: -6.2450, lng: 107.0100 }, aqi: 88,  pm25: 36.7, status: 'Active',  lastUpdated: new Date().toISOString() },
  ],
  hanoi: [
    { id: 'HAN-001', name: 'Hoan Kiem District',         coordinates: { lat: 21.0285, lng: 105.8542 }, aqi: 145, pm25: 63.2, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'HAN-002', name: 'Ba Dinh District',           coordinates: { lat: 21.0450, lng: 105.8400 }, aqi: 112, pm25: 48.6, status: 'Warning', lastUpdated: new Date().toISOString() },
    { id: 'HAN-003', name: 'Dong Da District',           coordinates: { lat: 21.0200, lng: 105.8450 }, aqi: 168, pm25: 75.3, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'HAN-004', name: 'Tay Ho District',            coordinates: { lat: 21.0600, lng: 105.8200 }, aqi: 88,  pm25: 36.1, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'HAN-005', name: 'Cau Giay District',          coordinates: { lat: 21.0350, lng: 105.7900 }, aqi: 52,  pm25: 17.8, status: 'Active',  lastUpdated: new Date().toISOString() },
  ],
  hcmc: [
    { id: 'HCM-001', name: 'District 1 Center',          coordinates: { lat: 10.8231, lng: 106.6297 }, aqi: 98,  pm25: 41.5, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'HCM-002', name: 'Binh Thanh District',        coordinates: { lat: 10.8100, lng: 106.7100 }, aqi: 132, pm25: 57.4, status: 'Warning', lastUpdated: new Date().toISOString() },
    { id: 'HCM-003', name: 'Thu Duc City',               coordinates: { lat: 10.8500, lng: 106.7500 }, aqi: 75,  pm25: 29.8, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'HCM-004', name: 'Tan Binh District',          coordinates: { lat: 10.8000, lng: 106.6500 }, aqi: 44,  pm25: 13.1, status: 'Active',  lastUpdated: new Date().toISOString() },
    { id: 'HCM-005', name: 'Go Vap District',            coordinates: { lat: 10.8350, lng: 106.6800 }, aqi: 118, pm25: 51.9, status: 'Offline', lastUpdated: new Date().toISOString() },
  ],
};

// ─── Forecast data per city ───────────────────────────────────────────────────

function generateForecast(baseAqi: number, variance: number): ForecastDataPoint[] {
  const now = new Date();
  now.setMinutes(0, 0, 0);
  return Array.from({ length: 48 }, (_, i) => {
    const t = new Date(now.getTime() + i * 3600_000);
    const hour = t.getHours();
    // Rush-hour peaks at 08:00 and 17:00
    const peak = Math.sin(((hour - 8) / 24) * Math.PI * 2) * variance * 0.5
               + Math.sin(((hour - 17) / 24) * Math.PI * 2) * variance * 0.3;
    const aqi = Math.max(10, Math.round(baseAqi + peak + (Math.random() - 0.5) * variance * 0.2));
    return {
      hour: `${String(t.getHours()).padStart(2, '0')}:00`,
      aqi,
      timestamp: t.toISOString(),
    };
  });
}

const FORECAST_BY_CITY: Record<string, ForecastDataPoint[]> = {
  tangerang: generateForecast(85,  60),
  tangsel:   generateForecast(75,  55),
  cikarang:  generateForecast(120, 70),
  depok:     generateForecast(70,  50),
  bekasi:    generateForecast(100, 65),
  hanoi:     generateForecast(130, 80),
  hcmc:      generateForecast(95,  60),
};

// ─── Policy alerts per city ───────────────────────────────────────────────────

const ALERTS_BY_CITY: Record<string, AlertCard[]> = {
  tangerang: [
    { id: 'TNG-A1', severity: 'Critical', message: 'Predicted AQI > 150 at Cikokol Intersection at 17:00. Recommendation: Trigger traffic rerouting protocol.', timestamp: new Date().toISOString(), location: 'Cikokol' },
    { id: 'TNG-A2', severity: 'Warning',  message: 'High PM2.5 cluster forming near Jatake Industrial Zone. Recommendation: Restrict outdoor physical activities.', timestamp: new Date().toISOString(), location: 'Jatake' },
    { id: 'TNG-A3', severity: 'Insight',  message: 'Low pollution expected tomorrow morning. Ideal time for public park maintenance.', timestamp: new Date().toISOString(), location: null },
  ],
  tangsel: [
    { id: 'TSL-A1', severity: 'Critical', message: 'Predicted AQI > 150 at Serpong Utara at 17:00. Recommendation: Issue public health advisory.', timestamp: new Date().toISOString(), location: 'Serpong Utara' },
    { id: 'TSL-A2', severity: 'Warning',  message: 'PM2.5 rising near Pamulang residential area. Recommend closing school outdoor activities.', timestamp: new Date().toISOString(), location: 'Pamulang' },
    { id: 'TSL-A3', severity: 'Insight',  message: 'BSD City air quality stable. Good conditions for outdoor events this weekend.', timestamp: new Date().toISOString(), location: 'BSD City' },
  ],
  cikarang: [
    { id: 'CKR-A1', severity: 'Critical', message: 'EJIP Industrial Zone AQI exceeds 160. Immediate factory emission controls required.', timestamp: new Date().toISOString(), location: 'EJIP' },
    { id: 'CKR-A2', severity: 'Critical', message: 'PM2.5 at hazardous levels in Cikarang Barat. Recommend mandatory mask usage outdoors.', timestamp: new Date().toISOString(), location: 'Cikarang Barat' },
    { id: 'CKR-A3', severity: 'Warning',  message: 'Wind direction shifting east — pollution may spread to residential zones by 20:00.', timestamp: new Date().toISOString(), location: null },
  ],
  depok: [
    { id: 'DPK-A1', severity: 'Warning',  message: 'Margonda Raya corridor showing elevated PM2.5. Recommend traffic volume reduction.', timestamp: new Date().toISOString(), location: 'Margonda Raya' },
    { id: 'DPK-A2', severity: 'Warning',  message: 'Cinere area AQI approaching unhealthy threshold. Monitor closely.', timestamp: new Date().toISOString(), location: 'Cinere' },
    { id: 'DPK-A3', severity: 'Insight',  message: 'Sawangan and southern Depok showing good air quality. No action required.', timestamp: new Date().toISOString(), location: 'Sawangan' },
  ],
  bekasi: [
    { id: 'BKS-A1', severity: 'Critical', message: 'MM2100 Industrial Estate AQI at 155. Coordinate with factory operators for emission reduction.', timestamp: new Date().toISOString(), location: 'MM2100' },
    { id: 'BKS-A2', severity: 'Warning',  message: 'Bekasi Kota center AQI above 100. Recommend public transport incentives to reduce vehicle emissions.', timestamp: new Date().toISOString(), location: 'Bekasi Kota' },
    { id: 'BKS-A3', severity: 'Insight',  message: 'Harapan Indah residential area air quality acceptable. No immediate action needed.', timestamp: new Date().toISOString(), location: 'Harapan Indah' },
  ],
  hanoi: [
    { id: 'HAN-A1', severity: 'Critical', message: 'Dong Da District AQI at 168 — highest in city. Activate emergency air quality protocol.', timestamp: new Date().toISOString(), location: 'Dong Da' },
    { id: 'HAN-A2', severity: 'Critical', message: 'Hoan Kiem AQI > 145. Recommend closing outdoor tourist attractions temporarily.', timestamp: new Date().toISOString(), location: 'Hoan Kiem' },
    { id: 'HAN-A3', severity: 'Warning',  message: 'Ba Dinh government district showing elevated pollution. Review vehicle access restrictions.', timestamp: new Date().toISOString(), location: 'Ba Dinh' },
  ],
  hcmc: [
    { id: 'HCM-A1', severity: 'Critical', message: 'Binh Thanh District AQI at 132. Recommend restricting motorbike traffic during peak hours.', timestamp: new Date().toISOString(), location: 'Binh Thanh' },
    { id: 'HCM-A2', severity: 'Warning',  message: 'Go Vap District sensor offline — data gap detected. Deploy maintenance team.', timestamp: new Date().toISOString(), location: 'Go Vap' },
    { id: 'HCM-A3', severity: 'Insight',  message: 'District 1 and Tan Binh showing moderate air quality. Continue monitoring.', timestamp: new Date().toISOString(), location: 'District 1' },
  ],
};

// ─── Public health advices per city ──────────────────────────────────────────

const PUBLIC_ADVICES_BY_CITY: Record<string, PublicHealthAdvice[]> = {
  tangerang: [
    { id: 'TNG-P1', severity: 'Critical', message: '⚠️ Kualitas udara sangat buruk di Persimpangan Cikokol sekitar pukul 17:00. Hindari aktivitas luar ruangan dan gunakan masker jika harus keluar.', timestamp: new Date().toISOString(), location: 'Cikokol' },
    { id: 'TNG-P2', severity: 'Warning',  message: '😷 Konsentrasi PM2.5 tinggi di Kawasan Industri Jatake. Batasi aktivitas fisik di luar ruangan.', timestamp: new Date().toISOString(), location: 'Jatake' },
    { id: 'TNG-P3', severity: 'Insight',  message: '✅ Kualitas udara diperkirakan baik besok pagi. Waktu yang tepat untuk berolahraga di luar ruangan.', timestamp: new Date().toISOString(), location: null },
  ],
  tangsel: [
    { id: 'TSL-P1', severity: 'Critical', message: '⚠️ Kualitas udara sangat buruk di Serpong Utara. Hindari keluar rumah dan tutup jendela.', timestamp: new Date().toISOString(), location: 'Serpong Utara' },
    { id: 'TSL-P2', severity: 'Warning',  message: '😷 PM2.5 meningkat di area Pamulang. Anak-anak sebaiknya tidak beraktivitas di luar ruangan.', timestamp: new Date().toISOString(), location: 'Pamulang' },
    { id: 'TSL-P3', severity: 'Insight',  message: '✅ BSD City udara bersih. Cocok untuk aktivitas luar ruangan akhir pekan ini.', timestamp: new Date().toISOString(), location: 'BSD City' },
  ],
  cikarang: [
    { id: 'CKR-P1', severity: 'Critical', message: '⚠️ Udara sangat tidak sehat di kawasan industri EJIP. Gunakan masker N95 jika harus keluar.', timestamp: new Date().toISOString(), location: 'EJIP' },
    { id: 'CKR-P2', severity: 'Critical', message: '⚠️ Cikarang Barat: tingkat polusi berbahaya. Warga disarankan tetap di dalam ruangan.', timestamp: new Date().toISOString(), location: 'Cikarang Barat' },
    { id: 'CKR-P3', severity: 'Warning',  message: '😷 Angin bergeser ke timur — polusi mungkin menyebar ke pemukiman malam ini.', timestamp: new Date().toISOString(), location: null },
  ],
  depok: [
    { id: 'DPK-P1', severity: 'Warning',  message: '😷 Kualitas udara di Margonda Raya menurun. Kurangi aktivitas fisik berat di luar ruangan.', timestamp: new Date().toISOString(), location: 'Margonda Raya' },
    { id: 'DPK-P2', severity: 'Warning',  message: '😷 Area Cinere mendekati batas tidak sehat. Pantau kondisi udara secara berkala.', timestamp: new Date().toISOString(), location: 'Cinere' },
    { id: 'DPK-P3', severity: 'Insight',  message: '✅ Sawangan dan Depok selatan udara bersih. Tidak ada tindakan khusus diperlukan.', timestamp: new Date().toISOString(), location: 'Sawangan' },
  ],
  bekasi: [
    { id: 'BKS-P1', severity: 'Critical', message: '⚠️ Polusi sangat tinggi di kawasan MM2100. Hindari area industri dan gunakan masker.', timestamp: new Date().toISOString(), location: 'MM2100' },
    { id: 'BKS-P2', severity: 'Warning',  message: '😷 Pusat Kota Bekasi AQI di atas 100. Kurangi penggunaan kendaraan pribadi.', timestamp: new Date().toISOString(), location: 'Bekasi Kota' },
    { id: 'BKS-P3', severity: 'Insight',  message: '✅ Harapan Indah kualitas udara masih dapat diterima. Tidak ada tindakan mendesak.', timestamp: new Date().toISOString(), location: 'Harapan Indah' },
  ],
  hanoi: [
    { id: 'HAN-P1', severity: 'Critical', message: '⚠️ Kualitas udara sangat buruk di Distrik Dong Da. Tetap di dalam ruangan dan gunakan pemurni udara.', timestamp: new Date().toISOString(), location: 'Dong Da' },
    { id: 'HAN-P2', severity: 'Critical', message: '⚠️ Hoan Kiem AQI > 145. Wisatawan disarankan menunda kunjungan ke area terbuka.', timestamp: new Date().toISOString(), location: 'Hoan Kiem' },
    { id: 'HAN-P3', severity: 'Warning',  message: '😷 Distrik Ba Dinh polusi meningkat. Kurangi aktivitas fisik di luar ruangan.', timestamp: new Date().toISOString(), location: 'Ba Dinh' },
  ],
  hcmc: [
    { id: 'HCM-P1', severity: 'Critical', message: '⚠️ Binh Thanh AQI 132. Kurangi penggunaan motor saat jam sibuk dan gunakan masker.', timestamp: new Date().toISOString(), location: 'Binh Thanh' },
    { id: 'HCM-P2', severity: 'Warning',  message: '😷 Sensor Go Vap tidak aktif — data tidak tersedia. Waspada terhadap kondisi udara.', timestamp: new Date().toISOString(), location: 'Go Vap' },
    { id: 'HCM-P3', severity: 'Insight',  message: '✅ Distrik 1 dan Tan Binh kualitas udara sedang. Tetap pantau perkembangan.', timestamp: new Date().toISOString(), location: 'District 1' },
  ],
};

// ─── Public accessors ─────────────────────────────────────────────────────────

export function getNodesByCity(cityId: string): IoTNode[] {
  return NODES_BY_CITY[cityId] ?? NODES_BY_CITY['tangerang'];
}

export function getForecastByCity(cityId: string): ForecastDataPoint[] {
  return FORECAST_BY_CITY[cityId] ?? FORECAST_BY_CITY['tangerang'];
}

export function getAlertsByCity(cityId: string): AlertCard[] {
  return ALERTS_BY_CITY[cityId] ?? ALERTS_BY_CITY['tangerang'];
}

export function getPublicAdvicesByCity(cityId: string): PublicHealthAdvice[] {
  return PUBLIC_ADVICES_BY_CITY[cityId] ?? PUBLIC_ADVICES_BY_CITY['tangerang'];
}

// ─── Legacy exports (kept for backward compat / tests) ───────────────────────

export const IOT_NODES        = NODES_BY_CITY['tangerang'];
export const FORECAST_DATA    = FORECAST_BY_CITY['tangerang'];
export const POLICY_ALERTS    = ALERTS_BY_CITY['tangerang'];
export const PUBLIC_HEALTH_ADVICES = PUBLIC_ADVICES_BY_CITY['tangerang'];
