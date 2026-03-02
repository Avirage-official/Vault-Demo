# Vault Financial Dashboard - Mock Data Guide

This document describes where mock data lives in the Vault codebase, what it represents, and how it flows to dashboard components.

---

## Overview

The Vault demo uses two layers of mock data:

1. **Original Dashboard Data** — Pre-existing sample data from the admin dashboard starter template (products, sales)
2. **Vault Financial Data** — New financial mock data modeling Sarah Chen's $750K multi-broker portfolio

---

## Mock Data Locations

### Vault Financial Mock Data (`/src/lib/mockData/`)

These files contain the financial data that represents Vault's core use case:

| File | Description | Key Exports |
|------|-------------|-------------|
| [`accounts.ts`](../src/lib/mockData/accounts.ts) | 7 brokerage accounts across 5 brokers | `mockAccounts`, `getTotalBalance()`, `getAccountsByBroker()` |
| [`holdings.ts`](../src/lib/mockData/holdings.ts) | 17 individual security holdings | `mockHoldings`, `getAggregatedPositions()`, `getAssetAllocation()` |
| [`performance.ts`](../src/lib/mockData/performance.ts) | Portfolio performance metrics and history | `mockPerformanceMetrics`, `mockPerformanceHistory`, `getPortfolioStatCards()` |
| [`alerts.ts`](../src/lib/mockData/alerts.ts) | 8 portfolio alerts and notifications | `mockAlerts`, `getUnreadAlerts()`, `getAlertsByCategory()` |
| [`brokerConnections.ts`](../src/lib/mockData/brokerConnections.ts) | 5 broker connection records | `mockBrokerConnections`, `brokerMetadata`, `getConnectedBrokers()` |

### Original Dashboard Mock Data (`/src/constants/`)

These files contain the original admin dashboard starter data:

| File | Description | Key Exports |
|------|-------------|-------------|
| [`data.ts`](../src/constants/data.ts) | Static sales data (5 records) | `recentSalesData: SaleUser[]` |
| [`mock-api.ts`](../src/constants/mock-api.ts) | Fake product database (20 records, faker.js) | `fakeProducts.getProducts()`, `fakeProducts.getProductById()` |

---

## Case Study: Sarah Chen's Portfolio

All Vault financial mock data models a single investor persona:

**Sarah Chen** — Individual investor with a $750,750 portfolio across 5 brokers.

### Account Breakdown

| Broker | Account Type | Balance | Account ID |
|--------|-------------|---------|------------|
| Fidelity | Individual Brokerage | $245,000 | acc-fidelity-001 |
| Fidelity | Roth IRA | $85,000 | acc-fidelity-002 |
| Schwab | Individual Brokerage | $180,000 | acc-schwab-001 |
| Schwab | Traditional IRA | $62,000 | acc-schwab-002 |
| Kraken | Crypto Trading | $45,000 | acc-kraken-001 |
| Vanguard | 401(k) Retirement | $98,000 | acc-vanguard-001 |
| Interactive Brokers | Margin Account | $35,750 | acc-ib-001 |
| **Total** | | **$750,750** | |

### Holdings Summary

Sarah holds 17 positions across her accounts, including:
- **US Equities**: AAPL, MSFT, NVDA, TSLA, VOO, VTI, SCHD, SWTSX, VFIAX
- **International Equities**: VXUS
- **Fixed Income**: BND, VBTLX
- **Crypto**: BTC, ETH
- **Real Estate**: VNQ
- **Commodities**: GLD
- **Cash**: Cash reserves in Schwab

### Alert Types

The demo includes 8 sample alerts covering:
- **Rebalancing**: US equity overweight (64% vs 50% target)
- **Tax-Loss Harvesting**: BND unrealized loss opportunity
- **Performance**: NVDA +191% since purchase
- **Risk**: Tech sector concentration warning
- **Dividend**: Upcoming SCHD ex-dividend date
- **Account**: Vanguard sync delay notification
- **Price**: BTC price milestone alert

---

## Data Flow: Mock Data → Components

### Current Dashboard Components (Phase 1)

The existing dashboard components use **hardcoded data** within their source files. The Vault mock data in `/src/lib/mockData/` is structured and ready for Phase 2 integration.

```
CURRENT DATA FLOW (Phase 1 - Demo):
┌─────────────────────────────────┐
│   Hardcoded in Components       │
│   (stat cards, chart arrays)    │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   Dashboard UI Components       │
│   /src/features/overview/       │
│   - AreaGraph (area-graph.tsx)  │
│   - BarGraph (bar-graph.tsx)    │
│   - PieGraph (pie-graph.tsx)    │
│   - RecentSales                 │
│   - StatCards (overview.tsx)    │
└─────────────────────────────────┘

FUTURE DATA FLOW (Phase 2 - Integration):
┌─────────────────────────────────┐
│   Broker APIs                   │
│   Fidelity, Schwab, Kraken...   │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   BrokerAdapter                 │
│   /src/lib/integrations/        │
│   brokerAdapter.ts              │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   DataAggregator                │
│   dataAggregator.ts             │
│   Combines multi-broker data    │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   PortfolioCalculator           │
│   portfolioCalculator.ts        │
│   Computes metrics & alerts     │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│   Vault Mock Data Types         │
│   /src/lib/types/index.ts       │
│   → Dashboard Components        │
└─────────────────────────────────┘
```

### Specific Component → Data Mapping

| Component | Current Data Source | Future Data Source (Phase 2) |
|-----------|-------------------|------------------------------|
| Stat Cards (overview.tsx) | Hardcoded values | `getPortfolioStatCards()` from performance.ts → PortfolioCalculator |
| Area Chart (area-graph.tsx) | Hardcoded `chartData[]` | `mockPerformanceHistory` → PortfolioCalculator |
| Bar Chart (bar-graph.tsx) | Hardcoded daily data | Transaction volume data → DataAggregator |
| Pie Chart (pie-graph.tsx) | Hardcoded browser data | `getAssetAllocation()` → DataAggregator |
| Recent Sales (recent-sales.tsx) | `recentSalesData` from data.ts | Recent transactions → BrokerAdapter |
| Product Table | `fakeProducts` from mock-api.ts | Holdings table → DataAggregator |

---

## How to Modify Mock Data

### Changing Account Balances
Edit `/src/lib/mockData/accounts.ts` — adjust the `balance` field on any `mockAccounts` entry.

### Adding New Holdings
Add entries to `mockHoldings` in `/src/lib/mockData/holdings.ts`. Each holding needs:
- Unique `id` and valid `accountId` (must match an account in accounts.ts)
- Stock `symbol`, `name`, and `assetClass`
- Financial data: `quantity`, `costBasis`, `currentPrice`, `marketValue`

### Creating New Alerts
Add entries to `mockAlerts` in `/src/lib/mockData/alerts.ts` with:
- Unique `id`, appropriate `category` and `severity`
- Descriptive `title` and `message`
- Optional `relatedSymbol` and `relatedAccountId`

### Adjusting Performance
Edit `mockPerformanceMetrics` and `mockPerformanceHistory` in `/src/lib/mockData/performance.ts` to model different return scenarios.

---

## TypeScript Types

All mock data files use types defined in [`/src/lib/types/index.ts`](../src/lib/types/index.ts). See [`DATA_MODEL.md`](./DATA_MODEL.md) for the complete type reference.
