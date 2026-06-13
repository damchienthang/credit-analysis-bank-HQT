import './style.css';
import { motion } from 'framer-motion';
import { Users, Target, Rocket, Calendar, Code, Share2, Mail, Award, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  const team = [
    {
      name: 'Đàm Chiến Thắng',
      role: 'Team Leader / Data Architect',
      desc: 'Chịu trách nhiệm chính thiết kế mô hình dữ liệu Star Schema, quy trình ETL lưu trữ DW và thiết lập kết cấu hạ tầng BI tổng thể.',
      skills: ['SQL Server', 'Python', 'BI Strategy']
    },
    {
      name: 'Nguyễn Hoàng Nam',
      role: 'Frontend Developer / UI Designer',
      desc: 'Thiết kế giao diện trực quan hóa dashboard tài chính React, tối ưu trải nghiệm người dùng điều hành và tùy biến tương tác động.',
      skills: ['React', 'CSS Modul', 'Framer Motion']
    },
    {
      name: 'Lê Minh Triết',
      role: 'Data Analyst',
      desc: 'Thực hiện phân tích khám phá (EDA), xử lý làm sạch dữ liệu nguồn, tối ưu hóa các index và tính toán các chỉ số KPI tín dụng.',
      skills: ['SQL Staging', 'EDA Pandas', 'Statistics']
    }
  ];

  const timeline = [
    { date: 'Tuần 1 - 2', task: 'Thu thập dữ liệu & Phân tích khám phá (EDA)', status: 'done' },
    { date: 'Tuần 3 - 4', task: 'Xây dựng pipeline ETL & Tiền xử lý bằng Python', status: 'done' },
    { date: 'Tuần 5 - 6', task: 'Thiết kế kho dữ liệu Data Warehouse (SQL Server)', status: 'done' },
    { date: 'Tuần 7 - 8', task: 'Xây dựng REST API & Thiết kế React Dashboard', status: 'done' },
    { date: 'Tuần 9', task: 'Kiểm thử toàn diện, tối ưu tốc độ & Triển khai', status: 'active' },
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
            Sứ mệnh Dự án
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Xây dựng nền tảng **LendingClub BI Platform** hiện đại nhằm chuyển đổi các dòng dữ liệu thô phân tán thành tri thức quản trị tập trung, hỗ trợ đắc lực ban điều hành giám sát rủi ro danh mục và ra quyết định tối ưu.
          </motion.p>
        </div>
      </section>

      {/* ── PAGE CONTENT WRAPPER ── */}
      <div className="page-wrap-wide space-y-16">
        
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
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="member-card"
              >
                <div className="member-card-header">
                  <div
                    className="member-avatar-wrapper"
                    style={{ backgroundColor: ['#1652f0', '#0a1f44', '#06b6d4'][i % 3] }}
                  >
                    {member.name.split(' ').map(w => w[0]).slice(-2).join('')}
                  </div>
                </div>
                
                <div className="member-card-body">
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p className="role">{member.role}</p>
                  </div>
                  <p className="member-desc">{member.desc}</p>
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

        {/* ── ROADMAP SECTION ── */}
        <section className="about-section pb-24">
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

      </div>
    </div>
  );
};

export default AboutPage;
