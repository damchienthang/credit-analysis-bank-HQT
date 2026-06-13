import './style.css';
import { motion } from 'framer-motion';
import {
  Users, Target, Rocket, Calendar, Code, Share2, Mail,
  Award, CheckCircle2, ShieldCheck, Zap, Activity, Eye,
  Heart, TrendingUp, Landmark
} from 'lucide-react';

const AboutPage = () => {
  const team = [
    {
      name: 'Đàm Chiến Thắng (NT)',
      role: 'Team Leader / Data Architect',
      tasks: [
        'Tổng hợp báo cáo và phân công công việc.',
        'Mô tả, khảo sát nghiệp vụ, phân tích yêu cầu và thiết kế kiến trúc hệ thống.',
        'Đề xuất mô hình Star Schema phân tích đa chiều, thiết lập môi trường SQL Server.',
        'Xây dựng mã nguồn hệ thống website phân tích tín dụng VDCB.'
      ],
      skills: ['System Design', 'SQL Server', 'React Dashboard']
    },
    {
      name: 'Lã Quang Hợp',
      role: 'Data Miner / BI Developer',
      tasks: [
        'Khảo sát nguồn dữ liệu, thu thập và quản lý tài nguyên dữ liệu.',
        'Phân tích khám phá (EDA) và khai phá dữ liệu tiền xử lý.',
        'Xây dựng dashboard trong Power BI để phục vụ tích hợp trình diễn lên website.',
        'Mô tả nghiệp vụ các chỉ số KPIs cần phân tích và các câu lệnh truy vấn.'
      ],
      skills: ['Data Mining', 'Python/EDA', 'Power BI']
    },
    {
      name: 'Phạm Ngọc Hoàng',
      role: 'Database Designer / ETL Writer',
      tasks: [
        'Thực hiện chuẩn hóa dữ liệu 3NF, thiết kế sơ đồ hệ thống tín dụng khái quát.',
        'Mô tả chi tiết quy trình ETL và vẽ sơ đồ luồng dữ liệu ETL tổng thể.'
      ],
      skills: ['3NF / ERD', 'ETL Flow', 'System Diagram']
    },
    {
      name: 'Vũ Văn Học',
      role: 'ETL Developer / BI Developer',
      tasks: [
        'Thực hiện làm sạch dữ liệu thô, lọc bỏ nhiễu và xử lý giá trị thiếu.',
        'Viết script nạp dữ liệu vào các bảng Dim và Fact (etl_process.sql), chuẩn hóa kiểu dữ liệu.',
        'Xây dựng dashboard trong Power BI để phục vụ tích hợp báo cáo lên hệ thống.'
      ],
      skills: ['T-SQL / ETL', 'Data Cleaning', 'Power BI']
    },
    {
      name: 'Nguyễn Minh Huyền',
      role: 'Data Analyst / SQL Developer',
      tasks: [
        'Thiết kế lược đồ quan hệ ERD cho toàn bộ hệ thống cơ sở dữ liệu.',
        'Mô tả nghiệp vụ các KPIs phân tích rủi ro tín dụng và nợ xấu.',
        'Lập trình các câu truy vấn SQL tính toán chỉ số KPIs (KPI_query.sql).'
      ],
      skills: ['ERD Design', 'KPI Business', 'SQL Query']
    }
  ];

  const timeline = [
    { date: 'Tuần 1 - 2', task: 'Thu thập dữ liệu & Phân tích khám phá (EDA)', status: 'done' },
    { date: 'Tuần 3 - 4', task: 'Xây dựng pipeline ETL & Tiền xử lý bằng Python', status: 'done' },
    { date: 'Tuần 5 - 6', task: 'Thiết kế kho dữ liệu Data Warehouse (SQL Server)', status: 'done' },
    { date: 'Tuần 7 - 8', task: 'Xây dựng REST API & Thiết kế React Dashboard', status: 'done' },
    { date: 'Tuần 9', task: 'Kiểm thử toàn diện, tối ưu tốc độ & Triển khai', status: 'active' },
  ];

  const pillars = [
    {
      title: 'Tầm nhìn (Vision)',
      desc: 'Trở thành hình mẫu giải pháp phân tích Business Intelligence (BI) tiêu chuẩn, định hình phương thức khai phá dữ liệu tín dụng số trong hệ thống tài chính.',
      icon: Eye
    },
    {
      title: 'Sứ mệnh (Mission)',
      desc: 'Chuyển hóa tài nguyên dữ liệu giao dịch khổng lồ thành tri thức định lượng thực tiễn, giúp ngân hàng quản trị rủi ro nợ xấu và tối ưu hóa hiệu quả vận hành.',
      icon: Rocket
    },
    {
      title: 'Giá trị cốt lõi',
      desc: 'Cam kết bảo mật dữ liệu tuyệt đối, duy trì tốc độ truy xuất cực thấp (<50ms), đảm bảo độ tin cậy của báo cáo nghiệp vụ và không ngừng đổi mới.',
      icon: Award
    }
  ];

  const standards = [
    {
      title: 'Toàn vẹn Dữ liệu',
      desc: 'Đảm bảo dữ liệu sạch và nhất quán 100% qua quy trình kiểm soát ràng buộc toàn vẹn và loại bỏ trùng lặp trước khi nạp vào kho dữ liệu Data Warehouse.',
      icon: ShieldCheck
    },
    {
      title: 'Tốc độ tối ưu',
      desc: 'Thiết lập hệ thống 9 Index (trên Fact và staging) giúp tăng tốc độ JOIN đa chiều trên 2.26 triệu dòng dữ liệu, giữ thời gian phản hồi API dưới 30ms.',
      icon: Zap
    },
    {
      title: 'Quyết định số hóa',
      desc: 'Cung cấp các báo cáo KPIs tín dụng trực quan, thay thế hoàn toàn báo cáo Excel thủ công, hỗ trợ ra quyết định điều hành tức thời.',
      icon: Activity
    }
  ];

  return (
    <div className="about-page">
      {/* ── HERO BANNER ── */}
      <section className="about-hero">
        <div className="about-hero-content">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-3 rounded-md bg-cyan/15 text-cyan mb-2"
          >
            <Target className="h-7 w-7" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Sứ mệnh & Tầm nhìn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Nền tảng LendingClub BI Platform được xây dựng nhằm đáp ứng mục tiêu chuyển đổi số quy trình quản trị rủi ro tín dụng của ngân hàng thương mại, đưa các báo cáo định lượng trực quan vào nghiệp vụ điều hành cốt lõi.
          </motion.p>
        </div>
      </section>

      {/* ── PAGE CONTENT WRAPPER ── */}
      <div className="page-wrap-wide space-y-16">

        {/* ── MISSION & VISION CARDS (Pillars) ── */}
        <div className="pillars-grid">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="pillar-card"
            >
              <div className="pillar-icon-box">
                <item.icon className="h-5 w-5" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── TEAM SECTION ── */}
        <section className="about-section">
          <div className="about-section-header">
            <Users className="h-6 w-6" />
            <h2>Đội ngũ phát triển</h2>
          </div>

          <div className="team-grid">
            {team.map((member, i) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
                className="member-card"
              >
                <div
                  className="member-avatar-col"
                  style={{ backgroundColor: ['#0a1f44', '#1652f0', '#06b6d4', '#84cc16', '#eab308'][i % 5] }}
                >
                  {member.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>

                <div className="member-card-body">
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p className="role">{member.role}</p>
                  </div>
                  <ul className="member-tasks-list list-disc">
                    {member.tasks.map((task, idx) => (
                      <li key={idx}>{task}</li>
                    ))}
                  </ul>
                  <div className="member-skills">
                    {member.skills.map(skill => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="member-socials">
                    <Code className="h-4 w-4 hover:text-navy cursor-pointer transition-colors" />
                    <Share2 className="h-4 w-4 hover:text-accent-blue cursor-pointer transition-colors" />
                    <Mail className="h-4 w-4 hover:text-status-risk cursor-pointer transition-colors" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── OPERATIONAL STANDARDS ── */}
        <section className="about-section">
          <div className="about-section-header">
            <ShieldCheck className="h-6 w-6" />
            <h2>Tiêu chuẩn chất lượng hệ thống</h2>
          </div>

          <div className="standards-grid">
            {standards.map((std, idx) => (
              <div key={idx} className="standard-card">
                <h3>
                  <std.icon className="h-4 w-4" />
                  {std.title}
                </h3>
                <p>{std.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ROADMAP SECTION ── */}
        <section className="about-section">
          <div className="about-roadmap">
            <div className="about-roadmap-glow" />
            <div className="about-roadmap-grid">

              <div className="roadmap-left">
                <div className="roadmap-left-header">
                  <div className="roadmap-icon-box">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h2>Lộ trình <br /> hiện thực hóa</h2>
                  <p>
                    Quy trình triển khai 9 tuần khép kín từ khâu khai phá dữ liệu lớn đến phát triển máy chủ phân tích và lập báo cáo quản trị trực quan.
                  </p>
                </div>
                <div className="roadmap-completion">
                  <Award className="h-7 w-7" />
                  <div>
                    <p className="percent">95%</p>
                    <p className="label">Hoàn thành</p>
                  </div>
                </div>
              </div>

              <div className="roadmap-timeline">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    viewport={{ once: true }}
                    className={`timeline-row ${item.status === 'active' ? 'timeline-row-active' : ''}`}
                  >
                    <div className="timeline-date">{item.date}</div>
                    <div className="timeline-task">{item.task}</div>
                    <div className={`timeline-status-icon ${item.status}`}>
                      {item.status === 'done' ? (
                        <CheckCircle2 className="h-5 w-5 text-[#10b981]" />
                      ) : (
                        <Rocket className="h-5 w-5 text-cyan animate-bounce" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── CLOSING STATEMENT & STRATEGIC ORIENTATION ── */}
        <section className="about-section pb-24">
          <div className="about-closing-card">
            <div className="about-closing-glow" />
            <div className="closing-content">
              <div className="closing-header">
                <div className="closing-icon-box">
                  <Landmark className="h-5 w-5" />
                </div>
                <h2>Tầm Nhìn Chiến Lược & Cam Kết Hướng Đến Khách Hàng</h2>
              </div>
              <p className="closing-desc">
                Với tầm nhìn trở thành định chế ngân hàng số đi đầu trong quản trị rủi ro định lượng, VDCB cam kết đặt lợi ích và sự an toàn tài chính của khách hàng làm trọng tâm. Nền tảng phân tích này được phát triển nhằm tối ưu hóa các sản phẩm cho vay, cá nhân hóa lãi suất và thời hạn vay dựa trên điểm tín dụng FICO của từng khách hàng. Trong giai đoạn tiếp theo, chúng tôi định hướng nâng cấp hạ tầng lên kiến trúc xử lý dòng dữ liệu thời gian thực <strong>Real-time Data Streaming</strong> kết hợp mô hình máy học <strong>Machine Learning (Credit Scoring AI)</strong> để tự động hóa 100% quy trình phê duyệt trực tuyến, đảm bảo tính bảo mật tuyệt đối và trải nghiệm giao dịch tức thời cho người sử dụng.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AboutPage;
