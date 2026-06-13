import './style.css';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BrainCircuit, ShieldAlert, Globe, Landmark, Zap, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';

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
    <div>
      {/* ── 1. BANK CASE STUDIES — Full screen, đầu trang ── */}
      <BankCaseStudies />

      {/* ── 2. COMPACT TRENDS STRIP ── */}
      <div className="bg-white border-b border-gray-100">
        {/* Ticker-style header bar */}
        <div className="bg-navy px-6 py-3 flex items-center gap-6 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 flex-shrink-0">
            <TrendingUp className="h-4 w-4 text-banking-gold" />
            <span className="text-xl font-black uppercase tracking-widest text-white whitespace-nowrap">Xu hướng Ngân hàng 2025</span>
          </div>
          <div className="w-px h-5 bg-white/20 flex-shrink-0" />
          {trends.map((t, i) => (
            <div key={t.title} className="flex items-center gap-2 flex-shrink-0">
              <t.icon className="h-4 w-4 text-banking-gold" />
              <span className="text-[16px] font-bold text-white whitespace-nowrap">{t.title}</span>
              {i < trends.length - 1 && <span className="text-white/30 ml-2">·</span>}
            </div>
          ))}
        </div>

        {/* Trend cards — horizontal scroll on mobile, grid on desktop */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trends.map((trend, i) => (
              <motion.div
                key={trend.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-accent-blue/30 hover:bg-blue-50/30 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${trend.bg} ${trend.color} flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <trend.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[16px] font-black text-navy mb-1">{trend.title}</h3>
                  <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">{trend.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. VIETNAM BANK SURVEY (compact) ── */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Landmark className="h-6 w-6 text-accent-blue" />
            <h2 className="text-2xl font-black text-navy uppercase tracking-tight">Khảo sát BI tại Ngân hàng Việt Nam</h2>
            <div className="flex-1 h-px bg-gray-200 ml-4" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {banks.map((bank, i) => (
              <motion.div
                key={bank.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl enterprise-shadow border-l-4 border-accent-blue"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-black text-navy">{bank.name}</h3>
                    <p className="text-[13px] font-bold text-accent-blue tracking-wider uppercase">{bank.tagline}</p>
                  </div>
                  <span className="text-[11px] font-black text-navy bg-navy/5 px-2 py-1 rounded-full border border-navy/10">{bank.focus}</span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed italic">"{bank.usage}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FUTURE INSIGHT (compact) ── */}
      <motion.section
        className="bg-gradient-to-br from-navy via-navy to-accent-blue py-14 relative overflow-hidden"
      >
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-banking-gold rounded-full opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tighter">
                Tương lai của <span className="text-banking-gold">Phân tích Ngân hàng</span>
              </h2>
              <p className="text-blue-100 leading-relaxed">
                Đến năm 2030, <strong>90%</strong> quyết định tín dụng được thực hiện tự động bởi AI. Ngân hàng trở thành <strong>công ty công nghệ</strong> cung cấp giải pháp tài chính.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '92%', label: 'Tỷ lệ tự động hóa' },
                { val: '-45%', label: 'Giảm chi phí vận hành' },
                { val: '3×', label: 'Tốc độ phê duyệt' },
                { val: '99.9%', label: 'Uptime hệ thống' },
              ].map((s, i) => (
                <div key={i} className="p-5 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 text-center">
                  <p className="text-3xl font-black text-banking-gold mb-1">{s.val}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};


/* ── DATA: 4 Ngân hàng ── */
const banks = [
  {
    name: 'VPBank',
    fullName: 'Ngân hàng TMCP Việt Nam Thịnh Vượng',
    img: '/pictures/VPBank.jpg',
    tag: 'AI Credit Scoring / Dữ liệu thay thế',
    campaign: 'Ứng dụng Dữ liệu Hành vi vào Chấm điểm Tín dụng',
    points: [
      { label: 'Hợp tác chiến lược', content: 'Hợp tác với <strong>công ty công nghệ & bán lẻ</strong> để khai thác dữ liệu phi truyền thống.' },
      { label: 'Nguồn dữ liệu mới', content: 'Phân tích <strong>hành vi thanh toán hóa đơn</strong>, <strong>tần suất mua sắm TMĐT</strong> thay vì chỉ dựa sao kê ngân hàng.' },
      { label: 'Dịch chuyển mô hình', content: 'Từ <strong>"Tài sản thế chấp"</strong> sang <strong>"Dữ liệu hành vi"</strong> để cấp <strong>tín dụng tín chấp</strong> tốc độ cao.' },
      { label: 'Hiệu quả', content: '<strong>Rút ngắn thời gian phê duyệt</strong> từ 5–7 ngày xuống vài phút; mở rộng tệp khách hàng <strong>chưa có lịch sử tín dụng</strong>.' },
    ],
  },
  {
    name: 'Techcombank',
    fullName: 'Techcombank & Masan (WinLife)',
    img: '/pictures/techcombank.jpg',
    tag: 'Open Banking / Hệ sinh thái số',
    campaign: 'Mô hình WinLife — Tích hợp Thanh toán & Phân tích Tiêu dùng',
    points: [
      { label: 'Chiến lược sinh thái', content: 'Tích hợp <strong>Techcombank</strong> làm đối tác thanh toán chính thức cho chuỗi <strong>WinMart (Masan)</strong>.' },
      { label: 'Dữ liệu mua sắm', content: 'Giao dịch tại WinMart tạo ra <strong>dữ liệu hành vi tiêu dùng thời gian thực</strong> cho ngân hàng.' },
      { label: 'Hiểu khách hàng sâu', content: 'Ngân hàng xây dựng chỉ số <strong>"Sức khỏe tài chính"</strong> và <strong>thói quen chi tiêu</strong> để đề xuất vay vốn phù hợp.' },
      { label: 'Hiệu quả', content: '<strong>Tỷ lệ chuyển đổi tín dụng</strong> tăng đáng kể; chiến lược <strong>"Dữ liệu là tài sản"</strong> trở thành lợi thế cạnh tranh.' },
    ],
  },
  {
    name: 'TPBank',
    fullName: 'TPBank / EVN Finance',
    img: '/pictures/TPBank.jpg',
    tag: 'Digital Banking / LiveBank',
    campaign: 'LiveBank & eKYC — Ngân hàng số không cần phòng giao dịch',
    points: [
      { label: 'LiveBank 24/7', content: 'Hệ thống <strong>ngân hàng tự động 24/7</strong> thay thế phòng giao dịch truyền thống, phục vụ toàn diện.' },
      { label: 'eKYC tức thì', content: 'Xác thực khách hàng <strong>100% trực tuyến</strong> qua eKYC — không cần đến quầy, không giấy tờ vật lý.' },
      { label: 'Trải nghiệm liền mạch', content: 'Khách hàng bắt đầu đăng ký vay trên <strong>Web</strong>, bổ sung hồ sơ trên <strong>App</strong> — dữ liệu <strong>không bị mất giữa chừng</strong>.' },
      { label: 'Hiệu quả', content: '<strong>Giảm 60% chi phí vận hành</strong> mạng lưới; tốc độ mở tài khoản và phê duyệt vay rút ngắn xuống <strong>dưới 5 phút</strong>.' },
    ],
  },
  {
    name: 'Vietcombank',
    fullName: 'Ngân hàng TMCP Ngoại thương Việt Nam',
    img: '/pictures/vietcombank.jpg',
    tag: 'BI Dashboard / Quản trị rủi ro',
    campaign: 'Hệ thống BI Tập trung — Xóa bỏ Báo cáo Excel Thủ công',
    points: [
      { label: 'Vấn đề cũ', content: '<strong>Dữ liệu phân mảnh</strong> giữa các chi nhánh; báo cáo thủ công Excel gây <strong>độ trễ thông tin lớn</strong>.' },
      { label: 'Giải pháp BI', content: 'Triển khai <strong>kho dữ liệu tập trung</strong> kết nối toàn bộ chi nhánh — cập nhật <strong>near-real-time</strong>.' },
      { label: 'Dashboard NPL', content: '<strong>Dashboard quản trị nợ xấu</strong> tự động phân loại nhóm nợ, cảnh báo sớm rủi ro theo <strong>vùng địa lý & ngành nghề</strong>.' },
      { label: 'Hiệu quả', content: '<strong>Giảm 80% thời gian lập báo cáo</strong>; lãnh đạo ra quyết định dựa trên <strong>dữ liệu thực</strong> thay vì cảm tính.' },
    ],
  },
];

function BankCaseStudies() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const bank = banks[active];

  const go = (next) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };

  return (
    <section className="bg-navy">
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-5">
          <Building2 className="h-4 w-4 text-banking-gold" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-3">
          Ngân hàng &amp; <span className="text-banking-gold">Chiến lược Business Intelligence</span>
        </h2>
        <p className="text-blue-200 max-w-2xl mx-auto">
          Phân tích chiến dịch ứng dụng dữ liệu tại ngân hàng tiêu biểu và nhu cầu triển khai hệ thống BI hiện đại.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex gap-2 flex-wrap justify-center">
          {banks.map((b, i) => (
            <button key={b.name} onClick={() => go(i)}
              className={`px-5 py-2.5 rounded-full text-sm font-black uppercase tracking-widest transition-all border ${active === i
                ? 'bg-banking-gold text-navy border-banking-gold'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}>
              {b.name}
            </button>
          ))}
        </div>
      </div>

      {/* Full-screen slide */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            initial={{ opacity: 0, x: dir * 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -dir * 80 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-full"
          >
            {/* Layout: 3 cols image + 7 cols content on large screens */}
            <div className="grid grid-cols-1 lg:grid-cols-10 min-h-[520px]">

              {/* Image — 3/10 */}
              <div className="lg:col-span-3 relative overflow-hidden min-h-[280px] lg:min-h-[520px]">
                <img
                  src={bank.img}
                  alt={bank.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy/80 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent lg:hidden" />
                {/* Name badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-banking-gold text-[12.5px] font-black uppercase tracking-widest mb-1">{bank.tag}</p>
                  <h3 className="text-white font-black text-2xl leading-tight drop-shadow-lg">{bank.name}</h3>
                  <p className="text-blue-100 text-xs mt-1 font-medium">{bank.fullName}</p>
                </div>
              </div>

              {/* Content — 7/10 */}
              <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
                {/* Campaign title */}
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-6 w-1.5 bg-banking-gold rounded-full" />
                    <span className="text-banking-gold text-[12.5px] font-black uppercase tracking-widest">Chiến dịch</span>
                  </div>
                  <h4 className="text-white text-2xl lg:text-3xl font-black leading-tight">
                    {bank.campaign}
                  </h4>
                </div>

                {/* Key points */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {bank.points.map((pt, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: j * 0.1 }}
                      className="p-5 bg-white/8 border border-white/15 rounded-2xl hover:bg-white/12 transition-colors group"
                    >
                      <p className="text-banking-gold text-[11px] font-black uppercase tracking-widest mb-2">
                        {pt.label}
                      </p>
                      <p
                        className="text-blue-100 text-sm leading-relaxed font-medium [&_strong]:text-white [&_strong]:font-black"
                        dangerouslySetInnerHTML={{ __html: pt.content }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10">
                  <div className="flex gap-2">
                    {banks.map((_, i) => (
                      <button key={i} onClick={() => go(i)}
                        className={`h-2 rounded-full transition-all ${active === i ? 'w-8 bg-banking-gold' : 'w-2 bg-white/30 hover:bg-white/50'
                          }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => go((active - 1 + banks.length) % banks.length)}
                      className="w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-banking-gold hover:border-banking-gold text-white hover:text-navy flex items-center justify-center transition-all"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => go((active + 1) % banks.length)}
                      className="w-11 h-11 rounded-full border border-white/20 bg-white/10 hover:bg-banking-gold hover:border-banking-gold text-white hover:text-navy flex items-center justify-center transition-all"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom note */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-white/10">
        <p className="text-center text-blue-300 text-[12px] font-medium">
          Nguồn: Báo cáo thường niên VPBank, Techcombank, TPBank, Vietcombank · VnEconomy · Forbes Việt Nam · VnExpress
        </p>
      </div>
    </section>
  );
}

export default TrendsPage;


