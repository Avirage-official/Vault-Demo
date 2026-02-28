# Vault Financial Dashboard - Broker Integration Roadmap

This document outlines the planned integration strategy for connecting real brokerage APIs to the Vault dashboard. All integration interfaces are defined in [`/src/lib/integrations/`](../src/lib/integrations/).

---

## Integration Architecture

```
┌────────────────────────────────────────────────────────────┐
│                     Vault Dashboard                         │
│                   (Next.js Frontend)                        │
└────────────────────────┬───────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────┐
│                   DataAggregator                            │
│    Combines data from all connected broker adapters         │
│    Normalizes formats, deduplicates, aggregates             │
└───────┬──────────┬──────────┬──────────┬──────────┬────────┘
        │          │          │          │          │
        ▼          ▼          ▼          ▼          ▼
┌──────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐ ┌────────┐
│ Fidelity │ │  Schwab  │ │ Kraken │ │ Vanguard │ │  IBKR  │
│ Adapter  │ │ Adapter  │ │Adapter │ │ Adapter  │ │Adapter │
└────┬─────┘ └────┬─────┘ └───┬────┘ └────┬─────┘ └───┬────┘
     │            │            │           │           │
     ▼            ▼            ▼           ▼           ▼
┌──────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐ ┌────────┐
│ Fidelity │ │  Schwab  │ │ Kraken │ │ Vanguard │ │  IBKR  │
│   API    │ │   API    │ │  API   │ │   API    │ │  API   │
└──────────┘ └──────────┘ └────────┘ └──────────┘ └────────┘
```

---

## Phased Implementation Plan

### Phase 1: Demo (Current)
**Status**: ✅ Complete

- Dashboard UI with hardcoded visualizations
- Mock data modeling Sarah Chen's $750K portfolio
- TypeScript interfaces for all data shapes
- Integration placeholder files with documented interfaces

### Phase 2a: Traditional Brokerages
**Target**: Fidelity + Schwab
**Estimated Timeline**: 8-12 weeks

| Task | Description |
|------|-------------|
| OAuth 2.0 Implementation | Secure token-based authentication for both brokers |
| Account Fetching | Retrieve and normalize account data |
| Holdings Sync | Fetch positions and map to Vault types |
| Transaction History | Import buy/sell/dividend records |
| Real-time Quotes | Price updates via polling or WebSocket |
| Error Handling | Rate limiting, retry logic, failover |

### Phase 2b: Crypto Exchange
**Target**: Kraken
**Estimated Timeline**: 4-6 weeks

| Task | Description |
|------|-------------|
| API Key Authentication | HMAC-SHA512 signed request implementation |
| Wallet Balances | Fetch crypto holdings and balances |
| Trade History | Import crypto transaction records |
| Price Feeds | WebSocket integration for live crypto prices |
| Currency Conversion | USD equivalents for all crypto positions |

### Phase 2c: Additional Brokers
**Target**: Vanguard + Interactive Brokers
**Estimated Timeline**: 8-10 weeks

| Task | Description |
|------|-------------|
| Institutional API Access | Vanguard partnership and credential setup |
| Client Portal Gateway | IBKR session-based authentication |
| Mutual Fund Support | NAV-based pricing for Vanguard funds |
| Global Markets | Multi-currency support for IBKR positions |

### Phase 3: Analytics Engine
**Estimated Timeline**: 6-8 weeks

| Task | Description |
|------|-------------|
| PortfolioCalculator | Time-weighted returns, Sharpe ratio, max drawdown |
| Automated Alerts | Rebalancing, tax-loss harvesting, concentration risk |
| Benchmark Comparison | S&P 500 and custom benchmark tracking |
| Risk Analytics | Beta, volatility, VaR calculations |
| Tax Optimization | Wash sale tracking, lot-level gain/loss |

### Phase 4: Advanced Features
**Estimated Timeline**: 10-12 weeks

| Task | Description |
|------|-------------|
| Plaid Integration | Alternative aggregation via Plaid for broader broker support |
| Push Notifications | Real-time alerts via email, SMS, push |
| Portfolio Simulation | What-if analysis for allocation changes |
| AI Insights | Natural language portfolio summaries and recommendations |

---

## Broker API Details

### Fidelity Investments

