import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, Bar, Line, ComposedChart, PieChart, Pie, Cell, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Printer, HelpCircle, Info } from 'lucide-react';
import {
  loanTrendData, nplTrendData, loanPurposeData, stateRiskData, dtiScatterData
} from '../data/mockData';
import vdcbSkyscraper from '../assets/vdcb_bank_skyscraper.png';

// ── Thiết kế hệ màu xanh dương & xanh ngọc kỹ thuật số VDCB thuần khiết ───────────────────────────
const C = {
  navy: '#0a1f44',         // Navy sẫm định chế tài chính
  mid: '#1a3a6e',          // Navy trung chuyển
  accent: '#1652f0',       // Xanh dương năng động thương hiệu
  cyan: '#06b6d4',         // Xanh cyan ngọc kỹ thuật số
  danger: '#b91c1c',
  warning: '#b45309',      // Cam đất cảnh báo
  
  // Màu chữ xanh dương thống nhất (thay thế toàn bộ màu xám/đen)
  blueText: '#102a43',     // Rất đậm xanh dương cho chữ tiêu đề phụ/nội dung quan trọng
  slateBlue: '#243b53',    // Slate blue thanh lịch cho văn bản thường
  lightBlueText: '#eef2f6',// Xanh dương cực nhạt nổi bật trên nền tối
  
  border: '#dde1e8',
  bg: '#f7f8fa',
  white: '#ffffff',
  
  // Dải màu gradient xanh dương của Website (VDCB Blue theme)
  vdcbBlue: '#1652f0',     // Xanh dương thương hiệu
  vdcbCyan: '#06b6d4',     // Xanh ngọc kỹ thuật số
  vdcbNavy: '#0a1f44',     // Navy đậm định chế
  vdcbLightBlue: '#f0f4fe',// Nền xanh nhạt
  vdcbTeal: '#0d9488',
};

// Đổi màu phân hạng rủi ro sang tông Teal-Cyan-Blue làm chủ đạo cho hợp theme
const GRADE_COLORS = ['#0d9488','#06b6d4','#1652f0','#1a3a6e','#b45309','#b91c1c','#7f1d1d'];

// ── ĐỒ HỌA ĐƯỜNG KẺ TRANG TRÍ MÉT TRÊN SLIDE (Brand Accent Line) ──────────────────────────────────
const SlideDecorations = () => (
  // Một đường kẻ gradient xanh dương - cyan mỏng chạy ngang cực kỳ tinh tế sát mép trên slide
  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 3.5, background: `linear-gradient(90deg, ${C.accent} 0%, ${C.cyan} 100%)` }}
/>
);

// ── Hướng dẫn in tràn viền A4 Landscape dùng CSS style trực tiếp ──────────────────────────────
const PrintStyle = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @media print {
      /* Ẩn các thành phần giao diện web thông thường */
      .no-print,
      .site-header,
      .site-footer,
      header,
      footer,
      button,
      nav,
      .app-menu,
      .menu-backdrop {
        display: none !important;
      }
      
      /* Cấu hình lại body và html để vừa khít màn hình in */
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        width: 297mm !important;
        height: 210mm !important;
        background-color: #ffffff !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      /* Bỏ lề mặc định của trình duyệt để in full-screen */
      @page {
        size: A4 landscape;
        margin: 0 !important;
      }
      
      /* Reset lại container bọc ngoài */
      .page-wrap {
        max-width: 100% !important;
        width: 297mm !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      .report-slides-container {
        gap: 0 !important;
        display: block !important;
      }
      
      /* Định dạng chuẩn Slide A4 Ngang (297mm x 210mm) tràn viền */
      .report-slide {
        width: 297mm !important;
        height: 210mm !important;
        page-break-after: always !important;
        break-after: page !important;
        box-sizing: border-box !important;
        margin: 0 !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        padding: 14mm 16mm !important; /* Lề trong slide in cực đẹp */
        position: relative !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        overflow: hidden !important;
        background-color: #ffffff !important;
      }
      
      /* Giữ lại gradient khi in */
      .report-slide-dark {
        background: linear-gradient(135deg, #020617 0%, #0a1f44 100%) !important;
        color: #ffffff !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      .report-slide-chapter {
        background: linear-gradient(135deg, #0a1f44 0%, #1652f0 100%) !important;
        color: #ffffff !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  ` }} />
);

// ── Custom Tooltip cho biểu đồ trong Báo cáo ──────────────────────────────────
const ChartTip = ({ active, payload, label, suffix = '' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: C.white, border: `1px solid ${C.border}`, borderRadius: 3,
      padding: '6px 10px', fontSize: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    }}>
      <p style={{ fontWeight: 700, color: C.navy, marginBottom: 4, fontSize: 10.5 }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
          <span style={{ width: 8, height: 3, background: p.color || p.fill, display: 'inline-block' }} />
          <span style={{ color: C.slateBlue }}>{p.name}:</span>
          <span style={{ fontWeight: 700, color: C.navy, marginLeft: 'auto', paddingLeft: 12 }}>
            {typeof p.value === 'number'
              ? p.value >= 1000 ? p.value.toLocaleString('vi-VN') : p.value.toFixed(2)
              : p.value}{suffix}
          </span>
        </div>
      ))}
    </div>
  );
};

// ── Slide Header Component ───────────────────────────────────────────────────
const SlideHeader = ({ category, title }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottom: '2.5px solid transparent',
    borderImage: `linear-gradient(90deg, ${C.accent} 0%, ${C.cyan} 100%) 1`,
    paddingBottom: 8,
    marginBottom: 14,
    position: 'relative'
  }}>
    <div>
      <p style={{ fontSize: 9, fontWeight: 800, color: C.accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 2 }}>
        {category}
      </p>
      <h2 style={{ fontSize: 14.5, fontWeight: 900, color: C.navy, letterSpacing: '-0.02em', margin: 0, lineHeight: 1.2 }}>
        {title}
      </h2>
    </div>
    <div style={{ textAlign: 'right', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
      <p style={{ fontSize: 9.5, fontWeight: 900, color: C.accent, letterSpacing: '0.05em', margin: 0 }}>
        VDCB <span style={{ color: C.navy }}>DIGITAL CREDIT BANK</span>
      </p>
      <p style={{ fontSize: 7, fontWeight: 700, color: C.gray3, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 1, margin: 0 }}>
        Investor Presentation · 4Q2018
      </p>
    </div>
  </div>
);

// ── Slide Footer Component ───────────────────────────────────────────────────
const SlideFooter = ({ pageNum }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    paddingTop: 8,
    borderTop: `1px solid ${C.border}`
  }}>
    <p style={{ fontSize: 8, color: C.gray3, margin: 0 }}>
      Ngân hàng TMCP Tín dụng Số Việt Nam (VDCB) | Khối Quản trị Rủi ro & BI Analytics Unit | Tài liệu mật - Chỉ lưu hành nội bộ
    </p>
    <p style={{ fontSize: 8, color: C.accent, margin: 0, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
      Slide {pageNum}/15
    </p>
  </div>
);

// ── Highlight Metric Card ───────────────────────────────────
const HighlightMetric = ({ label, value, change, isPositive, sub }) => (
  <div style={{
    background: C.white,
    border: `1px solid ${C.border}`,
    borderRadius: 4,
    padding: '8px 12px',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <span style={{ fontSize: 8, fontWeight: 700, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
      {label}
    </span>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 800, color: C.navy }}>
        {value}
      </span>
      {change && (
        <span style={{
          fontSize: 9,
          fontWeight: 800,
          color: isPositive ? C.success : C.danger,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1
        }}>
          {isPositive ? '▲' : '▼'} {change}
        </span>
      )}
    </div>
    <span style={{ fontSize: 8, color: C.slateBlue, fontWeight: 500, marginTop: 1 }}>
      {sub}
    </span>
    <div style={{
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: 3,
      height: '100%',
      background: change ? (isPositive ? C.success : C.danger) : C.accent
    }} />
  </div>
);

// ── Bottom Insight Bullet Container ─────────────────
const BottomBulletInsight = ({ title, bullets }) => (
  <div style={{
    background: C.bg,
    border: `1px solid ${C.border}`,
    borderRadius: 4,
    padding: '8px 14px',
    marginTop: 10
  }}>
    <p style={{ fontSize: 9, fontWeight: 800, color: C.navy, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 4px 0' }}>
      {title}
    </p>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px', fontSize: 9.5, color: C.slateBlue, lineHeight: 1.5 }}>
      <ul style={{ paddingLeft: 12, margin: 0 }}>
        {bullets.slice(0, Math.ceil(bullets.length / 2)).map((b, i) => (
          <li key={i} style={{ marginBottom: 2 }}>{b}</li>
        ))}
      </ul>
      <ul style={{ paddingLeft: 12, margin: 0 }}>
        {bullets.slice(Math.ceil(bullets.length / 2)).map((b, i) => (
          <li key={i} style={{ marginBottom: 2 }}>{b}</li>
        ))}
      </ul>
    </div>
  </div>
);

// ── Chapter Divider Component ────────────────────────────────────────────────
const ChapterDivider = ({ chapterNum, title, subtitle, pageNum }) => (
  <motion.div 
    className="report-slide report-slide-chapter"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      background: `linear-gradient(135deg, ${C.navy} 0%, ${C.accent} 100%)`,
      color: C.white,
      borderRadius: 4,
      padding: '40px 48px',
      minHeight: 520,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      border: `1px solid ${C.navy}`
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 8.5, fontWeight: 800, color: C.cyan, letterSpacing: '0.15em' }}>VDCB INVESTOR PRESENTATION</span>
      <span style={{ fontSize: 8.5, fontWeight: 800, color: '#a0aec0', letterSpacing: '0.08em' }}>PHẦN {chapterNum}</span>
    </div>
    
    <div style={{ margin: 'auto 0' }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: C.cyan, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>
        CHƯƠNG PHẦN {chapterNum}
      </p>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: C.white, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 12, maxWidth: 800 }}>
        {title}
      </h1>
      <div style={{ width: 40, height: 3, background: C.cyan, marginBottom: 14 }} />
      <p style={{ fontSize: 11.5, color: C.lightBlueText, maxWidth: 650, lineHeight: 1.6, margin: 0 }}>
        {subtitle}
      </p>
    </div>

    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 16 }}>
      <span style={{ fontSize: 8, color: '#cbd5e0' }}>Ngân hàng TMCP Tín dụng Số Việt Nam (VDCB)</span>
      <span style={{ fontSize: 8, color: '#cbd5e0', fontFamily: 'monospace' }}>Slide {pageNum}/15</span>
    </div>
  </motion.div>
);

