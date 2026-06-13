import './style.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Database, BarChart3,
  Zap, ArrowRight, Server, Globe,
  Cpu, LayoutDashboard, Target, TrendingUp,
  Layers, Box,
  History, BookOpen
} from 'lucide-react';

// PACE Business Intelligence Core Constants
const biRoles = [
  {
    title: 'Thích ứng linh hoạt',
    desc: 'Giúp doanh nghiệp phân tích những thông tin chính xác, hiệu quả để linh hoạt thích ứng với môi trường kinh doanh thay đổi liên tục cùng sự cạnh tranh khốc liệt.'
  },
  {
    title: 'Tối ưu hóa quyết định',
    desc: 'Hỗ trợ các nhà quản trị đưa ra quyết định kinh doanh tối ưu và hiệu quả, đặc biệt trong các trường hợp khẩn cấp.'
  },
  {
    title: 'Thấu hiểu khách hàng',
    desc: 'Hỗ trợ Marketing phân tích sâu hành vi khách hàng, xây dựng chiến lược, giữ chân khách hàng cũ và tìm kiếm khách hàng tiềm năng.'
  },
  {
    title: 'Bức tranh toàn cảnh',
    desc: 'Phác thảo bức tranh tổng thể chân dung doanh nghiệp, giúp xác định vị thế, khả năng cạnh tranh cũng như dự đoán tương lai phát triển.'
  },
  {
    title: 'Tối ưu chi phí điều hành',
    desc: 'Hỗ trợ đắc lực trong công tác điều hành toàn diện, tiết kiệm thời gian báo cáo thủ công và tối ưu chi phí quản trị doanh nghiệp.'
  },
  {
    title: 'Cải tiến hiệu quả nội bộ',
    desc: 'Hỗ trợ doanh nghiệp đánh giá hiệu suất nội bộ, từ đó cải thiện và tối ưu hóa các quy trình hoạt động của toàn bộ tổ chức.'
  },
  {
    title: 'Giao diện trực quan hóa',
    desc: 'Cô đọng các báo cáo thành các bảng điều khiển trực quan (Dashboards), giúp những người ít am hiểu về kỹ thuật vẫn dễ dàng phân tích và khai phá dữ liệu.'
  }
];

const biActivities = [
  {
    title: 'Hỗ trợ ra quyết định (Decision support)',
    desc: 'Mục đích cốt lõi của BI là phân tích dữ liệu để phát hiện các vấn đề còn tồn đọng, hỗ trợ đắc lực các nhà quản trị đưa ra quyết định chiến lược kinh doanh chính xác và tối ưu nhất.'
  },
  {
    title: 'Truy vấn & Báo cáo (Query & Reporting)',
    desc: 'Tự động trích xuất thông tin, ghi nhận và lưu trữ các chi tiết quan trọng. Tiến hành xây dựng báo cáo dưới dạng mô hình giúp bao quát bức tranh tổng thể doanh nghiệp một cách trực quan và dễ hiểu nhất.'
  },
  {
    title: 'Phân tích trực tuyến (OLAP)',
    desc: 'Hệ thống xử lý phân tích trực tuyến đa chiều (OLAP) giúp người dùng truy xuất thông tin cực kỳ nhanh chóng và dễ dàng, đồng thời phân tích xu hướng, lập báo cáo tài chính và ngân sách.'
  },
  {
    title: 'Phân tích thống kê (Statistical analysis)',
    desc: 'Hoạt động nhằm phân tích, giải thích và minh họa dữ liệu chuyên sâu để phát hiện ra các mẫu (patterns) và xu hướng cốt lõi trong dữ liệu lớn, đóng vai trò quan trọng trong việc thấu hiểu doanh nghiệp.'
  },
  {
    title: 'Dự báo (Forecasting)',
    desc: 'Ứng dụng các kỹ thuật toán học và mô hình dữ liệu để dự báo tương lai cho mọi ngành nghề, giúp doanh nghiệp chủ động chuẩn bị tốt cho các biến động lớn và định hình chiến lược dài hạn.'
  },
  {
    title: 'Khai thác dữ liệu (Data mining)',
    desc: 'Quá trình thu thập data từ đa dạng nguồn, phân tích và tổng hợp thành thông tin liên quan (gồm phân loại - Classification, phân cụm - Clustering, dự đoán - Prediction) để giải quyết các bài toán kinh doanh cụ thể.'
  }
];

