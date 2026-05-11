import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BrainCircuit, ShieldAlert, Cpu, Globe, ArrowUpRight, Landmark, Zap } from 'lucide-react';

const TrendsPage = () => {
  const trends = [
    {
      title: 'AI Credit Scoring',
      desc: 'Sử dụng Machine Learning để chấm điểm tín dụng thay thế mô hình truyền thống, giúp phê duyệt khoản vay chỉ trong vài phút.',
      icon: BrainCircuit,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Fraud Detection 2.0',
      desc: 'Phát hiện gian lận thời gian thực dựa trên phân tích hành vi người dùng bằng Big Data Analytics.',
      icon: ShieldAlert,
      color: 'text-red-600',
      bg: 'bg-red-50'
    },
    {
      title: 'Hyper-Personalization',
      desc: 'Cá nhân hóa ưu đãi sản phẩm ngân hàng cho từng khách hàng dựa trên lịch sử giao dịch và thói quen tiêu dùng.',
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      title: 'Open Banking',
      desc: 'Kết nối hệ sinh thái tài chính qua API, cho phép khách hàng quản lý nhiều tài khoản tại các ngân hàng khác nhau.',
      icon: Globe,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  const banks = [
    {
      name: 'Techcombank',
      tagline: 'Dẫn đầu chuyển đổi số',
      usage: 'Sử dụng Big Data để tối ưu hóa trải nghiệm người dùng và cá nhân hóa dịch vụ trên ứng dụng mobile.',
      focus: 'Data-driven Culture'
    },
    {
      name: 'VPBank',
      tagline: 'Kỷ nguyên số vươn tầm',
      usage: 'Ứng dụng AI trong phê duyệt khoản vay tín chấp và quản trị rủi ro nợ xấu tự động.',
      focus: 'Digital Lending'
    },
    {
      name: 'MB Bank',
      tagline: 'Ngân hàng số hàng đầu',
      usage: 'Phát triển hệ sinh thái App MB Bank với khả năng xử lý hàng triệu giao dịch mỗi ngày nhờ nền tảng dữ liệu mạnh.',
      focus: 'Digital Ecosystem'
    }
  ];

  return (
    <div className="p-4 md:p-12 max-w-7xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="relative p-12 md:p-20 bg-navy rounded-[3rem] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-blue/20 to-transparent"></div>
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white mb-6"
          >
            <TrendingUp className="h-4 w-4 text-banking-gold" />
            <span className="text-xs font-bold uppercase tracking-widest">Market Research 2026</span>
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 uppercase tracking-tighter">
            Xu hướng <br /> <span className="text-banking-gold">Ngành Ngân hàng</span>
          </h1>
          <p className="text-xl text-gray-300">
            Khám phá sự giao thoa giữa Tài chính và Công nghệ. Cách Big Data và AI đang định hình lại tương lai của ngành ngân hàng toàn cầu.
          </p>
        </div>
      </section>

      {/* Technology Trends */}
      <section className="space-y-10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-navy">Công nghệ then chốt</h2>
          <div className="h-1 w-20 bg-banking-gold mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trends.map((trend, i) => (
            <motion.div
              key={trend.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-white rounded-3xl border border-gray-100 enterprise-shadow hover:-translate-y-2 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${trend.bg} ${trend.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <trend.icon className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-navy mb-3">{trend.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{trend.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vietnam Bank Survey */}
      <section className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-navy mb-2 flex items-center gap-3">
              <Landmark className="h-8 w-8 text-accent-blue" /> Khảo sát ngân hàng Việt Nam
            </h2>
            <p className="text-gray-500 font-medium">Việc ứng dụng Business Intelligence tại các tổ chức tín dụng nội địa.</p>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-accent-blue hover:underline">
            Tải báo cáo chi tiết <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {banks.map((bank, i) => (
            <motion.div
              key={bank.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl enterprise-shadow border-t-4 border-navy"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-navy">{bank.name}</h3>
                  <p className="text-xs font-bold text-accent-blue tracking-wider">{bank.tagline}</p>
                </div>
                <div className="p-2 bg-navy/5 rounded-lg">
                  <Cpu className="h-5 w-5 text-navy" />
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">
                "{bank.usage}"
              </p>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-gray-400">Trọng tâm:</span>
                <span className="text-xs font-bold text-navy bg-navy/5 px-3 py-1 rounded-full">{bank.focus}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Future Insight */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-br from-navy via-navy to-accent-blue p-12 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-banking-gold rounded-full opacity-10 group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter">Tương lai của <br /> Phân tích Ngân hàng</h2>
            <p className="text-lg text-blue-100 leading-relaxed mb-8">
              Đến năm 2030, 90% các quyết định tín dụng sẽ được thực hiện tự động bởi AI. 
              Các ngân hàng không còn là nơi lưu trữ tiền, mà là các công ty công nghệ cung cấp giải pháp tài chính.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-navy bg-gray-300 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Expert" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold text-blue-200">Được đánh giá bởi 50+ chuyên gia tài chính</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-3xl font-black text-banking-gold mb-1">92%</p>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Tỷ lệ tự động hóa</p>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
              <p className="text-3xl font-black text-banking-gold mb-1">-45%</p>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Giảm chi phí vận hành</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrendsPage;
