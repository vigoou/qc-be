# QC Audit System - Project Roadmap

## 📋 Tổng quan dự án

### Mục đích
Hệ thống quản lý và QC (Quality Control) cho việc audit các KPI của Unilever tại các cửa hàng (stores) hàng tháng.

### Quy trình chính
1. **Đầu tháng**: Import checklist từ Unilever cho tháng audit
2. **Lập lịch**: Xác định lịch audit cho từng store trong tháng
3. **Hàng ngày**: Import dữ liệu audit từ file Excel và QC
4. **Cuối tháng**: Kiểm tra KPI, theo dõi tiến độ, xem kết quả QC
5. **Dashboard**: Xem tổng quan audit trong tháng

---

## 🎯 Các KPI cần audit

| KPI | Mô tả | Áp dụng |
|-----|-------|---------|
| **OSA** | On-Shelf Availability - Kiểm tra stock và bảng giá | All stores |
| **NPD** | New Product Display - Kiểm tra stock và bảng giá sản phẩm mới | All stores |
| **SOS** | Share of Shelf - Đo chiều dài thuê mướn | All stores |
| **Promotion** | Chương trình khuyến mãi | All stores |
| **Rental** | Thuê mướn (xác định bằng rental_id) | All stores |
| **C2A** | Call to Action - Thông điệp sản phẩm | Big stores only |
| **Off Location** | Vị trí ngoài kệ chính | All stores |

---

## 🗓 Phase 1: IMPORT CHECKLIST (Current)

### ✅ Hoàn thành
- [x] Setup project structure
- [x] Create base processor
- [x] Import OSAChecklist (worksheet "1. OSA")
- [x] Import NPDChecklist (worksheet "2. NPD")

### 🔄 Đang làm
- [ ] Import OSA audit data từ file Excel hàng ngày
- [ ] Parse Date + Time → createdAt
- [ ] Map Excel columns to database fields
- [ ] Test với dữ liệu thực tế (200k records)

### 📝 Models đã tạo

```prisma
model OSAChecklist {
  yearMonth    Int    // Format: 202601
  storeId      String // Store code
  productId    String // Item code
  oldProductId String // Old code
  newProductId String // New code
  stock        Int
  
  @@id([yearMonth, storeId, productId])
}

model NPDChecklist {
  yearMonth Int
  storeId   String
  productId String
  
  @@id([yearMonth, storeId, productId])
}

model OSA {
  yearMonth Int
  storeId   String
  productId String
  
  stock              Int
  currentStock       Int
  priceList          Boolean
  location           String
  
  // QC fields
  qcNote             String?
  qcIsReject         Boolean
  qcReasonReject     String?
  
  // Workflow
  comment            String
  projectTeamRevised String?
  projectTeamReponse String?
  finalReject        Boolean
  saleRepFeedBack    String?
  
  // Price
  allowEditPrice     Boolean
  priceAfterEdit     Int?
  
  // Audit
  auditById          String?
  qcById             String?
  
  createdAt DateTime
  updatedAt DateTime
  
  @@id([yearMonth, storeId, productId])
}
```

### 🔧 Config cho Checklist

```typescript
interface ChecklistConfig {
  type: 'small' | 'big';        // Loại store
  rowTitle: number;             // Dòng tiêu đề
  rowStart: number;             // Dòng bắt đầu data
  columnStartStore: string;     // Cột bắt đầu store codes
}

// Example
const OSA_BIG_CONFIG: ChecklistConfig = {
  type: 'big',
  rowTitle: 11,
  rowStart: 12,
  columnStartStore: 'X'
};
```

### 📊 Import Tasks

#### 1. Checklist Import (đầu tháng)
- [x] Import từ file "checklist_big_012026.xlsx"
- [x] Worksheet "1. OSA" → OSAChecklist
- [x] Worksheet "2. NPD" → NPDChecklist
- [ ] Validate dữ liệu (store codes, product codes)
- [ ] Handle duplicates với skipDuplicates