const biStepsNew = [
  {
    no: '01',
    title: 'Data Sources',
    subtitle: 'Nguồn dữ liệu',
    desc: 'Thu thập dữ liệu thô từ nhiều nguồn khác nhau như HRM (quản trị nhân lực), CRM (quan hệ khách hàng), hệ thống thương mại điện tử, tệp phẳng, v.v.'
  },
  {
    no: '02',
    title: 'Data Warehousing',
    subtitle: 'Kho dữ liệu',
    desc: 'Nơi dữ liệu được tổng hợp và lưu trữ tích lũy lâu dài, an toàn bằng các hệ thống thiết bị điện tử tối ưu của doanh nghiệp.'
  },
  {
    no: '03',
    title: 'Integrating Server',
    subtitle: 'Tích hợp máy chủ',
    desc: 'Công cụ vận hành quy trình ETL (Extract - Transform - Load) để trích xuất, chuẩn hóa, làm sạch và đồng bộ dữ liệu từ nguồn thô vào kho dữ liệu.'
  },
  {
    no: '04',
    title: 'Analysis Server',
    subtitle: 'Máy chủ phân tích',
    desc: 'Đầu vào tiếp nhận dữ liệu đã qua tích hợp, sau đó xử lý phân tích và trả về kết quả dựa trên các quy tắc nghiệp vụ định nghĩa sẵn.'
  },
  {
    no: '05',
    title: 'Reporting Server',
    subtitle: 'Máy chủ báo cáo',
    desc: 'Bộ phận chịu trách nhiệm hiển thị, báo cáo và xuất bản các kết quả đầu ra (outputs) nhận được từ Máy chủ phân tích.'
  },
  {
    no: '06',
    title: 'Data Mining',
    subtitle: 'Khai thác dữ liệu',
    desc: 'Quá trình trích xuất thông tin chuyên sâu từ dữ liệu đã qua xử lý, bao gồm các bước quan trọng như phân loại, phân cụm và đưa ra mô hình dự đoán.'
  },
  {
    no: '07',
    title: 'Data Presentation',
    subtitle: 'Trình bày dữ liệu',
    desc: 'Tổng hợp dữ liệu cuối cùng từ quá trình khai thác và trình diễn dưới dạng biểu đồ, bảng điều khiển (Dashboards) trực quan sinh động.'
  }
];

