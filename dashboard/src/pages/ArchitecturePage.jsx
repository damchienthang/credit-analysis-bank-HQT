import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe, FileCode, Server, Settings, Database,
  BarChart3, ArrowRight, CheckCircle2, ChevronDown,
  ChevronUp, Layers, Code2, FileJson, Zap, LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';

const stages = [
  {
    no: '01', title: 'Nguồn dữ liệu', sub: 'SOURCE',
    tech: 'CSV / Kaggle', icon: Globe,
    details: [
      'File CSV – Lending Club Dataset từ Kaggle',
      '2,260,701 bản ghi × 151 cột thô',
      'Thông tin khoản vay, khách hàng, lịch sử tín dụng, thanh toán',
    ],
    output: 'loan.csv (raw, ~1.5 GB)',
  },
  {
    no: '02', title: 'Extract & Tiền xử lý', sub: 'PYTHON',
    tech: 'Python / Pandas / RegEx', icon: FileCode,
    details: [
      'Đọc file CSV với encoding latin1, low_memory=False',
      'Loại bỏ 118 cột nhiễu, xử lý giá trị thiếu',
      'Chuẩn hóa term, emp_length bằng RegEx về dạng số',
      'Feature Engineering: issue_year, issue_month, issue_quarter',
      'Chuẩn hóa định dạng ngày tháng YYYY-MM-DD',
    ],
    output: 'cleaned_loan.csv (33 cột, 2.26M dòng)',
  },
  {
    no: '03', title: 'Staging', sub: 'SQL SERVER',
    tech: 'SQL Server / T-SQL', icon: Server,
    details: [
      'Nạp cleaned_loan.csv vào bảng loan_staging qua SQLAlchemy + pyodbc',
      'fast_executemany=True tăng tốc nạp dữ liệu',
      'Lưu trữ tạm thời, làm trung gian cho ETL',
      'Dễ kiểm tra và đối chiếu với nguồn gốc',
    ],
    output: 'loan_staging (2,258,084 bản ghi)',
  },
  {
    no: '04', title: 'ETL Process', sub: 'TRANSFORM',
    tech: 'T-SQL (etl_process.sql)', icon: Settings,
    details: [
      'Tạo loan_staging_clean với kiểu dữ liệu chính xác',
      'CAST toàn bộ: FLOAT→INT, string→DATE',
      'Chuẩn hóa 3NF, tách dimension',
      'Sinh Surrogate Key cho từng bảng Dimension',
      'Write-back FK vào staging_clean sau mỗi Dimension',
      'Nạp dữ liệu vào Fact & Dimension',
    ],
    output: 'loan_staging_clean + 5 FK đầy đủ',
  },
  {
    no: '05', title: 'Data Warehouse', sub: 'STAR SCHEMA',
    tech: 'SQL Server / Star Schema', icon: Database,
    details: [
      '1 bảng Fact_Loans (2.26M dòng, 24 thuộc tính)',
      '5 bảng Dimension phân tích đa chiều',
      'Non-clustered Index trên 5 cột FK',
      'Tối ưu 70% dung lượng bộ nhớ so với raw',
    ],
    output: 'CreditBI_DB – Star Schema',
  },
  {
    no: '06', title: 'Trực quan hóa', sub: 'WEB DASHBOARD',
    tech: 'React / Recharts / Vite', icon: LayoutDashboard,
    details: [
      'Xây dựng Web Dashboard trực tiếp bằng React + Vite',
      'Biểu đồ tương tác: Bar, Line, Area, Pie (Recharts)',
      'KPI Cards, Risk Table, AI Insight Panel',
      'Phân tích xu hướng, mục đích vay, rủi ro địa lý',
      'Responsive, realtime filter, xuất báo cáo',
    ],
    output: 'LendingClub BI Platform (trang web này)',
  },
];

// 3-color palette: navy / accent-blue / banking-gold
// Odd stages → navy bg, Even stages → accent-blue bg, Last → banking-gold bg
const stageStyle = (i, total) => {
  if (i === total - 1) return { hdr: 'bg-banking-gold text-navy', badge: 'bg-navy/20 text-navy', dot: 'bg-navy' };
  if (i % 2 === 0) return { hdr: 'bg-navy text-white', badge: 'bg-white/15 text-white', dot: 'bg-banking-gold' };
  return { hdr: 'bg-accent-blue text-white', badge: 'bg-white/15 text-white', dot: 'bg-banking-gold' };
};

