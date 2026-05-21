# HỆ THỐNG PHÂN TÍCH VÀ QUẢN TRỊ DỮ LIỆU TÍN DỤNG (BANKING BUSINESS INTELLIGENCE)

## 1. Tổng quan dự án

Dự án xây dựng giải pháp **Business Intelligence (BI)** toàn diện nhằm phân tích và quản trị rủi ro tín dụng dựa trên bộ dữ liệu lớn từ **Lending Club (Kaggle)**. Hệ thống chuyển đổi dữ liệu thô phức tạp thành các báo cáo trực quan, hỗ trợ Ban lãnh đạo theo dõi sức khỏe danh mục cho vay, đánh giá tỷ lệ nợ xấu (NPL) và tối ưu hóa chiến lược thu hồi nợ.

---

## 2. Quy mô và Đặc điểm dữ liệu

| Chỉ tiêu | Giá trị |
|---|---|
| Tổng bản ghi (raw) | **2,260,701** giao dịch vay vốn |
| Cột dữ liệu thô | **151** trường thông tin |
| Cột sau xử lý | **33** thuộc tính quan trọng |
| Bản ghi nạp vào Warehouse | **2,258,084** (sau khi loại bỏ dòng thiếu dữ liệu bắt buộc) |
| Thời gian dữ liệu | Từ năm **2007** đến năm **2018** |
| Dung lượng file raw | ~1.5 GB |

---

## 3. Các chỉ số hiệu suất chính (KPIs)

| KPI | Giá trị | Mô tả |
|---|---|---|
| Tổng dư nợ hệ thống | **$32.5 tỷ USD** | Tổng `out_prncp` toàn danh mục |
| Tỷ lệ nợ xấu (NPL) | **14.2%** | Tỷ lệ `loan_amnt` có `npl_flag = 1` |
| Tỷ lệ thu hồi nợ | **58.3%** | `SUM(recoveries) / SUM(loan_amnt)` × 100 |
| Phân bổ hạng tín dụng | Grade B: **663,557** · Grade C: **650,053** | Tập trung nhóm B và C |

---

## 4. Kiến trúc hệ thống (6 tầng)

Hệ thống được thiết kế theo pipeline dữ liệu 6 tầng chuẩn:

```
[Tầng 1] Nguồn dữ liệu thô
    ↓  Lending Club CSV (Kaggle) — 2,260,701 bản ghi × 151 cột (~1.5 GB)

[Tầng 2] Tiền xử lý — Python / Pandas / RegEx
    ↓  Loại 118 cột nhiễu, xử lý lỗi Unicode (encoding latin1)
    ↓  Chuẩn hóa term/emp_length bằng RegEx → số nguyên
    ↓  Feature Engineering: issue_year, issue_month, issue_quarter
    ↓  Xuất: cleaned_loan.csv (33 cột, 2,260,701 dòng)

[Tầng 3] Staging — SQL Server / T-SQL
    ↓  loan_staging      : nhập từ CSV qua BULK INSERT / SQLAlchemy (2,260,701 bản ghi)
    ↓  loan_staging_clean: CAST kiểu dữ liệu (FLOAT→INT, string→DATE),
    ↓                      xử lý NULL, tính credit_age_years (2,258,084 bản ghi)
    ↓  9 Index hỗ trợ tốc độ ETL (state, status, date, grade/purpose)

[Tầng 4] Data Warehouse — Star Schema / CreditBI_DB
    ↓  1 bảng Fact_Loans + 5 bảng Dimension
    ↓  5 Non-clustered Index trên FK (customer, time, geo, product, risk)
    ↓  Tối ưu ~70% dung lượng so với raw

[Tầng 5] Backend API — Node.js / Express / mssql
    ↓  6 REST endpoints · Connection pool SQL Server

[Tầng 6] Trực quan hóa — React / Vite / Recharts / Tailwind CSS
         6 trang phân tích đa chiều · KPI Cards · Biểu đồ tương tác
```

---

### 4.1 Mô hình dữ liệu Star Schema

