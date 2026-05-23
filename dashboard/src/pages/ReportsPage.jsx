import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FileText, TrendingUp,
  CheckCircle2, ChevronRight,
  BarChart2, Shield, Target, Layers,
  Printer,
} from 'lucide-react';


// ── Design tokens (giữ nguyên hệ màu hiện tại) ───────────────────────────────
const C = {
  navy: '#0a1f44',
  mid: '#1a3a6e',
  accent: '#1652f0',
  cyan: '#06b6d4',
  danger: '#b91c1c',
  warning: '#92400e',
  success: '#166534',
  gray: '#5e6a7a',
  gray3: '#8e99a8',
  border: '#dde1e8',
  bg: '#f7f8fa',
  white: '#ffffff',
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const Divider = ({ margin = '24px 0' }) => (
  <div style={{ height: 1, background: C.border, margin }} />
);

const SectionLabel = ({ icon: Icon, text, color = C.accent }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
    <Icon style={{ width: 13, height: 13, color, flexShrink: 0 }} />
    <span style={{
      fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
      textTransform: 'uppercase', color: C.gray3,
    }}>{text}</span>
  </div>
);

// Chỉ số inline — số nổi bật trong câu văn
const Num = ({ children, color = C.navy }) => (
  <strong style={{ fontFamily: "'JetBrains Mono', monospace", color, fontWeight: 700 }}>
    {children}
  </strong>
);

// Tag mức độ ưu tiên
const PriorityTag = ({ level }) => {
  const cfg = {
    'Khẩn cấp': { bg: '#fee2e2', color: C.danger },
    'Quan trọng': { bg: '#fef3c7', color: C.warning },
    'Theo dõi': { bg: '#eff6ff', color: C.accent },
  }[level] || { bg: C.bg, color: C.gray };
  return (
    <span style={{
      fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase',
      padding: '2px 7px', borderRadius: 2, background: cfg.bg, color: cfg.color,
      flexShrink: 0,
    }}>{level}</span>
  );
};

// Metric inline nhỏ
const StatChip = ({ label, value, color = C.navy }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '10px 16px', border: `1px solid ${C.border}`, borderRadius: 3,
    background: C.white, minWidth: 100,
  }}>
    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 18, fontWeight: 700, color, lineHeight: 1 }}>
      {value}
    </span>
    <span style={{ fontSize: 9.5, color: C.gray3, fontWeight: 600, marginTop: 5, textAlign: 'center', letterSpacing: '0.05em' }}>
      {label}
    </span>
  </div>
);


