// ── Số liệu thực từ SQL Server (đã xác nhận qua /outputs/KPIs) ──────────────

// KPI 1: Tổng dư nợ hiện tại = 948,982,607
// KPI 2: Tổng giải ngân = 33,949,279,200 | Tỷ lệ hoàn trả = 80.3%
// KPI 3: Tổng nợ xấu = 4,177,078,700 | NPL = 12.3%

export const kpiData = [
  { label: 'Tổng khoản vay',       value: '2,257,084',  sub: 'Toàn danh mục 2007–2018', icon: 'Database',    color: '#1652f0' },
  { label: 'Tỷ lệ nợ xấu (NPL)',   value: '12,3%',      sub: 'Ngưỡng cảnh báo: 15%',    icon: 'ShieldAlert', color: '#b91c1c', risk: true, threshold: 15 },
  { label: 'Tổng dư nợ hiện tại',  value: '$949M',      sub: 'Dư nợ gốc chưa thu hồi', icon: 'Banknote',    color: '#1652f0' },
  { label: 'Tỷ lệ hoàn trả',       value: '80,3%',      sub: 'Mục tiêu: ≥ 75%',         icon: 'TrendingUp',  color: '#166534', target: 75 },
];

// KPI 4a: Phân bổ theo hạng tín dụng (số khoản vay + tỷ trọng %)
export const loanGradeData = [
  { name: 'A', value: 432226,  pct: 19.14, color: '#166534' },
  { name: 'B', value: 662757,  pct: 29.35, color: '#2d7a3a' },
  { name: 'C', value: 649478,  pct: 28.76, color: '#5e6a7a' },
  { name: 'D', value: 324169,  pct: 14.36, color: '#92400e' },
  { name: 'E', value: 135534,  pct: 6.00,  color: '#b91c1c' },
  { name: 'F', value: 41767,   pct: 1.85,  color: '#991b1b' },
  { name: 'G', value: 12153,   pct: 0.54,  color: '#7f1d1d' },
];

// KPI 5: Tỷ lệ rủi ro (nợ xấu) theo hạng — dùng cho combo chart
export const gradeRiskData = [
  { grade: 'A', soKhoan: 432226,  giaiNgan: 6302,  riskPct: 3.09  },
  { grade: 'B', soKhoan: 662757,  giaiNgan: 9385,  riskPct: 7.59  },
  { grade: 'C', soKhoan: 649478,  giaiNgan: 9761,  riskPct: 12.94 },
  { grade: 'D', soKhoan: 324169,  giaiNgan: 5091,  riskPct: 19.19 },
  { grade: 'E', soKhoan: 135534,  giaiNgan: 2365,  riskPct: 27.65 },
  { grade: 'F', soKhoan: 41767,   giaiNgan: 799,   riskPct: 35.52 },
  { grade: 'G', soKhoan: 12153,   giaiNgan: 248,   riskPct: 37.71 },
];

// KPI 7: Xu hướng giải ngân theo năm (triệu USD)
export const loanTrendData = [
  { year: '2007', amount: 4.8,    soKhoan: 572    },
  { year: '2008', amount: 21.1,   soKhoan: 2391   },
  { year: '2009', amount: 51.7,   soKhoan: 5267   },
  { year: '2010', amount: 131.6,  soKhoan: 12506  },
  { year: '2011', amount: 261.5,  soKhoan: 21710  },
  { year: '2012', amount: 717.6,  soKhoan: 53335  },
  { year: '2013', amount: 1980.6, soKhoan: 134738 },
  { year: '2014', amount: 3499.4, soKhoan: 235464 },
  { year: '2015', amount: 6407.1, soKhoan: 420668 },
  { year: '2016', amount: 6386.9, soKhoan: 433873 },
  { year: '2017', amount: 6569.3, soKhoan: 443050 },
  { year: '2018', amount: 7917.4, soKhoan: 494510 },
];