const factCols = [
  'loan_key (PK)', 'customer_key (FK)', 'time_key (FK)',
  'geo_key (FK)', 'product_key (FK)', 'risk_key (FK)',
  'loan_amount', 'funded_amount', 'installment',
  'interest_rate', 'total_payment', 'total_rec_payment',
  'total_rec_principal', 'delinq_2yrs', 'ling_last_6mths',
  'grade', 'sub_grade', 'loan_status', 'purpose',
];

const dims = [
  { name: 'Dim_Customers', cols: ['customer_key (PK)', 'name', 'email', 'emp_length', 'home_ownership', 'annual_income', 'verification_status'] },
  { name: 'Dim_Time', cols: ['time_key (PK)', 'full_date', 'date', 'day', 'month', 'month_name', 'quarter', 'year'] },
  { name: 'Dim_Geography', cols: ['geography_key (PK)', 'addr_state', 'state', 'region'] },
  { name: 'Dim_LoanProduct', cols: ['loan_product_key (PK)', 'loan_term', 'interest_rate_range', 'grade', 'sub_grade', 'purpose'] },
  { name: 'Dim_CreditRisk', cols: ['credit_risk_key (PK)', 'loan_status', 'risk_level', 'days_late_range'] },
];

const techStack = [
  { name: 'Python', sub: 'Pandas, RegEx', icon: FileCode },
  { name: 'SQL Server', sub: '2019/2022', icon: Server },
  { name: 'T-SQL', sub: 'ETL Scripts', icon: FileJson },
  { name: 'React + Vite', sub: 'Dashboard', icon: Code2 },
  { name: 'Recharts', sub: 'Visualization', icon: BarChart3 },
  { name: 'Framer Motion', sub: 'Animations', icon: Zap },
];

