import React from 'react';
import { motion } from 'framer-motion';
import { Database, FileCode, Server, Layout, ArrowRight, CheckCircle2, Zap, Settings, ShieldCheck } from 'lucide-react';

const ArchitecturePage = () => {
  const steps = [
    {
      title: 'Dữ liệu thô (Raw Data)',
      desc: 'Dataset Lending Club với 2.26 triệu bản ghi và 151 cột dữ liệu thô từ Kaggle.',
      icon: Database,
      tech: 'CSV / Kaggle',
      color: 'bg-gray-500'
    },
    {
      title: 'Quy trình ETL (Python)',
      desc: 'Xử lý Encoding, loại bỏ 118 cột nhiễu, xử lý giá trị thiếu và Feature Engineering bằng Pandas.',
      icon: FileCode,
      tech: 'Python / Pandas',
      color: 'bg-blue-500'
    },
    {
      title: 'Kho dữ liệu (Warehouse)',
      desc: 'Thiết kế Star Schema trong SQL Server với 1 bảng Fact và 5 bảng Dimension tối ưu.',
      icon: Server,
      tech: 'SQL Server / T-SQL',
      color: 'bg-indigo-600'
    },
    {
      title: 'Giao diện BI (Analytics)',
      desc: 'Trực quan hóa các chỉ số KPI rủi ro và xu hướng tín dụng trên nền tảng Web hiện đại.',
      icon: Layout,
      tech: 'React / Recharts',
      color: 'bg-accent-blue'
    }
  ];

  return (
    <div className="p-4 md:p-12 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black text-navy uppercase tracking-tighter">Kiến trúc Toàn diện</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Hành trình từ dữ liệu thô phân mảnh đến hệ thống quản trị thông minh.
        </p>
      </section>

      {/* Visual Pipeline */}
      <section className="relative px-6">
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -z-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center"
            >
              <div className={`w-20 h-20 rounded-3xl ${step.color} text-white flex items-center justify-center shadow-2xl mb-6 z-10`}>
                <step.icon className="h-10 w-10" />
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 enterprise-shadow text-center w-full">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent-blue bg-blue-50 px-3 py-1 rounded-full mb-3 inline-block">
                  {step.tech}
                </span>
                <h3 className="text-lg font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="lg:hidden flex justify-center py-4">
                  <ArrowRight className="h-6 w-6 text-gray-300 rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Optimization Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-navy flex items-center gap-3">
            <Settings className="h-8 w-8 text-accent-blue" /> Tối ưu hóa Dữ liệu
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 p-6 bg-white rounded-3xl border border-gray-100 enterprise-shadow">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-status-good flex flex-shrink-0 items-center justify-center">
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-navy mb-1 text-lg">Giảm 70% dung lượng bộ nhớ</h4>
                <p className="text-sm text-gray-500 italic">
                  Loại bỏ 118 cột không cần thiết, chuyển đổi kiểu dữ liệu phù hợp (Int, Date, Decimal) giúp hệ thống truy vấn cực nhanh.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-white rounded-3xl border border-gray-100 enterprise-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-accent-blue flex flex-shrink-0 items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-navy mb-1 text-lg">Feature Engineering chuyên sâu</h4>
                <p className="text-sm text-gray-500 italic">
                  Trích xuất 3 thuộc tính thời gian (Year, Month, Quarter) và chuẩn hóa cột `term`, `emp_length` bằng RegEx.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-navy rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8">
            <div className="h-32 w-32 border-4 border-white/5 rounded-full flex items-center justify-center">
              <Server className="h-12 w-12 text-white/20" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <div className="w-2 h-8 bg-banking-gold rounded-full"></div> Chi tiết Database (SQL)
          </h3>
          <div className="space-y-6">
            {[
              { label: 'Staging Area', value: 'Nạp dữ liệu thô vào các bảng tạm để xử lý.' },
              { label: 'Fact_Loans', value: 'Chứa 2.26 triệu bản ghi với 24 thuộc tính đo lường.' },
              { label: 'Dimensions', value: 'Gồm 5 bảng danh mục giúp phân tích đa chiều.' },
              { label: 'Indexing', value: 'Tạo Non-clustered Index trên các cột FK để tăng tốc Join.' },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 group">
                <CheckCircle2 className="h-6 w-6 text-banking-gold flex-shrink-0" />
                <div>
                  <p className="font-bold text-white group-hover:text-banking-gold transition-colors">{item.label}</p>
                  <p className="text-sm text-blue-200">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitecturePage;
