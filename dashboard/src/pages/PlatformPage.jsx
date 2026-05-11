import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database, BarChart3,
  Zap, ArrowRight, Server, Globe,
  Cpu, LayoutDashboard, Target, TrendingUp,
  Layers, FileJson, Workflow, Box, Info,
  History, BookOpen
} from 'lucide-react';

const PlatformPage = () => {
  const [activeDim, setActiveDim] = useState(null);

  const biStages = [
    {
      id: '01',
      title: 'Nguồn dữ liệu (Data Sources)',
      desc: 'Nơi chứa dữ liệu thô từ nhiều nguồn khác nhau như hệ thống vận hành (ERP, CRM) hoặc các tệp phẳng.',
      icon: Globe,
      color: 'bg-blue-500'
    },
    {
      id: '02',
      title: 'Trích lọc & Biến đổi (ETL)',
      desc: 'Quá trình Extract, Transform, Load giúp làm sạch, chuẩn hóa dữ liệu trước khi đưa vào kho dữ liệu.',
      icon: Cpu,
      color: 'bg-indigo-500'
    },
    {
      id: '03',
      title: 'Kho dữ liệu (Data Warehouse)',
      desc: 'Cơ sở dữ liệu tập trung lưu trữ thông tin đã qua xử lý, tổ chức theo các chủ đề để tối ưu hóa việc truy vấn.',
      icon: Server,
      color: 'bg-navy'
    },
    {
      id: '04',
      title: 'Phân tích & Khai phá (Data Mining)',
      desc: 'Sử dụng các công cụ OLAP và thuật toán để tìm ra các quy luật, xu hướng và tri thức từ dữ liệu.',
      icon: BarChart3,
      color: 'bg-accent-blue'
    },
    {
      id: '05',
      title: 'Trực quan hóa (Visualization)',
      desc: 'Trình bày dữ liệu dưới dạng Dashboard và báo cáo trực quan, giúp người dùng nắm bắt thông tin nhanh chóng.',
      icon: Target,
      color: 'bg-banking-gold'
    }
  ];

  const historyPoints = [
    {
      year: '1865',
      title: 'Khởi nguồn',
      event: 'Richard Millar Devens lần đầu sử dụng thuật ngữ "Business Intelligence" để mô tả cách thu thập thông tin để đạt lợi thế cạnh tranh.'
    },
    {
      year: '1958',
      title: 'Nền móng công nghệ',
      event: 'Hans Peter Luhn (IBM) công bố bài báo về "A Business Intelligence System", đặt nền móng cho việc dùng máy tính xử lý thông tin.'
    },
    {
      year: '1989',
      title: 'Phổ biến hiện đại',
      event: 'Howard Dresner (Gartner) phổ biến BI như một thuật ngữ chung cho các mô hình hỗ trợ ra quyết định bằng dữ liệu.'
    }
  ];

  const dimensions = [
    {
      id: 'dim_time',
      name: 'Dim_Time',
      desc: 'Quản lý thời gian: ngày, tháng, quý, năm.',
      attrs: ['time_id (PK)', 'year', 'month', 'quarter'],
      pos: 'top-0 left-1/2 -translate-x-1/2'
    },
    {
      id: 'dim_creditrisk',
      name: 'Dim_CreditRisk',
      desc: 'Xếp hạng rủi ro & điểm tín dụng.',
      attrs: ['risk_id (PK)', 'grade', 'fico_range'],
      pos: 'top-[20%] right-0'
    },
    {
      id: 'dim_geography',
      name: 'Dim_Geography',
      desc: 'Vị trí & khu vực địa lý.',
      attrs: ['geo_id (PK)', 'addr_state', 'region'],
      pos: 'bottom-0 right-[15%]'
    },
    {
      id: 'dim_customers',
      name: 'Dim_Customers',
      desc: 'Thông tin khách hàng & thu nhập.',
      attrs: ['cust_id (PK)', 'annual_inc', 'home_ownership'],
      pos: 'bottom-0 left-[15%]'
    },
    {
      id: 'dim_loanproduct',
      name: 'Dim_LoanProduct',
      desc: 'Phân loại sản phẩm tín dụng.',
      attrs: ['prod_id (PK)', 'term', 'purpose'],
      pos: 'top-[20%] left-0'
    }
  ];

  const techCards = [
    { title: 'Python ETL', desc: 'Xử lý và chuyển đổi dữ liệu thô chuyên sâu.', icon: Cpu },
    { title: 'SQL Server', desc: 'Hệ quản trị CSDL lưu trữ kho dữ liệu DW.', icon: Database },
    { title: 'Indexing', desc: 'Tối ưu hóa truy vấn trên các bảng Fact/Dimension.', icon: Zap },
    { title: 'Star Schema', desc: 'Mô hình dữ liệu chuẩn trong kiến trúc BI.', icon: Layers },
    { title: 'React Dashboard', desc: 'Giao diện trực quan hóa dữ liệu hiện đại.', icon: LayoutDashboard }
  ];

  return (
    <div className="bg-bg-light min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-navy py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-banking-gold font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Lý thuyết & Kiến trúc hệ thống
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 uppercase tracking-tighter"
          >
            Business Intelligence <br /> <span className="text-banking-gold">Systems (BI)</span>
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed italic">
            "Quy trình thu thập, lưu trữ và phân tích dữ liệu nhằm hỗ trợ doanh nghiệp ra quyết định chính xác."
          </p>
        </div>
      </section>

      {/* History & Formation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy uppercase tracking-tight flex items-center justify-center gap-3">
              <History className="text-banking-gold" /> Lịch sử & Sự hình thành
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {historyPoints.map((point, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 bg-gray-50 rounded-3xl border border-gray-100 enterprise-shadow relative"
              >
                <div className="text-3xl font-black text-banking-gold/100 absolute top-4 right-6">{point.year}</div>
                <h3 className="text-xl font-bold text-navy mb-4">{point.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{point.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BI Overview Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-navy border-l-4 border-banking-gold pl-6 uppercase tracking-tight">BI là gì?</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg text-justify">
              <p>
                <strong>Business Intelligence (BI)</strong> không chỉ là một công cụ đơn lẻ, mà là một quy trình tích hợp các phương pháp, kiến trúc và công nghệ. BI giúp doanh nghiệp trả lời các câu hỏi về quá khứ, hiện tại và dự báo tương lai.
              </p>
              <p>
                <strong>Data Warehouse (DW)</strong> đóng vai trò là "trái tim" của hệ thống BI. Dữ liệu từ các nguồn khác nhau được tập hợp về đây, qua quá trình <strong>ETL</strong> để đảm bảo tính nhất quán và chất lượng thông tin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-white rounded-2xl border border-blue-50 enterprise-shadow">
                <h4 className="font-bold text-navy mb-2 flex items-center gap-2">
                  <Box className="h-5 w-5 text-accent-blue" /> Fact vs Dimension
                </h4>
                <p className="text-sm text-gray-500 italic">Bảng <strong>Fact</strong> chứa các con số định lượng. Bảng <strong>Dimension</strong> chứa các thông tin mô tả chi tiết.</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-blue-50 enterprise-shadow">
                <h4 className="font-bold text-navy mb-2 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-banking-gold" /> OLAP Concepts
                </h4>
                <p className="text-sm text-gray-500 italic">Cho phép phân tích dữ liệu đa chiều, thực hiện các thao tác Slice, Dice và Drill-down.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="p-10 bg-navy rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-5">
                <Layers className="h-64 w-64 -mr-16 -mt-16" />
              </div>
              <h3 className="text-2xl font-black mb-6 uppercase flex items-center gap-3">
                <BookOpen className="text-banking-gold" /> Các thành phần chính
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {biStages.map((stage) => (
                  <div key={stage.id} className="flex gap-4">
                    <div className={`p-2 rounded-xl ${stage.color} text-white h-fit`}>
                      <stage.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{stage.title}</h4>
                      <p className="text-xs text-blue-200">{stage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Star Schema Visualization Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black text-navy uppercase tracking-tighter mb-4 italic">Star Schema Visualization</h2>
            <p className="text-gray-500 italic">Mô hình dữ liệu chuẩn hóa cho hệ thống phân tích tín dụng.</p>
          </div>

          <div className="relative h-[700px] flex items-center justify-center">
            {/* Fact Table at Center */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="z-20 w-72 p-8 bg-navy text-white rounded-[2rem] shadow-[0_0_50px_rgba(0,82,165,0.3)] border-4 border-banking-gold text-center"
            >
              <h3 className="text-2xl font-black mb-4 border-b border-white/20 pb-2 flex items-center justify-center gap-2">
                <Database className="h-6 w-6 text-banking-gold" /> Fact_Loans
              </h3>
              <div className="text-left space-y-1 opacity-90">
                {['loan_id (PK)', 'cust_id (FK)', 'time_id (FK)', 'geo_id (FK)', 'prod_id (FK)', 'risk_id (FK)', 'loan_amnt', 'int_rate', 'total_pymnt'].map((attr) => (
                  <div key={attr} className="text-[10px] font-mono text-blue-100 py-1 border-b border-white/5 last:border-0">{attr}</div>
                ))}
              </div>
            </motion.div>

            {/* Dimension Tables Surrounding */}
            {dimensions.map((dim) => (
              <div key={dim.id} className={`absolute ${dim.pos} z-10`}>
                <motion.div
                  onHoverStart={() => setActiveDim(dim.id)}
                  onHoverEnd={() => setActiveDim(null)}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`cursor-help w-56 p-5 bg-white rounded-2xl border-2 transition-all ${activeDim === dim.id ? 'border-accent-blue enterprise-shadow ring-8 ring-blue-50' : 'border-gray-100 shadow-xl'}`}
                >
                  <h4 className="font-bold text-navy mb-3 flex items-center justify-between text-sm">
                    {dim.name}
                    <div className="w-2 h-2 rounded-full bg-accent-blue animate-pulse"></div>
                  </h4>
                  <div className="space-y-1 opacity-60">
                    {dim.attrs.map(attr => (
                      <div key={attr} className="text-[10px] font-mono flex items-center gap-2">
                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div> {attr}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}

            {/* Connection Lines (SVGs) */}
            <div className="absolute inset-0 pointer-events-none -z-10">
              <svg width="100%" height="100%" className="absolute inset-0 opacity-30">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#0052A5" />
                  </marker>
                </defs>
                {/* 12:00 Line */}
                <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#0052A5" strokeWidth="2.5" strokeDasharray="10 5" markerEnd="url(#arrow)" />
                {/* 2:00 Line */}
                <line x1="50%" y1="50%" x2="88%" y2="35%" stroke="#0052A5" strokeWidth="2.5" strokeDasharray="10 5" markerEnd="url(#arrow)" />
                {/* 5:00 Line */}
                <line x1="50%" y1="50%" x2="75%" y2="85%" stroke="#0052A5" strokeWidth="2.5" strokeDasharray="10 5" markerEnd="url(#arrow)" />
                {/* 7:00 Line */}
                <line x1="50%" y1="50%" x2="25%" y2="85%" stroke="#0052A5" strokeWidth="2.5" strokeDasharray="10 5" markerEnd="url(#arrow)" />
                {/* 10:00 Line */}
                <line x1="50%" y1="50%" x2="12%" y2="35%" stroke="#0052A5" strokeWidth="2.5" strokeDasharray="10 5" markerEnd="url(#arrow)" />
              </svg>
              {/* Decorative Concentric Circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border-[1px] border-accent-blue/10 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] border-[1px] border-accent-blue/5 rounded-full"></div>
            </div>

            {/* Dimension Tooltip */}
            <AnimatePresence>
              {activeDim && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="absolute bottom-[-40px] bg-white text-navy px-10 py-5 rounded-[2rem] text-sm font-bold enterprise-shadow z-30 flex flex-col items-center gap-2 max-w-lg text-center border-t-4 border-banking-gold"
                >
                  <div className="flex items-center gap-2 text-accent-blue uppercase tracking-widest text-xs font-black">
                    <Info className="h-4 w-4" /> Dimension Context
                  </div>
                  <p className="text-gray-500 italic font-medium leading-relaxed">
                    {dimensions.find(d => d.id === activeDim)?.desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Data Flow Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-navy uppercase tracking-tighter mb-4 italic">Data Flow Pipeline</h2>
          <p className="text-gray-500">Quy trình xử lý dữ liệu chuẩn từ nguồn thô đến trình diễn báo cáo.</p>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 px-10">
          {[
            { name: 'Raw Data', icon: FileJson, color: 'text-gray-400' },
            { name: 'ETL Process', icon: Workflow, color: 'text-blue-500' },
            { name: 'Data Warehouse', icon: Database, color: 'text-indigo-600' },
            { name: 'Visualization', icon: BarChart3, color: 'text-accent-blue' }
          ].map((step, i, arr) => (
            <React.Fragment key={step.name}>
              <motion.div
                whileHover={{ y: -5 }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className={`w-24 h-24 rounded-[2rem] bg-white enterprise-shadow border border-gray-100 flex items-center justify-center mb-4 transition-all group-hover:border-banking-gold group-hover:rotate-6`}>
                  <step.icon className={`h-10 w-10 ${step.color}`} />
                </div>
                <span className="font-black text-navy uppercase tracking-tighter text-sm">{step.name}</span>
              </motion.div>
              {i < arr.length - 1 && (
                <div className="flex-1 h-1 bg-gradient-to-r from-gray-100 via-banking-gold to-gray-100 hidden md:block relative">
                  <ArrowRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-banking-gold" />
                </div>
              )}
              {i < arr.length - 1 && (
                <ArrowRight className="h-8 w-8 text-banking-gold md:hidden rotate-90 my-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Technology Architecture Section */}
      <section className="py-24 bg-navy text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-4">
            <h2 className="text-white md:text-5xl font-black uppercase tracking-tighter">Technology Architecture</h2>
            <div className="flex gap-2">
              <div className="w-12 h-1.5 bg-banking-gold rounded-full"></div>
              <div className="w-6 h-1.5 bg-accent-blue rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {techCards.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group relative overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <tech.icon className="h-24 w-24" />
                </div>
                <div className="p-3 bg-white/10 rounded-2xl w-fit mb-6 group-hover:bg-banking-gold group-hover:text-navy transition-all">
                  <tech.icon className="h-6 w-6" />
                </div>
                <h3 className="text-white font-bold mb-2 relative z-10">{tech.title}</h3>
                <p className="text-xs text-blue-200 leading-relaxed italic relative z-10">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-banking-gold relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-navy">
          <h2 className="text-3xl md:text-4xl font-black mb-8 uppercase tracking-tighter italic">Tìm hiểu sâu hơn về kiến trúc?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/architecture" className="px-10 py-5 bg-navy text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform flex items-center gap-3">
              Chi tiết Kiến trúc Kỹ thuật <ArrowRight className="h-5 w-5" />
            </a>
            <a href="/reports" className="px-10 py-5 bg-white text-navy rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform">
              Xem Báo cáo Hệ thống
            </a>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-navy/5 rounded-full -ml-32 -mt-32"></div>
      </section>
    </div>
  );
};

export default PlatformPage;
