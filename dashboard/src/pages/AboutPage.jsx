import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Rocket, Calendar, Code, Share2, Mail, Award, CheckCircle2 } from 'lucide-react';

const AboutPage = () => {
  const team = [
    {
      name: 'Nguyễn Văn A',
      role: 'Team Leader / Data Architect',
      desc: 'Chịu trách nhiệm thiết kế mô hình Star Schema và quy trình ETL tổng thể.',
      skills: ['SQL Server', 'Python', 'BI Strategy']
    },
    {
      name: 'Trần Thị B',
      role: 'Frontend Developer / UI Designer',
      desc: 'Phát triển giao diện React Dashboard và trực quan hóa dữ liệu bằng Recharts.',
      skills: ['React', 'Tailwind', 'Framer Motion']
    },
    {
      name: 'Lê Văn C',
      role: 'Data Analyst',
      desc: 'Thực hiện EDA, xử lý dữ liệu sạch và tính toán các chỉ số KPI rủi ro.',
      skills: ['Pandas', 'Matplotlib', 'Statistics']
    }
  ];

  const timeline = [
    { date: 'Tuần 1-2', task: 'Thu thập & Khám phá dữ liệu (EDA)', status: 'done' },
    { date: 'Tuần 3-4', task: 'Xử lý ETL & Làm sạch bằng Python', status: 'done' },
    { date: 'Tuần 5-6', task: 'Thiết kế Data Warehouse (SQL Server)', status: 'done' },
    { date: 'Tuần 7-8', task: 'Phát triển BI Dashboard (React)', status: 'done' },
    { date: 'Tuần 9', task: 'Kiểm thử & Triển khai hệ thống', status: 'active' },
  ];

  return (
    <div className="p-4 md:p-12 max-w-6xl mx-auto space-y-24">
      {/* Introduction */}
      <section className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex p-4 rounded-3xl bg-banking-gold/10 text-banking-gold mb-4"
        >
          <Target className="h-10 w-10" />
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-black text-navy uppercase tracking-tighter">Sứ mệnh Dự án</h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
          Chúng tôi xây dựng <strong>LendingClub BI Platform</strong> với mục tiêu chuyển đổi dữ liệu thô thành tri thức kinh doanh, 
          giúp các tổ chức tài chính kiểm soát rủi ro và tối ưu hóa dòng tiền trong kỷ nguyên số.
        </p>
      </section>

      {/* Team Section */}
      <section className="space-y-12">
        <div className="flex items-center gap-4">
          <Users className="h-8 w-8 text-accent-blue" />
          <h2 className="text-3xl font-bold text-navy">Đội ngũ thực hiện</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2.5rem] overflow-hidden enterprise-shadow border border-gray-100 group"
            >
              <div className="h-32 bg-navy relative">
                <div className="absolute -bottom-10 left-8 h-20 w-20 rounded-2xl bg-gray-200 border-4 border-white overflow-hidden shadow-lg">
                   <img src={`https://i.pravatar.cc/150?u=${member.name}`} alt={member.name} />
                </div>
              </div>
              <div className="pt-14 p-8 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-navy">{member.name}</h3>
                  <p className="text-xs font-bold text-accent-blue uppercase tracking-widest">{member.role}</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{member.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map(skill => (
                    <span key={skill} className="text-[10px] font-bold px-2 py-1 bg-gray-50 text-gray-400 rounded-md uppercase border border-gray-100">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="pt-4 flex gap-4 text-gray-400">
                  <Code className="h-5 w-5 hover:text-navy cursor-pointer transition-colors" />
                  <Share2 className="h-5 w-5 hover:text-accent-blue cursor-pointer transition-colors" />
                  <Mail className="h-5 w-5 hover:text-status-risk cursor-pointer transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-navy rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue rounded-full blur-[100px] opacity-20"></div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3 space-y-6">
            <div className="inline-flex p-3 rounded-2xl bg-white/10 text-banking-gold">
              <Calendar className="h-8 w-8" />
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Lộ trình <br /> Phát triển</h2>
            <p className="text-blue-100 font-medium">
              Dự án được thực hiện trong vòng 9 tuần với sự tập trung cao độ vào tính chính xác của dữ liệu và trải nghiệm người dùng.
            </p>
            <div className="pt-8">
               <div className="flex items-center gap-4 text-banking-gold font-bold">
                 <Award className="h-10 w-10" />
                 <div>
                   <p className="text-2xl leading-none">95%</p>
                   <p className="text-xs uppercase tracking-widest text-white/60">Hoàn thành</p>
                 </div>
               </div>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-4">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-6 p-6 rounded-3xl border ${
                  item.status === 'done' ? 'bg-white/5 border-white/10 opacity-60' : 'bg-white/10 border-white/20'
                }`}
              >
                <div className="text-sm font-black text-banking-gold w-20">{item.date}</div>
                <div className="flex-grow font-bold text-lg">{item.task}</div>
                {item.status === 'done' ? (
                  <CheckCircle2 className="h-6 w-6 text-status-good" />
                ) : (
                  <Rocket className="h-6 w-6 text-banking-gold animate-bounce" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
