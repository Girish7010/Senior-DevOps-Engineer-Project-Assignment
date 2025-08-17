
import { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from 'chart.js';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const POLL_MS = 10000;
const API_BASE = '/api';

export default function App() {
  const [points, setPoints] = useState([]);
  const timerRef = useRef(null);

  async function fetchMetrics() {
    try {
      const res = await fetch(`${API_BASE}/metrics`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      const t = new Date().toLocaleTimeString();
      setPoints(prev => [...prev.slice(-29), { t, ...j }]);
    } catch (e) {
      console.error('Failed to fetch metrics', e);
    }
  }

  useEffect(() => {
    fetchMetrics();
    timerRef.current = setInterval(fetchMetrics, POLL_MS);
    return () => clearInterval(timerRef.current);
  }, []);

  const last = points.length ? points[points.length - 1] : undefined;
  const labels = points.map(p => p.t);
  const makeSeries = k => points.map(p => p[k]);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 16, maxWidth: 1100, margin: '0 auto' }}>
      <h1>Monitoring Dashboard</h1>
      <p style={{ opacity: .7 }}>Polling every 10s from <code>{API_BASE}/metrics</code></p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        <Card title="CPU (%)" value={last?.cpu ?? '–'} />
        <Card title="Latency (ms)" value={last?.latency_ms ?? '–'} />
        <Card title="Req Rate" value={last?.request_rate ?? '–'} />
        <Card title="Counter" value={last?.counter ?? '–'} />
      </div>

      <Section title="CPU %">
        <Line data={{ labels, datasets: [{ label: 'CPU %', data: makeSeries('cpu') }] }} />
      </Section>
      <Section title="Latency (ms)">
        <Line data={{ labels, datasets: [{ label: 'Latency (ms)', data: makeSeries('latency_ms') }] }} />
      </Section>
      <Section title="Req/sec">
        <Line data={{ labels, datasets: [{ label: 'Req/sec', data: makeSeries('request_rate') }] }} />
      </Section>
    </div>
  );
}
function Card({ title, value }) {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 12, opacity: .7 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 600 }}>{value}</div>
    </div>
  );
}
function Section({ title, children }) {
  return (
    <div style={{ marginTop: 20 }}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}
