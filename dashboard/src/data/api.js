// src/data/api.js
import {
  kpiData, loanGradeData, loanTrendData, loanPurposeData,
  regionData, stateRiskData, nplTrendData, gradeRiskData,
  interestByGrade, dtiByRisk, recoveryByGrade,
} from './mockData';

const BASE = 'http://localhost:3001/api';

async function safeFetch(url, fallback) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.json();
  } catch {
    return fallback;
  }
}

export const fetchKpi           = () => safeFetch(`${BASE}/kpi`,            kpiData);
export const fetchLoanGrade     = () => safeFetch(`${BASE}/loan-grade`,     loanGradeData);
export const fetchLoanTrend     = () => safeFetch(`${BASE}/loan-trend`,     loanTrendData);
export const fetchLoanPurpose   = () => safeFetch(`${BASE}/loan-purpose`,   loanPurposeData);
export const fetchRegion        = () => safeFetch(`${BASE}/region`,         regionData);
export const fetchStateRisk     = () => safeFetch(`${BASE}/state-risk`,     stateRiskData);
export const fetchNplTrend      = () => safeFetch(`${BASE}/npl-trend`,      nplTrendData);
export const fetchGradeRisk     = () => safeFetch(`${BASE}/grade-risk`,     gradeRiskData);
export const fetchInterestGrade = () => safeFetch(`${BASE}/interest-grade`, interestByGrade);
export const fetchDtiRisk       = () => safeFetch(`${BASE}/dti-risk`,       dtiByRisk);
export const fetchRecovery      = () => safeFetch(`${BASE}/recovery`,       recoveryByGrade);