// ── Câu chuyện dữ liệu — từng đoạn có ngữ cảnh ──────────────────────────────
const findings = [
  {
    id: '01',
    icon: Layers,
    iconColor: C.accent,
    title: 'Toàn cảnh danh mục — Quy mô lớn, chất lượng phân hóa',
    paragraphs: [
      <>
        Trong giai đoạn 2007–2018, LendingClub đã giải ngân tổng cộng{' '}
        <Num>$33,9 tỷ</Num> cho <Num>2,257,084</Num> khoản vay.
        Tăng trưởng mạnh nhất diễn ra giai đoạn 2012–2015, khi giải ngân tăng
        từ <Num>$718M</Num> lên <Num>$6,4B</Num> — tức gấp <Num color={C.danger}>9 lần</Num> trong ba năm.
      </>,
      <>
        Đến thời điểm phân tích, dư nợ hiện tại còn <Num>$949M</Num> —
        tương đương <Num>2,8%</Num> tổng giải ngân, cho thấy danh mục đang ở
        cuối vòng đời. Tỷ lệ hoàn trả đạt <Num color={C.success}>80,3%</Num>{' '}
        ($27,3B / $33,9B) — tín hiệu thu hồi vốn tích cực nhưng vẫn còn{' '}
        <Num color={C.danger}>$4,2B nợ xấu</Num> chưa được xử lý triệt để.
      </>,
    ],
    stats: [
      { label: 'Tổng giải ngân', value: '$33,9B', color: C.navy },
      { label: 'Dư nợ hiện tại', value: '$949M', color: C.gray },
      { label: 'Đã thu hồi', value: '$27,3B', color: C.success },
      { label: 'Nợ xấu', value: '$4,2B', color: C.danger },
    ],
  },
  {
    id: '02',
    icon: TrendingUp,
    iconColor: C.warning,
    title: 'Rủi ro tập trung — Hạng thấp và mục đích đảo nợ',
    paragraphs: [
      <>
        Phân tích theo hạng tín dụng cho thấy rủi ro tăng theo cấp số nhân:{' '}
        tỷ lệ nợ xấu của Grade G (<Num color={C.danger}>37,7%</Num>) cao hơn{' '}
        <Num color={C.danger}>12 lần</Num> so với Grade A ({' '}
        <Num color={C.success}>3,1%</Num>). Đáng chú ý, dù lãi suất của
        Grade G đã được định giá rủi ro ở mức <Num>28%</Num>/năm,
        tỷ lệ thu hồi nợ xấu vẫn chỉ đạt <Num color={C.danger}>9,7%</Num> —
        nghĩa là với mỗi đồng nợ xấu, ngân hàng chỉ thu lại được chưa đến{' '}
        <Num color={C.danger}>10 xu</Num>.
      </>,
      <>
        Về cơ cấu mục đích vay, <Num color={C.warning}>56,6%</Num> số khoản (1,276,708 khoản)
        nhằm mục đích <em>đảo nợ</em> (debt consolidation) —
        nhóm khách hàng vay chỗ này để trả chỗ kia.
        Khi thu nhập giảm dù chỉ <Num>10–15%</Num>,
        toàn bộ hệ thống nợ của nhóm này có nguy cơ sụp đổ theo hiệu ứng domino.
        Đây là rủi ro dây chuyền nghiêm trọng nhất của danh mục.
      </>,
    ],
    stats: [
      { label: 'NPL Grade A', value: '3,1%', color: C.success },
      { label: 'NPL Grade G', value: '37,7%', color: C.danger },
      { label: 'Đảo nợ', value: '56,6%', color: C.warning },
      { label: 'Thu hồi NPL', value: '< 10%', color: C.danger },
    ],
  },
  {
    id: '03',
    icon: Target,
    iconColor: C.danger,
    title: 'Rủi ro địa lý — Vùng South là điểm nóng',
    paragraphs: [
      <>
        Theo chiều phân tích địa lý, vùng <Num>South</Num> dẫn đầu cả về
        quy mô (<Num>810,403</Num> khoản) lẫn mức độ rủi ro:
        <Num color={C.danger}> 4/8</Num> bang có NPL cao nhất toàn quốc
        đều thuộc South — Louisiana (<Num color={C.danger}>14,98%</Num>),
        Alabama (<Num color={C.danger}>14,77%</Num>),
        Arkansas (<Num color={C.danger}>14,77%</Num>) và
        Oklahoma (<Num color={C.danger}>14,43%</Num>).
      </>,
      <>
        Điều đáng lo ngại là lãi suất trung bình tại South (<Num>13,17%</Num>)
        — cao nhất trong 4 vùng — chưa đủ bù đắp rủi ro thực tế của danh mục ở đây.
        Dữ liệu này cho thấy{' '}
        <em>mô hình định giá rủi ro hiện tại chưa phân biệt đủ theo địa lý</em>,
        dẫn đến việc các bang rủi ro cao vẫn được hưởng lãi suất gần tương đương
        các vùng an toàn hơn.
      </>,
    ],
    stats: [
      { label: 'NPL cao nhất', value: '14,98%', color: C.danger },
      { label: 'Bang nguy hiểm', value: '4/8', color: C.warning },
      { label: 'Lãi suất South', value: '13,2%', color: C.navy },
      { label: 'Vùng rủi ro', value: 'South', color: C.danger },
    ],
  },
  {
    id: '04',
    icon: Shield,
    iconColor: C.success,
    title: 'Điểm sáng — Hạng A–C vẫn là trụ cột an toàn',
    paragraphs: [
      <>
        Bất chấp những rủi ro nêu trên, <Num color={C.success}>77,2%</Num>{' '}
        tổng số khoản vay thuộc nhóm Grade A–C — những hạng có NPL lần lượt
        là <Num color={C.success}>3,1%</Num>, <Num color={C.success}>7,6%</Num>{' '}
        và <Num>12,9%</Num>. Đây là "trụ cột" giữ ổn định cho toàn danh mục.
      </>,
      <>
        Grade A–B với <Num>1,095,000</Num> khoản vay và tổng giải ngân{' '}
        <Num>$15,7B</Num> là nguồn sinh lời bền vững nhất —
        lãi suất 7–11%/năm với NPL thấp tạo ra tỷ suất lợi nhuận điều chỉnh rủi ro
        vượt trội. Chiến lược mở rộng nên tập trung vào phân khúc này.
      </>,
    ],
    stats: [
      { label: 'Grade A–C', value: '77,2%', color: C.success },
      { label: 'Giải ngân A–B', value: '$15,7B', color: C.success },
      { label: 'NPL Grade A', value: '3,1%', color: C.success },
      { label: 'Lãi suất A', value: '7,1%', color: C.navy },
    ],
  },
];

