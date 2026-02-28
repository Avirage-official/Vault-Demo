# Vault Financial Dashboard - Data Model

This document defines the TypeScript interfaces and data shapes used throughout the Vault financial dashboard. All types are defined in [`/src/lib/types/index.ts`](../src/lib/types/index.ts).

---

## Core Data Entities

### Broker Connection

Represents a linked brokerage platform (e.g., Fidelity, Schwab, Kraken).

```typescript
interface BrokerConnection {
  id: string;                    // Unique connection identifier
  broker: BrokerName;            // 'fidelity' | 'schwab' | 'kraken' | 'vanguard' | 'interactive_brokers'
  displayName: string;           // Human-readable broker name
  status: ConnectionStatus;      // 'connected' | 'disconnected' | 'syncing' | 'error'
  lastSync: string;              // ISO 8601 timestamp of last data sync
  accountCount: number;          // Number of accounts at this broker
  logoUrl?: string;              // Broker logo for UI display
}
```

### Account

An individual brokerage or investment account.

```typescript
interface Account {
  id: string;                    // Unique account identifier
  broker: BrokerName;            // Which broker this account belongs to
  accountType: AccountType;      // 'brokerage' | 'ira_traditional' | 'ira_roth' | '401k' | 'crypto' | etc.
  accountName: string;           // Display name (e.g., "Individual Brokerage")
  accountNumber: string;         // Masked number (e.g., "****1234")
  balance: number;               // Current account balance in USD
  currency: string;              // Currency code (e.g., "USD")
  lastUpdated: string;           // ISO 8601 timestamp
  isActive: boolean;             // Whether account is actively tracked
}
```

### Holding

A single security held in a specific account.

```typescript
interface Holding {
  id: string;                           // Unique holding identifier
  accountId: string;                    // Parent account ID
  symbol: string;                       // Ticker symbol (e.g., "AAPL")
  name: string;                         // Security name (e.g., "Apple Inc.")
  assetClass: AssetClass;               // 'us_equity' | 'international_equity' | 'fixed_income' | 'crypto' | etc.
  quantity: number;                     // Number of shares/units
  costBasis: number;                    // Total purchase cost
  currentPrice: number;                 // Current market price per share
  marketValue: number;                  // quantity × currentPrice
  unrealizedGainLoss: number;           // marketValue - costBasis
  unrealizedGainLossPercent: number;    // Percentage gain/loss
  dayChange: number;                    // Dollar change today
  dayChangePercent: number;             // Percentage change today
  lastUpdated: string;                  // ISO 8601 timestamp
}
```

### Position (Aggregated)

The same security held across multiple accounts, combined into one view.

```typescript
interface Position {
  symbol: string;                          // Ticker symbol
  name: string;                            // Security name
  assetClass: AssetClass;                  // Asset classification
  totalQuantity: number;                   // Sum of quantities across accounts
  totalCostBasis: number;                  // Sum of cost basis across accounts
  totalMarketValue: number;                // Sum of market values
  totalUnrealizedGainLoss: number;         // Aggregate gain/loss
  totalUnrealizedGainLossPercent: number;  // Aggregate gain/loss %
  accounts: string[];                      // Account IDs holding this position
  weight: number;                          // % of total portfolio value
}
```

### Portfolio

Top-level summary of all accounts and positions.

```typescript
interface Portfolio {
  totalValue: number;              // Sum of all account balances
  totalCostBasis: number;          // Sum of all cost bases
  totalGainLoss: number;           // Total unrealized gain/loss
  totalGainLossPercent: number;    // Total gain/loss percentage
  dayChange: number;               // Total dollar change today
  dayChangePercent: number;        // Total percentage change today
  accounts: Account[];             // All linked accounts
  positions: Position[];           // Aggregated positions
  assetAllocation: AssetAllocation[];  // Allocation breakdown
  lastUpdated: string;             // ISO 8601 timestamp
}
```

### Performance Metrics

Return and risk metrics for a specific time period.