```
                    ┌─────────────────┐
                    │  Dim_Customers  │
                    │  customer_id PK │
                    │  staging_id     │
                    │  emp_length     │
                    │  home_ownership │
                    │  annual_inc     │
                    │  fico_range_low │
                    │  fico_range_high│
                    │  pub_rec        │
                    │  delinq_2yrs    │
                    │  mort_acc       │
                    └────────┬────────┘
                             │
┌──────────────┐    ┌────────▼──────────────────────────────────┐    ┌──────────────────┐
│  Dim_Time    │    │                 Fact_Loans                 │    │  Dim_LoanProduct │
│  time_id  PK │◄───│  loan_id     BIGINT PK                    │───►│  product_id   PK │
│  issue_d     │    │  customer_id INT    FK → Dim_Customers     │    │  grade           │
│  issue_year  │    │  time_id     INT    FK → Dim_Time          │    │  purpose         │
│  issue_month │    │  geo_id      INT    FK → Dim_Geography     │    │  revol_bal       │
│  issue_quarter    │  product_id  INT    FK → Dim_LoanProduct   │    │  revol_util      │
│  earliest_cr_line │  risk_id     INT    FK → Dim_CreditRisk    │    │  total_bc_limit  │
│  last_pymnt_d│    │  loan_amnt   FLOAT                         │    │  total_acc       │
│  credit_age_years │  int_rate    FLOAT                         │    │  all_util        │
└──────────────┘    │  term        INT                           │    │  il_util         │
                    │  dti         FLOAT                         │    │  max_bal_bc      │
┌──────────────┐    │  out_prncp   FLOAT                         │    └──────────────────┘
│ Dim_Geography│    │  total_pymnt FLOAT                         │
│  geo_id   PK │◄───│  recoveries  FLOAT                         │───►┌──────────────────┐
│  addr_state  │    └────────────────────────────────────────────┘    │ Dim_CreditRisk   │
│  state_name  │                                                       │  risk_id      PK │
│  region      │                                                       │  loan_status_raw │
│  timezone    │                                                       │  npl_flag (0/1)  │
└──────────────┘                                                       │  risk_tier       │
                                                                       │  is_recovered    │
                                                                       └──────────────────┘
```

### 4.2 Định nghĩa phân loại rủi ro (Dim_CreditRisk)

| `loan_status` gốc | `npl_flag` | `risk_tier` | `is_recovered` |
|---|---|---|---|
| Fully Paid | 0 | Low | 1 |
| Current | 0 | Low | 0 |
| In Grace Period | 1 | Medium | 0 |
| Late (16-30 days) | 1 | Medium | 0 |
| Late (31-120 days) | 1 | High | 0 |
| Default | 1 | Critical | 0 |
| Charged Off | 1 | Critical | 0 |

### 4.3 Backend API Endpoints

| Endpoint | Method | Mô tả |
|---|---|---|
| `/api/kpi` | GET | 4 KPI chính: tổng khoản vay, NPL rate, tổng dư nợ, recovery rate |
| `/api/loan-grade` | GET | Phân bổ số khoản vay theo Grade A → G |
| `/api/loan-trend` | GET | Xu hướng số khoản vay theo năm (2007–2018) |
| `/api/loan-purpose` | GET | Top 5 mục đích vay (tỷ lệ %) |
| `/api/recovery` | GET | Recovery vs Charge-off theo năm (NPL loans only) |
| `/api/state-risk` | GET | Top 5 bang theo số lượng khoản vay + NPL rate |
| `/api/health` | GET | Health check server |

> **Port mặc định:** Backend chạy tại `http://localhost:3001` · Frontend tại `http://localhost:5173`

---

## 5. Công nghệ sử dụng

| Tầng | Công nghệ |
|---|---|
| Tiền xử lý dữ liệu | Python 3.x · Pandas · NumPy · Matplotlib · Seaborn · RegEx |
| Cơ sở dữ liệu | SQL Server (T-SQL) · Star Schema · Non-clustered Index |
| Backend API | Node.js · Express · mssql (Connection Pool) · CORS |
| Frontend Dashboard | React.js · Vite · Tailwind CSS · Recharts · Framer Motion · Lucide React |
| Quản lý dự án | Git · GitHub |

---

## 6. Cấu trúc thư mục

