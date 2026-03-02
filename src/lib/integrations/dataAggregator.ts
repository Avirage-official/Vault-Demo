/**
 * Vault Financial Dashboard - Data Aggregator
 *
 * The DataAggregator combines data from multiple broker adapters into
 * a unified portfolio view. It handles deduplication, normalization,
 * and cross-broker position aggregation.
 *
 * CURRENT STATUS: Placeholder — using mock data from /src/lib/mockData/
 *
 * PHASE 2 IMPLEMENTATION:
 * - Aggregates accounts from all connected BrokerAdapters
 * - Merges holdings of the same security across brokers
 * - Calculates aggregate positions and portfolio-level metrics
 * - Handles currency conversion for international holdings
 * - Manages sync scheduling and conflict resolution
 *
 * DATA FLOW (Phase 2):
 *   BrokerAdapter[] → DataAggregator → Portfolio → Dashboard Components
 *
 * CURRENT DATA FLOW (Phase 1 - Demo):
 *   /src/lib/mockData/* → Dashboard Components (hardcoded)
 */

import type {
  Account,
  Holding,
  Position,
  Portfolio,
  AssetAllocation,
  BrokerName
} from '@/lib/types';

// ============================================================================
// Data Aggregator Interface
// ============================================================================

/**
 * DataAggregator is responsible for combining data from multiple broker
 * connections into a single, unified portfolio view.
 *
 * Usage (Phase 2):
 *   const aggregator = new DataAggregator(brokerAdapters);
 *   const portfolio = await aggregator.getPortfolio();
 *   const positions = await aggregator.getAggregatedPositions();
 */
export interface DataAggregator {
  /**
   * Fetch all accounts across all connected brokers.
   * Returns a flat array of Account objects sorted by broker name.
   */
  getAllAccounts(): Promise<Account[]>;

  /**
   * Fetch all holdings across all accounts and brokers.
   * Returns individual holding records with account attribution.
   */
  getAllHoldings(): Promise<Holding[]>;

  /**
   * Aggregate holdings into positions grouped by symbol.
   * Combines the same security held across multiple accounts/brokers
   * into a single Position with total quantity, cost basis, and market value.
   */
  getAggregatedPositions(): Promise<Position[]>;

  /**
   * Calculate the asset allocation breakdown.
   * Groups positions by asset class and compares to target allocations.
   */
  getAssetAllocation(): Promise<AssetAllocation[]>;

  /**
   * Build the complete portfolio summary.
   * Combines accounts, positions, and allocation into a single Portfolio object.
   */
  getPortfolio(): Promise<Portfolio>;

  /**
   * Get holdings filtered by broker.
   * Useful for showing broker-specific account views.
   * @param broker - The broker name to filter by
   */
  getHoldingsByBroker(broker: BrokerName): Promise<Holding[]>;

  /**
   * Trigger a full sync across all connected brokers.
   * Updates accounts, holdings, and calculates fresh metrics.
   */
  syncAll(): Promise<void>;
}

// ============================================================================
// Placeholder Implementation Notes
// ============================================================================

/**
 * TODO (Phase 2): Implement VaultDataAggregator
 *
 * The aggregator will:
 *
 * 1. ACCOUNT AGGREGATION
 *    - Fetch accounts from each BrokerAdapter in parallel
 *    - Normalize account types across different broker naming conventions
 *    - Detect and flag duplicate accounts (e.g., transferred accounts)
 *
 * 2. POSITION AGGREGATION
 *    - Group holdings by security symbol (e.g., VOO held at Fidelity + Schwab)
 *    - Calculate weighted average cost basis across accounts
 *    - Compute total unrealized gain/loss for combined positions
 *    - Handle lot-level tracking for tax purposes
 *
 * 3. ASSET ALLOCATION
 *    - Map each holding to its asset class (using security master data)
 *    - Calculate current allocation percentages
 *    - Compare against user-defined target allocations
 *    - Generate rebalancing recommendations when drift exceeds thresholds
 *
 * 4. SYNC MANAGEMENT
 *    - Schedule periodic syncs per broker (configurable intervals)
 *    - Handle partial sync failures gracefully (use last known data)
 *    - Log sync timestamps and error details
 *    - Rate-limit API calls to stay within broker limits
 *
 * 5. CACHING STRATEGY
 *    - Cache portfolio data with configurable TTL
 *    - Invalidate cache on manual sync or data changes
 *    - Use stale-while-revalidate pattern for real-time feel
 *
 * class VaultDataAggregator implements DataAggregator {
 *   constructor(private adapters: BrokerAdapter[]) {}
 *   // ... implementation
 * }
 */
