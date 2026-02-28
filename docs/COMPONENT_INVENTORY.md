# Vault Financial Dashboard - Component Inventory

This document catalogs every dashboard component, the data it displays, and where it will integrate with real broker data in Phase 2.

---

## Overview Page Components

### Stat Cards

**File**: `/src/features/overview/components/overview.tsx`

| Card | Current Value | Current Source | Phase 2 Source |
|------|--------------|----------------|----------------|
| Total Revenue | $1,250.00 (+12.5%) | Hardcoded | `getPortfolioStatCards().totalPortfolioValue` from PortfolioCalculator |
| New Customers | 1,234 (-20%) | Hardcoded | Connected broker count from DataAggregator |
| Active Accounts | 45,678 (+12.5%) | Hardcoded | `mockAccounts.length` → Account count from DataAggregator |
| Growth Rate | 4.5% (+4.5%) | Hardcoded | `getPortfolioStatCards().alphaGenerated` from PortfolioCalculator |

**Phase 2 Integration Point**: Replace hardcoded `<Card>` values with data from `getPortfolioStatCards()` in `/src/lib/mockData/performance.ts`, then from PortfolioCalculator service.

---

### Area Graph

**File**: `/src/features/overview/components/area-graph.tsx`
**Parallel Route**: `/src/app/dashboard/overview/@area_stats/`

| Property | Details |
|----------|---------|
| **Chart Type** | Stacked area chart (Recharts) |
| **Current Data** | 6 months (Jan–Jun), desktop vs mobile visitors |
| **Data Shape** | `{ month: string, desktop: number, mobile: number }[]` |
| **Loading Delay** | 2 seconds (simulated) |
| **Error Boundary** | Yes (via parallel route error.tsx) |

**Current Data Values**:
```
Jan: 186/80, Feb: 305/200, Mar: 237/120
Apr: 73/190, May: 209/130, Jun: 214/140
```

**Phase 2 Integration Point**: Replace with portfolio value time-series from `mockPerformanceHistory` → PortfolioCalculator. Map to `{ month: string, portfolio: number, benchmark: number }`.

---

### Bar Graph

**File**: `/src/features/overview/components/bar-graph.tsx`
**Parallel Route**: `/src/app/dashboard/overview/@bar_stats/`

| Property | Details |
|----------|---------|
| **Chart Type** | Stacked bar chart (Recharts) |
| **Current Data** | 90 days (Apr–Jun 2024), daily desktop vs mobile |
| **Data Shape** | `{ date: string, desktop: number, mobile: number }[]` |
| **Loading Delay** | 1 second (simulated) |
| **Features** | Interactive tooltip, date range displayed |

**Phase 2 Integration Point**: Replace with monthly return data or transaction volume from DataAggregator. Map to `{ date: string, gains: number, losses: number }` for gain/loss visualization.

---

### Pie Graph

**File**: `/src/features/overview/components/pie-graph.tsx`
**Parallel Route**: `/src/app/dashboard/overview/@pie_stats/`

| Property | Details |
|----------|---------|
| **Chart Type** | Donut/pie chart (Recharts) |
| **Current Data** | Browser distribution (5 segments) |
| **Data Shape** | `{ browser: string, visitors: number, fill: string }[]` |
| **Loading Delay** | 1 second (simulated) |
| **Features** | Center label showing total, color-coded segments |

**Current Data Values**:
```
Chrome: 275, Safari: 200, Firefox: 287, Edge: 173, Other: 190
Total: 1,125 visitors
```

**Phase 2 Integration Point**: Replace with asset allocation data from `getAssetAllocation()` in `/src/lib/mockData/holdings.ts` → DataAggregator. Map to `{ assetClass: string, value: number, fill: string }`.

---

### Recent Sales

**File**: `/src/features/overview/components/recent-sales.tsx`
**Parallel Route**: `/src/app/dashboard/overview/@sales/`

| Property | Details |
|----------|---------|
| **Display** | List of 5 recent transactions with avatar, name, email, amount |
| **Current Data** | `recentSalesData` from `/src/constants/data.ts` |
| **Data Shape** | `SaleUser { name, email, amount, image, initials }[]` |
| **Loading Delay** | 3 seconds (simulated) |

**Current Data Values**:
```
Olivia Martin: +$1,999.00
Jackson Lee: +$39.00
Isabella Nguyen: +$299.00
William Kim: +$99.00
Sofia Davis: +$39.00
```

**Phase 2 Integration Point**: Replace with recent transactions from BrokerAdapter. Map to `Transaction { symbol, description, amount, date }` for recent trade activity.

---

## Product Management Components

### Product Listing (Data Table)

**File**: `/src/features/products/components/product-listing.tsx`

| Property | Details |
|----------|---------|
| **Display** | Paginated, searchable, filterable data table |
| **Current Data** | `fakeProducts.getProducts()` from `/src/constants/mock-api.ts` |
| **Data Shape** | `Product { name, category, price, photo_url, description }[]` |
| **Features** | Server-side search, category filter, pagination via Nuqs |
| **Table Library** | TanStack Table |

