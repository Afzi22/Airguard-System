import type { IoTNode, ForecastDataPoint, AlertCard, CityConfig } from '../types/index';
import { getAQIPublicLabel } from './aqiUtils';

/**
 * Generates and downloads a PDF report for the given city's air quality data.
 * Uses jsPDF for PDF generation and html2canvas for chart capture.
 */
export async function exportPDFReport(options: {
  city: CityConfig;
  nodes: IoTNode[];
  forecastData: ForecastDataPoint[];
  alerts: AlertCard[];
  chartElementId?: string;
}): Promise<void> {
  const { city, nodes, forecastData, alerts, chartElementId = 'forecast-chart-container' } = options;

  // Dynamic imports — only loaded when export is triggered
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ]);

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentW = pageW - margin * 2;
  let y = margin;

  // ── Helper functions ────────────────────────────────────────────────────

  const addText = (
    text: string,
    x: number,
    yPos: number,
    opts: { size?: number; bold?: boolean; color?: [number, number, number] } = {}
  ) => {
    doc.setFontSize(opts.size ?? 10);
    doc.setFont('helvetica', opts.bold ? 'bold' : 'normal');
    if (opts.color) doc.setTextColor(...opts.color);
    else doc.setTextColor(30, 30, 30);
    doc.text(text, x, yPos);
  };

  const addLine = (yPos: number, color: [number, number, number] = [200, 200, 200]) => {
    doc.setDrawColor(...color);
    doc.line(margin, yPos, pageW - margin, yPos);
  };

  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageH - margin) {
      doc.addPage();
      y = margin;
    }
  };

  // ── Header ──────────────────────────────────────────────────────────────

  // Dark header bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageW, 28, 'F');

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(52, 211, 153); // emerald-400
  doc.text('AirGuard', margin, 17);

  doc.setFontSize(18);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(255, 255, 255);
  doc.text(' System', margin + 30, 17);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Air Quality Monitoring Report', pageW - margin, 17, { align: 'right' });

  y = 36;

  // ── Report metadata ─────────────────────────────────────────────────────

  addText(`City: ${city.name}`, margin, y, { size: 13, bold: true });
  y += 6;
  addText(
    `Generated: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}`,
    margin, y, { size: 9, color: [100, 116, 139] }
  );
  y += 4;
  addText(
    `Coordinates: ${city.coordinates.lat.toFixed(4)}°, ${city.coordinates.lng.toFixed(4)}°`,
    margin, y, { size: 9, color: [100, 116, 139] }
  );
  y += 6;
  addLine(y);
  y += 6;

  // ── Summary stats ───────────────────────────────────────────────────────

  addText('Air Quality Summary', margin, y, { size: 12, bold: true });
  y += 6;

  const activeNodes  = nodes.filter((n) => n.status === 'Active').length;
  const warningNodes = nodes.filter((n) => n.status === 'Warning').length;
  const offlineNodes = nodes.filter((n) => n.status === 'Offline').length;
  const avgAqi = nodes.length > 0 ? Math.round(nodes.reduce((s, n) => s + n.aqi, 0) / nodes.length) : 0;
  const maxAqi = nodes.length > 0 ? Math.max(...nodes.map((n) => n.aqi)) : 0;

  const stats = [
    ['Total Nodes', String(nodes.length)],
    ['Active', String(activeNodes)],
    ['Warning', String(warningNodes)],
    ['Offline', String(offlineNodes)],
    ['Avg AQI', String(avgAqi)],
    ['Max AQI', String(maxAqi)],
    ['Overall Status', getAQIPublicLabel(avgAqi)],
  ];

  const colW = contentW / 4;
  stats.forEach(([label, value], i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const xPos = margin + col * colW;
    const yPos = y + row * 14;

    doc.setFillColor(30, 41, 59); // slate-800
    doc.roundedRect(xPos, yPos - 4, colW - 3, 12, 2, 2, 'F');
    addText(label, xPos + 3, yPos + 1, { size: 7, color: [148, 163, 184] });
    addText(value, xPos + 3, yPos + 6, { size: 9, bold: true, color: [241, 245, 249] });
  });

  y += Math.ceil(stats.length / 4) * 14 + 6;
  addLine(y);
  y += 6;

  // ── Forecast chart (screenshot) ─────────────────────────────────────────

  const chartEl = document.getElementById(chartElementId);
  if (chartEl) {
    checkPageBreak(80);
    addText('48-Hour AQI Forecast (LSTM Model)', margin, y, { size: 12, bold: true });
    y += 5;

    try {
      const canvas = await html2canvas(chartEl, {
        backgroundColor: '#1e293b',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const imgH = (canvas.height / canvas.width) * contentW;
      checkPageBreak(imgH + 5);
      doc.addImage(imgData, 'PNG', margin, y, contentW, imgH);
      y += imgH + 6;
    } catch {
      addText('(Chart capture unavailable)', margin, y, { size: 9, color: [148, 163, 184] });
      y += 8;
    }

    addLine(y);
    y += 6;
  }

  // ── IoT Node table ──────────────────────────────────────────────────────

  checkPageBreak(20);
  addText('IoT Node Status', margin, y, { size: 12, bold: true });
  y += 6;

  // Table header
  const cols = [
    { label: 'Node ID',  w: 28 },
    { label: 'Name',     w: 55 },
    { label: 'AQI',      w: 18 },
    { label: 'PM2.5',    w: 22 },
    { label: 'Status',   w: 22 },
    { label: 'Updated',  w: 35 },
  ];

  doc.setFillColor(15, 23, 42);
  doc.rect(margin, y - 4, contentW, 8, 'F');
  let xCursor = margin + 2;
  cols.forEach((col) => {
    addText(col.label, xCursor, y, { size: 8, bold: true, color: [148, 163, 184] });
    xCursor += col.w;
  });
  y += 5;
  addLine(y, [51, 65, 85]);
  y += 3;

  nodes.forEach((node, idx) => {
    checkPageBreak(10);

    if (idx % 2 === 0) {
      doc.setFillColor(30, 41, 59);
      doc.rect(margin, y - 3, contentW, 8, 'F');
    }

    const statusColor: [number, number, number] =
      node.status === 'Active'  ? [52, 211, 153] :
      node.status === 'Warning' ? [251, 191, 36]  :
                                  [251, 113, 133];

    const aqiColor: [number, number, number] =
      node.aqi <= 50  ? [52, 211, 153] :
      node.aqi <= 100 ? [251, 191, 36]  :
                        [251, 113, 133];

    xCursor = margin + 2;
    const rowData: Array<{ text: string; color?: [number, number, number] }> = [
      { text: node.id },
      { text: node.name.length > 22 ? node.name.slice(0, 22) + '…' : node.name },
      { text: String(node.aqi), color: aqiColor },
      { text: `${node.pm25} µg/m³` },
      { text: node.status, color: statusColor },
      { text: new Date(node.lastUpdated).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) },
    ];

    rowData.forEach((cell, ci) => {
      addText(cell.text, xCursor, y + 2, { size: 8, color: cell.color ?? [203, 213, 225] });
      xCursor += cols[ci].w;
    });

    y += 8;
  });

  y += 4;
  addLine(y);
  y += 6;

  // ── Policy alerts ───────────────────────────────────────────────────────

  checkPageBreak(20);
  addText('Automated Policy Recommendations', margin, y, { size: 12, bold: true });
  y += 6;

  if (alerts.length === 0) {
    addText('No active alerts. Air quality is currently stable.', margin, y, { size: 9, color: [52, 211, 153] });
    y += 8;
  } else {
    alerts.forEach((alert) => {
      const severityColor: [number, number, number] =
        alert.severity === 'Critical' ? [251, 113, 133] :
        alert.severity === 'Warning'  ? [251, 191, 36]  :
                                        [52, 211, 153];

      const bgColor: [number, number, number] =
        alert.severity === 'Critical' ? [69, 10, 10] :
        alert.severity === 'Warning'  ? [69, 49, 10] :
                                        [6, 46, 30];

      const lines = doc.splitTextToSize(alert.message, contentW - 30);
      const blockH = 8 + lines.length * 5 + 6;
      checkPageBreak(blockH);

      doc.setFillColor(...bgColor);
      doc.roundedRect(margin, y - 3, contentW, blockH, 2, 2, 'F');

      addText(`[${alert.severity}]`, margin + 3, y + 2, { size: 8, bold: true, color: severityColor });
      if (alert.location) {
        addText(alert.location, margin + 3 + 22, y + 2, { size: 8, color: [148, 163, 184] });
      }
      y += 6;

      lines.forEach((line: string) => {
        addText(line, margin + 3, y + 2, { size: 8, color: [203, 213, 225] });
        y += 5;
      });

      addText(
        new Date(alert.timestamp).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
        margin + 3, y + 2, { size: 7, color: [100, 116, 139] }
      );
      y += 8;
    });
  }

  // ── Footer ──────────────────────────────────────────────────────────────

  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFillColor(15, 23, 42);
    doc.rect(0, pageH - 10, pageW, 10, 'F');
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 116, 139);
    doc.text('AirGuard System — Smart City Air Quality Monitoring', margin, pageH - 4);
    doc.text(`Page ${p} of ${totalPages}`, pageW - margin, pageH - 4, { align: 'right' });
  }

  // ── Save ─────────────────────────────────────────────────────────────────

  const filename = `airguard-report-${city.id}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}