```
Dataset/
├── backend/                    # Server Node.js/Express cung cấp REST API
│   ├── server.js               # 7 endpoints kết nối SQL Server qua mssql
│   ├── schema.js               # Cấu hình kết nối database
│   └── package.json
├── dashboard/                  # Ứng dụng React (Vite + Tailwind + Recharts)
│   └── src/
│       ├── pages/
│       │   ├── LandingPage.jsx     # Trang giới thiệu hệ thống
│       │   ├── DashboardPage.jsx   # KPI, biểu đồ Grade/Trend/Purpose/Recovery
│       │   ├── PlatformPage.jsx    # Phân tích chuyên sâu theo từng chiều
│       │   ├── TrendsPage.jsx      # Xu hướng theo tháng/quý/năm
│       │   ├── ReportsPage.jsx     # Báo cáo tổng hợp
│       │   ├── ArchitecturePage.jsx# Sơ đồ kiến trúc 6 tầng
│       │   └── AboutPage.jsx       # Thông tin nhóm
│       └── data/api.js             # Hàm gọi các endpoint backend
├── notebooks/
│   ├── 01_data_cleaning.ipynb  # ETL Python: làm sạch 151→33 cột
│   └── 02_exploratory_analysis.py # EDA: phân phối, tương quan, vẽ biểu đồ
├── sql_scripts/
│   ├── database_schema.sql     # Tạo DB, bảng Staging, 5 Dim, Fact, Index
│   ├── etl_process.sql         # ETL T-SQL: Staging→Clean→Dim→Fact + write-back FK
│   └── KPI_query.sql           # 15 truy vấn KPI phân tích (NPL, Recovery, Trend...)
├── outputs/charts/             # 31 biểu đồ EDA (PNG) xuất từ Python
├── reports/                    # Star Schema diagram và tài liệu nghiệp vụ
└── README.md
```

---

## 7. Phân tích khám phá dữ liệu (EDA Insights)

Quá trình phân tích trên **2.26 triệu** bản ghi cho thấy:

- **Khoản vay:** Tập trung trong khoảng **$5,000 – $25,000**. Kỳ hạn **36 tháng** chiếm tỷ lệ lớn hơn **60 tháng**.
- **Lãi suất:** Trung bình **10% – 15%**; Grade A dưới **8%**, Grade G có thể trên **25%**.
- **Thu nhập khách hàng:** Phần lớn từ **$45,000 – $85,000**/năm. Thu nhập cao tương quan nghịch với tỷ lệ nợ xấu.
- **Mục đích vay:** **Debt Consolidation** (Gom nợ) chiếm khoảng **50%** tổng số khoản vay.
- **Rủi ro tài chính:** DTI trung bình **18%**. Khách hàng DTI > **30%** có xác suất nợ xấu cao hơn **1.5 lần** bình thường.
- **Hạng tín dụng:** Grade B (663,557 khoản) và Grade C (650,053 khoản) chiếm tỷ trọng lớn nhất.

---

## 8. Kết quả đạt được

Hệ thống tự động hóa hoàn toàn quy trình từ xử lý dữ liệu thô đến cung cấp thông tin quản trị theo thời gian thực. Dashboard hỗ trợ phân tích đa chiều:

- **KPI Monitoring:** Theo dõi realtime 4 chỉ số cốt lõi (tổng khoản vay, NPL rate, tổng dư nợ, recovery rate).
- **Trend Analysis:** Xu hướng tăng trưởng dư nợ theo tháng, quý, năm (2007–2018).
- **Risk Segmentation:** Phân tích rủi ro theo Grade (A–G), kỳ hạn (36/60 tháng), khu vực địa lý.
- **Geographic Risk:** Xác định bang có tỷ lệ nợ xấu cao nhất để tập trung kiểm soát.
- **Recovery Tracking:** Theo dõi hiệu quả thu hồi nợ theo năm giải ngân và hạng tín dụng.
- **Performance:** Giảm 118 cột nhiễu, tăng tốc độ truy vấn ~70% so với raw data.

---

## 9. Hướng dẫn cài đặt & Chạy dự án

### Yêu cầu hệ thống
- **SQL Server** (instance mặc định trong project: `DAMTHANG\CLCCSDLPTNHOM4`)
- **Node.js** >= 18.x
- **Python** >= 3.9 (nếu chạy lại ETL)

### Bước 1 — Khởi tạo Database
```sql
-- Chạy lần lượt trong SQL Server Management Studio (SSMS):
-- 1. Tạo schema và bảng
sql_scripts/database_schema.sql

-- 2. Chạy quy trình ETL (staging → dimension → fact)
sql_scripts/etl_process.sql
```

### Bước 2 — Chạy Backend API
```bash
cd backend
npm install
npm run dev
# Server khởi động tại http://localhost:3001
```

### Bước 3 — Chạy Dashboard
```bash
cd dashboard
npm install
npm run dev
# Ứng dụng mở tại http://localhost:5173
```

### Bước 4 (tuỳ chọn) — Chạy lại ETL Python
```bash
# Mở notebooks/01_data_cleaning.ipynb bằng Jupyter Notebook
# Đặt đường dẫn file CSV gốc vào ô đầu tiên và chạy tuần tự
```

> **Lưu ý:** Cấu hình kết nối SQL Server nằm trong `backend/server.js`. Thay thông tin `server`, `user`, `password` phù hợp với môi trường của bạn trước khi chạy.
