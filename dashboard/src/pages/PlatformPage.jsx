import React from 'react';
import { motion } from 'framer-motion';
import { Database, Table, Layers, Zap, Server, BarChart3, ChevronRight, Share2 } from 'lucide-react';

const PlatformPage = () => {
  const dimensions = [
    { name: 'Dim_Customers', desc: 'Thông tin nhân khẩu học, thu nhập, nghề nghiệp.', icon: 'User' },
    { name: 'Dim_Time', desc: 'Dữ liệu thời gian: Tháng, Quý, Năm giải ngân.', icon: 'Calendar' },
    { name: 'Dim_Geography', desc: 'Phân vùng địa lý theo bang và khu vực.', icon: 'Map' },
    { name: 'Dim_LoanProduct', desc: 'Chi tiết sản phẩm: Kỳ hạn, Lãi suất, Mục đích.', icon: 'Package' },
    { name: 'Dim_CreditRisk', desc: 'Phân loại rủi ro: Grade, Sub-grade, Status.', icon: 'Shield' },
  ];

  return (
    <div className="p-4 md:p-12 max-w-7xl mx-auto space-y-16">
      {/* Header Section */}
      <section className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex p-3 rounded-2xl bg-accent-blue/10 text-accent-blue mb-4"
        >
          <Layers className="h-8 w-8" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black text-navy uppercase tracking-tighter">Kiến trúc Hệ thống BI</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Xây dựng kho dữ liệu (Data Warehouse) dựa trên mô hình Star Schema tối ưu cho truy vấn phân tích quy mô lớn.
        </p>
      </section>

      {/* Star Schema Visualization */}
      <section className="bg-white p-8 md:p-16 rounded-[3rem] enterprise-shadow relative overflow-hidden border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-20"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-navy mb-16 text-center flex items-center justify-center gap-3">
            <Share2 className="h-6 w-6 text-accent-blue" /> Mô hình dữ liệu Star Schema
          </h2>

          <div className="relative flex flex-col items-center justify-center min-h-[600px]">
            {/* Fact Table - Center */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="z-20 p-10 bg-navy text-white rounded-3xl shadow-2xl text-center border-4 border-accent-blue/30"
            >
              <Database className="h-12 w-12 mx-auto mb-4 text-banking-gold" />
              <h3 className="text-2xl font-black mb-2 uppercase">Fact_Loans</h3>
              <p className="text-xs text-blue-200 uppercase tracking-widest font-bold">Bảng sự kiện chính</p>
              <div className="mt-4 pt-4 border-t border-white/10 text-left text-[10px] space-y-1 font-mono text-blue-100">
                <p>• loan_id (PK)</p>
                <p>• customer_id (FK)</p>
                <p>• loan_amount</p>
                <p>• installment</p>
                <p>• total_payment</p>
              </div>
            </motion.div>

            {/* Dimension Tables - Surrounding */}
            {dimensions.map((dim, i) => {
              const angle = (i * (360 / dimensions.length)) * (Math.PI / 180);
              const x = Math.cos(angle) * 350;
              const y = Math.sin(angle) * 300;

              return (
                <motion.div
                  key={dim.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, x, y }}
                  transition={{ delay: 0.5 + (i * 0.2) }}
                  className="absolute p-6 bg-white rounded-2xl border border-gray-200 enterprise-shadow w-64 group hover:border-accent-blue transition-all"
                >
                  <h4 className="text-sm font-black text-navy mb-2 flex items-center gap-2">
                    <Table className="h-4 w-4 text-accent-blue" /> {dim.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{dim.desc}</p>
                  
                  {/* Connection Line */}
                  <div 
                    className="absolute top-1/2 left-1/2 w-[200px] h-0.5 bg-accent-blue/10 -z-10 origin-left"
                    style={{ transform: `rotate(${angle + Math.PI}rad)` }}
                  ></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center text-white">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-navy">Xử lý ETL Tốc độ cao</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Quy trình Python ETL xử lý 2.26 triệu bản ghi, giảm số lượng cột từ 151 xuống 33 thuộc tính sạch.
          </p>
        </div>
        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
            <Server className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-navy">Tối ưu SQL Server</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Sử dụng Staging Tables và kỹ thuật Indexing giúp tăng tốc độ truy vấn phân tích lên đến 70%.
          </p>
        </div>
        <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center text-white">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold text-navy">Ra quyết định (BI)</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            Hệ thống dashboard trực quan hỗ trợ ban lãnh đạo theo dõi tỷ lệ nợ xấu và hiệu quả thu hồi nợ theo thời gian thực.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlatformPage;
