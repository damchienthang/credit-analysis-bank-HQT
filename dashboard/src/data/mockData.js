export const kpiData = [
  { label: 'Tổng khoản vay', value: '2,260,701', trend: '+5.2%', icon: 'Database' },
  { label: 'Tỷ lệ nợ xấu (NPL)', value: '14.2%', trend: '+0.8%', icon: 'ShieldAlert', risk: true },
  { label: 'Dư nợ hiện tại', value: '$32.5B', trend: '+12.4%', icon: 'Banknote' },
  { label: 'Tỷ lệ thu hồi', value: '58.3%', trend: '+2.1%', icon: 'TrendingUp' },
];

export const loanGradeData = [
  { name: 'Grade A', value: 433056, color: '#22c55e' },
  { name: 'Grade B', value: 663557, color: '#84cc16' },
  { name: 'Grade C', value: 650053, color: '#eab308' },
  { name: 'Grade D', value: 324424, color: '#f97316' },
  { name: 'Grade E', value: 135639, color: '#ef4444' },
  { name: 'Grade F', value: 41800, color: '#b91c1c' },
  { name: 'Grade G', value: 12172, color: '#7f1d1d' },
];

export const loanTrendData = [
  { year: '2007', amount: 5 },
  { year: '2008', amount: 20 },
  { year: '2009', amount: 50 },
  { year: '2010', amount: 150 },
  { year: '2011', amount: 350 },
  { year: '2012', amount: 800 },
  { year: '2013', amount: 1500 },
  { year: '2014', amount: 2800 },
  { year: '2015', amount: 4500 },
  { year: '2016', amount: 6200 },
  { year: '2017', amount: 8400 },
  { year: '2018', amount: 10500 },
];

export const loanPurposeData = [
  { name: 'Debt Consolidation', value: 50, color: '#003366' },
  { name: 'Credit Card', value: 25, color: '#0052A5' },
  { name: 'Home Improvement', value: 10, color: '#06b6d4' },
  { name: 'Small Business', value: 8, color: '#D1D5DB' },
  { name: 'Other', value: 7, color: '#9CA3AF' },
];

export const recoveryData = [
  { month: 'Jan', recovery: 400, chargeOff: 240 },
  { month: 'Feb', recovery: 300, chargeOff: 139 },
  { month: 'Mar', recovery: 200, chargeOff: 980 },
  { month: 'Apr', recovery: 278, chargeOff: 390 },
  { month: 'May', recovery: 189, chargeOff: 480 },
  { month: 'Jun', recovery: 239, chargeOff: 380 },
];

export const stateRiskData = [
  { state: 'California', loans: 320145, npl: '12.5%', recovery: '62%', risk: 'Low' },
  { state: 'New York', loans: 215432, npl: '15.2%', recovery: '55%', risk: 'Medium' },
  { state: 'Texas', loans: 189543, npl: '14.8%', recovery: '58%', risk: 'Medium' },
  { state: 'Florida', loans: 156432, npl: '18.4%', recovery: '48%', risk: 'High' },
  { state: 'Illinois', loans: 98543, npl: '13.2%', recovery: '60%', risk: 'Low' },
];
