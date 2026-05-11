import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, ShieldCheck, Zap, Database, Globe, Layers } from 'lucide-react';
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
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
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
                    <h3 className="text-navy font-bold">Dòng tiền giải ngân</h3>
                    <p className="text-xs text-gray-500 underline underline-offset-4 decoration-accent-blue decoration-2">Xu hướng 2007-2018</p>
                  </div>
                  <div className="px-2 py-1 rounded bg-green-100 text-green-700 text-[10px] font-bold">+12.5% YoY</div>
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
                    <p className="text-xs text-gray-400 mb-1">NPL Ratio</p>
                    <p className="text-xl font-bold text-status-risk leading-none">14.2%</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-xs text-gray-400 mb-1">Recovery Rate</p>
                    <p className="text-xl font-bold text-status-good leading-none">58.3%</p>
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

      {/* Data Pipeline visualization hint */}
      <section className="py-24 bg-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-bold mb-12">Quy trình xử lý dữ liệu chuẩn BI</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3">CSV</div>
              <p className="text-xs uppercase tracking-widest font-bold">Raw Data</p>
            </div>
            <ArrowRight className="hidden md:block h-6 w-6 text-banking-gold rotate-90 md:rotate-0" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3">Python</div>
              <p className="text-xs uppercase tracking-widest font-bold">ETL Process</p>
            </div>
            <ArrowRight className="hidden md:block h-6 w-6 text-banking-gold rotate-90 md:rotate-0" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-3">SQL</div>
              <p className="text-xs uppercase tracking-widest font-bold">Warehouse</p>
            </div>
            <ArrowRight className="hidden md:block h-6 w-6 text-banking-gold rotate-90 md:rotate-0" />
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-banking-gold/20 flex items-center justify-center mb-3 text-banking-gold border border-banking-gold/50">React</div>
              <p className="text-xs uppercase tracking-widest font-bold text-banking-gold">BI Dashboard</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