const PlatformPage = () => {
  const historyPoints = [
    {
      year: '1865',
      title: 'Khởi nguồn Thuật ngữ',
      event: 'Richard Millar Devens lần đầu sử dụng cụm từ "Business Intelligence" trong cuốn sách lịch sử thương mại để mô tả cách một chủ ngân hàng thu thập thông tin thị trường trước đối thủ để giành lợi thế cạnh tranh.'
    },
    {
      year: '1958',
      title: 'Kỷ nguyên Máy tính hóa',
      event: 'Hans Peter Luhn (nhà khoa học máy tính tại IBM) công bố bài báo khoa học mang tính bước ngoặt "A Business Intelligence System", đặt nền móng cho việc sử dụng máy tính điện tử để tự động trích xuất và xử lý thông tin.'
    },
    {
      year: '1989',
      title: 'Định nghĩa Hiện đại',
      event: 'Howard Dresner (sau này là nhà phân tích tại Gartner) phổ biến BI như một khái niệm chung bao gồm các mô hình dữ liệu và công cụ hỗ trợ ra quyết định dựa trên thực tế dữ liệu lịch sử.'
    }
  ];

  const techCards = [
    { title: 'Python ETL', desc: 'Trích xuất và chuẩn hóa dữ liệu thô tự động.', icon: Cpu },
    { title: 'SQL Server', desc: 'Hệ quản trị CSDL lưu trữ kho dữ liệu DW chính.', icon: Database },
    { title: 'Indexing', desc: 'Tối ưu hóa tốc độ truy vấn trên Fact/Dimension.', icon: Zap },
    { title: 'Star Schema', desc: 'Thiết kế Star Schema phân tích đa chiều tối ưu.', icon: Layers },
    { title: 'React Dashboard', desc: 'Trực quan hóa thời gian thực các chỉ số rủi ro.', icon: LayoutDashboard }
  ];

  return (
    <div className="platform-page bg-[#f8fafc] min-h-screen text-slate-800 font-sans antialiased">

      {/* ── HERO HEADER (The Spark) ── */}
      <section className="relative bg-[#07142c] py-28 md:py-36 overflow-hidden border-b border-navy/20">

        {/* Modern Tech Background Grid & Glows */}
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-accent-blue/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan/25 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column: Rich Text & Metadata */}
            <div className="lg:col-span-7 space-y-6 text-left animate-fade-in">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-banking-gold font-bold uppercase text-[11px] block tracking-[0.3em]"
              >
                Hành trình chuyển đổi số dữ liệu
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight uppercase"
              >
                Business Intelligence <br />
                <span className="text-banking-gold font-black">Systems (BI)</span>
              </motion.h1>
              <p className="text-[14.5px] md:text-[15.5px] text-blue-100/85 max-w-2xl leading-relaxed font-medium">
                Khám phá cách chúng tôi chuẩn hóa dữ liệu tín dụng thô từ các giao dịch thực tế của <strong>VDCB Bank</strong> thành kho tri thức phân tích trực quan hỗ trợ ban điều hành ra quyết định kịp thời.
              </p>

              {/* Data metrics summary bar */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-white/10 mt-8">
                <div>
                  <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Quy mô mẫu thô</p>
                  <p className="text-xl font-black text-white mt-1">2.26M+ <span className="text-xs font-normal text-blue-200">dòng</span></p>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Thuộc tính gốc</p>
                  <p className="text-xl font-black text-white mt-1">151 <span className="text-xs font-normal text-blue-200">cột</span></p>
                </div>
                <div className="border-l border-white/10 pl-6">
                  <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Định dạng nạp</p>
                  <p className="text-xl font-black text-white mt-1">CSV / T-SQL</p>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Large Blended Dashboard Mockup */}
            <div className="lg:col-span-5 relative hidden lg:block h-[350px]">
              {/* Decorative Glow Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan/40 to-accent-blue/30 rounded-full blur-[80px] scale-95 opacity-60 pointer-events-none" />

              {/* Large flat image blending into background */}
              <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 w-[720px] h-[460px] pointer-events-none">
                <img
                  src="/pictures/bi_hero_dashboard.png"
                  alt="VDCB BI Dashboard Mockup"
                  className="w-full h-full object-cover hero-image-mask opacity-[0.85]"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── NARRATIVE INTRODUCTION (Ngữ cảnh thực tế) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left Column: Heading & Highlight */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-3xl lg:text-4xl font-black text-navy uppercase tracking-tighter leading-tight">
                Dòng chảy thông tin từ Giao dịch đến Quyết định quản trị
              </h2>
              <div className="h-1.5 w-16 bg-banking-gold rounded-full" />
              <div className="p-5 bg-[#f8fafc] rounded-2xl border border-gray-200/50 mt-6 hidden lg:block">
                <p className="text-xs font-semibold text-navy uppercase tracking-wider mb-2">Mục tiêu tối thượng</p>
                <p className="text-[13px] text-gray-500 italic leading-relaxed">
                  Chuyển hóa tài nguyên dữ liệu thô phân tán tại VDCB thành động lực tăng trưởng tài chính và giảm thiểu rủi ro nợ xấu.
                </p>
              </div>
            </div>

            {/* Right Column: Detailed narrative text */}
            <div className="lg:col-span-7 text-gray-600 text-[14.5px] leading-relaxed space-y-6 text-justify lg:pt-2">
              <p>
                Tại <strong>Ngân hàng TMCP Tín dụng Số Việt Nam (VDCB)</strong>, hàng triệu bản ghi giao dịch, hồ sơ đăng ký vay và lịch sử thanh toán nợ được khởi tạo mỗi ngày. Dữ liệu ban đầu chỉ là các mảnh vụn phân tán, thô ráp và nằm rải rác trên các máy chủ CRM, Core Banking và tệp số liệu độc lập. Nếu không được khai phá, khối dữ liệu khổng lồ này chỉ là chi phí lưu trữ thay vì tài sản sinh lời.
              </p>
              <p>
                Mô hình <strong>Business Intelligence (BI)</strong> được thiết lập đóng vai trò là xương sống thông tin tổng thể. Nó không chỉ là công cụ vẽ biểu đồ, mà là một chuỗi hành trình có cấu trúc chặt chẽ giúp <strong>Trích xuất (ETL)</strong>, <strong>Hợp nhất (Data Warehouse)</strong>, <strong>Phân tích chuyên sâu (Analysis &amp; Data Mining)</strong> và cuối cùng là <strong>Trực quan hóa (Presentation)</strong>.
              </p>
              <p>
                Nhờ đó, ban điều hành VDCB có thể đưa ra quyết định dựa trên chứng cứ thực nghiệm, chủ động kiểm soát tỷ lệ nợ xấu, thấu hiểu hành vi khách hàng vay và tối ưu chi phí điều hành toàn hệ thống.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── ACT I: HISTORY TIMELINE (Chặng đường lịch sử) ── */}
      <section className="py-24 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-navy uppercase tracking-tighter mt-4 mb-2">
              Khởi nguồn của Quyết định số
            </h2>
            <p className="text-gray-500 text-sm">Chặng đường phát triển hơn 150 năm của Business Intelligence</p>
          </div>

          <div className="relative border-l-2 border-gray-200 ml-4 md:ml-32 pl-8 space-y-12">
            {historyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] top-1 bg-white border-2 border-accent-blue w-4 h-4 rounded-full group-hover:bg-accent-blue transition-colors z-10" />

                {/* Year Label */}
                <div className="absolute -left-[140px] top-0 hidden md:block w-24 text-right">
                  <span className="font-mono text-2xl font-black text-navy/40 group-hover:text-accent-blue transition-colors">
                    {point.year}
                  </span>
                </div>

                {/* Content Card */}
                <div className="p-6 bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <div className="md:hidden font-mono text-xl font-black text-accent-blue mb-1">
                    {point.year}
                  </div>
                  <h3 className="text-[16px] font-black text-navy mb-2">{point.title}</h3>
                  <p className="text-gray-600 text-[13.5px] leading-relaxed text-justify">{point.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACT II: DATA PIPELINE (Xương sống xử lý dữ liệu) ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-navy uppercase tracking-tighter mt-4 mb-2">
              Kiến trúc Xử lý &amp; Xương sống ETL
            </h2>
            <p className="text-gray-500 text-sm">Hành trình trích xuất, chuẩn hóa và tích lũy dữ liệu lịch sử</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Interactive/Visual flow steps */}
            <div className="lg:col-span-5 space-y-6">
              {biStepsNew.map((step, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-[#f8fafc] rounded-2xl border border-gray-200/50 hover:border-accent-blue/30 transition-all">
                  <div className="font-mono text-xl font-black text-accent-blue w-8 shrink-0">
                    {step.no}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-gray-400 block uppercase">
                      {step.title}
                    </span>
                    <strong className="text-[14px] text-navy uppercase block mb-1">
                      {step.subtitle}
                    </strong>
                    <p className="text-gray-600 text-[13px] leading-relaxed text-justify">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Diagram display with sticky container */}
            <div className="lg:col-span-7 lg:sticky lg:top-8">
              <div className="bg-[#f8fafc] p-6 rounded-3xl border border-gray-200/80 shadow-sm">
                <img
                  src="/pictures/bi_pipeline.png"
                  alt="Sơ đồ 7 bước Business Intelligence"
                  className="w-full max-h-[460px] object-contain mx-auto rounded-2xl border border-gray-200 bg-white p-2 shadow-sm"
                />
                <div className="mt-4 text-center">
                  <p className="text-xs font-semibold text-navy uppercase tracking-wider">
                    Sơ đồ tổng quan quy trình dữ liệu BI của VDCB
                  </p>
                  <p className="text-[11.5px] text-gray-500 mt-1">
                    Dữ liệu di chuyển tuần tự qua 3 phân tầng chính: Khai thác (ETL) &rarr; Lưu trữ (Warehouse) &rarr; Phân tích &amp; Trình diễn (Dashboard).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT III: CORE ANALYTICAL ACTIVITIES (Bộ máy phân tích nghiệp vụ) ── */}
      <section className="py-24 bg-[#f8fafc] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-navy uppercase tracking-tighter mt-4 mb-2">
              Bộ máy phân tích dữ liệu chuyên sâu
            </h2>
            <p className="text-gray-500 text-sm">Các cơ chế xử lý và phân tách dữ liệu phục vụ nghiên cứu và ra quyết định</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biActivities.map((act, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:-translate-y-1 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-4">
                    <span className="text-[11px] font-mono font-black text-accent-blue bg-blue-50 px-2 py-0.5 rounded uppercase">
                      {idx + 1}
                    </span>
                    <h4 className="font-bold text-[14.5px] text-navy uppercase tracking-tight">{act.title.split(' (')[0]}</h4>
                  </div>
                  <p className="text-gray-600 text-[13px] leading-relaxed text-justify">
                    {act.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACT IV: MANAGEMENT VALUE & DASHBOARD (Giá trị thực tế & Quả ngọt) ── */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-navy uppercase tracking-tighter mt-4 mb-2">
              Quả ngọt quản trị &amp; Khai phá nợ xấu
            </h2>
            <p className="text-gray-500 text-sm">Hiệu quả thực tế của hệ thống BI trong việc giám sát rủi ro tín dụng tại VDCB</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: The 7 values list */}
            <div className="lg:col-span-5 space-y-5">
              {biRoles.slice(0, 5).map((role, idx) => (
                <div key={idx} className="flex gap-4 p-5 bg-[#f8fafc] rounded-xl border border-gray-200/50">
                  <div className="w-8 h-8 rounded-lg bg-navy/5 text-navy flex items-center justify-center font-bold text-[13px] shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-black text-[13.5px] text-navy uppercase mb-1">
                      {role.title}
                    </h4>
                    <p className="text-gray-600 text-[13px] leading-relaxed text-justify">
                      {role.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: The big Glowing Dashboard mockup */}
            <div className="lg:col-span-7">
              <div className="bg-[#f8fafc] p-6 rounded-3xl border border-gray-200/80 shadow-md">
                <img
                  src="/pictures/bi_glowing_dashboard.png"
                  alt="Giao diện trực quan hóa thông tin thông minh"
                  className="w-full max-h-[460px] object-cover mx-auto rounded-2xl border border-gray-200 bg-white shadow-sm"
                />
                <div className="mt-4 text-center">
                  <p className="text-xs font-semibold text-navy uppercase tracking-wider">
                    Giao diện VDCB BI Dashboard thời gian thực
                  </p>
                  <p className="text-[11.5px] text-gray-500 mt-1">
                    Cung cấp các biểu đồ tổng quan, tỷ lệ nợ xấu tự động cập nhật, giúp các cấp quản lý nắm bắt tình hình tài chính tức thì.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACT V: TECHNICAL ARCHITECTURE (Kiến trúc công nghệ) ── */}
      <section className="py-16 bg-[#07142c] text-white relative border-t border-navy/25">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-white text-[15px] font-black uppercase tracking-widest">Technology Stack</h2>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <div className="w-6 h-0.5 bg-banking-gold rounded-full"></div>
              <div className="w-3 h-0.5 bg-accent-blue rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {techCards.map((tech, i) => (
              <div
                key={i}
                className="p-4 bg-white/5 border border-white/5 rounded-lg hover:bg-white/10 transition-all group flex items-start gap-4"
              >
                <div className="p-2 bg-white/10 rounded-md text-banking-gold shrink-0 mt-0.5 group-hover:bg-banking-gold group-hover:text-navy transition-all">
                  <tech.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-[12.5px] leading-tight group-hover:text-banking-gold transition-colors">{tech.title}</h3>
                  <p className="text-[10px] text-blue-200/70 leading-relaxed mt-0.5 truncate lg:whitespace-normal">{tech.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA (Kêu gọi hành động) ── */}
      <section className="py-20 bg-banking-gold relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10 text-navy">
          <h2 className="text-2xl md:text-3xl font-black mb-10 uppercase tracking-tight">Tìm hiểu sâu hơn về kiến trúc kỹ thuật?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/architecture"
              className="inline-flex items-center gap-3 px-8 py-4 bg-navy text-white rounded-xl font-black uppercase text-xs hover:scale-[1.03] transition-transform shadow-md"
            >
              Chi tiết Kiến trúc Kỹ thuật <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-white text-navy rounded-xl font-black uppercase text-xs hover:scale-[1.03] transition-transform shadow-md border border-navy/10"
            >
              Vào Dashboard Trực Quan
            </Link>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-navy/5 rounded-full -ml-32 -mt-32"></div>
      </section>
    </div>
  );
};

export default PlatformPage;