#### 2. Daily Audit Import
- [ ] Create processor cho file audit hàng ngày
- [ ] Parse Date/Time columns
- [ ] Import vào các bảng: OSA, NPD, SOS, Promotion, etc.
- [ ] Link với checklist để so sánh

---

## 🗓 Phase 2: SCHEDULING & WORKFLOW

### Lập lịch Audit

```prisma
model AuditSchedule {
  id        String   @id @default(cuid())
  yearMonth Int
  storeId   String
  
  scheduledDate DateTime  // Ngày dự kiến audit
  auditType     String    // OSA, NPD, SOS, etc.
  status        String    // pending, completed, missed
  
  assignedTo    String?   // User ID
  completedAt   DateTime?
  
  @@index([yearMonth, storeId])
  @@index([scheduledDate])
}
```

### Store Audit Tracking

```prisma
model StoreAuditStatus {
  yearMonth Int
  storeId   String
  
  // Đếm số lần audit trong tháng
  auditCount       Int      @default(0)
  lastAuditDate    DateTime?
  
  // Trạng thái từng KPI
  osaCompleted     Boolean  @default(false)
  npdCompleted     Boolean  @default(false)
  sosCompleted     Boolean  @default(false)
  promotionCompleted Boolean @default(false)
  rentalCompleted  Boolean  @default(false)
  c2aCompleted     Boolean  @default(false)
  
  @@id([yearMonth, storeId])
}
```

### Features
- [ ] API tạo lịch audit cho tháng
- [ ] Assign auditor cho từng store
- [ ] Track số lần audit (store có thể được chấm 2 lần/tháng)
- [ ] Notification khi đến ngày audit
- [ ] Update status khi import dữ liệu

---

## 🗓 Phase 3: QC WORKFLOW

### QC Interface

#### Display List
- [ ] List OSA records với filters:
  - yearMonth
  - storeId
  - auditStatus (pending, qc_approved, qc_rejected)
  - qcIsReject (true/false)
- [ ] Pagination (50-100 records/page)
- [ ] Sort by createdAt, storeId, productId

#### QC Review Form
- [ ] View audit details (stock, location, price list, etc.)
- [ ] Add QC note
- [ ] Mark as reject/approve
- [ ] Set reject reason
- [ ] Save changes

#### Team Revision
- [ ] Project team can add revisions
- [ ] Project team response to QC feedback
- [ ] Final reject toggle
- [ ] SR (Sales Rep) feedback

### Backend APIs
```typescript
// List with filters
GET /api/osa?yearMonth=202601&storeId=ABC&status=pending&page=1&limit=50

// Detail
GET /api/osa/:yearMonth/:storeId/:productId

// QC Review
PATCH /api/osa/:yearMonth/:storeId/:productId/qc-review
Body: {
  qcNote: string,
  qcIsReject: boolean,
  qcReasonReject?: string
}

// Team Revision
PATCH /api/osa/:yearMonth/:storeId/:productId/team-revise
Body: {
  projectTeamRevised?: string,
  projectTeamReponse?: string,
  finalReject?: boolean
}
```

---

## 🗓 Phase 4: TRACKING & MONITORING

### Dashboard cuối tháng

#### KPI Completion Tracking

```prisma
model MonthlyKPIStatus {
  yearMonth Int
  
  // OSA
  osaTargetStores    Int
  osaCompletedStores Int
  osaCompletionRate  Float
  
  // NPD
  npdTargetStores    Int
  npdCompletedStores Int
  npdCompletionRate  Float
  
  // Other KPIs...
  
  updatedAt DateTime @updatedAt
  
  @@id([yearMonth])
}
```

#### Features
- [ ] **Kiểm tra KPI đủ chưa**: So sánh checklist vs audit results
- [ ] **Còn thiếu bao nhiêu store**: List stores chưa audit
- [ ] **Kết quả QC**: Stats về QC pass/reject
- [ ] **Phát hiện vấn đề**: Stores có nhiều reject, anomalies

### Logic kiểm tra cuối tháng