const recommendations = [
  {
    priority: 'Khẩn cấp',
    title: 'Siết tiêu chuẩn phê duyệt Grade E–G',
    desc: 'Grade E–G chiếm 8,4% số khoản nhưng đóng góp NPL theo tỷ lệ rủi ro 27–38%. Áp dụng ngay: yêu cầu FICO ≥ 680 và DTI ≤ 35% cho Grade E; tạm ngừng phê duyệt Grade F–G cho đến khi mô hình thu hồi nợ được cải thiện.',
    metric: 'Kỳ vọng giảm NPL tổng thể xuống < 10% trong 12 tháng',
  },
  {
    priority: 'Khẩn cấp',
    title: 'Giảm tỷ trọng khoản vay đảo nợ (Debt Consolidation)',
    desc: 'Tỷ lệ 56,6% (hiện tại) quá cao, tạo rủi ro hệ thống. Áp hạn mức tối đa 40% cho mục đích đảo nợ; ưu tiên danh mục vay kinh doanh và mua tài sản — các nhóm tạo dòng tiền độc lập, ít rủi ro dây chuyền hơn.',
    metric: 'Mục tiêu: Giảm debt_consolidation xuống ≤ 40% trong 2 quý',
  },
  {
    priority: 'Quan trọng',
    title: 'Áp hệ số rủi ro địa lý (Geographic Risk Premium)',
    desc: 'Mô hình định giá hiện tại chưa phân biệt đủ theo địa lý. Với 4 bang Southern Tier có NPL > 14%, cần áp thêm 0,5–1,0% vào lãi suất cơ sở. Dữ liệu cho thấy lãi suất hiện tại chưa đủ bù đắp rủi ro địa phương.',
    metric: 'Tăng lãi suất điều chỉnh rủi ro tại LA, AL, AR, OK thêm +0,75%',
  },
  {
    priority: 'Quan trọng',
    title: 'Xây dựng hệ thống cảnh báo sớm (Early Warning)',
    desc: 'Tỷ lệ thu hồi nợ xấu < 10% trên toàn danh mục là quá thấp, cho thấy hệ thống xử lý nợ xấu đang phản ứng chậm (reactive). Cần chuyển sang mô hình chủ động: liên hệ khách hàng sau 15 ngày trễ hạn, không phải 90 ngày.',
    metric: 'Kỳ vọng tăng recovery rate từ 9% → 15–18% trong 18 tháng',
  },
  {
    priority: 'Theo dõi',
    title: 'Tập trung mở rộng phân khúc Grade A–C',
    desc: 'Với tỷ lệ NPL 3–13% và lãi suất 7–17%/năm, Grade A–C là phân khúc tối ưu nhất về tỷ suất lợi nhuận điều chỉnh rủi ro (RAROC). Chiến lược dài hạn nên tăng tỷ trọng phân khúc này từ 77% lên 85% tổng danh mục.',
    metric: 'Mục tiêu: Tăng tỷ trọng Grade A–C lên 85% vào cuối năm tài chính',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
const ReportsPage = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('print') === 'true') {
      const timer = setTimeout(() => {
        window.print();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="page-wrap">
      {/* Floating print actions for manual printing */}
      <div 
        className="no-print" 
        style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          marginBottom: 16,
        }}
      >
        <button 
          onClick={() => window.print()}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            fontSize: 11.5,
            fontWeight: 700,
            color: C.white,
            background: C.accent,
            border: 'none',
            borderRadius: 3,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(22, 82, 240, 0.15)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = C.mid}
          onMouseLeave={(e) => e.currentTarget.style.background = C.accent}
        >
          <Printer style={{ width: 12, height: 12 }} /> In báo cáo / Lưu PDF
        </button>
      </div>

    {/* ── BÌA BÁO CÁO ──────────────────────────────────────────────────────── */}
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

      {/* Header dạng letterhead */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        paddingBottom: 20, marginBottom: 20, borderBottom: `2px solid ${C.navy}`,
      }}>
        <div>
          <p style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: C.gray3, marginBottom: 8 }}>
            BÁO CÁO PHÂN TÍCH · NỘI BỘ
          </p>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.navy, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 6 }}>
            Phân tích Danh mục Tín dụng<br />
            <span style={{ color: C.accent }}>LendingClub 2007–2018</span>
          </h1>
          <p style={{ fontSize: 12, color: C.gray, fontWeight: 500, lineHeight: 1.5 }}>
            Đánh giá chất lượng tài sản · Xác định rủi ro tập trung · Khuyến nghị điều hành
          </p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 44, height: 44, background: C.navy, borderRadius: 4, marginBottom: 8,
          }}>
            <FileText style={{ width: 20, height: 20, color: C.cyan }} />
          </div>
          <p style={{ fontSize: 9, fontWeight: 800, color: C.gray3, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            BI Analytics<br />Unit
          </p>
        </div>
      </div>

      {/* Metadata grid kiểu letterhead */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, marginBottom: 32 }}>
        {[
          { k: 'Mã báo cáo', v: 'LC-RPT-2026' },
          { k: 'Ngày lập', v: '23/05/2026' },
          { k: 'Phạm vi', v: '2007–2018' },
          { k: 'Đơn vị lập', v: 'Nhóm BI & Analytics' },
          { k: 'Bảo mật', v: 'Internal Only' },
        ].map(({ k, v }, i) => (
          <div key={k} style={{
            padding: '10px 0', paddingRight: 16,
            borderRight: i < 4 ? `1px solid ${C.border}` : 'none',
            paddingLeft: i > 0 ? 16 : 0,
          }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: C.gray3, marginBottom: 4 }}>{k}</p>
            <p style={{ fontSize: 12, fontWeight: 700, color: C.navy, margin: 0 }}>{v}</p>
          </div>
        ))}
      </div>

      {/* ── TÓM TẮT ĐIỀU HÀNH ───────────────────────────────────────────────── */}
      <SectionLabel icon={FileText} text="Tóm tắt điều hành (Executive Summary)" />

      <div style={{
        background: C.white, border: `1px solid ${C.border}`,
        borderLeft: `3px solid ${C.navy}`, borderRadius: 3,
        padding: '20px 24px', marginBottom: 28,
      }}>
        <p style={{ fontSize: 13, color: '#2d3748', lineHeight: 1.8, marginBottom: 14 }}>
          Báo cáo này đánh giá toàn diện danh mục tín dụng{' '}
          <Num>2,257,084</Num> khoản vay của LendingClub trong giai đoạn 2007–2018,
          với tổng giải ngân <Num>$33,9 tỷ</Num>. Phân tích được thực hiện trên nền tảng
          Data Warehouse với mô hình dữ liệu Star Schema gồm <Num>4 bảng chiều</Num>{' '}
          và <Num>1 bảng sự kiện</Num>, đảm bảo tốc độ truy vấn dưới 1 giây.
        </p>
        <p style={{ fontSize: 13, color: '#2d3748', lineHeight: 1.8, marginBottom: 14 }}>
          <strong>Phát hiện then chốt:</strong> Tỷ lệ hoàn trả toàn danh mục đạt{' '}
          <Num color={C.success}>80,3%</Num> — tích cực hơn kỳ vọng.
          Tuy nhiên, <Num color={C.danger}>$4,2 tỷ nợ xấu</Num> vẫn tồn đọng với tỷ lệ
          thu hồi chỉ <Num color={C.danger}>{'<'} 10%</Num>, đặt ra yêu cầu cải thiện
          cơ chế xử lý nợ. Rủi ro tập trung ở hai chiều chính:{' '}
          <Num>Grade E–G</Num> (NPL 27–38%) và mục đích <Num>đảo nợ</Num>{' '}
          (56,6% danh mục).
        </p>
        <p style={{ fontSize: 13, color: '#2d3748', lineHeight: 1.8 }}>
          <strong>Khuyến nghị ưu tiên:</strong> Siết tiêu chuẩn phê duyệt Grade E–G,
          hạ tỷ trọng khoản vay đảo nợ xuống ≤ 40%, và triển khai hệ thống cảnh báo sớm
          với ngưỡng can thiệp tại <Num>15 ngày</Num> trễ hạn (thay vì 90 ngày hiện tại).
        </p>
      </div>

      {/* ── 4 PHÁT HIỆN CHÍNH — STORYTELLING ────────────────────────────────── */}
      <SectionLabel icon={BarChart2} text="Phát hiện chính (Key Findings)" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {findings.map((f, fi) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: fi * 0.08 }}
              style={{
                borderBottom: fi < findings.length - 1 ? `1px solid ${C.border}` : 'none',
                paddingBottom: 28, marginBottom: 28,
              }}
            >
              {/* Tiêu đề finding */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 3, background: C.bg,
                  border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon style={{ width: 15, height: 15, color: f.iconColor }} />
                </div>
                <div>
                  <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.gray3, marginBottom: 4 }}>
                    Phát hiện {f.id}
                  </p>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: C.navy, letterSpacing: '-0.01em', margin: 0 }}>
                    {f.title}
                  </h2>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
                {/* Văn phân tích */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {f.paragraphs.map((p, pi) => (
                    <p key={pi} style={{ fontSize: 12.5, color: '#2d3748', lineHeight: 1.75, margin: 0 }}>
                      {p}
                    </p>
                  ))}
                </div>

                {/* Stat chips bên phải */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {f.stats.map((s, si) => (
                    <StatChip key={si} label={s.label} value={s.value} color={s.color} />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── KHUYẾN NGHỊ ──────────────────────────────────────────────────────── */}
      <Divider margin="4px 0 28px" />
      <SectionLabel icon={CheckCircle2} text="Khuyến nghị điều hành (Action Items)" color={C.success} />

      <div style={{
        background: C.white, border: `1px solid ${C.border}`, borderRadius: 3,
        marginBottom: 28, overflow: 'hidden',
      }}>
        <div style={{ padding: '12px 20px', background: C.bg, borderBottom: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11, color: C.gray, margin: 0, lineHeight: 1.5 }}>
            Các khuyến nghị dưới đây được xếp theo mức độ ưu tiên dựa trên{' '}
            <strong>tác động tài chính ước tính</strong> và{' '}
            <strong>tính khả thi triển khai</strong>.
            Nhóm "Khẩn cấp" cần hành động trong vòng <Num>30 ngày</Num>.
          </p>
        </div>
        <div style={{ padding: '20px 20px 4px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recommendations.map((r, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '24px auto 1fr auto', gap: '0 14px',
                alignItems: 'flex-start', paddingBottom: 16, marginBottom: 16,
                borderBottom: i < recommendations.length - 1 ? `1px solid ${C.border}` : 'none',
              }}>
                {/* Số thứ tự */}
                <div style={{
                  width: 22, height: 22, borderRadius: '50%', background: C.bg,
                  border: `1px solid ${C.border}`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0, marginTop: 2,
                }}>
                  <span style={{ fontSize: 9, fontWeight: 800, color: C.gray }}>{i + 1}</span>
                </div>

                {/* Priority tag */}
                <div style={{ paddingTop: 2 }}>
                  <PriorityTag level={r.priority} />
                </div>

                {/* Nội dung */}
                <div>
                  <p style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, marginBottom: 5 }}>{r.title}</p>
                  <p style={{ fontSize: 12, color: C.gray, lineHeight: 1.6, margin: '0 0 5px' }}>{r.desc}</p>
                  {r.metric && (
                    <p style={{ fontSize: 11, color: C.accent, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4, margin: 0 }}>
                      <ChevronRight style={{ width: 10, height: 10 }} /> {r.metric}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER BÁO CÁO ───────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: 16, borderTop: `1px solid ${C.border}`,
      }}>
        <p style={{ fontSize: 10, color: C.gray3, margin: 0 }}>
          Báo cáo được tạo tự động từ hệ thống BI Analytics · Dữ liệu nguồn: LendingClub Dataset (Kaggle)
        </p>
        <p style={{ fontSize: 10, color: C.gray3, margin: 0, fontFamily: "'JetBrains Mono', monospace" }}>
          LC-RPT-2026 · Trang 1/1
        </p>
      </div>

    </motion.div>
  </div>
  );
};

export default ReportsPage;
