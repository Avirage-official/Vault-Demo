# Vault Financial Dashboard - System Architecture

This document describes the system architecture of the Vault financial dashboard, including the data layer, component layer, and visualization layer.

---

## Architecture Overview

Vault is built as a layered architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  Next.js App Router (Pages, Layouts, Parallel Routes)        │
│  /src/app/dashboard/                                         │
├─────────────────────────────────────────────────────────────┤
│                    COMPONENT LAYER                           │
│  Feature Components    │    Shared UI Components             │
│  /src/features/        │    /src/components/ui/              │
│  - overview/           │    - Shadcn/UI primitives           │
│  - products/           │    - Layout (sidebar, header)       │
│  - kanban/             │    - Forms, themes                  │
├─────────────────────────────────────────────────────────────┤
│                    DATA / SERVICES LAYER                     │
│  Mock Data             │    Integration Placeholders         │
│  /src/lib/mockData/    │    /src/lib/integrations/           │
│  - accounts.ts         │    - brokerAdapter.ts               │
│  - holdings.ts         │    - dataAggregator.ts              │
│  - performance.ts      │    - portfolioCalculator.ts         │
│  - alerts.ts           │                                     │
│  - brokerConnections.ts│    Types: /src/lib/types/index.ts   │
├─────────────────────────────────────────────────────────────┤
│                    STATE MANAGEMENT                          │
│  Zustand (Kanban)  │  Nuqs (URL state)  │  React Context    │
│  /features/kanban/ │  Search params      │  Sidebar, Info    │
├─────────────────────────────────────────────────────────────┤
│                    EXTERNAL SERVICES (Future)                │
│  Fidelity API  │  Schwab API  │  Kraken API  │  Vanguard    │
└─────────────────────────────────────────────────────────────┘
```

---

## Layer Details

### 1. Presentation Layer

The presentation layer uses Next.js 16 App Router with route groups and parallel routes.

**Directory**: `/src/app/`

```
app/
├── (auth)/                    # Auth route group (sign-in, sign-up)
├── (dashboard)/               # Dashboard route group
├── dashboard/
│   ├── layout.tsx             # Dashboard wrapper with sidebar + header
│   ├── overview/
│   │   ├── layout.tsx         # Parallel route layout (4 chart slots)
│   │   ├── @area_stats/       # Area chart parallel route
│   │   ├── @bar_stats/        # Bar chart parallel route
│   │   ├── @pie_stats/        # Pie chart parallel route
│   │   └── @sales/            # Recent sales parallel route
│   ├── product/               # Product data table
│   ├── kanban/                # Task management board
│   ├── billing/               # Subscription billing
│   ├── workspaces/            # Organization management
│   └── profile/               # User profile
└── api/                       # API routes
```

**Key Patterns**:
- **Parallel Routes**: The overview page uses 4 parallel routes (`@area_stats`, `@bar_stats`, `@pie_stats`, `@sales`) for independent loading states and error boundaries
- **Route Groups**: `(auth)` and `(dashboard)` separate layout concerns
- **Server Components**: Default for all pages; `'use client'` only where browser APIs are needed

### 2. Component Layer

Components are organized by scope: feature-specific vs. shared.

**Feature Components** (`/src/features/`):

| Feature | Components | Purpose |
|---------|-----------|---------|
| `overview/` | AreaGraph, BarGraph, PieGraph, RecentSales, Overview | Dashboard analytics visualizations |
| `products/` | ProductListing, ProductForm, DataTable, Columns | Product CRUD with data table |
| `kanban/` | KanbanBoard, BoardColumn, TaskCard, NewTaskDialog | Drag-and-drop task management |
| `profile/` | ProfileForm | User profile management |
| `auth/` | SignInView, SignUpView, UserAuthForm | Authentication UI |

**Shared UI Components** (`/src/components/`):

| Directory | Components | Purpose |
|-----------|-----------|---------|
| `ui/` | 50+ Shadcn/UI components | Buttons, inputs, cards, dialogs, tables, etc. |
| `layout/` | AppSidebar, Header, PageContainer | Dashboard structural layout |
| `kbar/` | KCommandBar | Cmd+K search interface |
| `forms/` | FormField wrappers | Consistent form field rendering |
| `themes/` | ThemeSwitcher, ActiveTheme | Multi-theme support |

### 3. Data / Services Layer

**Current (Phase 1)**: Mock data files with TypeScript types and helper functions.

| File | Purpose |
|------|---------|
| `/src/lib/types/index.ts` | All TypeScript interfaces for financial data |
| `/src/lib/mockData/accounts.ts` | 7 accounts across 5 brokers |
| `/src/lib/mockData/holdings.ts` | 17 holdings with aggregation helpers |
| `/src/lib/mockData/performance.ts` | Performance metrics and time-series data |
| `/src/lib/mockData/alerts.ts` | Portfolio alerts and notifications |
| `/src/lib/mockData/brokerConnections.ts` | Broker connection status and metadata |
| `/src/constants/data.ts` | Original dashboard sales data |
| `/src/constants/mock-api.ts` | Original dashboard product data (faker.js) |

**Future (Phase 2)**: Integration services that replace mock data with real broker APIs.

| File | Purpose |
|------|---------|
| `/src/lib/integrations/brokerAdapter.ts` | Interface for broker API connections |
| `/src/lib/integrations/dataAggregator.ts` | Combines multi-broker data into unified portfolio |
| `/src/lib/integrations/portfolioCalculator.ts` | Computes performance, risk, and alerts |

### 4. State Management

| Tool | Scope | Usage |
|------|-------|-------|
| **Zustand** | Kanban board | Task/column CRUD with local persistence |
| **Nuqs** | Data tables | URL-based search, filter, pagination state |
| **React Context** | Layout | Sidebar state, infobar content |
| **Cookies** | Sidebar | Sidebar collapsed/expanded preference |

### 5. Styling Architecture

```
/src/styles/
├── globals.css              # Tailwind CSS v4 imports + view transitions
├── theme.css                # Theme file imports
└── themes/                  # Individual theme files (6 built-in themes)
    ├── vercel.css           # Default theme
    ├── claude.css
    ├── neobrutualism.css
    ├── supabase.css
    ├── mono.css
    └── notebook.css
