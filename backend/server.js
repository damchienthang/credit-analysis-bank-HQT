const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// ── SQL Server config (SQL Server Authentication) ────────────────────────────
const dbConfig = {
  server: 'DAMTHANG\\CLCCSDLPTNHOM4',
  database: 'CreditBI_DB',
  user: 'creditbi_app',
  password: 'CreditBI@2024!',
  options: {
    trustServerCertificate: true,
    enableArithAbort: true,
    encrypt: false,
  },
};

// ── Connection pool ───────────────────────────────────────────────────────────
let pool;
async function getPool() {
  if (!pool) {
    pool = await sql.connect(dbConfig);
    console.log('✅ Connected to SQL Server:', dbConfig.server, '/', dbConfig.database);
  }
  return pool;
}

// ── Helper: query wrapper ─────────────────────────────────────────────────────
async function query(q) {
  const p = await getPool();
  const result = await p.request().query(q);
  return result.recordset;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ENDPOINTS
// ═══════════════════════════════════════════════════════════════════════════════

// 1. KPI tổng quan ─────────────────────────────────────────────────────────────
app.get('/api/kpi', async (req, res) => {
  try {
    const rows = await query(`
      SELECT
        COUNT(*)                                          AS total_loans,
        CAST(SUM(fl.loan_amnt) / 1e9 AS DECIMAL(10,1))   AS total_amount_b,
        CAST(
          100.0 * SUM(CASE WHEN dcr.npl_flag = 1 THEN 1 ELSE 0 END)
          / COUNT(*) AS DECIMAL(5,1)
        )                                                 AS npl_rate,
        CAST(
          100.0 * SUM(fl.recoveries) / NULLIF(SUM(fl.loan_amnt), 0)
          AS DECIMAL(5,1)
        )                                                 AS recovery_rate
      FROM Fact_Loans fl
      LEFT JOIN Dim_CreditRisk dcr ON fl.risk_id = dcr.risk_id
    `);
    const r = rows[0];
    res.json({
      kpiData: [
        { label: 'Tổng khoản vay',     value: Number(r.total_loans).toLocaleString('en'), trend: '', icon: 'Database' },
        { label: 'Tỷ lệ nợ xấu (NPL)', value: r.npl_rate + '%',                          trend: '', icon: 'ShieldAlert', risk: true },
        { label: 'Dư nợ hiện tại',     value: '$' + r.total_amount_b + 'B',               trend: '', icon: 'Banknote' },
        { label: 'Tỷ lệ thu hồi',      value: r.recovery_rate + '%',                      trend: '', icon: 'TrendingUp' },
      ]
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Phân bổ theo Grade ────────────────────────────────────────────────────────
app.get('/api/loan-grade', async (req, res) => {
  try {
    const rows = await query(`
      SELECT dlp.grade AS name, COUNT(*) AS value
      FROM Fact_Loans fl
      JOIN Dim_LoanProduct dlp ON fl.product_id = dlp.product_id
      GROUP BY dlp.grade
      ORDER BY dlp.grade
    `);
    const colors = ['#22c55e','#84cc16','#eab308','#f97316','#ef4444','#b91c1c','#7f1d1d'];
    res.json(rows.map((r, i) => ({ ...r, name: 'Grade ' + r.name, color: colors[i] || '#9CA3AF' })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Xu hướng vay theo năm ─────────────────────────────────────────────────────
app.get('/api/loan-trend', async (req, res) => {
  try {
    const rows = await query(`
      SELECT dt.issue_year AS year, COUNT(*) AS amount
      FROM Fact_Loans fl
      JOIN Dim_Time dt ON fl.time_id = dt.time_id
      GROUP BY dt.issue_year
      ORDER BY dt.issue_year
    `);
    res.json(rows.map(r => ({ year: String(r.year), amount: r.amount })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Mục đích vay (top 5) ──────────────────────────────────────────────────────
app.get('/api/loan-purpose', async (req, res) => {
  try {
    const rows = await query(`
      SELECT TOP 5
        dlp.purpose AS name,
        CAST(100.0 * COUNT(*) / SUM(COUNT(*)) OVER() AS DECIMAL(5,1)) AS value
      FROM Fact_Loans fl
      JOIN Dim_LoanProduct dlp ON fl.product_id = dlp.product_id
      GROUP BY dlp.purpose
      ORDER BY COUNT(*) DESC
    `);
    const colors = ['#003366','#0052A5','#D4AF37','#D1D5DB','#9CA3AF'];
    res.json(rows.map((r, i) => ({ ...r, color: colors[i] })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 5. Recovery vs Charge-off (theo năm) ───────────────────────────────────────
app.get('/api/recovery', async (req, res) => {
  try {
    const rows = await query(`
      SELECT TOP 8
        CAST(dt.issue_year AS VARCHAR) AS month,
        CAST(SUM(fl.recoveries)/1000 AS DECIMAL(10,1))                      AS recovery,
        CAST(SUM(fl.total_pymnt - fl.recoveries)/1000 AS DECIMAL(10,1))     AS chargeOff
      FROM Fact_Loans fl
      JOIN Dim_Time dt ON fl.time_id = dt.time_id
      JOIN Dim_CreditRisk dcr ON fl.risk_id = dcr.risk_id
      WHERE dcr.npl_flag = 1
      GROUP BY dt.issue_year
      ORDER BY dt.issue_year
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Rủi ro theo bang (top 5) ──────────────────────────────────────────────────
app.get('/api/state-risk', async (req, res) => {
  try {
    const rows = await query(`
      SELECT TOP 5
        dg.addr_state                                             AS state,
        COUNT(*)                                                  AS loans,
        CAST(100.0*SUM(dcr.npl_flag)/COUNT(*) AS DECIMAL(5,1))   AS npl,
        CAST(100.0*SUM(fl.recoveries)/NULLIF(SUM(fl.loan_amnt),0) AS DECIMAL(5,1)) AS recovery
      FROM Fact_Loans fl
      JOIN Dim_Geography   dg  ON fl.geo_id   = dg.geo_id
      JOIN Dim_CreditRisk  dcr ON fl.risk_id  = dcr.risk_id
      GROUP BY dg.addr_state
      ORDER BY COUNT(*) DESC
    `);
    res.json(rows.map(r => ({
      state:    r.state,
      loans:    r.loans,
      npl:      r.npl + '%',
      recovery: r.recovery + '%',
      risk:     r.npl > 16 ? 'High' : r.npl > 13 ? 'Medium' : 'Low',
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Health check ───────────────────────────────────────────────────────────────
app.get('/api/health', (_, res) => res.json({ status: 'ok', time: new Date() }));

// ── Start server ───────────────────────────────────────────────────────────────
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  console.log(`   → SQL Server: ${dbConfig.server} / ${dbConfig.database}`);
});