// KPI 13: NPL ratio theo năm — dùng cho line chart
export const nplTrendData = [
  { year: '2007', nplPct: 9.62,  duNoXau: 0.46   },
  { year: '2008', nplPct: 12.99, duNoXau: 2.74   },
  { year: '2009', nplPct: 12.06, duNoXau: 6.24   },
  { year: '2010', nplPct: 12.12, duNoXau: 15.95  },
  { year: '2011', nplPct: 16.58, duNoXau: 43.34  },
  { year: '2012', nplPct: 17.73, duNoXau: 127.24 },
  { year: '2013', nplPct: 16.64, duNoXau: 329.51 },
  { year: '2014', nplPct: 18.30, duNoXau: 640.56 },
  { year: '2015', nplPct: 18.59, duNoXau: 1191.16},
  { year: '2016', nplPct: 16.44, duNoXau: 1050.24},
  { year: '2017', nplPct: 9.42,  duNoXau: 618.84 },
  { year: '2018', nplPct: 1.90,  duNoXau: 150.79 },
];

// KPI 4b: Mục đích vay — top 5 (tính % từ tổng 2,257,084)
export const loanPurposeData = [
  { name: 'Đảo nợ',          key: 'debt_consolidation', value: 56.6, soKhoan: 1276708, color: '#0a1f44' },
  { name: 'Thẻ tín dụng',    key: 'credit_card',        value: 22.9, soKhoan: 516469,  color: '#1652f0' },
  { name: 'Cải tạo nhà',     key: 'home_improvement',   value: 6.6,  soKhoan: 150052,  color: '#5e6a7a' },
  { name: 'Mua sắm',         key: 'other',              value: 6.2,  soKhoan: 139195,  color: '#8e99a8' },
  { name: 'Khác',            key: 'others',             value: 7.7,  soKhoan: 174660,  color: '#bcc3ce' },
];

// KPI 4c: Theo vùng địa lý
export const regionData = [
  { region: 'South',     soKhoan: 810403,  giaiNgan: 12263, laiSuat: 13.17 },
  { region: 'West',      soKhoan: 580661,  giaiNgan: 8764,  laiSuat: 13.02 },
  { region: 'Northeast', soKhoan: 464232,  giaiNgan: 7003,  laiSuat: 13.09 },
  { region: 'Midwest',   soKhoan: 402788,  giaiNgan: 5919,  laiSuat: 13.06 },
];

// KPI 11: Top bang NPL cao nhất
export const stateRiskData = [
  { state: 'LA', name: 'Louisiana',    region: 'South',     loans: 25737,  npl: 14.98, nplRaw: 14.98 },
  { state: 'AL', name: 'Alabama',      region: 'South',     loans: 27269,  npl: 14.77, nplRaw: 14.77 },
  { state: 'AR', name: 'Arkansas',     region: 'South',     loans: 17062,  npl: 14.77, nplRaw: 14.77 },
  { state: 'OK', name: 'Oklahoma',     region: 'South',     loans: 20678,  npl: 14.43, nplRaw: 14.43 },
  { state: 'MS', name: 'Mississippi',  region: 'South',     loans: 12630,  npl: 14.28, nplRaw: 14.28 },
  { state: 'NM', name: 'New Mexico',   region: 'West',      loans: 11978,  npl: 13.76, nplRaw: 13.76 },
  { state: 'NV', name: 'Nevada',       region: 'West',      loans: 32611,  npl: 13.68, nplRaw: 13.68 },
  { state: 'NY', name: 'New York',     region: 'Northeast', loans: 185996, npl: 13.65, nplRaw: 13.65 },
];

// KPI 8: Lãi suất theo hạng (dùng cho scatter/bar)
export const interestByGrade = [
  { grade: 'A', laiSuatTB: 7.08,  laiMin: 5.31, laiMax: 9.63  },
  { grade: 'B', laiSuatTB: 10.68, laiMin: 6,    laiMax: 14.09 },
  { grade: 'C', laiSuatTB: 14.14, laiMin: 6,    laiMax: 17.27 },
  { grade: 'D', laiSuatTB: 18.14, laiMin: 6,    laiMax: 22.35 },
  { grade: 'E', laiSuatTB: 21.83, laiMin: 6,    laiMax: 27.27 },
  { grade: 'F', laiSuatTB: 25.45, laiMin: 6,    laiMax: 30.75 },
  { grade: 'G', laiSuatTB: 28.08, laiMin: 6,    laiMax: 30.99 },
];

