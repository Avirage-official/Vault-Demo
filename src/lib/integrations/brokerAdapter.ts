/**
 * Vault Financial Dashboard - Broker Adapter Interface
 *
 * This file defines the interface for connecting to brokerage APIs.
 * Each broker (Fidelity, Schwab, Kraken, etc.) will implement the
 * BrokerAdapter interface to provide a unified data access layer.
 *
 * CURRENT STATUS: Placeholder — using mock data from /src/lib/mockData/
 *
 * PHASE 2 IMPLEMENTATION:
 * - Each broker gets its own adapter class (e.g., FidelityAdapter, SchwabAdapter)
 * - Adapters handle OAuth 2.0 authentication flows
 * - Adapters normalize broker-specific data formats into Vault's unified types
 * - Error handling, rate limiting, and retry logic per broker
 *
 * INTEGRATION TIMELINE:
 * - Phase 2a: Fidelity + Schwab (traditional brokerages)
 * - Phase 2b: Kraken (crypto exchange)
 * - Phase 2c: Vanguard + Interactive Brokers
 */

import type {
  Account,
  Holding,
  Transaction,
  BrokerConnection,
  BrokerName
} from '@/lib/types';

// ============================================================================
// Broker Adapter Interface
// ============================================================================

/**
 * BrokerAdapter defines the contract that each broker integration must fulfill.
 * This abstraction allows the dashboard to consume data from any broker
 * through a consistent API, regardless of the underlying broker's data format.
 *
 * Usage (Phase 2):
 *   const fidelity = new FidelityAdapter(credentials);
 *   await fidelity.connect();
 *   const accounts = await fidelity.getAccounts();
 *   const holdings = await fidelity.getHoldings('account-id');
 */
export interface BrokerAdapter {
  /** Unique identifier for this broker */
  readonly brokerName: BrokerName;

  /**
   * Initiate OAuth 2.0 connection flow with the broker.
   * Returns the authorization URL for the user to grant access.
   *
   * Implementation notes:
   * - Fidelity: Uses OAuth 2.0 PKCE flow
   * - Schwab: Uses OAuth 2.0 Authorization Code flow
   * - Kraken: Uses API key + secret (no OAuth)
   * - Vanguard: Uses OAuth 2.0 with institutional endpoints
   * - Interactive Brokers: Uses Client Portal API with session tokens
   */
  connect(): Promise<BrokerConnection>;

  /**
   * Disconnect and revoke access tokens for this broker.
   */
  disconnect(): Promise<void>;

  /**
   * Check the current connection status.
   * Verifies that access tokens are valid and the broker API is reachable.
   */
  getConnectionStatus(): Promise<BrokerConnection>;

  /**
   * Fetch all accounts linked through this broker connection.
   * Returns normalized Account objects regardless of broker-specific format.
   */
  getAccounts(): Promise<Account[]>;

  /**
   * Fetch all holdings for a specific account.
   * @param accountId - The Vault account ID (not the broker's native ID)
   */
  getHoldings(accountId: string): Promise<Holding[]>;

  /**
   * Fetch transaction history for a specific account.
   * @param accountId - The Vault account ID
   * @param startDate - ISO 8601 date string for range start
   * @param endDate - ISO 8601 date string for range end
   */
  getTransactions(
    accountId: string,
    startDate: string,
    endDate: string
  ): Promise<Transaction[]>;

  /**
   * Trigger a manual sync of all account data from this broker.
   * Updates accounts, holdings, and recent transactions.
   */
  syncData(): Promise<void>;
}

// ============================================================================
// Placeholder Implementations (Phase 2)
// ============================================================================

/**
 * TODO (Phase 2a): Implement FidelityAdapter
 *
 * Fidelity API Integration Notes:
 * - API: Fidelity Institutional API (requires partnership agreement)
 * - Auth: OAuth 2.0 PKCE flow
 * - Rate Limits: 100 requests/minute
 * - Data Format: JSON (proprietary schema)
 * - Supported: Brokerage, IRA, 401(k) accounts
 * - Real-time quotes: Available via streaming WebSocket
 *
 * class FidelityAdapter implements BrokerAdapter {
 *   readonly brokerName = 'fidelity';
 *   // ... implementation
 * }
 */

/**
 * TODO (Phase 2a): Implement SchwabAdapter
 *
 * Schwab API Integration Notes:
 * - API: Schwab Developer API (developer.schwab.com)
 * - Auth: OAuth 2.0 Authorization Code flow
 * - Rate Limits: 120 requests/minute
 * - Data Format: JSON (OpenAPI spec available)
 * - Supported: Brokerage, IRA, checking/savings accounts
 * - Real-time quotes: REST polling (15-min delayed free, real-time with subscription)
 *
 * class SchwabAdapter implements BrokerAdapter {
 *   readonly brokerName = 'schwab';
 *   // ... implementation
 * }
 */

/**
 * TODO (Phase 2b): Implement KrakenAdapter
 *
 * Kraken API Integration Notes:
 * - API: Kraken REST API (docs.kraken.com)
 * - Auth: API key + HMAC-SHA512 signed requests (no OAuth)
 * - Rate Limits: 15-20 requests/minute (tier-based)
 * - Data Format: JSON
 * - Supported: Crypto trading accounts only
 * - Real-time: WebSocket API for live order book and trades
 *
 * class KrakenAdapter implements BrokerAdapter {
 *   readonly brokerName = 'kraken';
 *   // ... implementation
 * }
 */

/**
 * TODO (Phase 2c): Implement VanguardAdapter
 *
 * Vanguard API Integration Notes:
 * - API: Vanguard Institutional API (requires advisory relationship)
 * - Auth: OAuth 2.0 with institutional credentials
 * - Rate Limits: 60 requests/minute
 * - Data Format: JSON/XML hybrid
 * - Supported: Mutual funds, ETFs, retirement accounts
 * - Note: Limited real-time data; most data is end-of-day
 *
 * class VanguardAdapter implements BrokerAdapter {
 *   readonly brokerName = 'vanguard';
 *   // ... implementation
 * }
 */

/**
 * TODO (Phase 2c): Implement InteractiveBrokersAdapter
 *
 * Interactive Brokers API Integration Notes:
 * - API: Client Portal API or TWS API
 * - Auth: Session-based tokens via Client Portal Gateway
 * - Rate Limits: 50 requests/second (generous)
 * - Data Format: JSON
 * - Supported: Global markets, options, futures, forex, margin accounts
 * - Real-time: WebSocket streaming for live market data
 *
 * class InteractiveBrokersAdapter implements BrokerAdapter {
 *   readonly brokerName = 'interactive_brokers';
 *   // ... implementation
 * }
 */