**Columns** (`/src/features/products/components/product-tables/columns.tsx`):
- Photo (image)
- Name (text)
- Category (badge)
- Price (formatted currency)
- Description (text)
- Actions (edit, delete)

**Phase 2 Integration Point**: Repurpose as Holdings Table showing all positions. Data from `getAggregatedPositions()` in `/src/lib/mockData/holdings.ts` → DataAggregator. Columns would map to: Symbol, Name, Asset Class, Quantity, Market Value, Gain/Loss, Weight.

---

### Product Form

**File**: `/src/features/products/components/product-form.tsx`

| Property | Details |
|----------|---------|
| **Display** | Form for creating/editing products |
| **Validation** | React Hook Form + Zod schema |
| **Fields** | Name, description, category, price, image |

**Phase 2 Integration Point**: Could be adapted as a manual position entry form or alert configuration form.

---

## Kanban Board Components

### Kanban Board

**File**: `/src/features/kanban/components/kanban-board.tsx`

| Property | Details |
|----------|---------|
| **Display** | Drag-and-drop task management board |
| **State** | Zustand store with local persistence |
| **Library** | dnd-kit for drag interactions |

**Sub-components**:
- `board-column.tsx` — Droppable column (TODO, IN_PROGRESS, DONE)
- `task-card.tsx` — Draggable task card
- `new-task-dialog.tsx` — Task creation dialog
- `column-action.tsx` — Column rename/delete dropdown

**Phase 2 Integration Point**: Could be repurposed as a trade execution board or rebalancing action tracker, where columns represent: "Pending Review" → "Approved" → "Executed".

---

## Layout Components

### App Sidebar

**File**: `/src/components/layout/app-sidebar.tsx`

| Property | Details |
|----------|---------|
| **Display** | Collapsible navigation sidebar |
| **Data Source** | `/src/config/nav-config.ts` |
| **Features** | RBAC-based item visibility, nested items, keyboard shortcuts |

**Phase 2 Integration Point**: Add navigation items for portfolio-specific pages (Accounts, Holdings, Alerts, Tax Center).

### Header

**File**: `/src/components/layout/header.tsx`

| Property | Details |
|----------|---------|
| **Display** | Top bar with breadcrumbs, search, theme switcher |
| **Features** | Responsive, Cmd+K search integration |

**Phase 2 Integration Point**: Add portfolio value badge, unread alert count indicator.

---

## Component → Data Source Matrix

| Component | File | Current Data Source | Mock Data Ready | Phase 2 Service |
|-----------|------|--------------------|-----------------|----|
| Stat Cards | overview.tsx | Hardcoded | `performance.ts → getPortfolioStatCards()` | PortfolioCalculator |
| Area Chart | area-graph.tsx | Hardcoded array | `performance.ts → mockPerformanceHistory` | PortfolioCalculator |
| Bar Chart | bar-graph.tsx | Hardcoded array | (Transaction volume data) | DataAggregator |
| Pie Chart | pie-graph.tsx | Hardcoded array | `holdings.ts → getAssetAllocation()` | DataAggregator |
| Recent Sales | recent-sales.tsx | `constants/data.ts` | (Recent transactions data) | BrokerAdapter |
| Product Table | product-listing.tsx | `constants/mock-api.ts` | `holdings.ts → getAggregatedPositions()` | DataAggregator |
| Kanban Board | kanban-board.tsx | Zustand store | (Rebalancing actions) | PortfolioCalculator |
| Sidebar | app-sidebar.tsx | `nav-config.ts` | N/A (navigation only) | N/A |
| Header | header.tsx | N/A | `alerts.ts → getUrgentAlertCount()` | PortfolioCalculator |

---

## Integration Priority

Components ordered by integration priority for Phase 2:

1. **Stat Cards** — Replace hardcoded values with portfolio summary (highest visibility)
2. **Pie Chart** — Asset allocation breakdown (core Vault feature)
3. **Area Chart** — Portfolio value over time (key visualization)
4. **Product Table → Holdings Table** — Position detail view (primary data display)
5. **Recent Sales → Recent Transactions** — Trade activity feed
6. **Bar Chart** — Monthly returns or volume
7. **Header** — Alert count badge
8. **Kanban Board** — Rebalancing action tracker (lowest priority, optional)

---

## Related Documentation

- **Data Model**: [`/docs/DATA_MODEL.md`](./DATA_MODEL.md) — TypeScript interfaces
- **Mock Data**: [`/docs/MOCK_DATA.md`](./MOCK_DATA.md) — Mock data details
- **Architecture**: [`/docs/ARCHITECTURE.md`](./ARCHITECTURE.md) — System architecture
- **Broker Integration**: [`/docs/BROKER_INTEGRATION.md`](./BROKER_INTEGRATION.md) — API roadmap
