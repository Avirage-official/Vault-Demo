/**
 * Vault Financial Dashboard - TypeScript Type Definitions
 *
 * This file defines all TypeScript interfaces and types used across the
 * Vault financial dashboard. These types model the core financial data
 * structures for portfolio management, broker integration, and analytics.
 *
 * Case Study: Sarah Chen's $750K portfolio across 5 brokers
 * (Fidelity, Schwab, Kraken, Vanguard, Interactive Brokers)
 */

// ============================================================================
// Broker Types
// ============================================================================

/** Supported broker platforms */
export type BrokerName =
  | 'fidelity'
  | 'schwab'
  | 'kraken'
  | 'vanguard'
  | 'interactive_brokers';

/** Connection status for a broker account */
export type ConnectionStatus =
  | 'connected'
  | 'disconnected'
  | 'syncing'
  | 'error';

/** Broker connection configuration */
export interface BrokerConnection {
  id: string;
  broker: BrokerName;
  displayName: string;
  status: ConnectionStatus;
  lastSync: string; // ISO 8601 timestamp
  accountCount: number;
  logoUrl?: string;
}

// ============================================================================
// Account Types
// ============================================================================

/** Account types supported by Vault */
export type AccountType =
  | 'brokerage'
  | 'ira_traditional'
  | 'ira_roth'
  | '401k'
  | 'crypto'
  | 'savings'
  | 'checking';

/** Individual brokerage account */
export interface Account {
  id: string;
  broker: BrokerName;
  accountType: AccountType;
  accountName: string;
  accountNumber: string; // Masked, e.g., "****1234"
  balance: number;
  currency: string;
  lastUpdated: string; // ISO 8601 timestamp
  isActive: boolean;
}

// ============================================================================
// Holding & Position Types
// ============================================================================

/** Asset classes for categorization */
export type AssetClass =
  | 'us_equity'
  | 'international_equity'
  | 'fixed_income'
  | 'crypto'
  | 'real_estate'
  | 'commodities'
  | 'cash'
  | 'alternatives';

/** Individual holding within an account */
export interface Holding {
  id: string;
  accountId: string;
  symbol: string;
  name: string;
  assetClass: AssetClass;
  quantity: number;
  costBasis: number;
  currentPrice: number;
  marketValue: number;
  unrealizedGainLoss: number;
  unrealizedGainLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
  lastUpdated: string; // ISO 8601 timestamp
}

/** Aggregated position across multiple accounts */
export interface Position {
  symbol: string;
  name: string;
  assetClass: AssetClass;
  totalQuantity: number;
  totalCostBasis: number;
  totalMarketValue: number;
  totalUnrealizedGainLoss: number;
  totalUnrealizedGainLossPercent: number;
  accounts: string[]; // Account IDs holding this position
  weight: number; // Percentage of total portfolio
}

// ============================================================================
// Portfolio Types
// ============================================================================

/** Portfolio-level summary */
export interface Portfolio {
  totalValue: number;
  totalCostBasis: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
  accounts: Account[];
  positions: Position[];
  assetAllocation: AssetAllocation[];
  lastUpdated: string; // ISO 8601 timestamp
}

/** Asset allocation breakdown */
export interface AssetAllocation {
  assetClass: AssetClass;
  currentWeight: number;
  targetWeight: number;
  marketValue: number;
  drift: number; // currentWeight - targetWeight
}

// ============================================================================
// Performance Metrics Types
// ============================================================================

/** Time periods for performance calculation */
export type TimePeriod =
  | '1D'
  | '1W'
  | '1M'
  | '3M'
  | '6M'
  | 'YTD'
  | '1Y'
  | '3Y'
  | '5Y'
  | 'ALL';

/** Performance data for a specific time period */
export interface PerformanceMetrics {
  period: TimePeriod;
  startValue: number;
  endValue: number;
  absoluteReturn: number;
  percentReturn: number;
  benchmarkReturn: number; // S&P 500 comparison
  alpha: number; // Return above benchmark
  sharpeRatio?: number;
  maxDrawdown?: number;
}

/** Daily performance data point for charts */
export interface PerformanceDataPoint {
  date: string; // ISO 8601 date
  portfolioValue: number;
  benchmarkValue: number;
  dailyReturn: number;
}

// ============================================================================
// Alert Types
// ============================================================================

/** Alert severity levels */
export type AlertSeverity = 'info' | 'warning' | 'critical' | 'success';

/** Alert categories */
export type AlertCategory =
  | 'rebalancing'
  | 'tax_loss_harvesting'
  | 'risk'
  | 'performance'
  | 'account'
  | 'dividend'
  | 'price';

/** Portfolio alert / notification */
export interface Alert {
  id: string;
  category: AlertCategory;
  severity: AlertSeverity;
  title: string;
  message: string;
  timestamp: string; // ISO 8601 timestamp
  isRead: boolean;
  actionUrl?: string;
  relatedSymbol?: string;
  relatedAccountId?: string;
}

// ============================================================================
// Transaction Types
// ============================================================================

/** Transaction types */
export type TransactionType =
  | 'buy'
  | 'sell'
  | 'dividend'
  | 'transfer'
  | 'deposit'
  | 'withdrawal'
  | 'fee'
  | 'interest';

/** Individual transaction record */
export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  symbol?: string;
  description: string;
  quantity?: number;
  price?: number;
  amount: number;
  date: string; // ISO 8601 timestamp
  status: 'pending' | 'completed' | 'cancelled';
}

// ============================================================================
// Dashboard Widget Types
// ============================================================================

/** Stat card data for the overview dashboard */
export interface StatCard {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  trend: 'up' | 'down' | 'neutral';
}

/** Chart data point for time-series visualizations */
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

/** Pie/donut chart segment */
export interface AllocationSegment {
  name: string;
  value: number;
  color?: string;
}
