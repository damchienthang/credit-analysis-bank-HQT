import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, ComposedChart, Line, Legend
} from 'recharts';
import {
  Database, ShieldAlert, Banknote, TrendingUp,
  Download, RefreshCw, AlertTriangle, CheckCircle2, Info
} from 'lucide-react';
import {
  fetchKpi, fetchLoanGrade, fetchLoanTrend,
  fetchLoanPurpose, fetchRecovery, fetchStateRisk,
} from '../data/api';

const ICON_MAP = { Database, ShieldAlert, Banknote, TrendingUp };

const KPI_CFG = [
  { color: '#1652f0', target: null,  threshold: null, goodHigh: true  },
  { color: '#b91c1c', target: 10,    threshold: 15,   goodHigh: false },
  { color: '#1652f0', target: null,  threshold: null, goodHigh: true  },
  { color: '#166534', target: 60,    threshold: null, goodHigh: true  },
];

// ── Tooltip ───────────────────────────────────────────────────────────────────
const ChartTip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fff', border: '1px solid #dde1e8', borderRadius: 4,
      padding: '10px 14px', fontSize: 11, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <p style={{ fontWeight: 700, color: '#0a1f44', marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ width: 8, height: 8, background: p.color, display: 'inline-block', borderRadius: 1 }} />
          <span style={{ color: '#5e6a7a' }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: '#0a1f44', marginLeft: 'auto', paddingLeft: 12 }}>
            {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── KPI Card ──────────────────────────────────────────────────────────────────
function KpiCard({ kpi, idx, delay }) {
  const Icon = ICON_MAP[kpi.icon];
  const cfg  = KPI_CFG[idx] || { color: '#1652f0' };
  const numVal = parseFloat(String(kpi.value).replace(/[^0-9.]/g, ''));

  let statusLabel = null;
  let statusColor = cfg.color;

  if (cfg.threshold && !isNaN(numVal)) {
    const exceeded = numVal > cfg.threshold;
    if (!cfg.goodHigh && exceeded) {
      statusColor  = '#b91c1c';
      statusLabel  = `⚠ Vượt ${cfg.threshold}%`;
    } else if (!cfg.goodHigh && !exceeded) {
      statusColor  = '#166534';
      statusLabel  = `Trong ngưỡng`;
    }
  }

  const progress = cfg.target && !isNaN(numVal)
    ? Math.min(100, cfg.goodHigh ? (numVal / cfg.target) * 100 : (cfg.target / numVal) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="kpi-card"
      style={{ '--kpi-color': statusColor }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{
          width: 30, height: 30, background: '#f7f8fa', border: '1px solid #dde1e8',
          borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          {Icon && <Icon style={{ width: 14, height: 14, color: cfg.color }} />}
        </div>
        {statusLabel && (
          <span style={{ fontSize: 10, fontWeight: 700, color: statusColor }}>{statusLabel}</span>
        )}
      </div>

      <p className="label" style={{ marginBottom: 4 }}>{kpi.label}</p>
      <p className="value-lg" style={{ color: statusColor !== cfg.color ? statusColor : '#0a1f44', marginBottom: 10 }}>
        {kpi.value}
      </p>

      {progress !== null && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: '#8e99a8' }}>vs mục tiêu {cfg.target}{idx === 1 ? '%' : '%'}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: statusColor }}>{Math.round(progress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%`, background: statusColor }} />
          </div>
        </>
      )}

      {cfg.threshold && (
        <p style={{ fontSize: 10, color: '#bcc3ce', marginTop: 6 }}>
          Ngưỡng: {cfg.threshold}{idx === 1 ? '%' : ''}
        </p>
      )}
    </motion.div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
// ── Dashboard ─────────────────────────────────────────────────────────────────
const DashboardPage = () => {
  const [kpiData,         setKpiData]         = useState([]);
  const [loanGradeData,   setLoanGradeData]   = useState([]);
  const [loanTrendData,   setLoanTrendData]   = useState([]);
  const [loanPurposeData, setLoanPurposeData] = useState([]);
  const [recoveryData,    setRecoveryData]    = useState([]);
  const [stateRiskData,   setStateRiskData]   = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [lastUpdated,     setLastUpdated]     = useState('');

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [kpi, grade, trend, purpose, recovery, state] = await Promise.all([
        fetchKpi(), fetchLoanGrade(), fetchLoanTrend(),
        fetchLoanPurpose(), fetchRecovery(), fetchStateRisk(),
      ]);
      setKpiData(kpi);
      setLoanGradeData(grade);
      setLoanTrendData(trend);
      setLoanPurposeData(purpose);
      setRecoveryData(recovery);
      setStateRiskData(state);
      setLastUpdated(new Date().toLocaleString('vi-VN'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadAll();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [loadAll]);

  const exportReport = () => {
    const report = {
      generatedAt: new Date().toISOString(),
      scope: 'LendingClub Portfolio 2007-2018',
      kpis: kpiData,
      loanGrade: loanGradeData,
      loanTrend: loanTrendData,
      loanPurpose: loanPurposeData,
      recovery: recoveryData,
      stateRisk: stateRiskData,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `creditbi-report-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 8 }}>
      <Database style={{ width: 24, height: 24, color: '#bcc3ce' }} />
      <p className="label">Đang tải dữ liệu…</p>
    </div>
  );

  return (
    <div className="page-wrap-wide">

      {/* ── Page header ──────────────────────────────────────────────────── */}
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0a1f44', letterSpacing: '-0.02em', marginBottom: 3 }}>
            Executive BI Dashboard
          </h1>
          <p style={{ fontSize: 11, color: '#8e99a8', fontWeight: 500 }}>
            LendingClub Portfolio · 2,260,701 giao dịch · 2007–2018
            {lastUpdated && <> · Cập nhật <span className="mono">{lastUpdated}</span></>}
          </p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-secondary" onClick={loadAll}>
            <RefreshCw style={{ width: 12, height: 12 }} /> Làm mới
          </button>
          <button className="btn btn-primary" onClick={exportReport}>
            <Download style={{ width: 12, height: 12 }} /> Xuất báo cáo
          </button>
        </div>
      </div>

      <div className="dashboard-status-note">
        Dashboard ưu tiên dữ liệu từ API <span className="mono">localhost:3001</span>; khi backend chưa chạy, hệ thống tự dùng dữ liệu mẫu để phiên demo không bị gián đoạn.
      </div>

      {/* ── KPI strip ────────────────────────────────────────────────────── */}
      <div className="dashboard-kpi-grid">
        {kpiData.map((kpi, i) => <KpiCard key={i} kpi={kpi} idx={i} delay={i * 0.06} />)}
      </div>

      {/* ── Charts row 1 ─────────────────────────────────────────────────── */}
      <div className="dashboard-grid-primary">

        {/* Grade bar chart */}
        <div className="card">
          <div className="card-header">
            <div>
              <p className="section-title">Phân bổ khoản vay theo Hạng tín dụng</p>
              <p className="label" style={{ marginTop: 2 }}>Grade A (rủi ro thấp) → Grade G (rủi ro cao)</p>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="badge badge-success">A–C</span>
              <span className="badge badge-warning">D</span>
              <span className="badge badge-danger">E–G</span>
            </div>
          </div>
          <div className="card-body" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loanGradeData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#eef0f4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false}
                  tick={{ fill: '#8e99a8', fontSize: 11, fontWeight: 600 }} dy={6} />
                <YAxis axisLine={false} tickLine={false}
                  tick={{ fill: '#bcc3ce', fontSize: 10 }}
                  tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}K` : v} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="value" name="Số khoản vay" radius={[2, 2, 0, 0]} maxBarSize={44}>
                  {loanGradeData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut purpose */}
        <div className="card">
          <div className="card-header">
            <p className="section-title">Mục đích vay vốn</p>
            <span className="label">Top 5</span>
          </div>
          <div className="card-body" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={loanPurposeData} cx="50%" cy="50%"
                  innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value" stroke="none">
                  {loanPurposeData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip formatter={v => [`${v}%`, '']}
                  contentStyle={{ borderRadius: 3, border: '1px solid #dde1e8', fontSize: 11 }} />
                <Legend layout="vertical" verticalAlign="middle" align="right"
                  wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ padding: '10px 16px', borderTop: '1px solid #eef0f4', background: '#f7f8fa', display: 'flex', gap: 6, alignItems: 'flex-start' }}>
            <Info style={{ width: 12, height: 12, color: '#1652f0', flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 11, color: '#5e6a7a', fontWeight: 500, lineHeight: 1.4 }}>
              Debt Consolidation chiếm ~57% — gom nợ là mục đích phổ biến nhất.
            </p>
          </div>
        </div>
      </div>

      {/* ── Charts row 2 ─────────────────────────────────────────────────── */}
      <div className="dashboard-grid-secondary">

        {/* Area trend */}
        <div className="card">
          <div className="card-header">
            <p className="section-title">Tăng trưởng giải ngân</p>
            <span className="label">2007–2018</span>
          </div>
          <div className="card-body" style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={loanTrendData} margin={{ top: 4, right: 0, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#1652f0" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#1652f0" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#eef0f4" />
                <XAxis dataKey="year" axisLine={false} tickLine={false}
                  tick={{ fill: '#bcc3ce', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false}
                  tick={{ fill: '#bcc3ce', fontSize: 10 }}
                  tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="amount" name="Khoản vay"
                  stroke="#1652f0" strokeWidth={2}
                  fillOpacity={1} fill="url(#ga)"
                  dot={{ fill: '#1652f0', r: 2.5, strokeWidth: 0 }}
                  activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recovery vs Charge-off */}
        <div className="card">
          <div className="card-header">
            <p className="section-title">Thu hồi nợ vs Xóa nợ (khoản vay NPL)</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[{ c: '#166534', l: 'Recovery' }, { c: '#b91c1c', l: 'Charge-off' }].map(x => (
                <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 10, height: 3, background: x.c, display: 'inline-block', borderRadius: 1 }} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#8e99a8' }}>{x.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card-body" style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={recoveryData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#eef0f4" />
                <XAxis dataKey="month" axisLine={false} tickLine={false}
                  tick={{ fill: '#8e99a8', fontSize: 10, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false}
                  tick={{ fill: '#bcc3ce', fontSize: 10 }} />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="recovery" name="Thu hồi ($K)" fill="#166534" radius={[2, 2, 0, 0]} opacity={0.85} />
                <Line type="monotone" dataKey="chargeOff" name="Xóa nợ ($K)"
                  stroke="#b91c1c" strokeWidth={2}
                  dot={{ fill: '#b91c1c', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* ── State risk table ─────────────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="card-header">
          <p className="section-title">Phân tích rủi ro theo Khu vực địa lý — Top 5</p>
          <span className="label">Xếp theo tổng số khoản vay</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Khu vực</th>
              <th>Số khoản vay</th>
              <th>NPL Ratio</th>
              <th>Tỷ lệ thu hồi</th>
              <th>Mức rủi ro</th>
              <th style={{ width: 140 }}>NPL Gauge</th>
            </tr>
          </thead>
          <tbody>
            {stateRiskData.map((item, i) => {
              const nplNum  = parseFloat(item.npl);
              const isHigh  = item.risk === 'High';
              const isMed   = item.risk === 'Medium';
              return (
                <tr key={i} style={{ background: isHigh ? 'rgba(185,28,28,0.02)' : isMed ? 'rgba(146,64,14,0.02)' : undefined }}>
                  <td><span className="mono" style={{ fontWeight: 700, color: '#0a1f44', fontSize: 13 }}>{item.state}</span></td>
                  <td><span className="mono">{Number(item.loans).toLocaleString()}</span></td>
                  <td><span className="mono" style={{ fontWeight: 700, color: isHigh ? '#b91c1c' : isMed ? '#92400e' : '#166534' }}>{item.npl}</span></td>
                  <td><span className="mono">{item.recovery}</span></td>
                  <td>
                    <span className={`badge ${isHigh ? 'badge-danger' : isMed ? 'badge-warning' : 'badge-success'}`}>
                      {isHigh ? <AlertTriangle style={{ width: 9, height: 9 }} /> : <CheckCircle2 style={{ width: 9, height: 9 }} />}
                      {item.risk}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div className="progress-fill" style={{
                          width: `${Math.min(100, (nplNum / 20) * 100)}%`,
                          background: isHigh ? '#b91c1c' : isMed ? '#92400e' : '#166534'
                        }} />
                      </div>
                      <span className="mono" style={{ fontSize: 10, color: '#8e99a8', width: 30, textAlign: 'right' }}>
                        {nplNum.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Insight row ──────────────────────────────────────────────────── */}
      <div className="stat-row">
        <div className="stat-cell" style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <AlertTriangle style={{ width: 14, height: 14, color: '#b91c1c', flexShrink: 0, marginTop: 1 }} />
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#0a1f44', marginBottom: 2 }}>Cảnh báo rủi ro</p>
            <p style={{ fontSize: 11, color: '#5e6a7a', lineHeight: 1.5 }}>
              Grade E–G tại Florida: NPL 18.4%, cao hơn trung bình 4.2pp — đề xuất siết điều kiện phê duyệt.
            </p>
          </div>
        </div>
        <div className="stat-cell" style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <Info style={{ width: 14, height: 14, color: '#1652f0', flexShrink: 0, marginTop: 1 }} />
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#0a1f44', marginBottom: 2 }}>Xu hướng nổi bật</p>
            <p style={{ fontSize: 11, color: '#5e6a7a', lineHeight: 1.5 }}>
              Tăng trưởng giải ngân 2012–2015 đạt x4 — giai đoạn bùng nổ P2P lending tại Mỹ.
            </p>
          </div>
        </div>
        <div className="stat-cell" style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <TrendingUp style={{ width: 14, height: 14, color: '#166534', flexShrink: 0, marginTop: 1 }} />
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#0a1f44', marginBottom: 2 }}>Điểm tích cực</p>
            <p style={{ fontSize: 11, color: '#5e6a7a', lineHeight: 1.5 }}>
              Recovery Rate 58.3% — CA/NY có tỷ lệ thu hồi cao nhất (62.1%) nhờ tài sản đảm bảo tốt.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
