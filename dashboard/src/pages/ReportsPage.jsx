import { FileText, Lightbulb, BarChart, CheckSquare, AlertCircle, TrendingDown, Target } from 'lucide-react';

const insights = [
  {
    title: 'Tập trung rủi ro tại Grade E–G',
    desc: 'Khoản vay Grade E và F có tỷ lệ NPL cao gấp 3 lần mức trung bình toàn danh mục. Đặc biệt mục đích vay "Small Business" chiếm tỷ trọng nợ xấu không cân xứng.',
    icon: AlertCircle,
    level: 'High',
  },
  {
    title: 'Hiệu quả thu hồi nợ có tài sản đảm bảo',
    desc: 'Tỷ lệ thu hồi nợ đạt 58.3% cho khoản vay có tài sản đảm bảo, cao hơn 15 điểm phần trăm so với vay tín chấp thuần túy.',
    icon: TrendingDown,
    level: 'Positive',
  },
  {
    title: 'Phân bổ địa lý tập trung',
    desc: 'California và New York chiếm 35% tổng dư nợ và duy trì tỷ lệ thanh toán đúng hạn ổn định nhất — thị trường lõi có chất lượng tín dụng tốt.',
    icon: Target,
    level: 'Info',
  },
];

const levelStyle = {
  High:     { badge: 'badge badge-danger',  label: 'Rủi ro cao'   },
  Positive: { badge: 'badge badge-success', label: 'Tích cực'     },
  Info:     { badge: 'badge badge-accent',  label: 'Thông tin'    },
};

