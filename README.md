<h1 align="center">Vault — Personalized Financial Command Centre</h1>

<div align="center">A unified investment dashboard that aggregates multiple brokerage accounts into one view. Built with Next.js 16, Shadcn/UI, Tailwind CSS v4, and Recharts.</div>

<br />

<div align="center">
  <img src="/public/shadcn-dashboard.png" alt="Vault Dashboard" style="max-width: 100%; border-radius: 8px;" />
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.7-blue" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Shadcn%2FUI-Components-000" alt="Shadcn/UI" />
</p>

## What is Vault?

Vault is a **personalized financial command centre for individual investors**. It aggregates multiple brokerage accounts (Fidelity, Schwab, Kraken, Vanguard, Interactive Brokers) into one unified dashboard. Investors connect their brokers, see real-time portfolio performance across all accounts, get rebalancing alerts, tax-loss harvesting opportunities, and risk analytics — all in one place.

Vault handles the data aggregation and management so investors focus on **strategy, not spreadsheets**.

## Case Study: Sarah Chen's Portfolio

This demo models a real-world use case:

> **Sarah Chen** is an individual investor with a **$750,750 portfolio spread across 5 brokers**. She uses Vault to see her complete financial picture in one dashboard instead of logging into each broker separately.

| Broker | Accounts | Balance |
|--------|----------|---------|
| Fidelity Investments | Individual Brokerage, Roth IRA | $330,000 |
| Charles Schwab | Individual Brokerage, Traditional IRA | $242,000 |
| Kraken | Crypto Trading | $45,000 |
| Vanguard | 401(k) Retirement | $98,000 |
| Interactive Brokers | Margin Account | $35,750 |
| **Total** | **7 accounts** | **$750,750** |

Sarah's portfolio includes 17 positions across US equities (AAPL, MSFT, NVDA, TSLA, VOO), international equities (VXUS), bonds (BND), crypto (BTC, ETH), REITs (VNQ), and commodities (GLD). The dashboard shows her asset allocation, performance vs. S&P 500, and automated alerts for rebalancing and tax-loss harvesting.

## Current Features

### Dashboard Visualizations

- 📊 **Analytics Overview** — Stat cards with key metrics (portfolio value, YTD return, active accounts, alpha vs benchmark)
- 📈 **Area Chart** — Time-series visualization with stacked area display
- 📉 **Bar Chart** — Daily data over 90 days with interactive tooltips
- 🥧 **Pie/Donut Chart** — Category distribution with center label
- 💰 **Recent Activity** — Latest transactions with avatars and amounts
- 📋 **Data Tables** — Searchable, filterable, paginated tables with TanStack Table
- 📝 **Kanban Board** — Drag-and-drop task management with dnd-kit
- 🎨 **6 Built-in Themes** — Vercel, Claude, Neobrutualism, Supabase, Mono, Notebook

### Platform Features

- 🧠 **Feature-based Architecture** — Scalable folder structure
- ⌨️ **Command Palette** — Cmd+K search with kbar
- 🖥️ **Parallel Routes** — Independent loading and error states per chart

## Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, React 19) |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) |
| **UI Components** | [Shadcn/UI](https://ui.shadcn.com) (Radix primitives) |
| **Charts** | [Recharts](https://recharts.org) |
| **Data Tables** | [TanStack Table](https://tanstack.com/table) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs) |
| **URL State** | [Nuqs](https://nuqs.47ng.com/) |
| **Forms** | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| **Drag & Drop** | [dnd-kit](https://dndkit.com) |

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Avirage-official/Vault-Demo.git
cd Vault-Demo

# Install dependencies
bun install

# Start development server
bun run dev
```

The application will be available at **http://localhost:3000**.

For the complete setup guide, see [`docs/SETUP.md`](./docs/SETUP.md).

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── dashboard/
│   │   ├── overview/           # Analytics page with parallel routes
│   │   │   ├── @area_stats/    # Area chart (independent loading)
│   │   │   ├── @bar_stats/     # Bar chart (independent loading)
│   │   │   ├── @pie_stats/     # Pie chart (independent loading)
│   │   │   └── @sales/         # Recent activity (independent loading)
│   │   ├── product/            # Data table page
│   │   ├── kanban/             # Task board page
│   │   └── ...
│   └── (auth)/                 # Authentication pages
│
├── features/                   # Feature-based modules
│   ├── overview/components/    # AreaGraph, BarGraph, PieGraph, RecentSales
│   ├── products/components/    # ProductListing, DataTable, Columns
│   └── kanban/components/      # KanbanBoard, TaskCard, BoardColumn
│
├── components/                 # Shared components
│   ├── ui/                     # 50+ Shadcn/UI components
│   ├── layout/                 # Sidebar, Header, PageContainer
│   └── themes/                 # Theme system
│
├── lib/                        # Core utilities & data
│   ├── types/index.ts          # Financial TypeScript interfaces
│   ├── mockData/               # Vault financial mock data
│   │   ├── accounts.ts         # 7 accounts across 5 brokers
│   │   ├── holdings.ts         # 17 holdings with aggregation
│   │   ├── performance.ts      # Performance metrics & history
│   │   ├── alerts.ts           # Portfolio alerts & notifications
│   │   └── brokerConnections.ts # Broker connection status
│   ├── integrations/           # Integration placeholders
│   │   ├── brokerAdapter.ts    # Broker API interface
│   │   ├── dataAggregator.ts   # Multi-broker data combiner
│   │   └── portfolioCalculator.ts # Metrics & alert engine
│   └── utils.ts                # Helper functions
│
├── constants/                  # Original dashboard mock data
│   ├── data.ts                 # Sales data
│   └── mock-api.ts             # Product data (faker.js)
│
├── hooks/                      # Custom React hooks
├── config/                     # Navigation & app config
├── types/                      # Navigation TypeScript types
└── styles/                     # Tailwind CSS & themes
```

## Data Model

Vault uses typed financial data structures defined in [`/src/lib/types/index.ts`](./src/lib/types/index.ts):

| Type | Description |
|------|-------------|
| `BrokerConnection` | Linked brokerage platform (status, sync time, account count) |
| `Account` | Individual account (broker, type, balance, masked number) |
| `Holding` | Single security in an account (symbol, quantity, cost basis, market value) |
| `Position` | Aggregated holding across accounts (total value, weight, gain/loss) |
| `Portfolio` | Top-level summary (total value, all accounts, all positions, allocation) |
| `PerformanceMetrics` | Returns for a time period (absolute, percent, benchmark, alpha, Sharpe) |
| `Alert` | Portfolio notification (rebalancing, tax-loss, risk, performance) |
| `Transaction` | Buy/sell/dividend record |

See [`docs/DATA_MODEL.md`](./docs/DATA_MODEL.md) for the complete type reference.

## Future Integration Points

The dashboard is structured for connecting real broker APIs. Integration interfaces are defined in `/src/lib/integrations/`:

```
Broker APIs → BrokerAdapter → DataAggregator → PortfolioCalculator → Dashboard
```

| Service | File | Purpose |
|---------|------|---------|
| **BrokerAdapter** | `brokerAdapter.ts` | Interface for each broker (Fidelity, Schwab, Kraken, etc.) |
| **DataAggregator** | `dataAggregator.ts` | Combines multi-broker data into unified portfolio |
| **PortfolioCalculator** | `portfolioCalculator.ts` | Computes returns, risk metrics, generates alerts |

See [`docs/BROKER_INTEGRATION.md`](./docs/BROKER_INTEGRATION.md) for the full integration roadmap.

## Development Roadmap

| Phase | Description | Status |
|-------|-------------|--------|
| **Phase 1: Demo** | Dashboard UI with mock data, TypeScript types, documentation | ✅ Complete |
| **Phase 2a: Traditional Brokerages** | Fidelity + Schwab API integration via OAuth 2.0 | 🔜 Planned |
| **Phase 2b: Crypto Exchange** | Kraken API integration with API key auth | 🔜 Planned |
| **Phase 2c: Additional Brokers** | Vanguard + Interactive Brokers integration | 🔜 Planned |
| **Phase 3: Analytics Engine** | Real-time performance calculation, automated alerts | 🔜 Planned |
| **Phase 4: Advanced Features** | Plaid integration, push notifications, AI insights | 🔜 Planned |

## Documentation

| Document | Description |
|----------|-------------|
| [`docs/SETUP.md`](./docs/SETUP.md) | How to run locally, modify mock data, add new pages |
| [`docs/DATA_MODEL.md`](./docs/DATA_MODEL.md) | TypeScript interfaces for all financial data |
| [`docs/MOCK_DATA.md`](./docs/MOCK_DATA.md) | Where mock data lives and how it flows to components |
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | System architecture: data, component, and visualization layers |
| [`docs/BROKER_INTEGRATION.md`](./docs/BROKER_INTEGRATION.md) | Future broker API integration roadmap |
| [`docs/COMPONENT_INVENTORY.md`](./docs/COMPONENT_INVENTORY.md) | Dashboard component catalog with data mapping |
| [`docs/themes.md`](./docs/themes.md) | Theme customization guide |

## Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run lint:fix     # Fix lint issues + format
bun run format       # Format with Prettier
```
