import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Zap, Database, Globe, Layers, Table2, TrendingUp, ChevronDown, ChevronUp, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const stats = [
    { label: 'Bản ghi dữ liệu', value: '2.26M+', icon: Database },
    { label: 'Thuộc tính sạch', value: '33', icon: Layers },
    { label: 'Tỷ lệ nợ xấu (NPL)', value: '14.2%', icon: ShieldCheck },
    { label: 'Khu vực địa lý', value: '50+', icon: Globe },
  ];

  const features = [
    {
      title: 'Phân tích Rủi ro Tín dụng',
      description: 'Hệ thống đánh giá rủi ro dựa trên dữ liệu lịch sử từ 2007-2018, giúp dự báo khả năng thanh toán.',
      icon: ShieldCheck,
      color: 'bg-blue-500'
    },
    {
      title: 'Trực quan hóa Dữ liệu lớn',
      description: 'Chuyển đổi hàng triệu bản ghi thành các biểu đồ trực quan, hỗ trợ ra quyết định nhanh chóng.',
      icon: BarChart3,
      color: 'bg-indigo-500'
    },
    {
      title: 'Quy trình ETL Tối ưu',
      description: 'Xử lý dữ liệu thô phức tạp, loại bỏ nhiễu và chuẩn hóa thông tin với hiệu suất cao.',
      icon: Zap,
      color: 'bg-amber-500'
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-navy pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/20 border border-accent-blue/30 text-accent-blue mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-white">LendingClub BI Platform v1.0</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                Hệ Thống Phân Tích <br />
                <span className="text-banking-gold">& Quản Trị Tín Dụng</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
                Giải pháp Business Intelligence toàn diện cho dữ liệu tài chính quy mô lớn.
                Tối ưu hóa chiến lược cho vay và quản trị rủi ro nợ xấu.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard" className="px-8 py-4 bg-accent-blue hover:bg-blue-600 text-white rounded-xl font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-900/20">
                  Khám phá Dashboard <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/architecture" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-xl font-bold transition-all backdrop-blur-sm">
                  Kiến trúc hệ thống
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-navy font-bold text-xl">Dòng tiền giải ngân</h3>
                    <p className="text-xs text-gray-500 underline underline-offset-4 decoration-accent-blue decoration-2">Xu hướng 2007-2018</p>
                  </div>
                </div>
                {/* Mock Chart Visualization */}
                <div className="h-64 flex items-end gap-2 px-4">
                  {[40, 60, 45, 90, 65, 80, 100, 75, 85, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 1 }}
                      className="flex-grow bg-navy/10 hover:bg-accent-blue transition-colors rounded-t-lg"
                    />
                  ))}
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[14px] text-gray-400 mb-1">NPL Ratio</p>
                    <p className="text-[16px] font-bold text-status-risk leading-none">14.2%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[14px] text-gray-400 mb-1">Recovery Rate</p>
                    <p className="text-[16px] font-bold text-status-good leading-none">58.3%</p>
                  </div>
                </div>
              </div>
              {/* Floating element */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 p-6 bg-banking-gold rounded-2xl shadow-2xl text-navy"
              >
                <Database className="h-8 w-8 mb-2" />
                <p className="text-xs font-bold uppercase tracking-widest">Big Data</p>
                <p className="text-2xl font-black leading-none">2.26M</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex p-3 rounded-2xl bg-navy/5 text-navy mb-4">
                  <stat.icon className="h-6 w-6" />
                </div>
                <p className="text-4xl font-black text-navy mb-1">{stat.value}</p>
                <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-4">Đặc điểm Nền tảng</h2>
            <div className="h-1.5 w-24 bg-banking-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-8 bg-white rounded-3xl enterprise-shadow hover:shadow-2xl transition-all group"
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-4">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT DATASET SECTION ===== */}
      <AboutDataset />

      {/* ===== DATASET ATTRIBUTES TABLE SECTION ===== */}
      <DatasetSection />

      {/* ===== EDA SECTION ===== */}
      <EDASection />

    </div>
  );
};