const ReportsPage = () => (
  <div className="page-wrap">

    {/* ── Report header ──────────────────────────────────────────────── */}
    <div style={{ borderBottom: '2px solid #0a1f44', paddingBottom: 16, marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0a1f44', letterSpacing: '-0.02em', marginBottom: 4 }}>
            Báo cáo Chiến lược BI
          </h1>
          <p className="label" style={{ color: '#8e99a8' }}>Phân tích danh mục tín dụng — LendingClub 2007–2018</p>
        </div>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        gap: 24, marginTop: 16, fontSize: 11
      }}>
        {[
          { k: 'MÃ BÁO CÁO',   v: 'LC-2026-05-11'       },
          { k: 'NGÀY LẬP',     v: '11/05/2026'           },
          { k: 'PHÂN PHỐI',    v: 'Ban Quản trị Rủi ro'  },
          { k: 'BẢO MẬT',      v: 'Internal Only'        },
        ].map(({ k, v }) => (
          <div key={k}>
            <span style={{ color: '#8e99a8', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10 }}>
              {k}
            </span>
            <p style={{ color: '#0a1f44', fontWeight: 700, marginTop: 2 }}>{v}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ── Executive summary ──────────────────────────────────────────── */}
    <div style={{ marginBottom: 24 }}>
      <div className="section-head">
        <FileText style={{ width: 14, height: 14, color: '#1652f0' }} />
        <span className="section-title">Tóm tắt điều hành (Executive Summary)</span>
      </div>
      <div className="card">
        <div className="card-body">
          <p style={{ fontSize: 13, color: '#2d3748', lineHeight: 1.7, marginBottom: 12 }}>
            Báo cáo này trình bày kết quả phân tích trên bộ dữ liệu <strong>Lending Club (2007–2018)</strong> với
            quy mô <strong>2,260,701</strong> khoản vay. Hệ thống BI đã xác định được các chỉ số rủi ro then chốt
            và đánh giá hiệu quả vận hành danh mục tín dụng theo 5 chiều phân tích (hạng tín dụng, địa lý,
            mục đích vay, kỳ hạn, thu nhập khách hàng).
          </p>
          <p style={{ fontSize: 13, color: '#2d3748', lineHeight: 1.7 }}>
            Mặc dù quy mô giải ngân tăng trưởng mạnh đạt mức <strong>10.5 tỷ USD</strong> vào năm 2018,
            tỷ lệ nợ xấu (NPL) duy trì ở mức <strong>14.2%</strong>. Tối ưu hóa ETL giảm 70% thời gian
            xử lý, cho phép truy vấn báo cáo trong vòng dưới 1 giây.
          </p>
        </div>
      </div>
    </div>

    {/* ── Key insights ───────────────────────────────────────────────── */}
    <div style={{ marginBottom: 24 }}>
      <div className="section-head">
        <Lightbulb style={{ width: 14, height: 14, color: '#06b6d4' }} />
        <span className="section-title">Phân tích chuyên sâu (Key Insights)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid #dde1e8', borderRadius: 4, overflow: 'hidden' }}>
        {insights.map((insight, i) => {
          const style = levelStyle[insight.level];
          return (
            <div key={i} style={{
              display: 'flex', gap: 16, padding: '16px 20px',
              borderBottom: i < insights.length - 1 ? '1px solid #eef0f4' : 'none',
              background: '#fff', alignItems: 'flex-start'
            }}>
              <div style={{
                width: 32, height: 32, flexShrink: 0, borderRadius: 3,
                background: insight.level === 'High' ? '#fee2e2' : insight.level === 'Positive' ? '#dcfce7' : '#eff6ff',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <insight.icon style={{
                  width: 16, height: 16,
                  color: insight.level === 'High' ? '#b91c1c' : insight.level === 'Positive' ? '#166534' : '#1652f0'
                }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0a1f44' }}>{insight.title}</span>
                  <span className={style.badge}>{style.label}</span>
                </div>
                <p style={{ fontSize: 12, color: '#5e6a7a', lineHeight: 1.6 }}>{insight.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    {/* ── Performance + Actions ───────────────────────────────────────── */}
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>

      {/* Perf stats */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BarChart style={{ width: 14, height: 14, color: '#1652f0' }} />
            <span className="section-title">Hiệu suất hệ thống</span>
          </div>
        </div>
        <table className="data-table">
          <tbody>
            {[
              { k: 'Dữ liệu xử lý',     v: '2,260,701 dòng',     hi: false },
              { k: 'Tối ưu bộ nhớ',     v: '70% Optimization',   hi: true  },
              { k: 'Tốc độ truy vấn',   v: '< 1s / report',      hi: false },
              { k: 'Cột giữ lại (ETL)', v: '33 / 151 cột gốc',   hi: false },
              { k: 'Thời gian dữ liệu', v: '2007 – 2018',         hi: false },
            ].map(({ k, v, hi }) => (
              <tr key={k}>
                <td style={{ color: '#8e99a8' }}>{k}</td>
                <td style={{ textAlign: 'right', fontWeight: 700, color: hi ? '#166534' : '#0a1f44' }}
                  className="mono">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Actions */}
      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckSquare style={{ width: 14, height: 14, color: '#166534' }} />
            <span className="section-title">Khuyến nghị (Action Items)</span>
          </div>
        </div>
        <div className="card-body">
          <ol style={{ paddingLeft: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { level: 'High',     text: 'Siết chặt điều kiện cho vay với Grade E/F — áp dụng DTI tối đa 25%.' },
              { level: 'Medium',   text: 'Tăng hạn mức cho nhóm Home Ownership tại CA/NY — tỷ lệ thu hồi tốt.' },
              { level: 'Low',      text: 'Triển khai mô hình AI Early Warning dự báo NPL theo quý.' },
            ].map(({ level, text }, i) => {
              const c = level === 'High' ? '#b91c1c' : level === 'Medium' ? '#92400e' : '#1652f0';
              const bg = level === 'High' ? '#fee2e2' : level === 'Medium' ? '#fef3c7' : '#eff6ff';
              return (
                <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{
                    fontSize: 9, fontWeight: 800, background: bg, color: c,
                    padding: '2px 6px', borderRadius: 2, flexShrink: 0, marginTop: 2,
                    textTransform: 'uppercase', letterSpacing: '0.06em'
                  }}>{level}</span>
                  <p style={{ fontSize: 12, color: '#5e6a7a', lineHeight: 1.5, margin: 0 }}>{text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  </div>
);

export default ReportsPage;