```

- **Tailwind CSS v4**: Uses `@import 'tailwindcss'` syntax with `@tailwindcss/postcss`
- **CSS Custom Properties**: OKLCH color format for theme variables
- **`cn()` Utility**: Merges Tailwind classes with `clsx` + `tailwind-merge`

---

## Data Flow Diagrams

### Current: Dashboard Overview Page

```
[Hardcoded Data in Components]
         │
         ├─→ overview.tsx ──→ 4 Stat Cards (Revenue, Customers, Accounts, Growth)
         │
         ├─→ area-graph.tsx ──→ Area Chart (6 months, desktop vs mobile)
         │
         ├─→ bar-graph.tsx ──→ Bar Chart (90 days, daily data)
         │
         ├─→ pie-graph.tsx ──→ Pie Chart (browser distribution)
         │
         └─→ recent-sales.tsx ←── /src/constants/data.ts (5 sales records)
```

### Future: Financial Dashboard

```
[Broker APIs]
     │
     ▼
[BrokerAdapter] ──→ Normalized Account + Holding data
     │
     ▼
[DataAggregator] ──→ Aggregated Portfolio, Positions, Allocation
     │
     ▼
[PortfolioCalculator] ──→ Performance Metrics, Risk Analytics, Alerts
     │
     ├─→ Stat Cards (Portfolio Value, YTD Return, Accounts, Alpha)
     ├─→ Area Chart (Portfolio value over time vs benchmark)
     ├─→ Bar Chart (Monthly returns or transaction volume)
     ├─→ Pie Chart (Asset allocation breakdown)
     ├─→ Holdings Table (All positions with gain/loss)
     └─→ Alert Feed (Rebalancing, tax-loss, risk notifications)
```

### Product Data Table Flow

```
[/src/constants/mock-api.ts]
     │
     ├─ fakeProducts.initialize() ──→ 20 faker.js products
     │
     └─ fakeProducts.getProducts({ page, limit, categories, search })
              │
              ▼
     [Nuqs URL State] ←→ Search params (page, limit, category filter)
              │
              ▼
     [ProductListing] ──→ [Tanstack DataTable] ──→ Rendered table rows
```

### Kanban Board Flow

```
[Zustand Store] (/src/features/kanban/utils/store.ts)
     │
     ├─ tasks: Task[] (title, description, status)
     ├─ columns: Column[] (TODO, IN_PROGRESS, DONE)
     │
     └─→ [KanbanBoard] ←→ [dnd-kit] (drag events)
              │
              ├─→ [BoardColumn] ──→ Droppable column container
              │       │
              │       └─→ [TaskCard] ──→ Draggable task card
              │
              └─→ [NewTaskDialog] ──→ Task creation form
```

---

## Authentication Architecture

```
[Clerk] (External Service)
     │
     ├─→ /src/app/(auth)/ ──→ Sign-in / Sign-up pages
     │
     ├─→ middleware.ts ──→ Route protection
     │
     ├─→ /src/hooks/use-nav.ts ──→ RBAC navigation filtering
     │       │
     │       └─→ useFilteredNavItems() checks:
     │            - requireOrg (active organization)
     │            - permission (Clerk permission string)
     │            - role (user role)
     │            - plan (subscription plan)
     │            - feature (feature flag)
     │
     └─→ /src/config/nav-config.ts ──→ Navigation items with access rules
```

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 16 (App Router) | Server/client rendering, routing |
| Language | TypeScript 5.7 | Type safety |
| UI Library | Shadcn/UI (Radix primitives) | Component library |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| Charts | Recharts | Data visualizations |
| Tables | TanStack Table | Advanced data tables |
| State | Zustand, Nuqs, React Context | State management |
| Auth | Clerk | Authentication, organizations, billing |
| Drag & Drop | dnd-kit | Kanban board interactions |
| Forms | React Hook Form + Zod | Form handling + validation |
| Error Tracking | Sentry | Error monitoring and logging |

---

## Related Documentation

- **Data Model**: [`/docs/DATA_MODEL.md`](./DATA_MODEL.md)
- **Mock Data**: [`/docs/MOCK_DATA.md`](./MOCK_DATA.md)
- **Broker Integration**: [`/docs/BROKER_INTEGRATION.md`](./BROKER_INTEGRATION.md)
- **Component Inventory**: [`/docs/COMPONENT_INVENTORY.md`](./COMPONENT_INVENTORY.md)
- **Setup Guide**: [`/docs/SETUP.md`](./SETUP.md)
