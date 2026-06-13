import './style.css';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Database,
  Filter,
  Layers,
  Landmark,
  LineChart,
  Search,
  ShieldCheck,
  Table2,
  TrendingUp,
  Workflow,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const portfolioStats = [
  { label: 'Bản ghi khoản vay', value: '2.26M+', icon: Database },
  { label: 'Thuộc tính sau ETL', value: '33', icon: Layers },
  { label: 'Tỷ lệ nợ xấu NPL', value: '14.2%', icon: ShieldCheck },
  { label: 'Giai đoạn dữ liệu', value: '2007-2018', icon: LineChart },
];

const capabilityCards = [
  {
    title: 'Phân tích rủi ro tín dụng',
    desc: 'Theo dõi NPL, grade, FICO, DTI và mục đích vay để nhận diện nhóm khoản vay cần kiểm soát.',
    icon: ShieldCheck,
  },
  {
    title: 'Kho dữ liệu chuẩn hóa',
    desc: 'Luồng ETL tinh gọn dữ liệu LendingClub từ 151 cột gốc còn 33 thuộc tính có giá trị phân tích.',
    icon: Workflow,
  },
  {
    title: 'Dashboard điều hành',
    desc: 'Tập trung KPI, xu hướng giải ngân, thu hồi nợ và phân bổ địa lý trong một giao diện BI thống nhất.',
    icon: BarChart3,
  },
];

const flowSteps = [
  ['01', 'Chuẩn hóa dữ liệu', 'Làm sạch dữ liệu vay, chuẩn hóa kiểu dữ liệu và tạo chiều thời gian.'],
  ['02', 'Mô hình hóa BI', 'Tổ chức dữ liệu theo fact và dimension để phục vụ truy vấn phân tích.'],
  ['03', 'Ra quyết định', 'Đưa KPI, cảnh báo và insight vào dashboard điều hành rủi ro.'],
];

const heroBars = [34, 48, 43, 58, 52, 69, 61, 76, 66, 81, 72, 88];