/* ---------- About Dataset ---------- */
function AboutDataset() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border border-gray-100 enterprise-shadow overflow-hidden"
        >
          {/* Header bar */}
          <div className="bg-navy px-8 py-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-banking-gold/20 border-2 border-banking-gold flex items-center justify-center flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-banking-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <p className="text-banking-gold text-[10px] font-black uppercase tracking-[0.25em]">About Dataset</p>
              <h2 className="text-white font-black text-xl leading-tight">LendingClub Loan Data (2007–2018)</h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description */}
            <div className="lg:col-span-2 space-y-4">
              <p className="text-gray-600 leading-relaxed text-xl">
                Bộ dữ liệu được cung cấp bởi <strong className="text-navy">LendingClub</strong> — nền tảng cho vay ngang hàng (P2P Lending) lớn nhất Hoa Kỳ. Dữ liệu ghi lại toàn bộ lịch sử khoản vay từ <strong className="text-navy">2007 đến 2018</strong>, bao gồm thông tin về người vay, điều kiện khoản vay, lịch sử tín dụng và kết quả thanh toán.
              </p>
              <p className="text-gray-600 leading-relaxed text-xm">
                Sau quá trình <strong className="text-navy">ETL và làm sạch dữ liệu</strong>, bộ dữ liệu được thu gọn từ 151 cột nguyên bản xuống còn <strong className="text-navy">33 thuộc tính chất lượng cao</strong> với hơn <strong className="text-navy">2.26 triệu bản ghi</strong>, phục vụ phân tích rủi ro tín dụng và xây dựng hệ thống BI.
              </p>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {['P2P Lending', 'Credit Risk', 'Financial Analytics', 'Big Data', 'ETL Pipeline', 'Star Schema'].map(tag => (
                  <span key={tag} className="text-[12px] font-black px-3 py-1.5 rounded-full bg-navy/5 text-navy border border-navy/10 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats + Link */}
            <div className="space-y-4">
              {/* Dataset stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { val: '2.26M+', label: 'Bản ghi' },
                  { val: '151', label: 'Thuộc tính' },
                  { val: '2007–2018', label: 'Thời gian' },
                  { val: '50+', label: 'Bang (Mỹ)' },
                ].map((s, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                    <p className="text-xl font-black text-accent-blue">{s.val}</p>
                    <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Kaggle link */}
              <a
                href="https://www.kaggle.com/datasets/wordsforthewise/lending-club"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-navy rounded-2xl hover:bg-accent-blue transition-colors group"
              >
                <div className="w-9 h-9 rounded-xl bg-banking-gold flex items-center justify-center flex-shrink-0">
                  <svg className="h-5 w-5 text-navy" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.336z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[16px] font-black leading-tight">Xem trên Kaggle</p>
                  <p className="text-blue-300 text-[13px] truncate">wordsforthewise/lending-club</p>
                </div>
                <svg className="h-4 w-4 text-white/50 group-hover:text-banking-gold transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              {/* Source note */}
              <p className="text-[10px] text-gray-400 font-medium text-center">
                Nguồn: Kaggle · LendingClub Statistics · Cập nhật 2018
              </p>

              {/* Download cleaned CSV */}
              <a
                href="https://github.com/damchienthang/credit-analysis-bank-HQT/raw/main/data/data_hqtcsdl.csv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-banking-gold/10 border-2 border-banking-gold/40 rounded-2xl hover:bg-banking-gold/20 hover:border-banking-gold transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-banking-gold flex items-center justify-center flex-shrink-0">
                  <svg className="h-5 w-5 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-navy text-[13px] font-black leading-tight">Tải trực tiếp dữ liệu đã được làm sạch</p>
                  <p className="text-gray-500 text-[11px] truncate">data_hqtcsdl.csv · 33 thuộc tính · 2.26M bản ghi</p>
                </div>
                <svg className="h-4 w-4 text-navy/40 group-hover:text-navy transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Dataset 33 Attributes ---------- */
const attributes = [
  { stt: 1, name: 'id', group: 'Khoản vay', type: 'INT', desc: 'Mã định danh duy nhất của khoản vay' },
  { stt: 2, name: 'loan_amnt', group: 'Khoản vay', type: 'FLOAT', desc: 'Số tiền vay niêm yết ($)' },
  { stt: 3, name: 'term', group: 'Khoản vay', type: 'INT', desc: 'Kỳ hạn thanh toán (36 hoặc 60 tháng) — đã chuẩn hóa bằng RegEx' },
  { stt: 4, name: 'int_rate', group: 'Khoản vay', type: 'FLOAT', desc: 'Lãi suất khoản vay (%)' },
  { stt: 5, name: 'grade', group: 'Khoản vay', type: 'VARCHAR', desc: 'Xếp hạng tín dụng A–G do nền tảng cấp' },
  { stt: 6, name: 'loan_status', group: 'Khoản vay', type: 'VARCHAR', desc: 'Trạng thái hiện tại (Fully Paid, Charged Off, Current...)' },
  { stt: 7, name: 'purpose', group: 'Khoản vay', type: 'VARCHAR', desc: 'Mục đích vay vốn (debt_consolidation, credit_card...)' },
  { stt: 8, name: 'emp_length', group: 'Khách hàng', type: 'INT', desc: 'Thâm niên làm việc (0–10 năm) — đã chuẩn hóa bằng RegEx' },
  { stt: 9, name: 'home_ownership', group: 'Khách hàng', type: 'VARCHAR', desc: 'Tình trạng sở hữu nhà (RENT / MORTGAGE / OWN)' },
  { stt: 10, name: 'annual_inc', group: 'Khách hàng', type: 'FLOAT', desc: 'Tổng thu nhập hàng năm ($)' },
  { stt: 11, name: 'addr_state', group: 'Khách hàng', type: 'VARCHAR', desc: 'Tiểu bang cư trú (50+ bang)' },
  { stt: 12, name: 'dti', group: 'Khách hàng', type: 'FLOAT', desc: 'Tỷ lệ Nợ / Thu nhập (Debt-to-Income Ratio)' },
  { stt: 13, name: 'fico_range_low', group: 'Tín dụng', type: 'INT', desc: 'Điểm tín dụng FICO thấp nhất' },
  { stt: 14, name: 'fico_range_high', group: 'Tín dụng', type: 'INT', desc: 'Điểm tín dụng FICO cao nhất' },
  { stt: 15, name: 'delinq_2yrs', group: 'Tín dụng', type: 'INT', desc: 'Số lần quá hạn thanh toán trong 2 năm qua' },
  { stt: 16, name: 'pub_rec', group: 'Tín dụng', type: 'INT', desc: 'Số lượng hồ sơ công khai tiêu cực' },
  { stt: 17, name: 'total_acc', group: 'Tín dụng', type: 'INT', desc: 'Tổng số lượng hạn mức tín dụng hiện có' },
  { stt: 18, name: 'revol_bal', group: 'Tín dụng', type: 'FLOAT', desc: 'Tổng dư nợ tín dụng quay vòng ($)' },
  { stt: 19, name: 'revol_util', group: 'Tín dụng', type: 'FLOAT', desc: 'Tỷ lệ sử dụng tín dụng quay vòng (%)' },
  { stt: 20, name: 'mort_acc', group: 'Tín dụng', type: 'INT', desc: 'Số lượng tài khoản vay thế chấp nhà' },
  { stt: 21, name: 'total_bc_limit', group: 'Tín dụng', type: 'FLOAT', desc: 'Tổng hạn mức tín dụng thẻ ngân hàng ($)' },
  { stt: 22, name: 'max_bal_bc', group: 'Tín dụng', type: 'FLOAT', desc: 'Dư nợ hiện tại cao nhất trên một tài khoản ($)' },
  { stt: 23, name: 'il_util', group: 'Tín dụng', type: 'FLOAT', desc: 'Tỷ lệ sử dụng hạn mức vay trả góp (%)' },
  { stt: 24, name: 'all_util', group: 'Tín dụng', type: 'FLOAT', desc: 'Tỷ lệ sử dụng trên tất cả các tài khoản (%)' },
  { stt: 25, name: 'issue_d', group: 'Thời gian', type: 'DATE', desc: 'Ngày giải ngân gốc (YYYY-MM-DD)' },
  { stt: 26, name: 'issue_year', group: 'Thời gian', type: 'INT', desc: 'Năm giải ngân — Feature Engineering từ issue_d' },
  { stt: 27, name: 'issue_month', group: 'Thời gian', type: 'INT', desc: 'Tháng giải ngân — Feature Engineering từ issue_d' },
  { stt: 28, name: 'issue_quarter', group: 'Thời gian', type: 'INT', desc: 'Quý giải ngân — Feature Engineering từ issue_d' },
  { stt: 29, name: 'earliest_cr_line', group: 'Thời gian', type: 'DATE', desc: 'Ngày mở hạn mức tín dụng đầu tiên' },
  { stt: 30, name: 'last_pymnt_d', group: 'Thời gian', type: 'DATE', desc: 'Ngày thanh toán gần nhất (Logic-based Imputation)' },
  { stt: 31, name: 'out_prncp', group: 'Tài chính', type: 'FLOAT', desc: 'Dư nợ gốc còn lại chưa thanh toán ($)' },
  { stt: 32, name: 'total_pymnt', group: 'Tài chính', type: 'FLOAT', desc: 'Tổng số tiền đã thu hồi được — Gốc + Lãi ($)' },
  { stt: 33, name: 'recoveries', group: 'Tài chính', type: 'FLOAT', desc: 'Số tiền thu hồi sau khi khoản vay quá hạn/vỡ nợ ($)' },
];

const groupColors = {
  'Khoản vay': 'bg-blue-50 text-blue-700 border-blue-200',
  'Khách hàng': 'bg-purple-50 text-purple-700 border-purple-200',
  'Tín dụng': 'bg-amber-50 text-amber-700 border-amber-200',
  'Thời gian': 'bg-teal-50 text-teal-700 border-teal-200',
  'Tài chính': 'bg-red-50 text-red-700 border-red-200',
};

const typeColors = {
  'INT': 'bg-green-100 text-green-700',
  'FLOAT': 'bg-blue-100 text-blue-700',
  'VARCHAR': 'bg-orange-100 text-orange-700',
  'DATE': 'bg-violet-100 text-violet-700',
};

function DatasetSection() {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('Tất cả');
  const groups = ['Tất cả', 'Khoản vay', 'Khách hàng', 'Tín dụng', 'Thời gian', 'Tài chính'];

  const filtered = attributes.filter(a => {
    const matchGroup = activeGroup === 'Tất cả' || a.group === activeGroup;
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase());
    return matchGroup && matchSearch;
  });

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border border-navy/10 text-navy mb-6">
            <Table2 className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Data Dictionary</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 uppercase tracking-tighter">
            Các thuộc tính được lựa chọn
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Từ <strong>151 cột gốc</strong>, quy trình ETL đã loại bỏ 118 cột nhiễu, chuẩn hóa kiểu dữ liệu và tạo thêm 3 thuộc tính thời gian — còn lại <strong>33 thuộc tính chất lượng cao</strong>.
          </p>
          <div className="h-1.5 w-24 bg-banking-gold mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* ETL Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Cột gốc', value: '151', color: 'text-gray-500' },
            { label: 'Cột loại bỏ', value: '−118', color: 'text-status-risk' },
            { label: 'Feature Engineering', value: '+3', color: 'text-status-good' },
            { label: 'Cột cuối cùng', value: '33', color: 'text-accent-blue' },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}
              className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-center enterprise-shadow">
              <p className={`text-3xl font-black mb-1 ${s.color}`}>{s.value}</p>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm thuộc tính..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/10 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {groups.map(g => (
              <button key={g} onClick={() => setActiveGroup(g)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${activeGroup === g ? 'bg-navy text-white border-navy' : 'bg-white text-gray-500 border-gray-200 hover:border-navy/30'}`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <motion.div layout className="bg-white rounded-3xl border border-gray-100 enterprise-shadow overflow-hidden">
          {/* Scrollable table — max 8 rows visible */}
          <div className="overflow-auto max-h-96" style={{ scrollbarWidth: 'thin', scrollbarColor: '#0052A5 #f1f5f9' }}>
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="bg-navy text-white">
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest w-12">#</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest">Tên thuộc tính</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest">Nhóm</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest">Kiểu dữ liệu</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase tracking-widest">Mô tả</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {filtered.map((attr, i) => (
                    <motion.tr key={attr.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="hover:bg-blue-50/40 transition-colors group">
                      <td className="px-6 py-3 text-gray-400 font-mono text-xl">{attr.stt}</td>
                      <td className="px-6 py-3">
                        <code className="font-mono font-bold text-navy bg-navy/5 px-2 py-1 rounded-lg text-xs group-hover:bg-accent-blue group-hover:text-white transition-all">
                          {attr.name}
                        </code>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${groupColors[attr.group]}`}>
                          {attr.group}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex px-2 py-1 rounded-lg text-[10px] font-black font-mono ${typeColors[attr.type]}`}>
                          {attr.type}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-gray-650 font-medium leading-relaxed max-w-md text-xs">{attr.desc}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
            <p className="text-xs text-gray-600 font-bold uppercase tracking-widest">
              Hiển thị {filtered.length} / {attributes.length} thuộc tính
            </p>
            <div className="flex gap-3">
              {Object.entries(groupColors).map(([g, c]) => (
                <div key={g} className="flex items-center gap-1.5">
                  <span className={`inline-block w-2 h-2 rounded-full border ${c}`}></span>
                  <span className="text-[11px] font-bold text-gray-600 uppercase">{g}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- EDA Charts Section ---------- */
const edaCharts = [
  { file: 'loan_status_bar.png', title: 'Phân bổ Trạng thái khoản vay', insight: '~47% đã hoàn trả (Fully Paid), ~11.4% bị xóa nợ (Charged Off) — tỷ lệ NPL thực tế đáng chú ý.' },
  { file: 'grade_bar.png', title: 'Phân bổ Hạng tín dụng (Grade)', insight: 'Grade B và C chiếm ưu thế (~55%). Grade E-G rủi ro cao chiếm ~8.5% nhưng đóng góp phần lớn nợ xấu.' },
  { file: 'issue_year_line.png', title: 'Xu hướng giải ngân theo năm', insight: 'Tăng trưởng vượt bậc từ 2012–2015 (đột phá x4), ổn định sau 2015 với ~440K–500K khoản/năm.' },
  { file: 'loan_amnt_hist.png', title: 'Phân phối số tiền vay', insight: 'Đỉnh rõ tại $10K và $20K — người vay ưu tiên số tròn. Giới hạn tối đa $40K.' },
  { file: 'int_rate_hist.png', title: 'Phân phối lãi suất (%)', insight: 'Lãi suất tập trung 7–15%, phân phối lệch phải. Một số khoản vay rủi ro cao đến 30%+.' },
  { file: 'purpose_bar.png', title: 'Mục đích vay vốn', insight: 'Debt Consolidation chiếm ~57% — người dùng chủ yếu vay để gộp nợ. Credit Card xếp thứ 2 (~22%).' },
  { file: 'home_ownership_bar.png', title: 'Tình trạng sở hữu nhà', insight: 'MORTGAGE (48%) và RENT (39%) chiếm gần hết danh mục — nhóm OWN chỉ ~11%.' },
  { file: 'dti_hist.png', title: 'Tỷ lệ Nợ / Thu nhập (DTI)', insight: 'Phần lớn tập trung DTI < 40 (phân phối chuẩn). Outliers cực lớn (DTI > 500) cần lọc bỏ.' },
  { file: 'fico_range_low_hist.png', title: 'Điểm FICO thấp nhất', insight: 'Phân phối tập trung 660–740 — phần lớn khách hàng có điểm tín dụng trung bình-khá.' },
  { file: 'revol_util_hist.png', title: 'Tỷ lệ sử dụng tín dụng quay vòng', insight: 'Phân phối lệch phải nhẹ. Nhóm dùng > 80% revolving credit có rủi ro default cao hơn đáng kể.' },
  { file: 'total_pymnt_hist.png', title: 'Tổng tiền đã thu hồi', insight: 'Long-tail distribution — phần lớn khoản vay đã thu <$15K, một số khoản lớn thu được >$50K.' },
  { file: 'recoveries_hist.png', title: 'Tiền thu hồi sau vỡ nợ', insight: 'Phần lớn = $0 (khoản vay đang tốt). Phần đuôi phân phối thể hiện hiệu quả thu hồi nợ xấu.' },
];

function EDASection() {
  const [active, setActive] = useState(null);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy/5 border border-navy/10 text-navy mb-6">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Exploratory Data Analysis</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-4 uppercase tracking-tighter">
            Phân tích Dữ liệu EDA
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Khám phá phân phối và đặc điểm thống kê của các biến quan trọng trong bộ dữ liệu <strong>2.26 triệu bản ghi</strong>.
          </p>
          <div className="h-1.5 w-24 bg-banking-gold mx-auto rounded-full mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {edaCharts.map((chart, i) => (
            <motion.div
              key={chart.file}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 6) * 0.08 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-gray-100 enterprise-shadow overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Chart Image */}
              <div className="relative overflow-hidden bg-gray-50 border-b border-gray-100">
                <img
                  src={`/charts/${chart.file}`}
                  alt={chart.title}
                  className="w-full h-52 object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 right-3 bg-navy/80 backdrop-blur-sm text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">
                  EDA
                </div>
              </div>
              {/* Info */}
              <div className="p-5">
                <h3 className="font-black text-navy mb-3 text-sm leading-tight">{chart.title}</h3>
                <button
                  onClick={() => setActive(active === i ? null : i)}
                  className="flex items-center gap-2 text-xs font-bold text-accent-blue hover:text-navy transition-colors"
                >
                  {active === i ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  {active === i ? 'Ẩn nhận xét' : 'Xem nhận xét'}
                </button>
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-xs text-gray-600 leading-relaxed font-medium">
                          💡 {chart.insight}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link to="/dashboard"
            className="inline-flex items-center gap-3 px-10 py-5 bg-navy text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-accent-blue transition-all shadow-2xl hover:scale-105">
            Xem Dashboard tương tác <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default LandingPage;