// ── Main ReportsPage Component ────────────────────────────────────────────────
const ReportsPage = () => {
  const location = useLocation();
  const [showHelp, setShowHelp] = useState(false);

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
    <div className="page-wrap" style={{ maxWidth: 960, margin: '0 auto', padding: '16px 0' }}>
      <PrintStyle />
      
      {/* ── NÚT IN & BẢNG HƯỚNG DẪN XUẤT PDF (ẨN KHI IN) ────────────────────────── */}
      <div 
        className="no-print" 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 16,
          padding: '10px 14px',
          background: `linear-gradient(135deg, rgba(22, 82, 240, 0.04) 0%, rgba(6, 182, 212, 0.04) 100%)`,
          border: `1px solid ${C.border}`,
          borderRadius: 6,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Info style={{ width: 14, height: 14, color: C.accent }} />
          <p style={{ fontSize: 11, color: C.navy, fontWeight: 600, margin: 0 }}>
            Hệ thống Slide được tối ưu hóa in ngang **A4 Landscape tràn màn hình (Fullscreen)**.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
          <button 
            onClick={() => setShowHelp(!showHelp)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '6px 12px',
              fontSize: 11,
              fontWeight: 700,
              color: C.navy,
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 3,
              cursor: 'pointer',
              transition: 'background 0.15s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
            onMouseLeave={(e) => e.currentTarget.style.background = C.white}
          >
            Hướng dẫn In Tràn Viền
          </button>
          
          <button 
            onClick={() => window.print()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              fontSize: 11,
              fontWeight: 700,
              color: C.white,
              background: C.accent,
              border: 'none',
              borderRadius: 3,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(22, 82, 240, 0.15)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = C.navy}
            onMouseLeave={(e) => e.currentTarget.style.background = C.accent}
          >
            <Printer style={{ width: 13, height: 13 }} /> In Slide / Xuất PDF (A4 Ngang)
          </button>
          
          {/* Popover Hướng dẫn chi tiết xuất PDF */}
          {showHelp && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 8,
              width: 320,
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 6,
              padding: 14,
              boxShadow: '0 10px 25px rgba(10,31,68,0.15)',
              zIndex: 100,
              fontSize: 11,
              color: C.slateBlue,
              lineHeight: 1.5,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, borderBottom: `1px solid ${C.border}`, paddingBottom: 6 }}>
                <span style={{ fontWeight: 800, color: C.navy, display: 'flex', alignItems: 'center', gap: 4 }}>HƯỚNG DẪN IN TRÀN VIỀN A4</span>
                <button onClick={() => setShowHelp(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 12, color: C.gray, fontWeight: 700 }}>✕</button>
              </div>
              <ul style={{ paddingLeft: 14, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <li><strong>Thiết bị đầu ra (Destination):</strong> Chọn <em>Lưu dưới dạng PDF</em> (Save as PDF) hoặc <em>Microsoft Print to PDF</em>.</li>
                <li><strong>Hướng trang (Layout):</strong> Bắt buộc chọn <strong>Nằm ngang (Landscape)</strong>.</li>
                <li><strong>Lề (Margins):</strong> Chọn <strong>Không có lề (None)</strong> để Slide được tràn toàn màn hình (không bị viền trắng bao quanh).</li>
                <li><strong>Tỷ lệ (Scale):</strong> Chọn <strong>Vừa với trang (Fit to page)</strong> hoặc chỉnh thủ công <strong>100%</strong>.</li>
                <li><strong>Đồ họa nền (Background graphics):</strong> **Phải tích chọn** để hiển thị trọn vẹn màu sắc gradient và ảnh nền.</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="report-slides-container" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 1: TRANG BÌA PRESENTATION (TITLE SLIDE)
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide report-slide-dark"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: `linear-gradient(135deg, #020617 0%, ${C.navy} 100%)`,
            color: C.white,
            borderRadius: 4,
            padding: '40px 48px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            border: `1px solid ${C.navy}`
          }}
        >
          {/* Logo & Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: C.white, letterSpacing: '0.05em' }}>
              VDCB <span style={{ color: C.cyan, fontWeight: 700 }}>DIGITAL CREDIT</span>
            </span>
            <span style={{ fontSize: 9.5, fontWeight: 800, color: '#a0aec0', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Q4 2018 OFFICIAL REPORT
            </span>
          </div>

          {/* Two-Column split body */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: 24, margin: 'auto 0' }}>
            {/* Left: Corporate Title & Text */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ width: 48, height: 4, background: C.cyan, marginBottom: 14 }} />
              <p style={{ fontSize: 9.5, fontWeight: 800, color: C.cyan, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 6px 0' }}>
                BÁO CÁO CÔNG BỐ KẾT QUẢ KINH DOANH
              </p>
              <h1 style={{ fontSize: 19.5, fontWeight: 900, color: C.white, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 12 }}>
                ĐÁNH GIÁ CHẤT LƯỢNG TÀI SẢN & ĐỊNH HƯỚNG<br />
                <span style={{ color: C.cyan }}>PHÒNG VỆ RỦI RO DANH MỤC TÍN DỤNG Q4/2018</span>
              </h1>
              <p style={{ fontSize: 11, color: C.lightBlueText, fontWeight: 500, lineHeight: 1.6, marginBottom: 18, margin: 0 }}>
                Báo cáo phân tích chuyên sâu hiệu quả danh mục cho vay tiêu dùng bán lẻ lũy kế giai đoạn 2007–2018 của Ngân hàng TMCP Tín dụng Số Việt Nam (VDCB). Đánh giá toàn diện cơ cấu rủi ro tập trung, nợ xấu (NPL) địa phương và giải pháp công nghệ lõi.
              </p>
              
              {/* Core values box */}
              <div style={{ 
                display: 'flex', 
                gap: 14, 
                borderTop: '1px dashed rgba(255,255,255,0.15)',
                paddingTop: 14,
                marginTop: 6
              }}>
                {[
                  { title: 'Minh bạch', desc: 'Chuẩn mực quốc tế' },
                  { title: 'Hiệu quả', desc: 'Ứng dụng Big Data' },
                  { title: 'Bền vững', desc: 'Bảo vệ nguồn vốn' }
                ].map((val) => (
                  <div key={val.title}>
                    <span style={{ fontSize: 9.5, fontWeight: 800, color: C.cyan, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>
                      {val.title}
                    </span>
                    <span style={{ fontSize: 8.5, color: '#a0aec0' }}>{val.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Custom bank skyscraper image with subtle blue gradient shadow */}
            <div style={{ 
              borderRadius: 6, 
              overflow: 'hidden', 
              boxShadow: '0 8px 30px rgba(22, 82, 240, 0.35)',
              border: `1.5px solid ${C.cyan}`,
              height: 230,
              background: 'rgba(255,255,255,0.02)',
              position: 'relative'
            }}>
              <img 
                src={vdcbSkyscraper} 
                alt="VDCB Corporate Skyscraper HQ" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
              <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
                <span style={{ fontSize: 8, fontWeight: 800, color: C.white, background: 'rgba(22, 82, 240, 0.85)', padding: '2px 6px', borderRadius: 2, border: `1px solid ${C.cyan}` }}>
                  TRỤ SỞ CHÍNH VDCB
                </span>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 14
          }}>
            {[
              { label: 'ĐƠN VỊ CÔNG BỐ', value: 'Khối Quản trị Rủi ro VDCB' },
              { label: 'NGÀY PHÁT HÀNH', value: '23 Tháng 05, 2026' },
              { label: 'PHẠM VI PHÂN TÍCH', value: '2.25 Triệu khách hàng' },
              { label: 'MỨC ĐỘ BẢO MẬT', value: 'Nội bộ (Restricted)' }
            ].map((item, idx) => (
              <div key={idx}>
                <span style={{ fontSize: 8, fontWeight: 800, color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 3 }}>
                  {item.label}
                </span>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: C.white }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ position: 'absolute', bottom: 10, right: 48, display: 'flex', alignItems: 'center', gap: 10 }}>
            <p style={{ fontSize: 8, color: '#a0aec0', margin: 0 }}>VDCB INVESTOR PRESENTATION © 2018</p>
          </div>
        </motion.div>


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 2: MỤC LỤC / DANH MỤC NỘI DUNG (AGENDA SLIDE - THUMBNAIL LAYOUT)
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 4,
            padding: '30px 40px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <SlideDecorations />

          <div>
            <SlideHeader category="Agendas" title="Mục lục chương trình họp & Danh mục tài liệu" />
            
            {/* Lưới Lựa chọn dạng Thumbnail giống Website bán lẻ */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: 12, 
              marginTop: 18 
            }}>
              {[
                { id: '01', title: 'Giới thiệu chung', desc: 'Giới thiệu về ngân hàng số VDCB, triết lý vận hành không chi nhánh vật lý.', page: 3 },
                { id: '02', title: 'Danh mục Sản phẩm', desc: 'Hồ sơ 4 sản phẩm bán lẻ cốt lõi: Vay tiêu dùng, mua nhà, ô tô, đảo nợ.', page: 4 },
                { id: '03', title: 'Doanh số & Quy mô', desc: 'Biểu đồ giải ngân tích lũy 2007-2018 phát triển mạnh mẽ đạt đỉnh.', page: 6 },
                { id: '04', title: 'Xếp hạng Tín dụng', desc: 'Phân tích cơ cấu Grade A-G và chiến lược định giá theo mức rủi ro.', page: 8 },
                { id: '05', title: 'Kiểm soát Nợ xấu', desc: 'Diễn biến chỉ số NPL đi lùi và bản đồ các bang rủi ro cao nhất.', page: 9 },
                { id: '06', title: 'Điểm Dị biệt DTI', desc: 'Biểu đồ Scatter DTI vs Lãi suất, phát hiện lỗ hổng phê duyệt lõi.', page: 10 },
                { id: '07', title: 'Lộ trình Chiến lược', desc: 'Các mảng nội dung còn thiếu: Chuẩn ESG, Open API, Hệ thống AI v2.0.', page: 13 },
                { id: '08', title: 'Kết luận & Báo cáo', desc: 'Bảng số liệu cân đối tài chính 4 năm & Kiến nghị hành động của ban quản trị.', page: 14 },
              ].map((item) => (
                <div 
                  key={item.id} 
                  style={{
                    background: `linear-gradient(135deg, rgba(22, 82, 240, 0.03) 0%, rgba(6, 182, 212, 0.03) 100%)`,
                    border: `1.2px solid ${C.border}`,
                    borderRadius: 6,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: 125,
                    position: 'relative',
                    boxSizing: 'border-box'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 900, color: C.cyan }}>{item.id}</span>
                    </div>
                    <p style={{ fontSize: 10.5, fontWeight: 800, color: C.blueText, margin: '0 0 2px 0' }}>{item.title}</p>
                    <p style={{ fontSize: 8, color: C.slateBlue, margin: 0, lineHeight: 1.35 }}>{item.desc}</p>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    borderTop: `1px solid ${C.border}`, 
                    paddingTop: 6,
                    marginTop: 6
                  }}>
                    <span style={{ fontSize: 7.5, fontWeight: 700, color: C.accent }}>Slide {item.page}</span>
                    <span style={{ fontSize: 7.5, fontWeight: 800, color: C.accent, display: 'flex', alignItems: 'center' }}>Xem</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chi tiết trang trí nhẹ nhàng chân trang */}
            <div style={{
              background: `linear-gradient(90deg, rgba(22,82,240,0.05) 0%, rgba(6,182,212,0.05) 100%)`,
              padding: '8px 12px',
              borderRadius: 4,
              fontSize: 9,
              color: C.blueText,
              fontWeight: 600,
              marginTop: 10,
              textAlign: 'center',
              border: `1px solid ${C.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span><em>Hệ thống Slide được thiết kế đồng bộ theo nhận diện số VDCB, tối ưu hóa hiển thị dữ liệu trực quan khoa học.</em></span>
            </div>
          </div>
          <SlideFooter pageNum={2} />
        </motion.div>


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 3: GIỚI THIỆU VỀ NGÂN HÀNG VDCB (ABOUT SLIDE)
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 4,
            padding: '30px 40px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <SlideDecorations />

          <div>
            <SlideHeader category="About VDCB" title="Ngân hàng bán lẻ tiên phong trong Kỷ nguyên Tín dụng Số" />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 24, marginTop: 18 }}>
              
              {/* Giới thiệu ngân hàng */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 11, color: C.slateBlue, lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}>
                  <strong>VDCB (Vietnam Digital Credit Bank)</strong> là ngân hàng thương mại cổ phần đầu tiên tại Việt Nam áp dụng mô hình vận hành **100% Digital-only** (không chi nhánh vật lý), tối ưu hóa toàn bộ chi phí vận hành chi nhánh để chuyển giao lợi ích lãi suất tốt nhất cho khách hàng.
                </p>
                
                {/* Vision / Mission */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, borderTop: `1px dashed ${C.border}`, paddingTop: 12 }}>
                  <div>
                    <span style={{ fontSize: 9, fontWeight: 800, color: C.accent, textTransform: 'uppercase', display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                      TẦM NHÌN CHIẾN LƯỢC
                    </span>
                    <span style={{ fontSize: 10, color: C.slateBlue }}>
                      Trở thành định chế tài chính số bán lẻ hàng đầu khu vực, ứng dụng 100% dữ liệu lớn (Big Data) và trí tuệ nhân tạo (AI) trong phê duyệt và quản trị rủi ro tự động.
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: 9, fontWeight: 800, color: C.accent, textTransform: 'uppercase', display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                      SỨ MỆNH HOẠT ĐỘNG
                    </span>
                    <span style={{ fontSize: 10, color: C.slateBlue }}>
                      Đơn giản hóa tài chính tiêu dùng bán lẻ, mang tín dụng văn minh và tiện lợi tới tay hàng triệu người tiêu dùng Việt Nam thông qua ứng dụng di động VDCB Pay.
                    </span>
                  </div>
                </div>

                <div style={{ background: C.bg, borderLeft: `3px solid ${C.accent}`, padding: '8px 12px', fontSize: 9.5, color: C.navy, fontWeight: 600 }}>
                  <span>VDCB vinh dự đón nhận chứng chỉ bảo mật quốc tế PCI-DSS Level 1 cao nhất.</span>
                </div>
              </div>

              {/* Grid 4 chỉ số tài sản định chế bên phải */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'Vốn điều lệ', val: '83.5K Tỷ', sub: 'Tăng trưởng +35% yoy' },
                  { label: 'Phê duyệt', val: '100% AI Lõi', sub: 'Không có phê duyệt tay' },
                  { label: 'An toàn CAR', val: '11.7%', sub: 'Basel II tiêu chuẩn' },
                  { label: 'Moody\'s rating', val: 'Ba2 / Ổn định', sub: 'Bảo chứng tài sản tốt' },
                ].map((item, idx) => (
                  <div key={idx} style={{
                    background: C.white, border: `1px solid ${C.border}`, borderRadius: 4,
                    padding: '10px 12px', position: 'relative', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: 7.5, fontWeight: 800, color: C.blueText, textTransform: 'uppercase', display: 'block', marginBottom: 2 }}>{item.label}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 900, color: C.navy, display: 'block' }}>{item.val}</span>
                    <span style={{ fontSize: 8, color: C.slateBlue, marginTop: 2 }}>{item.sub}</span>
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: 2, background: `linear-gradient(90deg, ${C.accent} 0%, ${C.cyan} 100%)` }} />
                  </div>
                ))}
              </div>

            </div>
          </div>
          <SlideFooter pageNum={3} />
        </motion.div>


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 4: DANH MỤC CÁC DÒNG SẢN PHẨM TÍN DỤNG BÁN LẺ CỐT LÕI (PRODUCT PORTFOLIO SLIDE - NEW)
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 4,
            padding: '30px 40px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <SlideDecorations />

          <div>
            <SlideHeader category="Products & Portfolio" title="Danh mục các gói sản phẩm tín dụng tiêu dùng số đột phá" />
            
            <p style={{ fontSize: 11, color: C.slateBlue, margin: '6px 0 12px 0', lineHeight: 1.5 }}>
              VDCB cung cấp hệ sinh thái dòng sản phẩm tín dụng đa dạng, đáp ứng mọi nhu cầu tiêu dùng và kinh doanh quy mô nhỏ với quy trình đăng ký 100% online, giải ngân ngay lập tức sau khi mô hình AI chấm điểm đạt yêu cầu.
            </p>

            {/* Thumbnail grid 4 cột */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {[
                { 
                  title: 'Vay Tiêu dùng Nhanh (Personal Fast)', 
                  desc: 'Khoản vay cấp tốc tiêu dùng hàng ngày không thế chấp. Đăng ký nhận kết quả trong 3 phút.',
                  rate: '9.99% - 14.5%', 
                  limit: '$5,000 USD',
                  time: 'Duyệt 3 phút', 
                  grad: 'linear-gradient(135deg, rgba(22, 82, 240, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)'
                },
                { 
                  title: 'Vay Mua nhà Tự động (Smart Home)', 
                  desc: 'Tích hợp API trực tiếp với các sàn giao dịch bất động sản liên kết. Định giá nhà số tự động.',
                  rate: '6.8% - 8.5%', 
                  limit: '$150,000 USD',
                  time: 'Duyệt 2 giờ', 
                  grad: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(26, 58, 110, 0.04) 100%)'
                },
                { 
                  title: 'Vay Ô tô Trực tiếp (Auto Loan)', 
                  desc: 'Giải ngân trực tiếp tới tài khoản các Showroom ô tô lớn. Bảo chứng tài sản là chính xe mua.',
                  rate: '7.5% - 9.2%', 
                  limit: '$60,000 USD',
                  time: 'Duyệt 30 phút', 
                  grad: 'linear-gradient(135deg, rgba(26, 58, 110, 0.04) 0%, rgba(22, 82, 240, 0.05) 100%)'
                },
                { 
                  title: 'Vay Đảo nợ Thông thái (Debt Consol)', 
                  desc: 'Quy gom các khoản nợ thẻ tín dụng lãi cao về một đầu mối duy nhất với lãi suất ưu đãi giảm tới 40%.',
                  rate: '8.5% - 13.0%', 
                  limit: '$30,000 USD',
                  time: 'Duyệt 15 phút', 
                  grad: 'linear-gradient(135deg, rgba(22, 82, 240, 0.05) 0%, rgba(6, 182, 212, 0.06) 100%)'
                }
              ].map((prod, i) => (
                <div 
                  key={i} 
                  style={{
                    background: prod.grad,
                    border: `1.2px solid ${C.border}`,
                    borderRadius: 6,
                    padding: 12,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                    height: 185,
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <span style={{ fontSize: 9, fontWeight: 900, color: C.accent, textTransform: 'uppercase' }}>PRODUCT {i+1}</span>
                    </div>
                    <h3 style={{ fontSize: 10.5, fontWeight: 800, color: C.navy, margin: '0 0 4px 0', lineHeight: 1.3 }}>{prod.title}</h3>
                    <p style={{ fontSize: 8, color: C.slateBlue, margin: 0, lineHeight: 1.4 }}>{prod.desc}</p>
                  </div>
                  
                  <div style={{ borderTop: `1px dashed ${C.border}`, paddingTop: 6, marginTop: 6, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8.5 }}>
                      <span style={{ color: C.slateBlue }}>Lãi suất:</span>
                      <span style={{ fontWeight: 800, color: C.navy }}>{prod.rate}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8.5 }}>
                      <span style={{ color: C.slateBlue }}>Hạn mức trần:</span>
                      <span style={{ fontWeight: 800, color: C.accent }}>{prod.limit}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 8.5 }}>
                      <span style={{ color: C.slateBlue }}>Tốc độ xử lý:</span>
                      <span style={{ fontWeight: 700, color: C.cyan }}>{prod.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chú ý cuối trang về rủi ro tập trung */}
            <div style={{ marginTop: 10, fontSize: 8.5, color: C.warning, display: 'flex', alignItems: 'center', justifyStyle: 'space-between', background: '#fffbeb', padding: '6px 12px', borderRadius: 4, border: '1px solid #fef3c7' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <strong>Cảnh báo quản trị rủi ro danh mục:</strong> Dòng sản phẩm <strong>Vay Đảo nợ</strong> hiện đang chiếm tỷ trọng quá lớn (56.6%). Ban Rủi ro kiến nghị định vị lại hạn mức.
              </div>
            </div>
          </div>
          <SlideFooter pageNum={4} />
        </motion.div>


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 5: CHAPTER DIVIDER 1 - TĂNG TRƯỞNG QUY MÔ & BỐI CẢNH VĨ MÔ
            ═════════════════════════════════════════════════════════════════════════ */}
        <ChapterDivider 
          chapterNum={1} 
          title="Tăng trưởng quy mô giải ngân mới & Cập nhật bối cảnh vĩ mô tiêu dùng" 
          subtitle="Đánh giá chi tiết sự bùng nổ của quy mô giải ngân tích lũy hệ thống vượt mức $33.95 tỷ USD, động lực từ mảng tín dụng số bán lẻ và phân tích chu kỳ giải ngân năm tài chính 2018."
          pageNum={5}
        />


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 6: BIỂU ĐỒ BỐI CẢNH VĨ MÔ & TỔNG QUAN QUY MÔ HOẠT ĐỘNG (AREA CHART)
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 4,
            padding: '30px 40px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <SlideDecorations />

          <div>
            <SlideHeader category="01. Cập nhật bối cảnh & Quy mô" title="Doanh số giải ngân mới năm 2018 tăng trưởng bùng nổ đạt đỉnh kỷ lục $7.92 tỷ USD" />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 24, marginTop: 10 }}>
              
              {/* Biểu đồ diện tích: Tăng trưởng giải ngân */}
              <div style={{ position: 'relative' }}>
                <p style={{ fontSize: 9, fontWeight: 800, color: C.blueText, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, margin: 0 }}>
                  XU HƯỚNG TĂNG TRƯỞNG DOANH SỐ GIẢI NGÂN HÀNG NĂM (2007 - 2018):
                </p>

                <div style={{ height: 200, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={loanTrendData} margin={{ top: 4, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="rptTrend2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={C.accent} stopOpacity={0.15} />
                          <stop offset="95%" stopColor={C.accent} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#eef0f4" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: C.slateBlue, fontSize: 8.5 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: C.slateBlue, fontSize: 8.5 }}
                        tickFormatter={v => v >= 1000 ? `$${(v/1000).toFixed(0)}B` : `$${v}M`} />
                      <Tooltip content={<ChartTip suffix=" M" />} />
                      <Area type="monotone" dataKey="amount" name="Giải ngân"
                        stroke={C.accent} strokeWidth={2.5} fillOpacity={1} fill="url(#rptTrend2)"
                        dot={{ fill: C.accent, r: 2, strokeWidth: 0 }} activeDot={{ r: 4 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tóm tắt chỉ số quy mô bên phải */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <HighlightMetric 
                  label="Tổng doanh số giải ngân lũy kế" 
                  value="$33.95 Tỷ USD" 
                  sub="Quy mô tích lũy toàn hệ thống 2007 - 2018" 
                />
                <HighlightMetric 
                  label="Doanh số cấp mới năm 2018" 
                  value="$7.92 Tỷ USD" 
                  change="20.5% yoy" 
                  isPositive={true} 
                  sub="Tăng vọt so với năm 2017 ($6.57B)" 
                />
                <HighlightMetric 
                  label="Tổng số lượng khoản cấp tín dụng" 
                  value="2,257,084 khoản" 
                  change="11.6% yoy" 
                  isPositive={true} 
                  sub="Mạng lưới bán lẻ trực tuyến rộng khắp" 
                />
              </div>

            </div>

            {/* Bottom Bullets */}
            <BottomBulletInsight 
              title="Phân tích bối cảnh vĩ mô & Tổng quan quy mô danh mục"
              bullets={[
                "Tín dụng bán lẻ bùng nổ mạnh mẽ trong giai đoạn 2012-2015, nhờ sự tối ưu hóa hệ thống phê duyệt trực tuyến tự động của ngân hàng.",
                "Thị trường cho vay tiêu dùng số phát triển vượt trội thúc đẩy quy mô giải ngân mới năm 2018 tăng trưởng ấn tượng +20.5% so với năm trước.",
                "Tổng quy mô đạt 2.25 triệu khách hàng, tạo lập cơ sở dữ liệu giao dịch khổng lồ cho việc đào tạo mô hình chấm điểm tín dụng rủi ro.",
                "Dư nợ gốc hiện tại chỉ còn $949 triệu USD (~2.8% tổng giải ngân lũy kế), cho thấy danh mục đang bước vào chu kỳ hoàn trả cuối vòng đời."
              ]}
            />
          </div>
          
          <SlideFooter pageNum={6} />
        </motion.div>


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 7: CHAPTER DIVIDER 2 - CƠ CẤU VÀ CHẤT LƯỢNG TÀI SẢN CHI TIẾT
            ═════════════════════════════════════════════════════════════════════════ */}
        <ChapterDivider 
          chapterNum={2} 
          title="Phân tích cơ cấu danh mục cho vay tín dụng & Kiểm soát rủi ro địa lý" 
          subtitle="Khám phá cơ cấu danh mục phân bổ theo 7 thứ hạng tín dụng rủi ro Grade A-G, định giá điều chỉnh rủi ro, rủi ro tập trung theo mục đích vay đảo nợ và diễn biến kiểm soát tỷ lệ nợ xấu NPL."
          pageNum={7}
        />


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 8: PHÂN TÍCH CƠ CẤU DANH MỤC & ĐỊNH GIÁ RỦI RO (DONUT CHART)
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 4,
            padding: '30px 40px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <SlideDecorations />

          <div>
            <SlideHeader category="02. Cơ cấu danh mục & Định giá" title="Hạng tín dụng A–C chiếm ưu thế, rủi ro tập trung cao ở nhóm vay Đảo nợ" />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 10 }}>
              
              {/* Donut Chart: Cơ cấu mục đích vay */}
              <div style={{ position: 'relative' }}>
                <p style={{ fontSize: 9, fontWeight: 800, color: C.blueText, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, margin: 0 }}>
                  CƠ CẤU PHÂN BỔ DƯ NỢ THEO MỤC ĐÍCH VAY (% SỐ KHOẢN VAY):
                </p>

                <div style={{ height: 200, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={loanPurposeData} cx="45%" cy="50%"
                        innerRadius={50} outerRadius={78} paddingAngle={2}
                        dataKey="value" stroke="none">
                        {loanPurposeData.map((e, i) => (
                          <Cell key={i} fill={e.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v) => [`${v}%`, 'Tỷ lệ']} />
                      <Legend layout="vertical" verticalAlign="middle" align="right"
                        wrapperStyle={{ fontSize: 9, fontWeight: 700, color: C.navy }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bảng chi tiết phân hạng & Định giá rủi ro */}
              <div>
                <p style={{ fontSize: 9, fontWeight: 800, color: C.blueText, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, margin: 0 }}>
                  ĐỊNH GIÁ CHO VAY THEO RỦI RO CHI TIẾT (RISK-ADJUSTED PRICING):
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 9, textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: C.navy, color: C.white }}>
                      <th style={{ padding: '4px 6px', border: `1px solid ${C.border}` }}>Hạng</th>
                      <th style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>Số khoản</th>
                      <th style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>Lãi suất TB</th>
                      <th style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>Tỷ lệ NPL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { g: 'A', count: '432K', rate: '7.08%', npl: '3.09%', label: 'RẤT TỐT' },
                      { g: 'B', count: '662K', rate: '10.68%', npl: '7.59%', label: 'TỐT' },
                      { g: 'C', count: '649K', rate: '14.14%', npl: '12.94%', label: 'CẬN BIÊN' },
                      { g: 'D', count: '324K', rate: '18.14%', npl: '19.19%', label: 'TRUNG BÌNH' },
                      { g: 'E', count: '135K', rate: '21.83%', npl: '27.65%', label: 'RỦI RO' },
                      { g: 'F', count: '41K', rate: '25.45%', npl: '35.52%', label: 'RẤT CAO' },
                      { g: 'G', count: '12K', rate: '28.08%', npl: '37.71%', label: 'BÁO ĐỘNG' }
                    ].map((row, i) => (
                      <tr key={row.g} style={{ background: i % 2 === 1 ? C.bg : C.white }}>
                        <td style={{ padding: '4px 6px', border: `1px solid ${C.border}`, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6, color: C.navy }}>
                          <span>Hạng {row.g}</span>
                          <span style={{ fontSize: 6.5, fontWeight: 800, padding: '1px 3px', borderRadius: 2, background: i >= 4 ? '#fee2e2' : '#e0f2fe', color: i >= 4 ? C.danger : C.accent }}>
                            {row.label}
                          </span>
                        </td>
                        <td style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.slateBlue }}>{row.count}</td>
                        <td style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right', fontWeight: 600, color: C.navy }}>{row.rate}</td>
                        <td style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right', fontWeight: 700, color: i >= 4 ? C.danger : C.accent }}>{row.npl}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Bottom Bullets */}
            <BottomBulletInsight 
              title="Phân tích chất lượng cơ cấu & Chiến lược định giá"
              bullets={[
                "Grade A-C giữ vững vai trò là xương sống của danh mục, chiếm tỷ lệ áp đảo 77.2% dư nợ, tạo ra lợi nhuận ròng ổn định chống đỡ rủi ro hệ thống.",
                "Vay đảo nợ (Debt Consolidation) dẫn đầu tuyệt đối về mục đích vay đạt 56.6%, đặt ra nguy cơ rủi ro lan truyền dây chuyền cực lớn cho ngân hàng.",
                "Cơ chế định giá theo rủi ro (Risk-adjusted pricing) vận hành hiệu quả: Lãi suất tăng tịnh tiến theo xếp hạng từ Grade A (7.1%) lên Grade G (28.1%).",
                "Lãi suất cao ở nhóm dưới chuẩn (Grade E-G) không bù đắp nổi chi phí trích lập dự phòng thực tế khi tỷ lệ nợ xấu nhóm này dao động ở mức 27% - 38%."
              ]}
            />
          </div>
          
          <SlideFooter pageNum={8} />
        </motion.div>


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 9: DIỄN BIẾN CHẤT LƯỢNG TÀI SẢN & ĐỊA LÝ (COMPOSED CHART)
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 4,
            padding: '30px 40px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <SlideDecorations />

          <div>
            <SlideHeader category="03. Kiểm soát chất lượng tài sản" title="Tỷ lệ nợ xấu NPL cải thiện mạnh mẽ chạm mốc thấp kỷ lục 1.90% vào năm 2018" />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 24, marginTop: 10 }}>
              
              {/* Composed Chart: NPL & Dư nợ xấu theo năm */}
              <div style={{ position: 'relative' }}>
                <p style={{ fontSize: 9, fontWeight: 800, color: C.blueText, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, margin: 0 }}>
                  DIỄN BIẾN SỐ DƯ NỢ XẤU ($M) VÀ TỶ LỆ NPL (%) QUA CÁC NĂM (2007 - 2018):
                </p>

                <div style={{ height: 200, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={nplTrendData} margin={{ top: 4, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#eef0f4" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: C.slateBlue, fontSize: 8.5 }} />
                      <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: C.slateBlue, fontSize: 8.5 }}
                        tickFormatter={v => `${v}%`} domain={[0, 22]} />
                      <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: C.slateBlue, fontSize: 8.5 }}
                        tickFormatter={v => `$${v}M`} />
                      <Tooltip content={<ChartTip />} />
                      <Legend wrapperStyle={{ fontSize: 9, fontWeight: 700 }} />
                      <Bar yAxisId="right" dataKey="duNoXau" name="Dư nợ xấu ($M)" fill={C.cyan} opacity={0.35} maxBarSize={20} radius={[1,1,0,0]} />
                      <Line yAxisId="left" type="monotone" dataKey="nplPct" name="Tỷ lệ NPL (%)" stroke={C.danger} strokeWidth={2.5}
                        dot={{ fill: C.danger, r: 2.5 }} activeDot={{ r: 4 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Thống kê bang rủi ro cao nhất */}
              <div>
                <p style={{ fontSize: 9, fontWeight: 800, color: C.blueText, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6, margin: 0 }}>
                  BANG CÓ TỶ LỆ NỢ XẤU CAO NHẤT TOÀN QUỐC (RỦI RO ĐỊA LÝ):
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 9, textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: C.navy, color: C.white }}>
                      <th style={{ padding: '4px 6px', border: `1px solid ${C.border}` }}>Bang</th>
                      <th style={{ padding: '4px 6px', border: `1px solid ${C.border}` }}>Vùng</th>
                      <th style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>Khoản vay</th>
                      <th style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>NPL %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stateRiskData.slice(0, 5).map((row, i) => (
                      <tr key={row.state} style={{ background: i % 2 === 1 ? C.bg : C.white }}>
                        <td style={{ padding: '4px 6px', border: `1px solid ${C.border}`, fontWeight: 700, color: C.navy }}>{row.state}</td>
                        <td style={{ padding: '4px 6px', border: `1px solid ${C.border}`, color: C.slateBlue }}>{row.region}</td>
                        <td style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.slateBlue }}>{row.loans.toLocaleString()}</td>
                        <td style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right', fontWeight: 700, color: C.danger }}>{row.npl}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Bottom Bullets */}
            <BottomBulletInsight 
              title="Phân tích xu hướng chất lượng nợ xấu & Rủi ro vùng địa lý"
              bullets={[
                "Tỷ lệ nợ xấu NPL toàn danh mục được kiểm soát ấn tượng, lao dốc ngoạn mục từ mức đỉnh 18.59% (2015) xuống còn 1.90% (2018) nhờ đóng danh mục cũ.",
                "Miền Nam (South Region) là vùng tập trung rủi ro cao nhất, sở hữu cả 5 bang có tỷ lệ nợ xấu NPL dẫn đầu hệ thống toàn quốc.",
                "Bang Louisiana (LA) giữ tỷ lệ nợ xấu cao kỷ lục ở mức 14.98%, tiếp theo sát nút là Alabama (AL: 14.77%) và Arkansas (AR: 14.77%).",
                "Mô hình xử lý thu hồi nợ xấu sau khi quá hạn phản ứng rất chậm, dẫn tới tỷ lệ thu hồi thực tế ở các nhóm nợ dưới tiêu chuẩn chỉ đạt dưới 10%."
              ]}
            />
          </div>
          
          <SlideFooter pageNum={9} />
        </motion.div>


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 10: PHÂN TÍCH ĐIỂM DỊ BIỆT - THẨM ĐỊNH TÍN DỤNG (SCATTER CHART)
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 4,
            padding: '30px 40px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <SlideDecorations />

          <div>
            <SlideHeader category="04. Thẩm định tín dụng & Outliers" title="Phát hiện lỗ hổng phê duyệt: Khách hàng DTI cực cao vẫn được hưởng lãi suất thấp" />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 24, marginTop: 10 }}>
              
              {/* Scatter Chart: Điểm dị biệt DTI vs Lãi suất */}
              <div style={{ position: 'relative' }}>
                <p style={{ fontSize: 9, fontWeight: 800, color: C.blueText, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, margin: 0 }}>
                  BIỂU ĐỒ PHÂN TÁN (SCATTER CHART) PHÂN TÍCH DTI (%) VS LÃI SUẤT CHO VAY HÀNG NĂM (%):
                </p>

                <div style={{ height: 200, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 8, right: 10, left: -25, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="2 4" stroke="#eef0f4" />
                      <XAxis type="number" dataKey="dti" name="DTI" unit="%" axisLine={false} tickLine={false} tick={{ fill: C.slateBlue, fontSize: 8.5 }} domain={[0, 55]} />
                      <YAxis type="number" dataKey="intRate" name="Lãi suất" unit="%" axisLine={false} tickLine={false} tick={{ fill: C.slateBlue, fontSize: 8.5 }} domain={[0, 35]} />
                      <Tooltip cursor={{ strokeDasharray: '3 3' }} formatter={(v) => [`${v}%`]} />
                      <Legend wrapperStyle={{ fontSize: 8.5, fontWeight: 700 }} />
                      {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((grade, idx) => (
                        <Scatter key={grade} name={`Hạng ${grade}`} data={dtiScatterData.filter(d => d.grade === grade)} fill={GRADE_COLORS[idx]} shape="circle" />
                      ))}
                    </ScatterChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Thống kê Outliers và phân tích điểm dị biệt */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 10.5, color: C.navy }}>
                <div style={{ padding: '8px 12px', border: `1px solid ${C.border}`, borderRadius: 4, background: '#fffbeb', borderLeft: `3px solid ${C.warning}` }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: C.warning, margin: '0 0 2px 0' }}>PHÁT HIỆN LỖ HỔNG HỆ THỐNG:</p>
                  <p style={{ fontSize: 9.5, color: C.slateBlue, lineHeight: 1.4, margin: 0 }}>
                    Nhiều hồ sơ thuộc **Hạng A và B** (mức độ rủi ro thấp) có tỷ lệ **DTI vượt quá ngưỡng cảnh báo nguy hiểm (&gt;45%)** nhưng vẫn được tự động duyệt hưởng lãi suất ưu đãi cực thấp **(&lt;7%)**. Điều này chứng tỏ mô hình thẩm định tự động lõi chưa tích hợp chặt chẽ chỉ số DTI.
                  </p>
                </div>
                
                <div style={{ padding: '8px 12px', border: `1px solid ${C.border}`, borderRadius: 4, background: '#eff6ff', borderLeft: `3px solid ${C.accent}` }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: C.accent, margin: '0 0 2px 0' }}>GIẢI PHÁP TÍCH HỢP CORE-SYSTEM:</p>
                  <p style={{ fontSize: 9.5, color: C.slateBlue, lineHeight: 1.4, margin: 0 }}>
                    Thiết lập quy tắc ràng buộc thép trên Core-banking: Tự động từ chối hồ sơ trực tuyến hoặc đẩy hồ sơ sang chế độ thẩm định thủ công độc lập đối với mọi khoản vay có DTI &gt; 45% bất kể điểm tín dụng cao.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Bullets */}
            <BottomBulletInsight 
              title="Phân tích điểm dị biệt & Khả năng tối ưu hóa lõi phê duyệt tự động"
              bullets={[
                "Phát hiện các điểm Outliers dị biệt lớn: Khách hàng có gánh nặng tài chính cao (DTI > 45%) vẫn hưởng chính sách cho vay ưu đãi cực lớn.",
                "Sự lệch pha giữa DTI thực tế và định giá rủi ro cho thấy lõi chấm điểm tín dụng đang phụ thuộc thái quá vào FICO, bỏ quên DTI.",
                "Quy tắc chặn cứng DTI > 45% tại Core-system sẽ bảo vệ ngân hàng khỏi các khoản nợ xấu tiềm tàng trong tương lai ở nhóm vay đảo nợ.",
                "Tối ưu hóa tham số chấm điểm kết hợp song song FICO & DTI sẽ giúp tăng lãi suất điều chỉnh rủi ro lên nhóm khách hàng rủi ro cận biên."
              ]}
            />
          </div>
          
          <SlideFooter pageNum={10} />
        </motion.div>


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 11: CHAPTER DIVIDER 3 - KẾT QUẢ TÀI CHÍNH & KHUYẾN NGHỊ ĐIỀU HÀNH
            ═════════════════════════════════════════════════════════════════════════ */}
        <ChapterDivider 
          chapterNum={3} 
          title="Kết quả tài chính tổng hợp giai đoạn 2015-2018 & Khuyến nghị điều hành" 
          subtitle="Báo cáo chi tiết cân đối hoạt động, chỉ số NPL phát sinh mới và lãi suất trung bình thu hồi nợ xấu. Tổng hợp các khuyến nghị hành động khẩn cấp và định hướng phòng vệ Q1 2019."
          pageNum={11}
        />


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 12: BẢNG SỐ LIỆU TÀI CHÍNH TỔNG HỢP & KHUYẾN NGHỊ ĐIỀU HÀNH
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 4,
            padding: '30px 40px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <SlideDecorations />

          <div>
            <SlideHeader category="05. Chỉ số tài chính & Khuyến nghị" title="Tóm tắt kết quả hoạt động 2015 - 2018 & Định hướng điều hành" />
            
            {/* Bảng số liệu tài chính tổng hợp */}
            <div style={{ marginTop: 6, position: 'relative' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 8.5, textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: C.navy, color: C.white }}>
                    <th style={{ padding: '4px 6px', border: `1px solid ${C.border}` }}>Chỉ số hoạt động danh mục (triệu USD / %)</th>
                    <th style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>2015</th>
                    <th style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>2016</th>
                    <th style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>2017</th>
                    <th style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>2018</th>
                    <th style={{ padding: '4px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>Thay đổi 18/17</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, fontWeight: 700, background: C.bg }} colSpan="6">I. QUY MÔ HOẠT ĐỘNG</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, paddingLeft: 12 }}>Số lượng khoản vay mới giải ngân (khoản)</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>420,668</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>433,873</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>443,050</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', fontWeight: 600 }}>494,510</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.accent, fontWeight: 700 }}>+11.6%</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, paddingLeft: 12 }}>Doanh số giải ngân mới trong năm (triệu USD)</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>$6,407.1</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>$6,386.9</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>$6,569.3</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', fontWeight: 600 }}>$7,917.4</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.accent, fontWeight: 700 }}>+20.5%</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, fontWeight: 700, background: C.bg }} colSpan="6">II. CHẤT LƯỢNG TÀI SẢN & RỦI RO</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, paddingLeft: 12 }}>Tỷ lệ nợ xấu toàn danh mục (NPL)</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.danger, fontWeight: 500 }}>18.59%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.danger, fontWeight: 500 }}>16.44%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.warning, fontWeight: 500 }}>9.42%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.accent, fontWeight: 700 }}>1.90%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.accent, fontWeight: 700 }}>-7.52%</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, paddingLeft: 12 }}>Số dư nợ xấu mới phát sinh (triệu USD)</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>$1,191.2</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>$1,050.2</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>$618.8</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', fontWeight: 600 }}>$150.8</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.accent, fontWeight: 700 }}>-75.6%</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, fontWeight: 700, background: C.bg }} colSpan="6">III. VẬN HÀNH & HIỆU QUẢ TÀI CHÍNH</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, paddingLeft: 16 }}>Lãi suất giải ngân danh mục bình quan năm</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>12.60%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>12.90%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>13.10%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', fontWeight: 600 }}>13.00%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>-0.10%</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, paddingLeft: 16 }}>Tỷ lệ thu hồi nợ xấu trung bình thực tế</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>7.42%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>7.85%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right' }}>8.12%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', fontWeight: 600 }}>8.35%</td>
                    <td style={{ padding: '3px 6px', border: `1px solid ${C.border}`, textAlign: 'right', color: C.accent, fontWeight: 700 }}>+0.23%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Các khuyến nghị điều hành chính */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 10 }}>
              <div>
                <p style={{ fontSize: 8.5, fontWeight: 800, color: C.danger, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, margin: 0 }}>
                  KHUYẾN NGHỊ KHẨN CẤP (Hành động trong 30 ngày):
                </p>
                <div style={{ fontSize: 9, color: C.slateBlue, lineHeight: 1.4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <p style={{ margin: 0 }}>
                    <strong>1. Thắt chặt phê duyệt mảng Đảo nợ:</strong> Giảm ngay tỷ trọng cho vay mục đích đảo nợ xuống dưới mức 40% (hiện tại là 56.6%). Áp đặt hạn mức trần DTI nghiêm ngặt tối đa 35% cho nhóm khách hàng này.
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>2. Tạm ngừng phê duyệt Grade F & G:</strong> Tỷ lệ nợ xấu NPL của hai hạng này quá lớn (35% và 37%), trong khi tỷ lệ thu hồi dưới 10%. Cần ngừng phê duyệt mới cho tới khi tối ưu hóa thành công mô hình thu hồi nợ.
                  </p>
                </div>
              </div>
              
              <div>
                <p style={{ fontSize: 8.5, fontWeight: 800, color: C.warning, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4, margin: 0 }}>
                  ĐỊNH HƯỚNG PHÁT TRIỂN & CHỐNG PHÒNG VỆ (Q1 2019):
                </p>
                <div style={{ fontSize: 9, color: C.slateBlue, lineHeight: 1.4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <p style={{ margin: 0 }}>
                    <strong>1. Mở rộng phân khúc cốt lõi A–C:</strong> Tiếp tục dịch chuyển dòng vốn sang nhóm khách hàng có chất lượng điểm tín dụng cao (Grade A-C). Mục tiêu nâng tỷ trọng nhóm này từ 77.2% lên 85% tổng dư nợ giải ngân.
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>2. Triển khai mô hình thu hồi nợ sớm (Early Warning):</strong> Thiết lập cảnh báo và liên hệ khách hàng ngay sau 15 ngày trễ hạn thay vì 90 ngày như hiện tại để nâng tỷ lệ thu hồi nợ xấu lên mục tiêu 15%.
                  </p>
                </div>
              </div>
            </div>

          </div>
          
          <SlideFooter pageNum={12} />
        </motion.div>


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 13: TẦM NHÌN CHIẾN LƯỢC & CÁC MẢNG NỘI DUNG SẮP TRIỂN KHAI (FUTURE HORIZON ROADMAP - NEW)
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 4,
            padding: '30px 40px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <SlideDecorations />

          <div>
            <SlideHeader category="Future Roadmaps" title="Lộ trình Chiến lược & Các mảng nghiên cứu sắp triển khai" />
            
            <p style={{ fontSize: 11, color: C.slateBlue, margin: '6px 0 14px 0', lineHeight: 1.5 }}>
              Khối Rủi ro đề xuất lộ trình tích hợp công nghệ và nâng cấp chuẩn mực quản trị VDCB giai đoạn 2019-2022. Đây là những mảng nội dung cốt lõi giúp phòng vệ rủi ro chủ động và tối ưu hóa chi phí dự phòng trong trung hạn.
            </p>

            {/* Thumbnail Roadmap dạng timeline ngang */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {[
                { 
                  stage: 'Q1-Q2/2019', 
                  title: 'AI Engine Lõi v2.0', 
                  desc: 'Tích hợp gánh nặng DTI và chỉ số ổn định thu nhập thực tế của khách hàng vào mô hình duyệt tự động. Giảm tỷ lệ phê duyệt sai lầm đối với khách hàng đảo nợ.',
                  bg: `linear-gradient(135deg, rgba(22, 82, 240, 0.04) 0%, rgba(6, 182, 212, 0.04) 100%)`
                },
                { 
                  stage: 'Q3-Q4/2019', 
                  title: 'Tín dụng Xanh ESG', 
                  desc: 'Ban hành khung quản trị rủi ro môi trường xã hội (ESG). Ra mắt gói tín dụng lãi suất ưu đãi cho tiêu dùng xanh, tiết kiệm năng lượng, xây dựng vị thế ngân hàng nhân văn.',
                  bg: `linear-gradient(135deg, rgba(6, 182, 212, 0.04) 0%, rgba(26, 58, 110, 0.04) 100%)`
                },
                { 
                  stage: '2020', 
                  title: 'Open Banking API', 
                  desc: 'Kết nối API trực tiếp với các ví điện tử hàng đầu (Momo, ZaloPay) và cổng hành chính công để tự động xác minh thông tin thuế, bảo hiểm xã hội của người vay.',
                  bg: `linear-gradient(135deg, rgba(26, 58, 110, 0.04) 0%, rgba(22, 82, 240, 0.04) 100%)`
                },
                { 
                  stage: '2021-2022', 
                  title: 'Hành trình IPO', 
                  desc: 'Hoàn thiện hồ sơ minh bạch hóa rủi ro tài sản theo chuẩn mực kế toán quốc tế IFRS 9. Triển khai kế hoạch phát hành cổ phiếu lần đầu (IPO) ra thị trường quốc tế.',
                  bg: `linear-gradient(135deg, rgba(22, 82, 240, 0.05) 0%, rgba(6, 182, 212, 0.06) 100%)`
                }
              ].map((item, i) => (
                <div 
                  key={i} 
                  style={{
                    background: item.bg,
                    border: `1.2px solid ${C.border}`,
                    borderRadius: 6,
                    padding: 12,
                    boxSizing: 'border-box',
                    height: 175,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 9.5, fontWeight: 900, color: C.accent }}>{item.stage}</span>
                    </div>
                    <h4 style={{ fontSize: 10.5, fontWeight: 800, color: C.navy, margin: '4px 0' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: 8, color: C.slateBlue, margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                  <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 7.5, color: C.blueText, fontWeight: 600 }}>Trạng thái: Đang chuẩn bị</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Cam kết định hướng */}
            <div style={{ background: C.bg, border: `1px solid ${C.border}`, padding: '6px 12px', borderRadius: 4, fontSize: 8.5, color: C.slateBlue, marginTop: 8 }}>
              <em>Lộ trình trên đã được Hội đồng Khoa học & Ban quản trị Rủi ro phê chuẩn thông qua định hướng hành động chiến lược.</em>
            </div>
          </div>
          <SlideFooter pageNum={13} />
        </motion.div>


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 14: KẾT LUẬN CHUNG (EXECUTIVE CONCLUSION SLIDE - NEW)
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: C.white,
            border: `1.5px solid ${C.border}`,
            borderRadius: 4,
            padding: '30px 40px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative'
          }}
        >
          <SlideDecorations />

          <div>
            <SlideHeader category="Executive Conclusion" title="Kết luận chung: Dịch chuyển trọng tâm sang Chất lượng tài sản bền vững" />
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 18 }}>
              
              {/* Cột trái: Kết quả đạt được */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 9.5, fontWeight: 800, color: C.accent, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 2px 0' }}>
                  KẾT QUẢ ĐẠT ĐƯỢC CHỦ CHỐT (KEY ACHIEVEMENTS):
                </p>
                
                {[
                  { title: 'Tốc độ tăng trưởng giải ngân ổn định:', desc: 'Quy mô đạt $33.95 tỷ USD lũy kế, đặc biệt năm 2018 đạt mức đỉnh lịch sử $7.92 tỷ USD (+20.5% yoy).' },
                  { title: 'Kiểm soát nợ xấu NPL thành công xuất sắc:', desc: 'NPL giảm sâu ấn tượng từ 18.59% (2015) xuống 1.90% (2018) nhờ đóng băng và xử lý dứt điểm tàn dư danh mục cũ.' },
                  { title: 'Cơ cấu tín dụng lõi vững chắc:', desc: 'Nhóm khách hàng có chất lượng điểm tín dụng cao (Grade A-C) chiếm giữ vị thế xương sống áp đảo 77.2% dư nợ.' }
                ].map((item, idx) => (
                  <div key={idx}>
                    <p style={{ fontSize: 10.5, fontWeight: 800, color: C.navy, margin: '0 0 2px 0' }}>{item.title}</p>
                    <p style={{ fontSize: 9.5, color: C.slateBlue, margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Cột phải: Khuyến nghị & Hành động phòng vệ */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 9.5, fontWeight: 800, color: C.danger, textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 2px 0' }}>
                  HÀNH ĐỘNG PHÒNG VỆ RỦI RO CHIẾN LƯỢC:
                </p>
                
                {[
                  { title: 'Khóa cứng gánh nặng DTI trên hệ thống Lõi:', desc: 'Áp dụng quy tắc chặn thép DTI > 45% tại Core-banking để loại trừ các hồ sơ tín dụng cận biên ảo ảnh hưởng bởi FICO.' },
                  { title: 'Tái cơ cấu rủi ro tập trung Đảo nợ:', desc: 'Giảm ngay tỷ trọng cho vay mục đích đảo nợ (hiện tại 56.6%) xuống dưới mức an toàn 40% để tránh rủi ro lây lan hệ thống.' },
                  { title: 'Tạm ngừng cho vay phân khúc rủi ro cao Grade F & G:', desc: 'Dừng hoàn toàn cấp mới cho nhóm có tỷ lệ nợ xấu > 35% cho tới khi tối ưu hóa được mô hình thu hồi nợ muộn.' }
                ].map((item, idx) => (
                  <div key={idx}>
                    <p style={{ fontSize: 10.5, fontWeight: 800, color: C.navy, margin: '0 0 2px 0' }}>{item.title}</p>
                    <p style={{ fontSize: 9.5, color: C.slateBlue, margin: 0, lineHeight: 1.4 }}>{item.desc}</p>
                  </div>
                ))}
              </div>

            </div>

            {/* Triết lý phát triển chốt hạ */}
            <div style={{
              marginTop: 14,
              padding: '10px 14px',
              background: `linear-gradient(135deg, rgba(22, 82, 240, 0.05) 0%, rgba(6, 182, 212, 0.05) 100%)`,
              border: `1.2px solid ${C.border}`,
              borderRadius: 6,
              fontSize: 10,
              color: C.navy,
              fontWeight: 700,
              lineHeight: 1.5,
              textAlign: 'center'
            }}>
              <span><em>Quyết tâm hành động VDCB: Không đánh đổi chất lượng lấy quy mô tăng trưởng nóng. Quản trị rủi ro tốt chính là nền tảng cốt tủy sinh ra lợi nhuận ròng lâu dài cho cổ đông.</em></span>
            </div>
          </div>
          <SlideFooter pageNum={14} />
        </motion.div>


        {/* ═════════════════════════════════════════════════════════════════════════
            SLIDE 15: TRANG CẢM ƠN VÀ KHÉP LẠI (THANK YOU & CLOSING SLIDE)
            ═════════════════════════════════════════════════════════════════════════ */}
        <motion.div 
          className="report-slide report-slide-dark"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: `linear-gradient(135deg, #020617 0%, #0a1f44 100%)`,
            color: C.white,
            borderRadius: 4,
            padding: '60px 48px',
            minHeight: 520,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            border: '1px solid #000',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 8.5, fontWeight: 800, color: C.cyan, letterSpacing: '0.15em' }}>VDCB DIGITAL BANK</span>
            <span style={{ fontSize: 8.5, fontWeight: 800, color: '#a0aec0', letterSpacing: '0.08em' }}>FINISH</span>
          </div>

          <div style={{ textAlign: 'left', margin: 'auto 0', maxWidth: 680 }}>
            <div style={{ width: 40, height: 4, background: C.cyan, marginBottom: 20 }} />
            <p style={{ fontSize: 11, fontWeight: 800, color: C.cyan, textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 6px 0' }}>
              TÀI LIỆU KHÉP LẠI PHIÊN HỌP
            </p>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: C.white, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 12 }}>
              TRÂN TRỌNG CẢM ƠN!
            </h1>
            <p style={{ fontSize: 12.5, color: C.lightBlueText, fontWeight: 500, lineHeight: 1.6, marginBottom: 20 }}>
              Ban dự án Quản trị Rủi ro & Phân tích Dữ liệu BI VDCB trân trọng gửi lời cảm ơn sâu sắc tới Ban lãnh đạo ngân hàng, các thành viên Hội đồng cố vấn chiến lược và Quý nhà đầu tư đã dành thời gian quý báu theo dõi và phản biện báo cáo kết quả hoạt động danh mục của chúng tôi.
            </p>
            <p style={{ fontSize: 10.5, color: C.cyan, fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>
              Mọi câu hỏi và ý kiến phản hồi xin liên hệ: Phòng Quan hệ Nhà đầu tư (IR Department) · ir@vdcb.com.vn
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 16 }}>
            <span style={{ fontSize: 8, color: '#a0aec0' }}>Báo cáo Công bố Kết quả Kinh doanh & Quản trị Rủi ro Q4/2018</span>
            <span style={{ fontSize: 8, color: '#a0aec0', fontFamily: 'monospace' }}>Slide 15/15</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ReportsPage;
