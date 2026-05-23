import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar, Line,
  ComposedChart, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine, ScatterChart, Scatter,
} from 'recharts';
import {
  Database, ShieldAlert, Banknote, TrendingUp,
  Download, RefreshCw, AlertTriangle, Info, ArrowRight,
  ChevronRight, Activity,
} from 'lucide-react';
import {
  fetchKpi, fetchLoanGrade, fetchLoanTrend, fetchLoanPurpose,
  fetchStateRisk, fetchNplTrend, fetchGradeRisk,
  fetchInterestGrade, fetchRecovery, fetchDtiScatter,
} from '../data/api';

// ── Màu sắc tối giản ─────────────────────────────────────────────────────────
const C = {
  navy:    '#0a1f44',
  mid:     '#1a3a6e',
  accent:  '#1652f0',
  cyan:    '#06b6d4',
  danger:  '#b91c1c',
  warning: '#92400e',
  success: '#166534',
  gray:    '#5e6a7a',
  border:  '#dde1e8',
  bg:      '#f7f8fa',
  white:   '#ffffff',
};

// Màu 2 màu đủ dùng cho tất cả chart — không loè loẹt
const GRADE_COLORS = ['#166534','#2d7a3a','#5e6a7a','#92400e','#b91c1c','#991b1b','#7f1d1d'];

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
const ChartTip = ({ active, payload, label, suffix = '' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`, borderRadius: 3,
      padding: '10px 14px', fontSize: 11, boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    }}>
      <p style={{ fontWeight: 700, color: C.navy, marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ width: 8, height: 3, background: p.color || p.fill, display: 'inline-block' }} />
          <span style={{ color: C.gray }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: C.navy, marginLeft: 'auto', paddingLeft: 12 }}>
            {typeof p.value === 'number'
              ? p.value >= 1000 ? p.value.toLocaleString('vi-VN') : p.value.toFixed(2)
              : p.value}{suffix}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── KPI Card ──────────────────────────────────────────────────────────────────
const ICON_MAP = { Database, ShieldAlert, Banknote, TrendingUp };

function KpiCard({ label, value, sub, icon, color, risk, target, delay = 0 }) {
  const Icon = ICON_MAP[icon];
  const numVal = parseFloat(String(value).replace(/[^0-9.,]/g, '').replace(',', '.'));
  const isAlert = risk && !isNaN(numVal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25 }}
      className="kpi-card"
      style={{ '--kpi-color': isAlert ? C.danger : color }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{
          width: 28, height: 28, border: `1px solid ${C.border}`, borderRadius: 3,
          background: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {Icon && <Icon style={{ width: 13, height: 13, color: isAlert ? C.danger : color }} />}
        </div>
        {isAlert && (
          <span style={{ fontSize: 10, fontWeight: 700, color: C.danger }}>
            ▲ Theo dõi
          </span>
        )}
      </div>
      <p className="label" style={{ marginBottom: 6 }}>{label}</p>
      <p className="value-lg" style={{ color: isAlert ? C.danger : C.navy, marginBottom: 6 }}>{value}</p>
      <p style={{ fontSize: 10, color: C.gray, fontWeight: 500 }}>{sub}</p>
      {target && (
        <div style={{ marginTop: 8 }}>
          <div className="progress-bar">
            <div className="progress-fill" style={{
              width: `${Math.min(100, (numVal / target) * 100)}%`,
              background: color,
            }} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Insight Box ───────────────────────────────────────────────────────────────
function InsightBox({ type = 'warning', title, finding, solution }) {
  const cfg = {
    warning: { color: C.warning,  icon: AlertTriangle, bg: '#fffbeb' },
    danger:  { color: C.danger,   icon: AlertTriangle, bg: '#fef2f2' },
    info:    { color: C.accent,   icon: Info,          bg: '#eff6ff' },
  }[type];
  const Icon = cfg.icon;
  return (
    <div style={{
      borderLeft: `3px solid ${cfg.color}`, background: cfg.bg,
      border: `1px solid ${C.border}`, borderLeftColor: cfg.color,
      borderRadius: 3, padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 8 }}>
        <Icon style={{ width: 13, height: 13, color: cfg.color, flexShrink: 0, marginTop: 1 }} />
        <p style={{ fontSize: 12, fontWeight: 700, color: C.navy, margin: 0 }}>{title}</p>
      </div>
      <p style={{ fontSize: 11.5, color: C.gray, lineHeight: 1.55, margin: '0 0 8px' }}>{finding}</p>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
        <ArrowRight style={{ width: 11, height: 11, color: cfg.color, flexShrink: 0, marginTop: 2 }} />
        <p style={{ fontSize: 11, color: C.navy, fontWeight: 600, lineHeight: 1.45, margin: 0 }}>{solution}</p>
      </div>
    </div>
  );
}

// ── Section Divider / Narrative bridge ───────────────────────────────────────
function SectionBridge({ text }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      margin: '28px 0 20px', borderBottom: `1px solid ${C.border}`, paddingBottom: 14,
    }}>
      <ChevronRight style={{ width: 14, height: 14, color: C.accent, flexShrink: 0 }} />
      <p style={{ fontSize: 12, color: C.gray, fontWeight: 500, margin: 0, lineHeight: 1.5 }}>{text}</p>
    </div>
  );
}

// ── Gauge SVG đơn giản ───────────────────────────────────────────────────────
function GaugeChart({ value, max = 100, label, color = C.accent }) {
  const pct   = Math.min(value / max, 1);
  const R     = 52, cx = 70, cy = 70;
  const sweep = Math.PI;                   // 180° arc
  const start = { x: cx - R, y: cy };
  const angle = sweep * pct;
  const end   = { x: cx + R * Math.cos(Math.PI + angle), y: cy + R * Math.sin(Math.PI + angle) };
  const lg    = angle > Math.PI ? 1 : 0;
  const track = `M ${start.x} ${cy} A ${R} ${R} 0 1 1 ${cx + R} ${cy}`;
  const fill  = `M ${start.x} ${cy} A ${R} ${R} 0 ${lg} 1 ${end.x} ${end.y}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={140} height={85} viewBox="0 0 140 90">
        <path d={track} fill="none" stroke={C.border} strokeWidth={10} strokeLinecap="round" />
        <path d={fill}  fill="none" stroke={color}    strokeWidth={10} strokeLinecap="round" />
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize={18} fontWeight={700}
          fontFamily="JetBrains Mono, monospace" fill={C.navy}>{value}%</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize={9.5} fontWeight={600}
          fill={C.gray} letterSpacing={1} textTransform="uppercase">{label}</text>
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const DashboardPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);           // 0 = Tổng quan, 1 = Phân tích rủi ro
  const [showExportMenu, setShowExportMenu] = useState(false);

  const [kpiData,         setKpiData]         = useState([]);
  const [gradeData,       setGradeData]       = useState([]);
  const [trendData,       setTrendData]       = useState([]);
  const [purposeData,     setPurposeData]     = useState([]);
  const [stateData,       setStateData]       = useState([]);
  const [nplData,         setNplData]         = useState([]);
  const [gradeRiskData,   setGradeRiskData]   = useState([]);
  const [interestData,    setInterestData]    = useState([]);
  const [recoveryData,    setRecoveryData]    = useState([]);
  const [dtiScatterData,  setDtiScatterData]  = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [lastUpdated,     setLastUpdated]     = useState('');

  const loadAll = useCallback(async () => {
    setLoading(prev => prev ? prev : true);
    try {
      const [kpi, grade, trend, purpose, state, npl, grisk, interest, recovery, dtiScatter] = await Promise.all([
        fetchKpi(), fetchLoanGrade(), fetchLoanTrend(), fetchLoanPurpose(),
        fetchStateRisk(), fetchNplTrend(), fetchGradeRisk(),
        fetchInterestGrade(), fetchRecovery(), fetchDtiScatter(),
      ]);
      setKpiData(kpi);
      setGradeData(grade);
      setTrendData(trend);
      setPurposeData(purpose);
      setStateData(state);
      setNplData(npl);
      setGradeRiskData(grisk);
      setInterestData(interest);
      setRecoveryData(recovery);
      setDtiScatterData(dtiScatter);
      setLastUpdated(new Date().toLocaleString('vi-VN'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    const init = async () => {
      try {
        const [kpi, grade, trend, purpose, state, npl, grisk, interest, recovery, dtiScatter] = await Promise.all([
          fetchKpi(), fetchLoanGrade(), fetchLoanTrend(), fetchLoanPurpose(),
          fetchStateRisk(), fetchNplTrend(), fetchGradeRisk(),
          fetchInterestGrade(), fetchRecovery(), fetchDtiScatter(),
        ]);
        if (!active) return;
        setKpiData(kpi);
        setGradeData(grade);
        setTrendData(trend);
        setPurposeData(purpose);
        setStateData(state);
        setNplData(npl);
        setGradeRiskData(grisk);
        setInterestData(interest);
        setRecoveryData(recovery);
        setDtiScatterData(dtiScatter);
        setLastUpdated(new Date().toLocaleString('vi-VN'));
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu khởi tạo:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    init();
    return () => { active = false; };
  }, []);

  const exportAsJSON = () => {
    const blob = new Blob([JSON.stringify({ kpiData, gradeData, trendData, purposeData, stateData, nplData, gradeRiskData, interestData, recoveryData }, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `creditbi-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(link); link.click(); link.remove();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const exportAsCSV = () => {
    let csvContent = "\ufeff"; // BOM for Excel to open UTF-8 correctly
    
    // Section 1: KPI Summary
    csvContent += "BÁO CÁO CÁC CHỈ SỐ KPI CHÍNH (KEY PERFORMANCE INDICATORS)\n";
    csvContent += "Chỉ số,Giá trị,Mục tiêu / So sánh\n";
    kpiData.forEach(item => {
      csvContent += `"${item.label.replace(/"/g, '""')}","${item.value}","${item.sub.replace(/"/g, '""')}"\n`;
    });
    csvContent += "\n";
    
    // Section 2: Breakdown by Credit Grade
    csvContent += "PHÂN PHỐI DƯ NỢ VÀ RỦI RO THEO HẠNG TÍN DỤNG (CREDIT GRADES)\n";
    csvContent += "Hạng,Số khoản vay,Tỷ lệ phân bổ,Tỷ lệ nợ xấu NPL,Lãi suất trung bình,Tỷ lệ thu hồi nợ xấu\n";
    const total = gradeData.reduce((s, d) => s + d.value, 0);
    gradeData.forEach(item => {
      const riskItem = gradeRiskData.find(g => g.grade === item.name) || {};
      const interestItem = interestData.find(g => g.grade === item.name) || {};
      const recoveryItem = recoveryData.find(g => g.grade === item.name) || {};
      
      const count = item.value || 0;
      const ratio = total > 0 ? ((count / total) * 100).toFixed(2) + "%" : "0%";
      const npl = riskItem.npl ? riskItem.npl + "%" : "N/A";
      const rate = interestItem.rate ? interestItem.rate + "%" : "N/A";
      const rec = recoveryItem.recovery ? recoveryItem.recovery + "%" : "N/A";
      
      csvContent += `"${item.name}",${count},"${ratio}","${npl}","${rate}","${rec}"\n`;
    });
    csvContent += "\n";
    
    // Section 3: Purpose breakdown
    csvContent += "PHÂN BỔ DƯ NỢ THEO MỤC ĐÍCH VAY (LOAN PURPOSE)\n";
    csvContent += "Mục đích,Số khoản vay,Tỷ lệ phân bổ\n";
    purposeData.forEach(item => {
      const ratio = total > 0 ? ((item.value / total) * 100).toFixed(2) + "%" : "0%";
      csvContent += `"${item.name.replace(/"/g, '""')}",${item.value},"${ratio}"\n`;
    });
    csvContent += "\n";

    // Section 4: Geographic risk (Top 8 states with highest NPL)
    csvContent += "DANH SÁCH BANG CÓ RỦI RO NỢ XẤU CAO NHẤT (GEOGRAPHIC RISK)\n";
    csvContent += "Bang,Tỷ lệ nợ xấu NPL,Số lượng khoản vay\n";
    stateData.forEach(item => {
      csvContent += `"${item.state}",${item.npl}%,${item.count}\n`;
    });
    csvContent += "\n";
    
    // Section 5: NPL Trend over years
    csvContent += "XU HƯỚNG TỶ LỆ NỢ XẤU THEO NĂM (NPL TREND OVER YEARS)\n";
    csvContent += "Năm,Tỷ lệ nợ xấu NPL\n";
    nplData.forEach(item => {
      csvContent += `"${item.year}",${item.npl}%\n`;
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `credit_analysis_kpi_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const exportAsPDF = () => {
    setShowExportMenu(false);
    navigate('/reports?print=true');
  };


  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '60vh', gap: 10 }}>
      <Activity style={{ width: 20, height: 20, color: C.gray }} />
      <p className="label">Đang tải dữ liệu…</p>
    </div>
  );

  // Tính tổng khoản vay từ grade data (đúng số liệu SQL)
  const totalLoans = gradeData.reduce((s, d) => s + d.value, 0);

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <div className="page-wrap-wide">

      {/* ── Page header ────────────────────────────────────────────────────── */}
      <div className="dashboard-header">
        <div>
          <h1 style={{ fontSize: 17, fontWeight: 800, color: C.navy, letterSpacing: '-0.02em', marginBottom: 3 }}>
            Phân tích Danh mục Tín dụng
          </h1>
          <p style={{ fontSize: 11, color: C.gray, fontWeight: 500 }}>
            LendingClub · {totalLoans.toLocaleString('vi-VN')} khoản vay · 2007–2018
            {lastUpdated && <> · Cập nhật <span className="mono">{lastUpdated}</span></>}
          </p>
        </div>
        <div className="dashboard-actions" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={loadAll} id="btn-refresh">
            <RefreshCw style={{ width: 11, height: 11 }} /> Làm mới
          </button>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => setShowExportMenu(!showExportMenu)} 
              id="btn-export"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Download style={{ width: 11, height: 11 }} /> Xuất báo cáo ▾
            </button>
            
            {showExportMenu && (
              <>
                {/* Overlay to close the menu when clicking outside */}
                <div 
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 998,
                    background: 'transparent',
                  }}
                  onClick={() => setShowExportMenu(false)}
                />
                
                {/* Dropdown Menu */}
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  right: 0,
                  width: 290,
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 4,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  zIndex: 999,
                  overflow: 'hidden',
                  padding: '4px 0',
                }}>
                  <div style={{ padding: '8px 12px 6px', borderBottom: `1px solid ${C.bg}`, marginBottom: 4 }}>
                    <p style={{ fontSize: 9.5, fontWeight: 800, color: C.gray, textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
                      Chọn định dạng xuất
                    </p>
                  </div>
                  
                  <button 
                    onClick={exportAsPDF}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      width: '100%',
                      padding: '10px 12px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = C.bg}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <span style={{ fontSize: 14, marginRight: 10, marginTop: 1 }}>📄</span>
                    <div>
                      <p style={{ fontSize: 11.5, fontWeight: 700, color: C.navy, margin: '0 0 2px' }}>
                        Báo cáo Executive (PDF / In A4)
                      </p>
                      <p style={{ fontSize: 9.5, color: C.gray, margin: 0, lineHeight: 1.3 }}>
                        Bản in tối ưu hóa và xuất PDF chuẩn trang phân tích ngân hàng.
                      </p>
                    </div>
                  </button>

                  <button 
                    onClick={exportAsCSV}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      width: '100%',
                      padding: '10px 12px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = C.bg}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <span style={{ fontSize: 14, marginRight: 10, marginTop: 1 }}>📊</span>
                    <div>
                      <p style={{ fontSize: 11.5, fontWeight: 700, color: C.navy, margin: '0 0 2px' }}>
                        Bảng số liệu tài chính (CSV / Excel)
                      </p>
                      <p style={{ fontSize: 9.5, color: C.gray, margin: 0, lineHeight: 1.3 }}>
                        Toàn bộ các chỉ số KPI, rủi ro, phân hạng từ SQL cho Excel.
                      </p>
                    </div>
                  </button>

                  <button 
                    onClick={exportAsJSON}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      width: '100%',
                      padding: '10px 12px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = C.bg}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <span style={{ fontSize: 14, marginRight: 10, marginTop: 1 }}>⚙️</span>
                    <div>
                      <p style={{ fontSize: 11.5, fontWeight: 700, color: C.navy, margin: '0 0 2px' }}>
                        Dữ liệu cấu trúc máy (JSON)
                      </p>
                      <p style={{ fontSize: 9.5, color: C.gray, margin: 0, lineHeight: 1.3 }}>
                        File lưu trữ JSON chứa cấu trúc dữ liệu thô phục vụ kỹ thuật.
                      </p>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Tab bar ────────────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, marginBottom: 24, gap: 0 }}>
        {['Tổng quan danh mục', 'Phân tích rủi ro'].map((t, i) => (
          <button
            key={i}
            id={`tab-${i}`}
            onClick={() => setTab(i)}
            style={{
              padding: '9px 18px',
              fontSize: 12, fontWeight: 700,
              border: 'none', background: 'none', cursor: 'pointer',
              color: tab === i ? C.navy : C.gray,
              borderBottom: tab === i ? `2px solid ${C.cyan}` : '2px solid transparent',
              transition: 'all 0.15s',
              marginBottom: -1,
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 0 — TỔNG QUAN DANH MỤC
      ══════════════════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
      {tab === 0 && (
        <motion.div key="tab0"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* ── KPI Strip ──────────────────────────────────────────────────── */}
          <div className="dashboard-kpi-grid">
            {kpiData.map((k, i) => (
              <KpiCard key={i} {...k} delay={i * 0.05} />
            ))}
          </div>

          {/* ── Narrative: nhịp cầu vào biểu đồ đầu tiên ─────────────────── */}
          <SectionBridge text="Từ 2007 đến 2018, danh mục tăng trưởng 1.600 lần về giá trị giải ngân — nhưng tỷ lệ nợ xấu cũng biến động theo chu kỳ kinh tế, đạt đỉnh 18,6% năm 2015 rồi hạ nhiệt về 1,9% cuối 2018 khi chính sách thắt chặt." />

          {/* ── Row 1: NPL trend + Gauge ───────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 12, marginBottom: 12 }}>

            {/* Line chart: NPL theo năm */}
            <div className="card">
              <div className="card-header">
                <div>
                  <p className="section-title">Tỷ lệ nợ xấu (NPL) theo năm</p>
                  <p className="label" style={{ marginTop: 2 }}>So sánh với quy mô giải ngân — đỉnh năm 2015</p>
                </div>
                <span className="badge badge-danger">NPL Max: 18,6%</span>
              </div>
              <div className="card-body" style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={nplData} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gNpl" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={C.danger} stopOpacity={0.08} />
                        <stop offset="95%" stopColor={C.danger} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#eef0f4" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false}
                      tick={{ fill: C.gray, fontSize: 10, fontWeight: 600 }} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false}
                      tick={{ fill: '#bcc3ce', fontSize: 10 }}
                      tickFormatter={v => `${v}%`} domain={[0, 22]} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false}
                      tick={{ fill: '#bcc3ce', fontSize: 10 }}
                      tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}B` : `${v}M`} />
                    <Tooltip content={<ChartTip />} />
                    <Legend wrapperStyle={{ fontSize: 10, fontWeight: 600 }} />
                    <Bar yAxisId="right" dataKey="duNoXau" name="Dư nợ xấu ($M)"
                      fill={C.border} radius={[1,1,0,0]} maxBarSize={28} opacity={0.6} />
                    <Line yAxisId="left" type="monotone" dataKey="nplPct" name="NPL Ratio (%)"
                      stroke={C.danger} strokeWidth={2}
                      dot={{ fill: C.danger, r: 2.5, strokeWidth: 0 }}
                      activeDot={{ r: 4 }} />
                    <ReferenceLine yAxisId="left" y={15} stroke={C.danger}
                      strokeDasharray="4 3" strokeWidth={1}
                      label={{ value: 'Ngưỡng 15%', position: 'right', fontSize: 9, fill: C.danger }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gauge + tóm tắt */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
              <p className="label" style={{ marginBottom: 16, textAlign: 'center' }}>Tỷ lệ hoàn trả</p>
              <GaugeChart value={80.3} max={100} label="of 100%" color={C.success} />
              <div style={{ marginTop: 12, textAlign: 'center' }}>
                <p style={{ fontSize: 11, color: C.gray, lineHeight: 1.5 }}>
                  Trên tổng giải ngân <span className="mono" style={{ fontWeight: 700, color: C.navy }}>$33,9B</span>,<br />
                  đã thu hồi <span className="mono" style={{ fontWeight: 700, color: C.success }}>$27,3B</span>
                </p>
              </div>
            </div>
          </div>

          {/* ── Narrative 2 ───────────────────────────────────────────────── */}
          <SectionBridge text="Tăng trưởng bùng nổ 2012–2015 phản ánh làn sóng P2P Lending tại Mỹ — song kéo theo sự tích lũy rủi ro. Từ 2016 danh mục ổn định hơn về quy mô nhưng chất lượng dần được kiểm soát." />

          {/* ── Row 2: Area trend + Bảng khu vực ─────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12, marginBottom: 12 }}>

            {/* Area chart: giải ngân theo năm */}
            <div className="card">
              <div className="card-header">
                <div>
                  <p className="section-title">Tăng trưởng giải ngân (2007–2018)</p>
                  <p className="label" style={{ marginTop: 2 }}>Đơn vị: Triệu USD</p>
                </div>
              </div>
              <div className="card-body" style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="gTrend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={C.accent} stopOpacity={0.1} />
                        <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#eef0f4" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false}
                      tick={{ fill: '#bcc3ce', fontSize: 10 }} />
                    <YAxis axisLine={false} tickLine={false}
                      tick={{ fill: '#bcc3ce', fontSize: 10 }}
                      tickFormatter={v => v >= 1000 ? `${(v/1000).toFixed(0)}B` : `${v}M`} />
                    <Tooltip content={<ChartTip suffix=" M" />} />
                    <Area type="monotone" dataKey="amount" name="Giải ngân ($M)"
                      stroke={C.accent} strokeWidth={2}
                      fillOpacity={1} fill="url(#gTrend)"
                      dot={{ fill: C.accent, r: 2, strokeWidth: 0 }} activeDot={{ r: 4 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bảng top bang NPL */}
            <div className="card">
              <div className="card-header">
                <p className="section-title">Bang có NPL cao nhất</p>
                <span className="label">Top 8 · Xếp theo NPL%</span>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Bang</th>
                    <th>Vùng</th>
                    <th>Số khoản</th>
                    <th>NPL%</th>
                  </tr>
                </thead>
                <tbody>
                  {stateData.map((row, i) => (
                    <tr key={i}>
                      <td><span className="mono" style={{ fontWeight: 700, color: C.navy }}>{row.state}</span>
                        <span style={{ color: C.gray, fontSize: 10, marginLeft: 6 }}>{row.name}</span></td>
                      <td><span style={{ fontSize: 10, color: C.gray }}>{row.region}</span></td>
                      <td><span className="mono" style={{ fontSize: 11 }}>{row.loans.toLocaleString()}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div className="progress-bar" style={{ flex: 1 }}>
                            <div className="progress-fill" style={{
                              width: `${(row.nplRaw / 20) * 100}%`,
                              background: row.nplRaw > 14 ? C.danger : C.warning,
                            }} />
                          </div>
                          <span className="mono" style={{ fontSize: 10, color: row.nplRaw > 14 ? C.danger : C.warning, fontWeight: 700, width: 36 }}>
                            {row.npl}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Insight row (3 ô) ─────────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 12 }}>
            <InsightBox
              type="danger"
              title="NPL đỉnh 2015 — dấu hiệu bong bóng"
              finding="Tỷ lệ nợ xấu đạt 18,6% năm 2015 — tương ứng giai đoạn tăng trưởng giải ngân nóng nhất. Đây là tín hiệu cổ điển của việc nới lỏng tiêu chuẩn phê duyệt để chạy theo tăng trưởng."
              solution="Duy trì tốc độ tăng trưởng giải ngân không vượt quá 40%/năm; ưu tiên chất lượng danh mục hơn quy mô."
            />
            <InsightBox
              type="warning"
              title="South — vùng rủi ro tập trung"
              finding="4/8 bang NPL cao nhất thuộc vùng South (LA, AL, AR, OK), với NPL từ 14,3–15%. Cùng lãi suất trung bình 13,17% — cao nhất trong 4 vùng."
              solution="Áp dụng hệ số rủi ro bổ sung (risk premium) khi phê duyệt khoản vay tại các bang Southern Tier."
            />
            <InsightBox
              type="info"
              title="Tỷ lệ hoàn trả 80,3% — tín hiệu tích cực"
              finding="Trên tổng giải ngân $33,9 tỷ, đã thu hồi $27,3 tỷ (80,3%). Dù NPL còn ở mức đáng quan sát (12,3%), dư nợ hiện tại chỉ còn $949M — danh mục đang về cuối vòng đời."
              solution="Tập trung tối ưu hóa thu hồi nợ xấu ($4,2B) thay vì mở rộng giải ngân mới trong giai đoạn hiện tại."
            />
          </div>

        </motion.div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          TAB 1 — PHÂN TÍCH RỦI RO
      ══════════════════════════════════════════════════════════════════════ */}
      {tab === 1 && (
        <motion.div key="tab1"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* ── Narrative dẫn vào ─────────────────────────────────────────── */}
          <div style={{
            padding: '12px 16px', border: `1px solid ${C.border}`,
            borderLeft: `3px solid ${C.accent}`, background: C.white,
            borderRadius: 3, marginBottom: 24,
          }}>
            <p style={{ fontSize: 12, color: C.gray, lineHeight: 1.6, margin: 0 }}>
              Phân tích sâu cho thấy rủi ro danh mục tập trung ở{' '}
              <strong style={{ color: C.navy }}>hai chiều</strong>: theo{' '}
              <strong style={{ color: C.navy }}>hạng tín dụng</strong> (Grade E–G có NPL gấp 12× so với Grade A)
              và theo <strong style={{ color: C.navy }}>mục đích vay</strong> (đảo nợ chiếm 56,6% — nhóm khách hàng áp lực tài chính cao).
            </p>
          </div>

          {/* ── Row 1: Donut mục đích + Combo grade ───────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 12, marginBottom: 12 }}>

            {/* Donut */}
            <div className="card">
              <div className="card-header">
                <div>
                  <p className="section-title">Cơ cấu mục đích vay</p>
                  <p className="label" style={{ marginTop: 2 }}>Theo số khoản vay</p>
                </div>
                <span className="badge badge-warning">Đảo nợ: 56,6%</span>
              </div>
              <div className="card-body" style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={purposeData} cx="42%" cy="50%"
                      innerRadius={60} outerRadius={92} paddingAngle={2}
                      dataKey="value" stroke="none">
                      {purposeData.map((e, i) => (
                        <Cell key={i} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v, name) => [`${v}%`, name]}
                      contentStyle={{ borderRadius: 3, border: `1px solid ${C.border}`, fontSize: 11 }}
                    />
                    <Legend layout="vertical" verticalAlign="middle" align="right"
                      wrapperStyle={{ fontSize: 10.5, fontWeight: 600, color: C.gray }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Combo chart grade */}
            <div className="card">
              <div className="card-header">
                <div>
                  <p className="section-title">Hạng tín dụng — Giải ngân & Tỷ lệ rủi ro</p>
                  <p className="label" style={{ marginTop: 2 }}>Cột: Tổng giải ngân ($B) · Đường: NPL Risk %</p>
                </div>
              </div>
              <div className="card-body" style={{ height: 240 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={gradeRiskData} margin={{ top: 4, right: 16, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#eef0f4" />
                    <XAxis dataKey="grade" axisLine={false} tickLine={false}
                      tick={{ fill: C.gray, fontSize: 11, fontWeight: 700 }} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false}
                      tick={{ fill: '#bcc3ce', fontSize: 10 }}
                      tickFormatter={v => `${v}B`} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false}
                      tick={{ fill: '#bcc3ce', fontSize: 10 }}
                      tickFormatter={v => `${v}%`} />
                    <Tooltip content={<ChartTip />} />
                    <Legend wrapperStyle={{ fontSize: 10, fontWeight: 600 }} />
                    <Bar yAxisId="left" dataKey="giaiNgan" name="Giải ngân ($B)"
                      radius={[2,2,0,0]} maxBarSize={40}>
                      {gradeRiskData.map((_, i) => (
                        <Cell key={i} fill={GRADE_COLORS[i]} />
                      ))}
                    </Bar>
                    <Line yAxisId="right" type="monotone" dataKey="riskPct" name="Rủi ro (%)"
                      stroke={C.warning} strokeWidth={2}
                      dot={{ fill: C.warning, r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ── Narrative 2 ───────────────────────────────────────────────── */}
          <SectionBridge text="Dữ liệu lãi suất cho thấy ngân hàng đã định giá rủi ro đúng hướng — Grade G chịu lãi suất trung bình 28% so với 7% của Grade A. Tuy nhiên, tỷ lệ thu hồi nợ xấu vẫn rất thấp ở mọi hạng (< 10%), cho thấy công cụ thu hồi chưa hiệu quả." />

          {/* ── Row 2: Bar lãi suất + Recovery table ──────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 12, marginBottom: 12 }}>

            {/* Bar chart lãi suất theo hạng */}
            <div className="card">
              <div className="card-header">
                <div>
                  <p className="section-title">Lãi suất trung bình theo hạng tín dụng</p>
                  <p className="label" style={{ marginTop: 2 }}>Grade A (7,1%) → Grade G (28,1%) — %/năm</p>
                </div>
              </div>
              <div className="card-body" style={{ height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={interestData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#eef0f4" />
                    <XAxis dataKey="grade" axisLine={false} tickLine={false}
                      tick={{ fill: C.gray, fontSize: 11, fontWeight: 700 }} />
                    <YAxis axisLine={false} tickLine={false}
                      tick={{ fill: '#bcc3ce', fontSize: 10 }}
                      tickFormatter={v => `${v}%`} />
                    <Tooltip content={<ChartTip suffix="%" />} />
                    <Bar dataKey="laiSuatTB" name="Lãi suất TB (%)" radius={[2,2,0,0]} maxBarSize={44}>
                      {interestData.map((_, i) => (
                        <Cell key={i} fill={GRADE_COLORS[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bảng thu hồi nợ xấu */}
            <div className="card">
              <div className="card-header">
                <p className="section-title">Tỷ lệ thu hồi nợ xấu theo hạng</p>
                <span className="label">Rất thấp — max 9,7%</span>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Hạng</th>
                    <th>Số khoản NPL</th>
                    <th>Thu hồi %</th>
                  </tr>
                </thead>
                <tbody>
                  {recoveryData.map((row, i) => (
                    <tr key={i}>
                      <td><span className="mono" style={{ fontWeight: 700, color: GRADE_COLORS[i] }}>{row.grade}</span></td>
                      <td><span className="mono" style={{ fontSize: 11 }}>{row.soNoXau.toLocaleString()}</span></td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div className="progress-bar" style={{ flex: 1 }}>
                            <div className="progress-fill" style={{
                              width: `${(row.tyLeHoiPct / 15) * 100}%`,
                              background: C.gray,
                            }} />
                          </div>
                          <span className="mono" style={{ fontSize: 10, color: C.gray, fontWeight: 600, width: 36 }}>
                            {row.tyLeHoiPct}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Row 3: Scatter chart Phân tích điểm dị biệt (Outliers DTI vs Lãi suất) ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, marginBottom: 12 }}>
            <div className="card">
              <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p className="section-title">Phân tích điểm dị biệt (Outliers) — Tỷ lệ Nợ/Thu nhập (DTI) vs Lãi suất cho vay</p>
                  <p className="label" style={{ marginTop: 2 }}>Tích hợp từ Power BI — Phát hiện lỗ hổng phê duyệt hồ sơ: Khách hàng DTI cực cao (&gt;45%) vẫn hưởng lãi suất thấp (&lt;10%)</p>
                </div>
                <span className="badge badge-danger">Lỗ hổng DTI Outliers</span>
              </div>
              <div className="card-body" style={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 12, right: 20, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="2 4" stroke="#eef0f4" />
                    <XAxis type="number" dataKey="dti" name="DTI" unit="%" 
                      axisLine={false} tickLine={false} tick={{ fill: C.gray, fontSize: 10, fontWeight: 600 }}
                      label={{ value: 'Tỷ lệ Nợ/Thu nhập (DTI) %', position: 'bottom', offset: -2, fontSize: 9.5, fill: C.gray }}
                      domain={[0, 55]} />
                    <YAxis type="number" dataKey="intRate" name="Lãi suất" unit="%" 
                      axisLine={false} tickLine={false} tick={{ fill: C.gray, fontSize: 10, fontWeight: 600 }}
                      label={{ value: 'Lãi suất %/năm', angle: -90, position: 'insideLeft', offset: 10, fontSize: 9.5, fill: C.gray }}
                      domain={[0, 35]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} 
                      contentStyle={{ fontSize: 11, borderRadius: 3, border: `1px solid ${C.border}` }}
                      formatter={(v, name) => [`${v}%`, name === 'dti' ? 'DTI' : 'Lãi suất']} />
                    <Legend wrapperStyle={{ fontSize: 10.5, fontWeight: 700, paddingTop: 10 }} />
                    
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((grade, idx) => (
                      <Scatter 
                        key={grade} 
                        name={`Hạng ${grade}`} 
                        data={dtiScatterData.filter(d => d.grade === grade)} 
                        fill={GRADE_COLORS[idx]} 
                        shape="circle" 
                        line={false}
                      />
                    ))}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* ── Insight panels ────────────────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 12 }}>
            <InsightBox
              type="warning"
              title="Đảo nợ chiếm 56,6% — rủi ro dây chuyền"
              finding="1,276,708 khoản vay (56,6%) dùng để đảo nợ. Đây là nhóm khách hàng đang vay chỗ này trả chỗ kia — khi thu nhập giảm nhẹ, toàn bộ hệ thống nợ sụp đổ."
              solution="Chủ động giảm tỷ trọng xuống < 40%; chuyển hướng sang vay kinh doanh và mua tài sản — nhóm tạo dòng tiền trực tiếp."
            />
            <InsightBox
              type="danger"
              title="Grade E–G: NPL tăng theo cấp số nhân"
              finding="Grade A: NPL 3,1% — Grade G: NPL 37,7%. Dù lãi suất cao (28%), tỷ lệ thu hồi chỉ đạt 9,7% — lợi nhuận thực bị xói mòn hoàn toàn. Tổng dư nợ xấu E–G: $1,03B."
              solution="Siết tiêu chuẩn phê duyệt Grade E–G; áp trần giải ngân theo hạng; tăng cường công cụ thu hồi nợ (đặc biệt nhóm F–G)."
            />
            <InsightBox
              type="info"
              title="Điểm dị biệt (Outliers) thẩm định DTI"
              finding="Phát hiện nhiều hồ sơ khách hàng có tỷ lệ Nợ/Thu nhập (DTI) cực kỳ cao (&gt;45%) nhưng vẫn được áp mức lãi suất ưu đãi thấp (&lt;10%) như hạng A-B. Đây là lỗ hổng thẩm định lớn."
              solution="Thiết lập quy tắc Core-system: Tự động từ chối phê duyệt trực tuyến hoặc chuyển lên cấp phê duyệt cao hơn đối với hồ sơ DTI &gt; 45%."
            />
          </div>

        </motion.div>
      )}
      </AnimatePresence>

    </div>
  );
};

export default DashboardPage;
