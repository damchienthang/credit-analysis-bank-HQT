import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, Legend, ComposedChart
} from 'recharts';
import { 
  Database, ShieldAlert, Banknote, TrendingUp, Filter, 
  Download, ChevronRight, AlertTriangle, CheckCircle2, Wifi, WifiOff, RefreshCw
} from 'lucide-react';
import {
  fetchKpi, fetchLoanGrade, fetchLoanTrend,
  fetchLoanPurpose, fetchRecovery, fetchStateRisk,
} from '../data/api';

// ── Connection status badge ────────────────────────────────────────────────────
function DbStatus({ live }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-black uppercase tracking-widest border ${
      live ? 'bg-green-50 text-green-700 border-green-200' : 'bg-amber-50 text-amber-700 border-amber-200'
    }`}>
      {live ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
      {live ? 'SQL Server Live' : 'Mock Data'}
    </span>
  );
}

const ICON_MAP = { Database, ShieldAlert, Banknote, TrendingUp };

const DashboardPage = () => {
  // ── State ──────────────────────────────────────────────────────────────────
  const [kpiData,        setKpiData]        = useState([]);
  const [loanGradeData,  setLoanGradeData]  = useState([]);
  const [loanTrendData,  setLoanTrendData]  = useState([]);
  const [loanPurposeData,setLoanPurposeData]= useState([]);
  const [recoveryData,   setRecoveryData]   = useState([]);
  const [stateRiskData,  setStateRiskData]  = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [isLive,         setIsLive]         = useState(false);
  const [lastUpdated,    setLastUpdated]    = useState('');

  // ── Fetch all data ─────────────────────────────────────────────────────────
  const loadAll = async () => {
    setLoading(true);
    try {
      // Check if backend is alive
      const health = await fetch('http://localhost:3001/api/health', {
        signal: AbortSignal.timeout(3000)
      }).then(r => r.ok).catch(() => false);
      setIsLive(health);

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
      setLastUpdated(new Date().toLocaleTimeString('vi-VN'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-14 h-14 rounded-2xl bg-navy/5 flex items-center justify-center animate-pulse">
        <Database className="h-8 w-8 text-navy/30" />
      </div>
      <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">Đang tải dữ liệu từ SQL Server...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-8">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-navy uppercase tracking-tighter">Executive BI Dashboard</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-gray-500 font-medium text-sm">LendingClub Portfolio Analysis</p>
            <DbStatus live={isLive} />
            {lastUpdated && <span className="text-gray-400 text-xs">• {lastUpdated}</span>}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={loadAll}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-bold text-sm text-gray-600 hover:bg-gray-50 transition-all enterprise-shadow"
          >
            <RefreshCw className="h-4 w-4" /> Làm mới
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-xl font-bold text-sm hover:bg-accent-blue transition-all shadow-lg">
            <Download className="h-4 w-4" /> Xuất báo cáo
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, i) => {
          const Icon = ICON_MAP[kpi.icon];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-gray-100 enterprise-shadow group hover:border-accent-blue/30 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${kpi.risk ? 'bg-red-50 text-status-risk' : 'bg-navy/5 text-navy'} group-hover:scale-110 transition-transform`}>
                  {Icon && <Icon className="h-6 w-6" />}
                </div>
                {kpi.trend ? (
                  <span className={`text-sm font-bold px-2 py-1 rounded-lg ${kpi.trend.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {kpi.trend}
                  </span>
                ) : (
                  <span className="text-[13px] font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-500">LIVE</span>
                )}
              </div>
              <p className="text-base font-bold text-gray-400 uppercase tracking-widest mb-1">{kpi.label}</p>
              <h3 className="text-4xl font-black text-navy">{kpi.value}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Loan Grade Distribution */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 enterprise-shadow">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-navy">Phân bổ khoản vay theo hạng (Grade)</h3>
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-status-good"></div>
              <div className="h-3 w-3 rounded-full bg-status-warning"></div>
              <div className="h-3 w-3 rounded-full bg-status-risk"></div>
            </div>
          </div>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={loanGradeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {loanGradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Loan Purpose - Donut */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 enterprise-shadow">
          <h3 className="text-xl font-bold text-navy mb-8">Mục đích vay vốn</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={loanPurposeData}
                  cx="50%" cy="50%"
                  innerRadius={60} outerRadius={100}
                  paddingAngle={5} dataKey="value"
                >
                  {loanPurposeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-navy/5 rounded-2xl border border-navy/10">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-accent-blue" />
                <p className="text-sm font-bold text-navy">Insight: Nợ tiêu dùng chiếm 75% tỷ trọng danh mục.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-gray-100 enterprise-shadow">
          <h3 className="text-xl font-bold text-navy mb-2">Tăng trưởng giải ngân</h3>
          <p className="text-xs text-gray-400 mb-6 font-medium uppercase tracking-widest">2007 – 2018</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={loanTrendData}>
                <defs>
                  <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0052A5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0052A5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="amount" stroke="#0052A5" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recovery vs Charge-Off */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 enterprise-shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold text-navy">Thu hồi nợ vs Xóa nợ</h3>
          </div>
          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-status-good"></div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Recovery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-status-risk"></div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Charge-off</span>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={recoveryData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 600 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }} />
                <Bar dataKey="recovery" name="Thu hồi" fill="#22c55e" radius={[6, 6, 0, 0]} opacity={0.85} />
                <Line type="monotone" dataKey="chargeOff" name="Xóa nợ" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* State Analytics Table */}
      <div className="bg-white rounded-3xl border border-gray-100 enterprise-shadow overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-navy">Phân tích rủi ro theo Khu vực (Top 5)</h3>
          <button className="text-accent-blue text-sm font-bold flex items-center hover:underline">
            Xem tất cả <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Khu vực (State)</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Số khoản vay</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">NPL Ratio</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Mức rủi ro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {stateRiskData.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 font-bold text-navy">{item.state}</td>
                  <td className="px-8 py-5 text-gray-600 font-medium">{Number(item.loans).toLocaleString()}</td>
                  <td className="px-8 py-5 text-status-risk font-bold">{item.npl}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-black uppercase tracking-tighter ${
                      item.risk === 'Low'    ? 'bg-green-100 text-green-700' :
                      item.risk === 'Medium' ? 'bg-amber-100 text-amber-700' :
                                               'bg-red-100 text-red-700'
                    }`}>
                      {item.risk === 'Low' ? <CheckCircle2 className="h-3 w-3" /> : <AlertTriangle className="h-3 w-3" />}
                      {item.risk} Risk
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Insights Bar */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-navy to-accent-blue p-1 rounded-3xl shadow-2xl"
      >
        <div className="bg-navy/40 backdrop-blur-xl p-6 rounded-[22px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-white">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center animate-pulse">
              <TrendingUp className="h-8 w-8 text-banking-gold" />
            </div>
            <div>
              <h4 className="text-xl font-bold">Hệ thống AI Insights phát hiện:</h4>
              <p className="text-gray-300">Rủi ro tập trung cao tại các khoản vay Grade E khu vực Florida. Đề xuất siết chặt phê duyệt.</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-banking-gold text-navy rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform">
            Xem chi tiết khuyến nghị
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