const attributes = [
  { stt: 1, name: 'loan_id', group: 'Khoản vay', type: 'INT', desc: 'Mã định danh duy nhất của khoản vay.' },
  { stt: 2, name: 'loan_amnt', group: 'Khoản vay', type: 'FLOAT', desc: 'Số tiền vay được phê duyệt.' },
  { stt: 3, name: 'term', group: 'Khoản vay', type: 'VARCHAR', desc: 'Kỳ hạn vay 36 hoặc 60 tháng.' },
  { stt: 4, name: 'int_rate', group: 'Khoản vay', type: 'FLOAT', desc: 'Lãi suất áp dụng cho khoản vay.' },
  { stt: 5, name: 'installment', group: 'Khoản vay', type: 'FLOAT', desc: 'Khoản thanh toán định kỳ hàng tháng.' },
  { stt: 6, name: 'grade', group: 'Tín dụng', type: 'VARCHAR', desc: 'Hạng tín dụng A-G, phản ánh mức độ rủi ro.' },
  { stt: 7, name: 'loan_status', group: 'Tín dụng', type: 'VARCHAR', desc: 'Trạng thái hiện tại của khoản vay.' },
  { stt: 8, name: 'emp_length', group: 'Khách hàng', type: 'INT', desc: 'Thâm niên làm việc đã được chuẩn hóa.' },
  { stt: 9, name: 'home_ownership', group: 'Khách hàng', type: 'VARCHAR', desc: 'Tình trạng sở hữu nhà của khách hàng.' },
  { stt: 10, name: 'annual_inc', group: 'Khách hàng', type: 'FLOAT', desc: 'Tổng thu nhập hằng năm.' },
  { stt: 11, name: 'addr_state', group: 'Khách hàng', type: 'VARCHAR', desc: 'Tiểu bang cư trú của khách hàng.' },
  { stt: 12, name: 'dti', group: 'Tín dụng', type: 'FLOAT', desc: 'Tỷ lệ nợ trên thu nhập.' },
  { stt: 13, name: 'fico_range_low', group: 'Tín dụng', type: 'INT', desc: 'Cận dưới điểm FICO.' },
  { stt: 14, name: 'fico_range_high', group: 'Tín dụng', type: 'INT', desc: 'Cận trên điểm FICO.' },
  { stt: 15, name: 'delinq_2yrs', group: 'Tín dụng', type: 'INT', desc: 'Số lần quá hạn trong 2 năm gần nhất.' },
  { stt: 16, name: 'pub_rec', group: 'Tín dụng', type: 'INT', desc: 'Số hồ sơ công khai tiêu cực.' },
  { stt: 17, name: 'total_acc', group: 'Tín dụng', type: 'INT', desc: 'Tổng số hạn mức tín dụng.' },
  { stt: 18, name: 'revol_bal', group: 'Tín dụng', type: 'FLOAT', desc: 'Dư nợ tín dụng quay vòng.' },
  { stt: 19, name: 'revol_util', group: 'Tín dụng', type: 'FLOAT', desc: 'Tỷ lệ sử dụng tín dụng quay vòng.' },
  { stt: 20, name: 'mort_acc', group: 'Tín dụng', type: 'INT', desc: 'Số tài khoản vay thế chấp.' },
  { stt: 21, name: 'total_bc_limit', group: 'Tín dụng', type: 'FLOAT', desc: 'Tổng hạn mức thẻ ngân hàng.' },
  { stt: 22, name: 'max_bal_bc', group: 'Tín dụng', type: 'FLOAT', desc: 'Dư nợ cao nhất trên một tài khoản.' },
  { stt: 23, name: 'il_util', group: 'Tín dụng', type: 'FLOAT', desc: 'Tỷ lệ sử dụng hạn mức vay trả góp.' },
  { stt: 24, name: 'all_util', group: 'Tín dụng', type: 'FLOAT', desc: 'Tỷ lệ sử dụng trên tất cả tài khoản.' },
  { stt: 25, name: 'issue_d', group: 'Thời gian', type: 'DATE', desc: 'Ngày giải ngân khoản vay.' },
  { stt: 26, name: 'issue_year', group: 'Thời gian', type: 'INT', desc: 'Năm giải ngân được tách từ issue_d.' },
  { stt: 27, name: 'issue_month', group: 'Thời gian', type: 'INT', desc: 'Tháng giải ngân được tách từ issue_d.' },
  { stt: 28, name: 'issue_quarter', group: 'Thời gian', type: 'INT', desc: 'Quý giải ngân được tách từ issue_d.' },
  { stt: 29, name: 'earliest_cr_line', group: 'Thời gian', type: 'DATE', desc: 'Ngày mở hạn mức tín dụng đầu tiên.' },
  { stt: 30, name: 'last_pymnt_d', group: 'Thời gian', type: 'DATE', desc: 'Ngày thanh toán gần nhất.' },
  { stt: 31, name: 'out_prncp', group: 'Tài chính', type: 'FLOAT', desc: 'Dư nợ gốc còn lại.' },
  { stt: 32, name: 'total_pymnt', group: 'Tài chính', type: 'FLOAT', desc: 'Tổng tiền đã thu hồi.' },
  { stt: 33, name: 'recoveries', group: 'Tài chính', type: 'FLOAT', desc: 'Số tiền thu hồi sau khi vỡ nợ.' },
];

const groupColors = {
  'Khoản vay': 'badge-accent',
  'Khách hàng': 'badge-neutral',
  'Tín dụng': 'badge-warning',
  'Thời gian': 'badge-success',
  'Tài chính': 'badge-danger',
};

const typeColors = {
  INT: 'badge-success',
  FLOAT: 'badge-accent',
  VARCHAR: 'badge-warning',
  DATE: 'badge-neutral',
};

const edaCharts = [
  { file: 'loan_status_bar.png', title: 'Trạng thái khoản vay', insight: 'Fully Paid chiếm tỷ trọng lớn, nhưng Charged Off vẫn đủ cao để cần theo dõi NPL chặt chẽ.' },
  { file: 'grade_bar.png', title: 'Hạng tín dụng', insight: 'Grade B và C chiếm ưu thế; nhóm E-G nhỏ hơn nhưng có đóng góp rủi ro đáng kể.' },
  { file: 'issue_year_line.png', title: 'Giải ngân theo năm', insight: 'Danh mục tăng mạnh trong giai đoạn 2012-2015, sau đó ổn định ở quy mô lớn hơn.' },
  { file: 'loan_amnt_hist.png', title: 'Số tiền vay', insight: 'Người vay tập trung ở các mức tiền tròn như 10K và 20K, tạo các đỉnh phân phối rõ.' },
  { file: 'int_rate_hist.png', title: 'Lãi suất', insight: 'Lãi suất tập trung trong vùng 7-15%, phần đuôi phải phản ánh nhóm rủi ro cao.' },
  { file: 'purpose_bar.png', title: 'Mục đích vay', insight: 'Debt consolidation là mục đích chính, phù hợp với hành vi gom nợ của khách hàng.' },
];