```typescript
// So sánh Checklist vs Audit Results
interface ComparisonResult {
  yearMonth: number;
  storeId: string;
  productId: string;
  
  // From checklist
  expectedStock: number;
  
  // From audit
  actualStock: number;
  
  // Comparison
  stockMatch: boolean;
  variance: number;
  variantPercentage: number;
}

// API
GET /api/audit/compare/:yearMonth
// Returns: stores with mismatches, completion rate, etc.
```

### Xử lý store chấm 2 lần/tháng

```prisma
model AuditInstance {
  id        String   @id @default(cuid())
  yearMonth Int
  storeId   String
  productId String
  
  auditDate    DateTime  // Ngày audit thực tế
  instanceNo   Int       // 1 = lần 1, 2 = lần 2
  
  // Link to OSA record
  osaYearMonth Int
  osaStoreId   String
  osaProductId String
  
  @@index([yearMonth, storeId, auditDate])
  @@unique([yearMonth, storeId, productId, instanceNo])
}
```

**Logic:**
- Track `instanceNo` để phân biệt lần audit
- Khi import, check xem đã có audit lần 1 chưa
- Nếu có → tạo instance mới với `instanceNo = 2`
- Report sẽ group by instance

---

## 🗓 Phase 5: DASHBOARD & ANALYTICS

### Tổng quan Dashboard

#### Real-time Metrics
- [ ] Tổng số stores cần audit trong tháng
- [ ] Số stores đã audit (theo từng KPI)
- [ ] Completion rate (%)
- [ ] QC pass/reject rate
- [ ] Số stores có vấn đề

#### Charts & Visualizations
- [ ] Progress bar cho từng KPI
- [ ] Timeline: số lượng audit theo ngày
- [ ] Store completion heatmap
- [ ] QC rejection reasons breakdown
- [ ] Top stores với nhiều issues

#### Drill-down Views
- [ ] Click vào KPI → xem chi tiết stores
- [ ] Click vào store → xem tất cả KPI audit results
- [ ] Click vào product → xem availability across stores

### APIs

```typescript
// Dashboard overview
GET /api/dashboard/overview/:yearMonth
Response: {
  totalStores: number,
  completedStores: number,
  completionRate: number,
  kpiStatus: {
    osa: { target: number, completed: number, rate: number },
    npd: { target: number, completed: number, rate: number },
    // ... other KPIs
  },
  qcStats: {
    total: number,
    approved: number,
    rejected: number,
    pending: number
  }
}

// Daily progress
GET /api/dashboard/daily-progress/:yearMonth
Response: {
  data: [
    { date: '2026-01-01', auditsCompleted: 150 },
    { date: '2026-01-02', auditsCompleted: 200 },
    // ...
  ]
}

// Problem stores
GET /api/dashboard/problem-stores/:yearMonth
Response: {
  stores: [
    {
      storeId: 'ABC',
      storeName: 'Store ABC',
      issueCount: 5,
      issues: ['Missing products', 'Wrong stock count']
    }
  ]
}
```

---

## 🗓 Phase 6: REPORT AGGREGATION (Future)

### Report Tables

```prisma
model OSADailyReport {
  date      DateTime @db.Date
  storeId   String
  yearMonth Int
  
  totalRecords     Int
  avgStock         Float
  osaPassCount     Int
  osaFailCount     Int
  osaRate          Float
  
  @@id([date, storeId])
}

model MonthlyAuditSummary {
  yearMonth Int
  
  totalStoresScheduled Int
  totalStoresCompleted Int
  completionRate       Float
  
  osaStats    Json  // { target, completed, rate, avgStock }
  npdStats    Json
  sosStats    Json
  // ... other KPIs
  
  qcPassRate  Float
  qcRejectRate Float
  
  @@id([yearMonth])
}
```

### Scheduled Jobs
- [ ] Daily: Aggregate audit data vào daily reports
- [ ] Monthly: Generate monthly summary
- [ ] Weekly: Send progress reports to stakeholders

---

## 🗂 Database Schema Overview