// KPI 9: DTI theo mức rủi ro (dùng cho scatter insight)
export const dtiByRisk = [
  { mucRuiRo: 'Low',     soKhoan: 1955438, dtiTB: 18.63, laiSuatTB: 12.69 },
  { mucRuiRo: 'Medium',  soKhoan: 8423,    dtiTB: 20.54, laiSuatTB: 15.47 },
  { mucRuiRo: 'Default', soKhoan: 268441,  dtiTB: 20.18, laiSuatTB: 15.71 },
  { mucRuiRo: 'High',    soKhoan: 25782,   dtiTB: 20.07, laiSuatTB: 15.60 },
];

// KPI 12: Thu hồi nợ theo hạng
export const recoveryByGrade = [
  { grade: 'A', soNoXau: 14189, tyLeHoiPct: 5.91  },
  { grade: 'B', soNoXau: 52534, tyLeHoiPct: 6.64  },
  { grade: 'C', soNoXau: 85619, tyLeHoiPct: 7.45  },
  { grade: 'D', soNoXau: 61039, tyLeHoiPct: 7.98  },
  { grade: 'E', soNoXau: 36017, tyLeHoiPct: 8.83  },
  { grade: 'F', soNoXau: 14486, tyLeHoiPct: 9.53  },
  { grade: 'G', soNoXau: 4557,  tyLeHoiPct: 9.71  },
];

// KPI 9: Chi tiết các điểm dữ liệu DTI vs Lãi suất cho biểu đồ Scatter Chart (Outliers)
export const dtiScatterData = [
  // Hạng A
  { grade: 'A', dti: 12.4, intRate: 5.32 },
  { grade: 'A', dti: 15.6, intRate: 6.08 },
  { grade: 'A', dti: 22.1, intRate: 7.24 },
  { grade: 'A', dti: 28.5, intRate: 8.59 },
  { grade: 'A', dti: 34.2, intRate: 9.15 },
  { grade: 'A', dti: 48.2, intRate: 6.50 }, // Outlier!
  
  // Hạng B
  { grade: 'B', dti: 14.2, intRate: 9.99 },
  { grade: 'B', dti: 18.9, intRate: 10.65 },
  { grade: 'B', dti: 25.4, intRate: 11.89 },
  { grade: 'B', dti: 31.8, intRate: 12.99 },
  { grade: 'B', dti: 36.5, intRate: 13.50 },
  { grade: 'B', dti: 46.8, intRate: 10.05 }, // Outlier!

  // Hạng C
  { grade: 'C', dti: 16.5, intRate: 13.99 },
  { grade: 'C', dti: 21.2, intRate: 14.15 },
  { grade: 'C', dti: 27.8, intRate: 14.99 },
  { grade: 'C', dti: 33.4, intRate: 15.65 },
  { grade: 'C', dti: 39.9, intRate: 16.99 },

  // Hạng D
  { grade: 'D', dti: 19.5, intRate: 17.99 },
  { grade: 'D', dti: 24.8, intRate: 18.25 },
  { grade: 'D', dti: 30.1, intRate: 19.50 },
  { grade: 'D', dti: 35.6, intRate: 20.89 },
  { grade: 'D', dti: 41.2, intRate: 21.99 },

  // Hạng E
  { grade: 'E', dti: 22.4, intRate: 21.99 },
  { grade: 'E', dti: 28.1, intRate: 22.85 },
  { grade: 'E', dti: 34.5, intRate: 24.50 },
  { grade: 'E', dti: 40.8, intRate: 25.99 },

  // Hạng F & G
  { grade: 'F', dti: 26.5, intRate: 25.50 },
  { grade: 'F', dti: 38.2, intRate: 28.15 },
  { grade: 'G', dti: 29.8, intRate: 28.08 },
  { grade: 'G', dti: 42.5, intRate: 30.99 },
];