function HeroPreview() {
  return (
    <div className="hero-preview card">
      <div className="card-header">
        <div>
          <p className="section-title">Credit Risk Console</p>
          <p className="label" style={{ marginTop: 2 }}>Portfolio health overview</p>
        </div>
      </div>
      <div className="card-body">
        <div className="hero-kpi-row">
          <div>
            <p className="label">Total Loans</p>
            <div className="hero-kpi-val-row">
              <span className="value-lg">2.26M</span>
              <span className="trend-badge trend-badge-up">▲ 4.8%</span>
            </div>
          </div>
          <div>
            <p className="label">NPL Ratio</p>
            <div className="hero-kpi-val-row">
              <span className="value-lg text-status-risk">14.2%</span>
              <span className="trend-badge trend-badge-down">▼ 1.2%</span>
            </div>
          </div>
        </div>

        <div className="hero-bars" aria-label="Biểu đồ tăng trưởng giải ngân">
          {heroBars.map((height, index) => (
            <motion.span
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ delay: 0.08 * index, duration: 0.45 }}
              className={index > 8 ? 'hero-bar hero-bar-active' : 'hero-bar'}
            />
          ))}
        </div>

        <div className="hero-risk-table">
          {[
            ['Grade A-C', 'Low', '9.8%', 'badge-success', 'down', '-0.4%'],
            ['Grade D', 'Medium', '13.6%', 'badge-warning', 'up', '+0.8%'],
            ['Grade E-G', 'High', '18.4%', 'badge-danger', 'up', '+2.3%'],
          ].map(([grade, risk, npl, badge, trend, change]) => (
            <div key={grade} className="hero-risk-row">
              <span className="mono">{grade}</span>
              <span className={`badge ${badge}`}>{risk}</span>
              <div className="hero-risk-trend">
                <strong>{npl}</strong>
                <span className={`trend-tag ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                  {trend === 'up' ? '▲' : '▼'} {change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandingSectionHeader({ icon: Icon, eyebrow, title, desc }) {
  return (
    <div className="landing-section-header">
      <div className="landing-section-kicker">
        <Icon size={15} />
        <span>{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}

function DatasetSection() {
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('Tất cả');
  const groups = ['Tất cả', 'Khoản vay', 'Khách hàng', 'Tín dụng', 'Thời gian', 'Tài chính'];

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    return attributes.filter((attribute) => {
      const matchGroup = activeGroup === 'Tất cả' || attribute.group === activeGroup;
      const matchSearch =
        !keyword ||
        attribute.name.toLowerCase().includes(keyword) ||
        attribute.desc.toLowerCase().includes(keyword);
      return matchGroup && matchSearch;
    });
  }, [activeGroup, search]);

  return (
    <section className="landing-section">
      <div className="page-wrap">
        <LandingSectionHeader
          icon={Table2}
          eyebrow="Data dictionary"
          title="Bộ thuộc tính phân tích sau ETL"
          desc="Các biến được giữ lại tập trung vào khoản vay, khách hàng, tín dụng, thời gian và tài chính."
        />

        <div className="dataset-toolbar">
          <label className="search-field">
            <Search size={15} />
            <input
              type="text"
              placeholder="Tìm thuộc tính..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
          <div className="filter-group" aria-label="Lọc nhóm thuộc tính">
            <Filter size={14} color="#8e99a8" />
            {groups.map((group) => (
              <button
                key={group}
                type="button"
                className={activeGroup === group ? 'filter-pill filter-pill-active' : 'filter-pill'}
                onClick={() => setActiveGroup(group)}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        <div className="card dataset-card">
          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tên thuộc tính</th>
                  <th>Nhóm</th>
                  <th>Kiểu dữ liệu</th>
                  <th>Mô tả</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((attribute) => (
                    <motion.tr
                      key={attribute.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <td className="mono">{attribute.stt}</td>
                      <td><code>{attribute.name}</code></td>
                      <td><span className={`badge ${groupColors[attribute.group]}`}>{attribute.group}</span></td>
                      <td><span className={`badge ${typeColors[attribute.type]}`}>{attribute.type}</span></td>
                      <td>{attribute.desc}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          <div className="dataset-footer">
            <span className="label">Hiển thị {filtered.length} / {attributes.length} thuộc tính</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function EDASection() {
  const [active, setActive] = useState(null);

  return (
    <section className="landing-section landing-section-final">
      <div className="page-wrap">
        <LandingSectionHeader
          icon={TrendingUp}
          eyebrow="Exploratory data analysis"
          title="Các phân phối quan trọng của danh mục vay"
          desc="Biểu đồ EDA giúp kiểm tra chất lượng dữ liệu và nhận diện các tín hiệu rủi ro trước khi đi vào dashboard."
        />

        <div className="eda-grid">
          {edaCharts.map((chart, index) => (
            <motion.article
              key={chart.file}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 3) * 0.06 }}
              viewport={{ once: true }}
              className="card eda-card"
            >
              <div className="eda-chart-frame">
                <img src={`/charts/${chart.file}`} alt={chart.title} loading="lazy" />
              </div>
              <div className="eda-card-body">
                <h3>{chart.title}</h3>
                <button
                  type="button"
                  className="insight-toggle"
                  onClick={() => setActive(active === index ? null : index)}
                >
                  {active === index ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {active === index ? 'Ẩn nhận xét' : 'Xem nhận xét'}
                </button>
                <AnimatePresence>
                  {active === index && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="eda-insight"
                    >
                      {chart.insight}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

const LandingPage = () => (
  <div className="landing-page">
    <section className="landing-hero">
      <div className="hero-bg-icon-wrapper">
        <Landmark className="hero-bg-bank-icon" />
      </div>
      <div className="page-wrap-wide landing-hero-grid">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="landing-hero-copy"
        >
          <span className="eyebrow">Credit Risk Intelligence Platform</span>
          <h1>Hệ thống phân tích và quản trị tín dụng</h1>
          <p>
            Nền tảng Business Intelligence cho dữ liệu LendingClub, hỗ trợ theo dõi danh mục vay,
            đánh giá rủi ro nợ xấu và trình bày insight theo chuẩn dashboard điều hành.
          </p>
          <div className="hero-actions">
            <Link to="/dashboard" className="btn btn-primary">
              <BarChart3 size={15} />
              Xem Dashboard
              <ArrowRight size={14} />
            </Link>
            <Link to="/architecture" className="btn btn-secondary">
              <Layers size={15} />
              Kiến trúc dữ liệu
            </Link>
          </div>

          <div className="hero-stat-grid">
            {portfolioStats.map((stat) => (
              <div key={stat.label} className="hero-stat-card">
                <stat.icon size={16} />
                <span>{stat.label}</span>
                <strong>{stat.value}</strong>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <HeroPreview />
        </motion.div>
      </div>
    </section>

    <section className="landing-section landing-continuity">
      <div className="page-wrap">
        <LandingSectionHeader
          icon={BookOpen}
          eyebrow="Operating model"
          title="Từ dữ liệu thô đến quyết định điều hành"
          desc="Trang được tổ chức như một luồng phân tích: chuẩn hóa dữ liệu, mô hình hóa BI, sau đó trình bày insight phục vụ quản trị rủi ro."
        />

        <div className="flow-strip">
          {flowSteps.map(([step, title, desc]) => (
            <article key={step} className="flow-step">
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>

        <div className="capability-grid">
          {capabilityCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="card capability-card"
            >
              <div className="capability-icon">
                <card.icon size={18} />
              </div>
              <h2>{card.title}</h2>
              <p>{card.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="landing-section data-story">
      <div className="page-wrap data-story-grid">
        <div>
          <span className="eyebrow">Nguồn dữ liệu</span>
          <h2>Ứng dụng Big Data vào quản trị rủi ro tín dụng</h2>
          <p>
            Bộ dữ liệu được chuẩn hóa từ LendingClub, bao phủ nhiều chu kỳ tín dụng và cho phép
            phân tích theo khoản vay, khách hàng, thời gian, địa lý và hiệu quả thu hồi.
          </p>
        </div>
        <a
          href="https://www.kaggle.com/datasets/wordsforthewise/lending-club"
          target="_blank"
          rel="noopener noreferrer"
          className="source-card"
        >
          <img src="/pictures/kaggle.png" alt="LendingClub dataset trên Kaggle" />
          <div>
            <span className="label">Dataset source</span>
            <strong>LendingClub Loan Data</strong>
            <p>2.26M+ khoản vay, dữ liệu lịch sử 2007-2018.</p>
          </div>
        </a>
      </div>
    </section>

    <DatasetSection />
    <EDASection />
  </div>
);

export default LandingPage;