| Property | Details |
|----------|---------|
| **API Type** | Fidelity Institutional API |
| **Authentication** | OAuth 2.0 PKCE flow |
| **Rate Limits** | 100 requests/minute |
| **Data Format** | JSON (proprietary schema) |
| **Supported Accounts** | Brokerage, IRA, 401(k) |
| **Real-time Quotes** | WebSocket streaming |
| **Requirements** | Institutional partnership agreement |
| **Adapter File** | `/src/lib/integrations/brokerAdapter.ts` (FidelityAdapter) |

### Charles Schwab

| Property | Details |
|----------|---------|
| **API Type** | Schwab Developer API |
| **Authentication** | OAuth 2.0 Authorization Code flow |
| **Rate Limits** | 120 requests/minute |
| **Data Format** | JSON (OpenAPI spec available) |
| **Supported Accounts** | Brokerage, IRA, checking, savings |
| **Real-time Quotes** | REST polling (15-min delayed free) |
| **Requirements** | Developer account at developer.schwab.com |
| **Adapter File** | `/src/lib/integrations/brokerAdapter.ts` (SchwabAdapter) |

### Kraken

| Property | Details |
|----------|---------|
| **API Type** | Kraken REST API |
| **Authentication** | API key + HMAC-SHA512 signed requests |
| **Rate Limits** | 15-20 requests/minute (tier-based) |
| **Data Format** | JSON |
| **Supported Accounts** | Crypto trading only |
| **Real-time Data** | WebSocket API for live prices |
| **Requirements** | API key generation from account settings |
| **Adapter File** | `/src/lib/integrations/brokerAdapter.ts` (KrakenAdapter) |

### Vanguard

| Property | Details |
|----------|---------|
| **API Type** | Vanguard Institutional API |
| **Authentication** | OAuth 2.0 with institutional credentials |
| **Rate Limits** | 60 requests/minute |
| **Data Format** | JSON/XML hybrid |
| **Supported Accounts** | Mutual funds, ETFs, retirement accounts |
| **Real-time Quotes** | End-of-day pricing (mutual funds) |
| **Requirements** | Advisory relationship required |
| **Adapter File** | `/src/lib/integrations/brokerAdapter.ts` (VanguardAdapter) |

### Interactive Brokers

| Property | Details |
|----------|---------|
| **API Type** | Client Portal API / TWS API |
| **Authentication** | Session-based tokens |
| **Rate Limits** | 50 requests/second |
| **Data Format** | JSON |
| **Supported Accounts** | Global markets, options, futures, forex |
| **Real-time Data** | WebSocket streaming |
| **Requirements** | Client Portal Gateway setup |
| **Adapter File** | `/src/lib/integrations/brokerAdapter.ts` (InteractiveBrokersAdapter) |

---

## Integration Interface

All broker adapters implement the `BrokerAdapter` interface defined in [`/src/lib/integrations/brokerAdapter.ts`](../src/lib/integrations/brokerAdapter.ts):

```typescript
interface BrokerAdapter {
  readonly brokerName: BrokerName;
  connect(): Promise<BrokerConnection>;
  disconnect(): Promise<void>;
  getConnectionStatus(): Promise<BrokerConnection>;
  getAccounts(): Promise<Account[]>;
  getHoldings(accountId: string): Promise<Holding[]>;
  getTransactions(accountId: string, startDate: string, endDate: string): Promise<Transaction[]>;
  syncData(): Promise<void>;
}
```

---

## Security Considerations

| Concern | Approach |
|---------|----------|
| **Credential Storage** | OAuth tokens encrypted at rest, never stored in frontend |
| **Token Refresh** | Automatic token refresh before expiration |
| **API Keys** | Server-side only, never exposed to browser |
| **Data Encryption** | TLS 1.3 for all API communications |
| **Access Control** | Per-user token isolation, no shared credentials |
| **Audit Logging** | All API calls logged with timestamp and user context |

---

## Related Files

- **Types**: [`/src/lib/types/index.ts`](../src/lib/types/index.ts)
- **Broker Adapter**: [`/src/lib/integrations/brokerAdapter.ts`](../src/lib/integrations/brokerAdapter.ts)
- **Data Aggregator**: [`/src/lib/integrations/dataAggregator.ts`](../src/lib/integrations/dataAggregator.ts)
- **Portfolio Calculator**: [`/src/lib/integrations/portfolioCalculator.ts`](../src/lib/integrations/portfolioCalculator.ts)
- **Mock Data**: [`/src/lib/mockData/`](../src/lib/mockData/)
