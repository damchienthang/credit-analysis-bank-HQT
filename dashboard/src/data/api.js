// src/data/api.js
// Fetch từ backend Express → SQL Server thực
// Fallback về mockData nếu backend không khả dụng

import {
  kpiData as mockKpi,
  loanGradeData as mockGrade,
  loanTrendData as mockTrend,
  loanPurposeData as mockPurpose,
  recoveryData as mockRecovery,
  stateRiskData as mockState,
} from './mockData';

const BASE = 'http://localhost:3001/api';

async function safeFetch(url, fallback) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch {
    console.warn('[API] Offline – using mock data for:', url);
    return fallback;
  }
}

export async function fetchKpi()         { const d = await safeFetch(`${BASE}/kpi`, { kpiData: mockKpi }); return d.kpiData; }
export async function fetchLoanGrade()   { return safeFetch(`${BASE}/loan-grade`,   mockGrade);   }
export async function fetchLoanTrend()   { return safeFetch(`${BASE}/loan-trend`,   mockTrend);   }
export async function fetchLoanPurpose() { return safeFetch(`${BASE}/loan-purpose`, mockPurpose); }
export async function fetchRecovery()    { return safeFetch(`${BASE}/recovery`,      mockRecovery);}
export async function fetchStateRisk()   { return safeFetch(`${BASE}/state-risk`,    mockState);   }