```typescript
interface PerformanceMetrics {
  period: TimePeriod;         // '1D' | '1W' | '1M' | '3M' | '6M' | 'YTD' | '1Y' | '3Y' | '5Y' | 'ALL'
  startValue: number;         // Portfolio value at period start
  endValue: number;           // Portfolio value at period end
  absoluteReturn: number;     // Dollar return
  percentReturn: number;      // Percentage return
  benchmarkReturn: number;    // S&P 500 return for comparison
  alpha: number;              // Excess return over benchmark
  sharpeRatio?: number;       // Risk-adjusted return (longer periods only)
  maxDrawdown?: number;       // Largest peak-to-trough decline
}
```

### Alert

A portfolio notification or action recommendation.

```typescript
interface Alert {
  id: string;                        // Unique alert identifier
  category: AlertCategory;           // 'rebalancing' | 'tax_loss_harvesting' | 'risk' | 'performance' | etc.
  severity: AlertSeverity;           // 'info' | 'warning' | 'critical' | 'success'
  title: string;                     // Short alert title
  message: string;                   // Detailed alert message
  timestamp: string;                 // ISO 8601 timestamp
  isRead: boolean;                   // Whether user has seen this alert
  actionUrl?: string;                // Link to take action
  relatedSymbol?: string;            // Related security symbol
  relatedAccountId?: string;         // Related account
}
```

### Transaction

An individual transaction record (buy, sell, dividend, etc.).

```typescript
interface Transaction {
  id: string;                        // Unique transaction identifier
  accountId: string;                 // Account where transaction occurred
  type: TransactionType;             // 'buy' | 'sell' | 'dividend' | 'transfer' | etc.
  symbol?: string;                   // Security symbol (if applicable)
  description: string;               // Transaction description
  quantity?: number;                 // Number of shares (if applicable)
  price?: number;                    // Price per share (if applicable)
  amount: number;                    // Total dollar amount
  date: string;                      // ISO 8601 timestamp
  status: 'pending' | 'completed' | 'cancelled';
}
```

---

## Enum Types

### BrokerName
`'fidelity' | 'schwab' | 'kraken' | 'vanguard' | 'interactive_brokers'`

### AccountType
`'brokerage' | 'ira_traditional' | 'ira_roth' | '401k' | 'crypto' | 'savings' | 'checking'`

### AssetClass
`'us_equity' | 'international_equity' | 'fixed_income' | 'crypto' | 'real_estate' | 'commodities' | 'cash' | 'alternatives'`

### TimePeriod
`'1D' | '1W' | '1M' | '3M' | '6M' | 'YTD' | '1Y' | '3Y' | '5Y' | 'ALL'`

### AlertSeverity
`'info' | 'warning' | 'critical' | 'success'`

### AlertCategory
`'rebalancing' | 'tax_loss_harvesting' | 'risk' | 'performance' | 'account' | 'dividend' | 'price'`

---

## Entity Relationships

```
BrokerConnection (1) ──── (N) Account
Account          (1) ──── (N) Holding
Account          (1) ──── (N) Transaction
Holding          (N) ──── (1) Position     (aggregated by symbol)
Position         (N) ──── (1) Portfolio    (top-level summary)
Portfolio        (1) ──── (N) AssetAllocation
Portfolio        (1) ──── (N) PerformanceMetrics
Portfolio        (1) ──── (N) Alert
```

---

## Dashboard Widget Types

These types support the dashboard UI components:

```typescript
interface StatCard {
  title: string;               // Card label (e.g., "Total Portfolio Value")
  value: string;               // Formatted value (e.g., "$750,750")
  change: number;              // Percentage change
  changeLabel: string;         // Context (e.g., "+$2,550 today")
  trend: 'up' | 'down' | 'neutral';
}

interface ChartDataPoint {
  date: string;                // X-axis label
  value: number;               // Y-axis value
  label?: string;              // Optional tooltip label
}

interface AllocationSegment {
  name: string;                // Segment label (e.g., "US Equity")
  value: number;               // Dollar value or percentage
  color?: string;              // Chart color
}
```
