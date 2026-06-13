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

  const techCards = [
    { title: 'Python ETL', desc: 'Xử lý và chuyển đổi dữ liệu thô chuyên sâu.', icon: Cpu },
    { title: 'SQL Server', desc: 'Hệ quản trị CSDL lưu trữ kho dữ liệu DW.', icon: Database },
    { title: 'Indexing', desc: 'Tối ưu hóa truy vấn trên các bảng Fact/Dimension.', icon: Zap },
    { title: 'Star Schema', desc: 'Mô hình dữ liệu chuẩn trong kiến trúc BI.', icon: Layers },
    { title: 'React Dashboard', desc: 'Giao diện trực quan hóa dữ liệu hiện đại.', icon: LayoutDashboard }
  ];

  return (
    <div className="platform-page bg-bg-light min-h-screen text-slate-800 font-sans">
      {/* ── PART 1: ORIGINAL CODE (Hero + History + Overview) ── */}

      {/* Hero Section */}
      <section className="relative bg-navy py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-banking-gold font-bold uppercase text-sm mb-4 block tracking-widest"
          >
            Mô hình hệ thống doanh nghiệp
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-white mb-8 uppercase leading-tight"
          >
            Business Intelligence <br />
            <span className="text-banking-gold">Systems (BI)</span>
          </motion.h1>
          <p className="text-[16px] text-blue-100 max-w-2xl leading-relaxed italic">
            "Quy trình thu thập, lưu trữ và phân tích dữ liệu nhằm hỗ trợ doanh nghiệp ra quyết định chính xác."
          </p>
        </div>
      </section>

      {/* History & Formation Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-navy uppercase tracking-tight inline-flex items-center justify-center gap-3">
              <History className="text-banking-gold" /> Lịch sử &amp; Sự hình thành
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {historyPoints.map((point, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 bg-gray-50 rounded-3xl border border-gray-100 enterprise-shadow relative"
              >
                <div className="text-2xl font-black text-banking-gold/100 absolute top-4 right-6">{point.year}</div>
                <h3 className="text-xl font-bold text-navy mb-4">{point.title}</h3>
                <p className="text-gray-600 text-[16px] leading-relaxed">{point.event}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BI Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-navy border-l-4 border-banking-gold pl-6 uppercase tracking-tight">BI là gì?</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-[16px] text-justify">
                <p>
                  <strong>Business Intelligence (BI)</strong> không chỉ là một công cụ đơn lẻ, mà là một quy trình tích hợp các phương pháp, kiến trúc và công nghệ. BI giúp doanh nghiệp trả lời các câu hỏi về quá khứ, hiện tại và dự báo tương lai.
                </p>
                <p>
                  <strong>Data Warehouse (DW)</strong> đóng vai trò là "trái tim" của hệ thống BI. Dữ liệu từ các nguồn khác nhau được tập hợp về đây, qua quá trình <strong>ETL</strong> để đảm bảo tính nhất quán và chất lượng thông tin.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-white rounded-2xl border border-blue-50 enterprise-shadow">
                  <h4 className="font-bold text-navy mb-2 flex items-center gap-2 text-[15px]">
                    <Box className="h-5 w-5 text-accent-blue" /> Fact vs Dimension
                  </h4>
                  <p className="text-[14px] text-gray-500 italic">Bảng <strong>Fact</strong> chứa các con số định lượng. Bảng <strong>Dimension</strong> chứa các thông tin mô tả chi tiết.</p>
                </div>
                <div className="p-4 bg-white rounded-2xl border border-blue-50 enterprise-shadow">
                  <h4 className="font-bold text-navy mb-2 flex items-center gap-2 text-[15px]">
                    <TrendingUp className="h-5 w-5 text-banking-gold" /> OLAP Concepts
                  </h4>
                  <p className="text-[14px] text-gray-500 italic">Cho phép phân tích dữ liệu đa chiều, thực hiện các thao tác Slice, Dice và Drill-down.</p>
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
                        <h4 className="font-bold text-white text-[16px]">{stage.title}</h4>
                        <p className="text-[14px] text-blue-200">{stage.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PART 2: NARRATIVE STORYTELLING WITH INTEGRATED IMAGES (Full Screen & Margins) ── */}

      {/* Narrative Intro & Storytelling Stream - Wider Margins container with clear vertical separation */}
      <section className="py-20 bg-white">
        <div className="platform-narrative max-w-[1600px] mx-auto px-4 md:px-8 space-y-32">

          {/* Section: Narrative Dẫn nhập - Centered Open Layout with Medium Image Below */}
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="text-[12px] font-mono font-bold tracking-widest text-[#1652f0] uppercase">
                Báo cáo Dẫn nhập / Narrative Analysis
              </span>
              <h2 className="text-3xl font-black text-navy uppercase tracking-tighter">
                Dòng chảy thông tin từ Giao dịch đến Quyết định quản trị
              </h2>
              <div className="text-gray-600 text-[14px] md:text-[14px] leading-relaxed space-y-5 text-justify">
                <p>
                  Tại <strong>Ngân hàng TMCP Tín dụng Số Việt Nam (VDCB)</strong>, hàng triệu bản ghi giao dịch, hồ sơ đăng ký vay và lịch sử thanh toán nợ được khởi tạo mỗi ngày. Dữ liệu ban đầu là các mảnh vụn phân tán, không đồng nhất, thô ráp và nằm rải rác trên các máy chủ CRM, Core Banking và file số liệu độc lập. Nếu không được khai phá, khối dữ liệu khổng lồ này chỉ là chi phí lưu trữ thay vì tài sản sinh lời.
                </p>
                <p>
                  Mô hình <strong>Business Intelligence (BI)</strong> được thiết lập đóng vai trò là xương sống thông tin tổng thể. Nó không chỉ là công cụ vẽ biểu đồ, mà là một chuỗi hành trình có cấu trúc chặt chẽ giúp <strong>Trích xuất (ETL)</strong>, <strong>Hợp nhất (Data Warehouse)</strong>, <strong>Phân tích chuyên sâu (Analysis & Data Mining)</strong> và cuối cùng là <strong>Trực quan hóa (Presentation)</strong>. Nhờ đó, ban điều hành VDCB có thể đưa ra quyết định dựa trên chứng cứ thực nghiệm, chủ động kiểm soát nợ xấu và tối ưu chi phí điều hành toàn hệ thống.
                </p>
              </div>
            </div>

          </div>

          {/* Section 1: 7 Steps of Data Flow (Open, featuring the compact flow diagram) */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-navy uppercase tracking-tighter">
                Quy trình dữ liệu BI
              </h3>
              <p className="text-[14px] text-gray-500 italic">Sơ đồ hóa quy trình xử lý dữ liệu thô tuần tự qua các tầng nghiệp vụ hệ thống BI.</p>
            </div>

            {/* Integrated Image 2: bi_pipeline.png - Compact centered, no frame */}
            <div className="w-full my-6 flex justify-center">
              <img
                src="/pictures/bi_pipeline.png"
                alt="Sơ đồ 7 bước Business Intelligence"
                className="w-full max-h-[320px] object-contain max-w-3xl mx-auto"
              />
            </div>

            <div className="space-y-4">
              {biStepsNew.slice(0, 5).map((step, idx) => (
                <div key={idx} className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-5 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center gap-3 md:w-56 shrink-0">
                    <span className="font-mono text-2xl font-black text-accent-blue">{step.no}</span>
                    <div>
                      <span className="text-[11px] font-mono font-bold tracking-wider text-gray-400 block uppercase">{step.title}</span>
                      <strong className="text-[14px] text-navy uppercase">{step.subtitle}</strong>
                    </div>
                  </div>
                  <div className="text-gray-600 text-[14px] leading-relaxed text-justify md:flex-1">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: 6 Core Activities (Open with Compact Image 4: bi_finance_desk.png underneath) */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-navy uppercase tracking-tighter">
                Hoạt động nghiệp vụ cốt lõi
              </h3>
              <p className="text-[14px] text-gray-500 italic">Các phân mảng hành động kỹ thuật thực thi của hệ thống Business Intelligence.</p>
            </div>

            <div className="space-y-8">
              {/* 6 Activities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {biActivities.slice(0, 4).map((act, idx) => (
                  <div key={idx} className="space-y-2 py-3 border-b border-gray-100 last:border-b-0 md:border-b-0">
                    <div className="flex items-center gap-2 border-b border-gray-100 pb-1.5">
                      <span className="text-[11px] font-mono font-bold text-accent-blue bg-blue-50 px-1.5 py-0.5 rounded">ACT-0{idx + 1}</span>
                      <h4 className="font-bold text-[16px] text-navy">{act.title}</h4>
                    </div>
                    <p className="text-gray-600 text-[14px] leading-relaxed text-justify">
                      {act.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Section 3: 7 Roles/Importance (Open with Compact Image 3: bi_glowing_dashboard.png underneath) */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-navy uppercase tracking-tighter">
                Tầm Quan Trọng Thực Tế & Hiệu Quả Quản Trị
              </h3>
              <p className="text-[14px] text-gray-500 italic">Giá trị thực tiễn và ảnh hưởng của hệ thống BI đối với công tác điều hành tại VDCB.</p>
            </div>

            <div className="space-y-8">
              {/* 7 Roles List */}
              <div className="space-y-2">
                {biRoles.slice(0, 4).map((role, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8 py-5 border-b border-gray-100 last:border-b-0">
                    <div className="md:w-60 shrink-0">
                      <span className="text-[11px] font-mono font-bold text-accent-blue block mb-1">VAI TRÒ THỰC TIỄN 0{idx + 1}</span>
                      <h4 className="font-bold text-[15px] text-navy uppercase">{role.title}</h4>
                    </div>
                    <div className="text-gray-600 text-[14px] leading-relaxed text-justify md:flex-1">
                      {role.desc}
                    </div>
                  </div>
                ))}
              </div>

              {/* Integrated Image 3: bi_glowing_dashboard.png - Compact centered, no frame */}
              <div className="w-full pt-4 flex justify-center">
                <img
                  src="/pictures/bi_glowing_dashboard.png"
                  alt="Giao diện trực quan hóa thông tin thông minh"
                  className="w-full max-h-[350px] object-cover max-w-4xl mx-auto rounded-lg"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Technology Architecture Section */}
      <section className="py-24 bg-navy text-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-14 gap-4">
            <h2 className="text-white text-3xl md:text-4xl font-black uppercase">Technology Architecture</h2>
            <div className="flex gap-2 shrink-0">
              <div className="w-12 h-1.5 bg-banking-gold rounded-full"></div>
              <div className="w-6 h-1.5 bg-accent-blue rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {techCards.map((tech, i) => (
              <div
                key={i}
                className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-all group relative overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <tech.icon className="h-24 w-24" />
                </div>
                <div className="p-3 bg-white/10 rounded-2xl w-fit mb-6 group-hover:bg-banking-gold group-hover:text-navy transition-all">
                  <tech.icon className="h-6 w-6" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2 relative z-10">{tech.title}</h3>
                <p className="text-sm text-blue-200 leading-relaxed italic relative z-10">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 bg-banking-gold relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center relative z-10 text-navy">
          <h2 className="text-2xl md:text-3xl font-black mb-10 uppercase">Tìm hiểu sâu hơn về kiến trúc ?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/architecture"
              className="inline-flex items-center gap-3 px-10 py-4 bg-navy text-white rounded-2xl font-black uppercase text-sm hover:scale-105 transition-transform"
            >
              Chi tiết Kiến trúc Kỹ thuật <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/reports"
              className="inline-flex items-center px-10 py-4 bg-white text-navy rounded-2xl font-black uppercase text-sm hover:scale-105 transition-transform"
            >
              Xem Báo cáo Hệ thống
            </Link>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-navy/5 rounded-full -ml-32 -mt-32"></div>
      </section>
    </div>
  );
};

export default PlatformPage;
