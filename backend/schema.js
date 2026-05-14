const sql = require('mssql');
const cfg = {
  server: 'DAMTHANG\\CLCCSDLPTNHOM4',
  database: 'CreditBI_DB',
  user: 'creditbi_app',
  password: 'CreditBI@2024!',
  options: { trustServerCertificate: true, encrypt: false }
};
sql.connect(cfg)
  .then(pool => pool.request().query(
    "SELECT TABLE_NAME, COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME IN ('Fact_Loans','Dim_LoanProduct','Dim_Time','Dim_Geography','Dim_CreditRisk') ORDER BY TABLE_NAME, ORDINAL_POSITION"
  ))
  .then(r => { r.recordset.forEach(x => console.log(x.TABLE_NAME + '.' + x.COLUMN_NAME)); process.exit(0); })
  .catch(e => { console.error(e.message); process.exit(1); });
