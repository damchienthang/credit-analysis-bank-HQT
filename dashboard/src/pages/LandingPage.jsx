import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Zap, Database, Globe, Layers, Table2, TrendingUp, ChevronDown, ChevronUp, Search, Filter, User, Handshake, Landmark } from 'lucide-react';
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
    },
    {
      title: 'Kiến trúc Star Schema',
      description: 'Mô hình hóa dữ liệu theo cấu trúc Fact-Dimension, tối ưu hóa 70% tốc độ truy vấn đa chiều.',
      icon: Layers,
      color: 'bg-teal-500'
    },
    {
      title: 'AI Insights & Cảnh báo',
      description: 'Tự động phát hiện các điểm bất thường và rủi ro tập trung trong danh mục tín dụng.',
      icon: TrendingUp,
      color: 'bg-rose-500'
    },
    {
      title: 'Khả năng Mở rộng',
      description: 'Sẵn sàng xử lý các tập dữ liệu lớn hơn nữa với kiến trúc Cloud-ready và SQL Server.',
      icon: Globe,
      color: 'bg-navy'
    }
  ];

  const featuresRow = [
    { label: 'An Toàn', sub: 'Bảo mật đa lớp', icon: ShieldCheck },
    { label: 'Hiệu Quả', sub: 'Phân tích chuyên sâu', icon: TrendingUp },
    { label: 'Tận Tâm', sub: 'Đồng hành bền vững', icon: Handshake },
    { label: 'Thấu Hiểu', sub: 'Hiểu khách hàng hơn', icon: User },
  ];

  return (
    <div className="overflow-hidden bg-[#050b18]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        {/* Background Cityscape/Gradient - Brighter */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#101c44] via-[#0a1128] to-[#050b18] opacity-80"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.15) 0%, transparent 65%)' }}></div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>

        <div className="max-w-[2200px] mx-auto px-8 lg:px-24 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-8">
                Hệ Thống Phân Tích <br />
                <span className="text-banking-gold">& Quản Trị Tín Dụng</span>
              </h1>
              <p className="text-xl text-gray-300 mb-12 max-w-xl leading-relaxed opacity-80">
                Giải pháp Business Intelligence toàn diện cho dữ liệu tài chính quy mô lớn.
                Tối ưu hóa chiến lược cho vay và quản trị rủi ro nợ xấu.
              </p>
              <div className="flex flex-wrap gap-6 mb-24">
                <Link to="/dashboard" className="px-10 py-5 bg-[#0066ff] hover:bg-blue-600 text-white rounded-xl font-bold text-lg transition-all flex items-center gap-3 shadow-2xl shadow-blue-600/30 group">
                  <BarChart3 className="h-6 w-6" />
                  Khám phá Dashboard
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/architecture" className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/20 rounded-xl font-bold text-lg transition-all backdrop-blur-md flex items-center gap-3">
                  <Layers className="h-6 w-6 text-banking-gold" />
                  Kiến trúc hệ thống
                </Link>
              </div>

              {/* Bottom Icon Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10 opacity-70">
                {featuresRow.map((f, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <f.icon className="h-8 w-8 text-white mb-2" />
                    <div>
                      <p className="text-white font-bold text-[16px]">{f.label}</p>
                      <p className="text-gray-500 text-[12px]">{f.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Dashboard Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="relative bg-[#0a192f]/80 backdrop-blur-2xl p-10 rounded-[40px] border border-white/10 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.6)] overflow-hidden group">
                {/* Background glow inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px]"></div>

                <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-600/20 rounded-lg text-blue-400">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <h3 className="text-white font-bold text-xl tracking-wide">Dòng tiền giải ngân</h3>
                  </div>
                </div>

                <p className="text-[15px] text-gray-500 mb-6 font-medium">Từ ngày 01/01/2024 - 31/05/2024</p>

                {/* Styled Bar Chart */}
                <div className="h-64 flex items-end justify-between gap-1 mb-12 px-2">
                  {[25, 40, 35, 55, 45, 65, 50, 75, 55, 70, 60, 85, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.3 + (i * 0.05), duration: 0.8 }}
                      className={`w-full max-w-[12px] rounded-t-sm transition-all duration-300 ${i === 12 ? 'bg-[#0066ff] shadow-[0_0_20px_rgba(0,102,255,0.5)]' : 'bg-blue-600/40 hover:bg-blue-600/80'
                        }`}
                    />
                  ))}
                </div>

                {/* Chart Labels */}
                <div className="flex justify-between text-[11px] text-gray-500 mb-10 px-1 uppercase tracking-tighter">
                  {['01/2024', '02/2024', '03/2024', '04/2024', '05/2024', '06/2024', '07/2024', '08/2024', '09/2024', '10/2024', '11/2024', '12/2024'].map((m, i) => (
                    <span key={i}>{m}</span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-white/5 pt-8">
                  <div>
                    <p className="text-[14px] text-gray-500 mb-2 uppercase tracking-widest font-bold">NPL Ratio</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-white">14.2%</p>
                      <span className="text-[14px] text-status-risk flex items-center gap-1 font-bold">
                        <ChevronDown className="h-3 w-3" /> 2.1% <span className="text-[14px] text-gray-600 font-normal">so với kỳ trước</span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-500 mb-2 uppercase tracking-widest font-bold">Recovery Rate</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-4xl font-bold text-[#22c55e]">58.3%</p>
                      <span className="text-[14px] text-[#22c55e] flex items-center gap-1 font-bold">
                        <ChevronUp className="h-3 w-3" /> 4.7% <span className="text-[14px] text-gray-600 font-normal">so với kỳ trước</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating "Mức dữ liệu" Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -top-4 -right-4 p-5 bg-banking-gold rounded-2xl shadow-2xl text-navy flex flex-col gap-1 z-20"
                >
                  <div className="flex items-center gap-2">
                    <Database className="h-6 w-6" />
                    <span className="text-[12px] font-bold uppercase">Mức dữ liệu</span>
                  </div>
                  <p className="text-3xl font-black leading-none">2.26M</p>
                  <p className="text-[10px] font-bold opacity-60">Cập nhật 05/2024</p>
                </motion.div>
              </div>

              {/* Decorative Glow */}
              <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Detail Section (Existing content follows) */}

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-2xl md:text-4xl font-black text-navy mb-4 uppercase tracking-tighter">Năng lực Cốt lõi <br /> <span className="text-banking-gold">Hệ thống BI</span></h2>
            <div className="h-1.5 w-32 bg-banking-gold mx-auto rounded-full mt-6"></div>
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
    <section className="py-24 bg-[#051a3d] relative overflow-hidden">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 30% 10%, rgba(212, 175, 55, 0.15) 0%, transparent 40%)' }}></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-navy/80 to-transparent"></div>

      <div className="max-w-[1900px] mx-auto px-8 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16 items-stretch">

          {/* Left Column (7/10): Content Content */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-1.5 h-10 bg-banking-gold rounded-full"></div>
                <span className="text-banking-gold font-black text-sm uppercase tracking-[0.3em]">Nguồn Dữ Liệu Gốc</span>
              </div>
              <h2 className="text-5xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight">
                Ứng dụng Big Data <br />
                vào <span className="text-banking-gold">Quản trị Tín dụng</span>
              </h2>
            </motion.div>

            {/* Grid of 4 Cards (2x2 Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'QUY MÔ KHỔNG LỒ',
                  desc: 'Phân tích hành vi vay vốn của hơn 2.26 triệu khách hàng, cung cấp cái nhìn toàn cảnh về thị trường P2P.',
                  icon: Database,
                  color: 'border-blue-500/30 bg-blue-500/5'
                },
                {
                  title: 'DỮ LIỆU CHUẨN HÓA',
                  desc: 'Từ 151 thuộc tính thô được tinh lọc còn 33 biến quan trọng, loại bỏ hoàn toàn các dữ liệu nhiễu và thiếu.',
                  icon: Layers,
                  color: 'border-banking-gold/30 bg-banking-gold/5'
                },
                {
                  title: 'CHU KỲ DÀI HẠN',
                  desc: 'Dữ liệu trải dài từ 2007-2018, bao quát cả giai đoạn khủng hoảng tài chính và phục hồi kinh tế.',
                  icon: TrendingUp,
                  color: 'border-emerald-500/30 bg-emerald-500/5'
                },
                {
                  title: 'HIỆU QUẢ PHÂN TÍCH',
                  desc: 'Tối ưu hóa mô hình Star Schema giúp rút ngắn thời gian truy vấn báo cáo từ vài phút xuống còn vài giây.',
                  icon: Zap,
                  color: 'border-rose-500/30 bg-rose-500/5'
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-8 border rounded-3xl backdrop-blur-sm group hover:scale-[1.02] transition-all duration-300 ${card.color}`}
                >
                  <h3 className="text-banking-gold font-black text-lg mb-4 flex items-center gap-3">
                    <card.icon className="h-5 w-5" />
                    {card.title}
                  </h3>
                  <p className="text-blue-100/70 text-[15px] leading-relaxed group-hover:text-white transition-colors">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="flex items-center gap-2 pt-8">
              <div className="w-8 h-1.5 bg-banking-gold rounded-full"></div>
              <div className="w-2 h-1.5 bg-white/10 rounded-full"></div>
              <div className="w-2 h-1.5 bg-white/10 rounded-full"></div>
            </div>
          </div>

          {/* Right Column (3/10): Square Image + Link Underneath */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 space-y-6"
          >
            <a
              href="https://www.kaggle.com/datasets/wordsforthewise/lending-club"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative aspect-square w-full overflow-hidden border border-white/5 shadow-2xl group cursor-pointer"
            >
              <img
                src="/pictures/kaggle.png"
                alt="Dataset Architecture"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#051a3d]/60 backdrop-blur-[2px] group-hover:bg-[#051a3d]/40 transition-all"></div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#051a3d] to-transparent"></div>

              <div className="absolute bottom-10 left-10 z-20 space-y-2">
                <p className="text-banking-gold text-[12px] font-black uppercase tracking-[0.2em]">Kaggle Repository</p>
                <h4 className="text-white text-4xl font-black uppercase tracking-tighter">Kaggle</h4>
                <p className="text-blue-100/60 text-sm font-medium">LendingClub Financial Data</p>
              </div>
            </a>

            {/* Link Directly Under Image */}
            <a
              href="https://www.kaggle.com/datasets/wordsforthewise/lending-club"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-[0.2em] text-[11px] hover:bg-banking-gold hover:text-navy transition-all group"
            >
              <Database className="h-4 w-4 text-banking-gold group-hover:text-navy" />
              <span>Explore Dataset on Kaggle</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

        </div>
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
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4 uppercase tracking-tighter">
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
          <h2 className="text-3xl md:text-4xl font-black text-navy mb-4 uppercase tracking-tighter">
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