### Core Tables
- `OSAChecklist` - Checklist đầu tháng
- `NPDChecklist` - NPD checklist
- `OSA` - Kết quả audit OSA
- `NPD` - Kết quả audit NPD
- `SOS` - Share of Shelf
- `Promotion` - Khuyến mãi
- `Rental` - Thuê mướn
- `C2A` - Call to Action (big stores)
- `OffLocation` - Off location

### Workflow Tables
- `AuditSchedule` - Lịch audit
- `StoreAuditStatus` - Trạng thái audit từng store
- `AuditInstance` - Track multiple audits/store
- `MonthlyKPIStatus` - Tổng hợp KPI status

### Report Tables
- `OSADailyReport` - Daily aggregates
- `MonthlyAuditSummary` - Monthly summary
- `StorePerformanceReport` - Store performance metrics

### Master Data
- `Store` - Danh sách stores
- `Product` - Danh sách products
- `User` - Auditors, QC team

---

## 🚀 Technical Stack

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- ExcelJS (for imports)
- Node-cron (scheduling)

### Frontend (Future)
- React/Next.js
- TanStack Query
- Recharts (dashboard)
- Ant Design / Material UI

### DevOps
- Docker
- GitHub Actions (CI/CD)
- PM2 (process management)

---

## 📝 Development Guidelines

### Import Data Flow
```
Excel File → Processor → Parse & Validate → Batch Insert → Update Status
```

### QC Workflow
```
Audit Data → Display List → QC Review → Update Status → Team Revision → Final Approve/Reject
```

### Monthly Check Flow
```
Compare Checklist ↔ Audit Results → Generate Variance Report → Highlight Issues
```

### Performance Targets
- Import 200k records: < 5 minutes
- List API: < 100ms (50 records)
- Dashboard load: < 200ms
- Report generation: < 2 seconds

---

## ✅ Success Criteria

### Phase 1: Import
- [x] Import OSA/NPD checklist successfully
- [ ] Import daily audit data
- [ ] Handle 200k+ records efficiently
- [ ] Data integrity verified

### Phase 2: Scheduling
- [ ] Lập lịch audit cho stores
- [ ] Track audit instances
- [ ] Handle multiple audits per store

### Phase 3: QC
- [ ] QC team có thể review và approve/reject
- [ ] Team có thể revise và phản hồi
- [ ] Workflow hoàn chỉnh

### Phase 4: Tracking
- [ ] Biết được KPI completion status
- [ ] List stores còn thiếu
- [ ] Phát hiện vấn đề tự động

### Phase 5: Dashboard
- [ ] Real-time overview
- [ ] Drill-down capabilities
- [ ] Export reports

---

## 🐛 Known Issues & Solutions

### Issue 1: Store chấm 2 lần/tháng
**Solution:** Thêm `AuditInstance` table để track multiple audits, dùng `instanceNo` để phân biệt

### Issue 2: So sánh checklist vs audit results
**Solution:** API `/audit/compare/:yearMonth` để so sánh và highlight variances

### Issue 3: Performance với 200k records
**Solution:** 
- Chunked processing (1000 records/batch)
- Indexes optimized
- Future: Report tables for aggregation

---

## 📅 Timeline Estimate

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Import | 2 weeks | 🔄 In Progress (80%) |
| Phase 2: Scheduling | 1 week | ⏳ Not Started |
| Phase 3: QC Workflow | 2 weeks | ⏳ Not Started |
| Phase 4: Tracking | 1 week | ⏳ Not Started |
| Phase 5: Dashboard | 2 weeks | ⏳ Not Started |
| Phase 6: Reports | 1 week | ⏳ Future |

**Total MVP:** ~8-9 weeks

---

## 📚 Related Documents

- `/docs/OSA_IMPORT_ROADMAP.md` - Chi tiết import OSA
- `README-LOGIC.md` - Business logic overview
- `prisma/schema/` - Database schemas

---

**Last Updated:** January 25, 2026  
**Current Phase:** Phase 1 - Import (80% complete)  
**Next Milestone:** Complete daily audit import & test with real data