export default function ArchitecturePage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="bg-bg-light min-h-screen">

      {/* ── HERO ── */}
      <section className="bg-navy py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-banking-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
            Sơ đồ tổng quát quy trình
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
            ETL Pipeline &amp; <span className="text-banking-gold">Kiến trúc Hệ thống</span>
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Hệ thống phân tích dữ liệu hoạt động tín dụng — từ <strong>File CSV thô</strong> đến{' '}
            <strong>Web Dashboard tương tác</strong> qua 6 giai đoạn chuẩn.
          </p>
        </div>
      </section>

      {/* ── PIPELINE ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-2">6 Giai đoạn Pipeline</h2>
          <div className="h-1.5 w-20 bg-banking-gold mx-auto rounded-full" />
        </div>

        {/* Flow indicator (desktop) */}
        <div className="hidden lg:flex items-center justify-center gap-0 mb-10">
          {stages.map((s, i) => {
            const style = stageStyle(i, stages.length);
            return (
              <div key={s.no} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest ${style.hdr}`}>
                  <span>{s.no}</span>
                  <span className="hidden xl:inline">{s.title}</span>
                </div>
                {i < stages.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-banking-gold mx-1 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((s, i) => {
            const style = stageStyle(i, stages.length);
            const isOpen = open === i;
            return (
              <motion.div key={s.no}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                className="bg-white rounded-3xl border border-gray-100 enterprise-shadow overflow-hidden hover:-translate-y-1 transition-transform duration-300">

                {/* Card header */}
                <div className={`${style.hdr} p-5 flex items-center gap-4`}>
                  <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <s.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">{s.sub}</p>
                    <h3 className="text-white font-black text-lg leading-tight">{s.no}. {s.title}</h3>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <span className={`inline-block text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-4 border ${i === stages.length - 1
                    ? 'bg-banking-gold/10 text-navy border-banking-gold/30'
                    : i % 2 === 0
                      ? 'bg-navy/5 text-navy border-navy/15'
                      : 'bg-accent-blue/5 text-accent-blue border-accent-blue/20'
                    }`}>
                    {s.tech}
                  </span>

                  {/* Toggle */}
                  <button onClick={() => setOpen(isOpen ? null : i)}
                    className="flex items-center gap-2 text-xs font-bold text-accent-blue hover:text-navy transition-colors mb-3">
                    {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    {isOpen ? 'Thu gọn' : 'Xem chi tiết'}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <ul className="space-y-2 mb-4">
                          {s.details.map((d, j) => (
                            <li key={j} className="flex gap-2 text-xs text-gray-600 font-medium">
                              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${style.dot}`} />
                              {d}
                            </li>
                          ))}
                        </ul>
                        <div className="p-3 bg-navy/5 rounded-xl border border-navy/10">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Output</p>
                          <p className="text-xs font-bold text-navy">{s.output}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isOpen && (
                    <p className="text-xs text-gray-400 italic leading-relaxed">{s.details[0]}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-xs font-bold text-gray-500">
          {[
            { label: 'Extract (ETL)', cls: 'bg-accent-blue' },
            { label: 'Transform', cls: 'bg-navy' },
            { label: 'Load (DW)', cls: 'bg-navy' },
            { label: 'Phân tích & Trực quan', cls: 'bg-banking-gold' },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${l.cls}`} />
              {l.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── STAR SCHEMA ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-2">Star Schema — Data Warehouse</h2>
            <p className="text-gray-500">1 bảng Fact trung tâm + 5 bảng Dimension phân tích đa chiều</p>
            <div className="h-1.5 w-20 bg-banking-gold mx-auto rounded-full mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Fact Table */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="bg-navy text-white rounded-3xl p-6 border-4 border-banking-gold shadow-2xl h-full">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/20">
                  <Database className="h-6 w-6 text-banking-gold" />
                  <h3 className="text-white font-black">Fact_Loans</h3>
                </div>
                <p className="text-blue-200 text-xs mb-4">2,260,701 bản ghi · 19 thuộc tính</p>
                <div className="space-y-1">
                  {factCols.map(col => (
                    <div key={col} className="text-[11px] font-mono text-blue-100 py-1 border-b border-white/5 last:border-0 flex items-center gap-2">
                      {col.includes('PK') && <span className="text-banking-gold font-black text-[9px] w-4">PK</span>}
                      {col.includes('FK') && <span className="text-accent-blue font-black text-[9px] w-4">FK</span>}
                      {!col.includes('PK') && !col.includes('FK') && <span className="w-4" />}
                      {col.replace(' (PK)', '').replace(' (FK)', '')}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Dimension Tables */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
              {dims.map((dim, i) => (
                <motion.div key={dim.name}
                  initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                  className="rounded-2xl border-2 border-accent-blue/20 bg-accent-blue/5 p-5 enterprise-shadow">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-accent-blue/15">
                    <Layers className="h-4 w-4 text-accent-blue" />
                    <h4 className="font-black text-navy text-sm">{dim.name}</h4>
                  </div>
                  <div className="space-y-1">
                    {dim.cols.map(col => (
                      <div key={col} className="text-[10px] font-mono text-gray-600 flex items-center gap-1.5">
                        {col.includes('PK')
                          ? <span className="text-banking-gold font-black text-[9px] w-4">PK</span>
                          : <span className="w-4" />
                        }
                        {col.replace(' (PK)', '')}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: 'Non-clustered Index', desc: 'Đánh index toàn bộ 5 cột FK trong Fact_Loans ngay sau INSERT để tăng tốc JOIN.' },
              { title: 'Surrogate Key', desc: 'Mỗi Dimension có khóa thay thế tự tăng (IDENTITY) thay vì dùng khóa tự nhiên.' },
              { title: 'Kiểm tra toàn vẹn', desc: 'Sau ETL: kiểm tra row count, NULL trong FK và loan_id trùng lặp trong Fact_Loans.' },
            ].map((note, i) => (
              <div key={i} className="flex gap-3 p-5 bg-navy/5 rounded-2xl border border-navy/10 enterprise-shadow">
                <CheckCircle2 className="h-5 w-5 text-accent-blue flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-navy text-sm mb-1">{note.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{note.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Công nghệ sử dụng</h2>
            <div className="h-1.5 w-20 bg-banking-gold mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {techStack.map((t, i) => (
              <motion.div key={t.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }} viewport={{ once: true }}
                className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-banking-gold/40 transition-all group text-center">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${i < 3 ? 'bg-accent-blue' : 'bg-banking-gold'
                  }`}>
                  <t.icon className={`h-7 w-7 ${i < 3 ? 'text-white' : 'text-navy'}`} />
                </div>
                <p className="font-black text-white text-sm">{t.name}</p>
                <p className="text-blue-300 text-[10px] font-bold mt-1">{t.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-banking-gold">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-black text-navy mb-8 uppercase tracking-tighter">
            Khám phá kết quả phân tích
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/dashboard"
              className="px-10 py-5 bg-navy text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-accent-blue transition-all flex items-center gap-3 shadow-xl">
              Vào Dashboard <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/platform"
              className="px-10 py-5 bg-white text-navy rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-xl">
              Lý thuyết BI
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
