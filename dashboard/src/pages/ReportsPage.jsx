import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Lightbulb, BarChart, CheckSquare, AlertCircle, TrendingDown, Target, Award } from 'lucide-react';

const ReportsPage = () => {
  const insights = [
    {
      title: 'Tập trung Rủi ro cao',
      desc: 'Các khoản vay thuộc Grade E và F có tỷ lệ nợ xấu (NPL) cao gấp 3 lần mức trung bình, đặc biệt là các mục đích vay "Small Business".',
      icon: AlertCircle,
      type: 'risk'
    },
    {
      title: 'Hiệu quả Thu hồi nợ',
      desc: 'Tỷ lệ thu hồi nợ (Recovery Rate) đạt 58.3% cho các khoản vay có tài sản đảm bảo, cao hơn 15% so với vay tín chấp.',
      icon: TrendingDown,
      type: 'good'
    },
    {
      title: 'Xu hướng Địa lý',
      desc: 'Khu vực California và New York chiếm 35% dư nợ nhưng có tỷ lệ thanh toán đúng hạn ổn định nhất.',
      icon: Target,
      type: 'info'
    }
  ];

  return (
    <div className="p-4 md:p-12 max-w-5xl mx-auto space-y-16">
      {/* Report Header */}
      <section className="border-b-4 border-navy pb-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-black text-navy uppercase">Báo cáo Chiến lược BI</h1>
            <p className="text-gray-500 font-bold tracking-widest uppercase">Mã báo cáo: LC-2026-05-11</p>
          </div>
          <div className="hidden md:block">
            <Award className="h-16 w-16 text-banking-gold opacity-20" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-bold text-gray-400">
          <div>PHÂN PHỐI: <span className="text-navy">Ban quản trị Rủi ro</span></div>
          <div>NGÀY LẬP: <span className="text-navy">11/05/2026</span></div>
          <div>PHIÊN BẢN: <span className="text-navy">1.0 Final</span></div>
          <div>BẢO MẬT: <span className="text-status-risk">Internal Only</span></div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="bg-white p-10 rounded-3xl enterprise-shadow border border-gray-100">
        <h2 className="text-2xl font-bold text-navy mb-6 flex items-center gap-3">
          <FileText className="h-6 w-6 text-accent-blue" /> Tóm tắt điều hành (Executive Summary)
        </h2>
        <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-4 font-medium">
          <p>
            Báo cáo này trình bày kết quả phân tích trên bộ dữ liệu <strong>Lending Club (2007-2018)</strong> với quy mô 2.26 triệu khoản vay. 
            Thông qua hệ thống BI, chúng tôi đã xác định được các chỉ số rủi ro then chốt và hiệu quả vận hành của danh mục tín dụng.
          </p>
          <p>
            Mặc dù quy mô giải ngân tăng trưởng mạnh mẽ đạt mức 10.5 tỷ USD vào năm 2018, tỷ lệ nợ xấu (NPL) vẫn duy trì ở mức <strong>14.2%</strong>. 
            Hệ thống đã thực hiện tối ưu hóa dữ liệu giúp giảm 70% tài nguyên lưu trữ, cho phép truy vấn báo cáo trong thời gian thực.
          </p>
        </div>
      </section>

      {/* Key Insights Grid */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-navy flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-banking-gold" /> Phân tích chuyên sâu (Key Insights)
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {insights.map((insight, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 p-8 bg-gray-50 rounded-3xl border border-gray-100 group hover:bg-white hover:enterprise-shadow transition-all"
            >
              <div className={`w-12 h-12 rounded-2xl flex flex-shrink-0 items-center justify-center text-white shadow-lg ${
                insight.type === 'risk' ? 'bg-status-risk' : insight.type === 'good' ? 'bg-status-good' : 'bg-accent-blue'
              }`}>
                <insight.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-black text-navy text-xl mb-2">{insight.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{insight.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Performance Results */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-navy p-10 rounded-[2.5rem] text-white space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-3">
            <BarChart className="h-6 w-6 text-banking-gold" /> Hiệu suất Hệ thống
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-blue-200">Dữ liệu xử lý</span>
              <span className="font-bold">2,260,701 Dòng</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-blue-200">Tối ưu bộ nhớ</span>
              <span className="font-bold text-status-good">70% Optimization</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <span className="text-blue-200">Tốc độ truy vấn</span>
              <span className="font-bold">~0.5s / report</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] enterprise-shadow border border-gray-100 space-y-6">
          <h3 className="text-xl font-bold text-navy flex items-center gap-3">
            <CheckSquare className="h-6 w-6 text-status-good" /> Khuyến nghị (Actions)
          </h3>
          <ul className="space-y-4 text-sm text-gray-500 font-medium">
            <li className="flex gap-3">
              <div className="h-2 w-2 bg-status-risk rounded-full mt-1.5 flex-shrink-0"></div>
              Siết chặt điều kiện cho vay với các khoản vay Grade E/F.
            </li>
            <li className="flex gap-3">
              <div className="h-2 w-2 bg-status-good rounded-full mt-1.5 flex-shrink-0"></div>
              Tăng hạn mức cho nhóm khách hàng "Home Ownership" tại CA/NY.
            </li>
            <li className="flex gap-3">
              <div className="h-2 w-2 bg-accent-blue rounded-full mt-1.5 flex-shrink-0"></div>
              Triển khai mô hình AI dự báo nợ xấu (Early Warning System).
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ReportsPage;
