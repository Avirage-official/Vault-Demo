/**
 * Vault Financial Dashboard - Mock Holdings Data
 *
 * Sample holdings data representing Sarah Chen's investment positions
 * across all her brokerage accounts. Holdings are individual securities
 * held within specific accounts.
 *
 * Case Study: Sarah Chen holds a diversified portfolio including
 * US equities, international equities, bonds, crypto, and REITs.
 *
 * In Phase 2, this mock data will be replaced by real data from the
 * BrokerAdapter (see /src/lib/integrations/brokerAdapter.ts).
 */

import type { Holding, Position, AssetAllocation, AssetClass } from '@/lib/types';

/** Individual holdings across all of Sarah Chen's accounts */
export const mockHoldings: Holding[] = [
  // --- Fidelity Individual Brokerage (acc-fidelity-001) ---
  {
    id: 'hold-001',
    accountId: 'acc-fidelity-001',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    assetClass: 'us_equity',
    quantity: 150,
    costBasis: 22500,
    currentPrice: 195.5,
    marketValue: 29325,
    unrealizedGainLoss: 6825,
    unrealizedGainLossPercent: 30.33,
    dayChange: 1.25,
    dayChangePercent: 0.64,
    lastUpdated: '2025-01-15T14:30:00Z'
  },
  {
    id: 'hold-002',
    accountId: 'acc-fidelity-001',
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    assetClass: 'us_equity',
    quantity: 80,
    costBasis: 24000,
    currentPrice: 420.75,
    marketValue: 33660,
    unrealizedGainLoss: 9660,
    unrealizedGainLossPercent: 40.25,
    dayChange: -2.3,
    dayChangePercent: -0.54,
    lastUpdated: '2025-01-15T14:30:00Z'
  },
  {
    id: 'hold-003',
    accountId: 'acc-fidelity-001',
    symbol: 'VOO',
    name: 'Vanguard S&P 500 ETF',
    assetClass: 'us_equity',
    quantity: 200,
    costBasis: 70000,
    currentPrice: 485.2,
    marketValue: 97040,
    unrealizedGainLoss: 27040,
    unrealizedGainLossPercent: 38.63,
    dayChange: 0.85,
    dayChangePercent: 0.18,
    lastUpdated: '2025-01-15T14:30:00Z'
  },
  {
    id: 'hold-004',
    accountId: 'acc-fidelity-001',
    symbol: 'VXUS',
    name: 'Vanguard Total Intl Stock ETF',
    assetClass: 'international_equity',
    quantity: 500,
    costBasis: 27500,
    currentPrice: 58.4,
    marketValue: 29200,
    unrealizedGainLoss: 1700,
    unrealizedGainLossPercent: 6.18,
    dayChange: 0.32,
    dayChangePercent: 0.55,
    lastUpdated: '2025-01-15T14:30:00Z'
  },
  {
    id: 'hold-005',
    accountId: 'acc-fidelity-001',
    symbol: 'BND',
    name: 'Vanguard Total Bond Market ETF',
    assetClass: 'fixed_income',
    quantity: 750,
    costBasis: 56250,
    currentPrice: 74.15,
    marketValue: 55612.5,
    unrealizedGainLoss: -637.5,
    unrealizedGainLossPercent: -1.13,
    dayChange: 0.08,
    dayChangePercent: 0.11,
    lastUpdated: '2025-01-15T14:30:00Z'
  },

  // --- Fidelity Roth IRA (acc-fidelity-002) ---
  {
    id: 'hold-006',
    accountId: 'acc-fidelity-002',
    symbol: 'VTI',
    name: 'Vanguard Total Stock Market ETF',
    assetClass: 'us_equity',
    quantity: 300,
    costBasis: 60000,
    currentPrice: 270.5,
    marketValue: 81150,
    unrealizedGainLoss: 21150,
    unrealizedGainLossPercent: 35.25,
    dayChange: 0.6,
    dayChangePercent: 0.22,
    lastUpdated: '2025-01-15T14:30:00Z'
  },

  // --- Schwab Individual Brokerage (acc-schwab-001) ---
  {
    id: 'hold-007',
    accountId: 'acc-schwab-001',
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    assetClass: 'us_equity',
    quantity: 60,
    costBasis: 18000,
    currentPrice: 875.3,
    marketValue: 52518,
    unrealizedGainLoss: 34518,
    unrealizedGainLossPercent: 191.77,
    dayChange: 12.5,
    dayChangePercent: 1.45,
    lastUpdated: '2025-01-15T14:25:00Z'
  },
  {
    id: 'hold-008',
    accountId: 'acc-schwab-001',
    symbol: 'SCHD',
    name: 'Schwab US Dividend Equity ETF',
    assetClass: 'us_equity',
    quantity: 400,
    costBasis: 28000,
    currentPrice: 82.45,
    marketValue: 32980,
    unrealizedGainLoss: 4980,
    unrealizedGainLossPercent: 17.79,
    dayChange: -0.15,
    dayChangePercent: -0.18,
    lastUpdated: '2025-01-15T14:25:00Z'
  },
  {
    id: 'hold-009',
    accountId: 'acc-schwab-001',
    symbol: 'VNQ',
    name: 'Vanguard Real Estate ETF',
    assetClass: 'real_estate',
    quantity: 600,
    costBasis: 50400,
    currentPrice: 85.75,
    marketValue: 51450,
    unrealizedGainLoss: 1050,
    unrealizedGainLossPercent: 2.08,
    dayChange: 0.45,
    dayChangePercent: 0.53,
    lastUpdated: '2025-01-15T14:25:00Z'
  },
  {
    id: 'hold-010',
    accountId: 'acc-schwab-001',
    symbol: 'CASH',
    name: 'Cash & Equivalents',
    assetClass: 'cash',
    quantity: 1,
    costBasis: 43052,
    currentPrice: 43052,
    marketValue: 43052,
    unrealizedGainLoss: 0,
    unrealizedGainLossPercent: 0,
    dayChange: 0,
    dayChangePercent: 0,
    lastUpdated: '2025-01-15T14:25:00Z'
  },

  // --- Schwab Traditional IRA (acc-schwab-002) ---
  {
    id: 'hold-011',
    accountId: 'acc-schwab-002',
    symbol: 'SWTSX',
    name: 'Schwab Total Stock Market Index',
    assetClass: 'us_equity',
    quantity: 800,
    costBasis: 48000,
    currentPrice: 77.5,
    marketValue: 62000,
    unrealizedGainLoss: 14000,
    unrealizedGainLossPercent: 29.17,
    dayChange: 0.35,
    dayChangePercent: 0.45,
    lastUpdated: '2025-01-15T14:25:00Z'
  },

  // --- Kraken Crypto (acc-kraken-001) ---
  {
    id: 'hold-012',
    accountId: 'acc-kraken-001',
    symbol: 'BTC',
    name: 'Bitcoin',
    assetClass: 'crypto',
    quantity: 0.5,
    costBasis: 21000,
    currentPrice: 62000,
    marketValue: 31000,
    unrealizedGainLoss: 10000,
    unrealizedGainLossPercent: 47.62,
    dayChange: 850,
    dayChangePercent: 1.39,
    lastUpdated: '2025-01-15T14:35:00Z'
  },
  {
    id: 'hold-013',
    accountId: 'acc-kraken-001',
    symbol: 'ETH',
    name: 'Ethereum',
    assetClass: 'crypto',
    quantity: 4.0,
    costBasis: 8000,
    currentPrice: 3500,
    marketValue: 14000,
    unrealizedGainLoss: 6000,
    unrealizedGainLossPercent: 75.0,
    dayChange: -45,
    dayChangePercent: -1.27,
    lastUpdated: '2025-01-15T14:35:00Z'
  },

  // --- Vanguard 401(k) (acc-vanguard-001) ---
  {
    id: 'hold-014',
    accountId: 'acc-vanguard-001',
    symbol: 'VFIAX',
    name: 'Vanguard 500 Index Fund Admiral',
    assetClass: 'us_equity',
    quantity: 150,
    costBasis: 52500,
    currentPrice: 485.3,
    marketValue: 72795,
    unrealizedGainLoss: 20295,
    unrealizedGainLossPercent: 38.66,
    dayChange: 0.9,
    dayChangePercent: 0.19,
    lastUpdated: '2025-01-15T12:00:00Z'
  },
  {
    id: 'hold-015',
    accountId: 'acc-vanguard-001',
    symbol: 'VBTLX',
    name: 'Vanguard Total Bond Market Index Admiral',
    assetClass: 'fixed_income',
    quantity: 2500,
    costBasis: 25000,
    currentPrice: 10.08,
    marketValue: 25200,
    unrealizedGainLoss: 200,
    unrealizedGainLossPercent: 0.8,
    dayChange: 0.02,
    dayChangePercent: 0.2,
    lastUpdated: '2025-01-15T12:00:00Z'
  },

  // --- Interactive Brokers Margin Account (acc-ib-001) ---
  {
    id: 'hold-016',
    accountId: 'acc-ib-001',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    assetClass: 'us_equity',
    quantity: 50,
    costBasis: 12500,
    currentPrice: 420.0,
    marketValue: 21000,
    unrealizedGainLoss: 8500,
    unrealizedGainLossPercent: 68.0,
    dayChange: 5.75,
    dayChangePercent: 1.39,
    lastUpdated: '2025-01-15T14:28:00Z'
  },
  {
    id: 'hold-017',
    accountId: 'acc-ib-001',
    symbol: 'GLD',
    name: 'SPDR Gold Trust',
    assetClass: 'commodities',
    quantity: 75,
    costBasis: 13500,
    currentPrice: 196.5,
    marketValue: 14737.5,
    unrealizedGainLoss: 1237.5,
    unrealizedGainLossPercent: 9.17,
    dayChange: 0.8,
    dayChangePercent: 0.41,
    lastUpdated: '2025-01-15T14:28:00Z'
  }
];

/**
 * Aggregate holdings into positions (grouped by symbol across accounts).
 * In Phase 2, this will be handled by the DataAggregator service.
 */
export function getAggregatedPositions(): Position[] {
  const positionMap = new Map<
    string,
    {
      symbol: string;
      name: string;
      assetClass: AssetClass;
      totalQuantity: number;
      totalCostBasis: number;
      totalMarketValue: number;
      accounts: string[];
    }
  >();

  for (const holding of mockHoldings) {
    const existing = positionMap.get(holding.symbol);
    if (existing) {
      existing.totalQuantity += holding.quantity;
      existing.totalCostBasis += holding.costBasis;
      existing.totalMarketValue += holding.marketValue;
      existing.accounts.push(holding.accountId);
    } else {
      positionMap.set(holding.symbol, {
        symbol: holding.symbol,
        name: holding.name,
        assetClass: holding.assetClass,
        totalQuantity: holding.quantity,
        totalCostBasis: holding.costBasis,
        totalMarketValue: holding.marketValue,
        accounts: [holding.accountId]
      });
    }
  }

  const totalPortfolioValue = Array.from(positionMap.values()).reduce(
    (sum, p) => sum + p.totalMarketValue,
    0
  );

  return Array.from(positionMap.values()).map((p) => ({
    symbol: p.symbol,
    name: p.name,
    assetClass: p.assetClass,
    totalQuantity: p.totalQuantity,
    totalCostBasis: p.totalCostBasis,
    totalMarketValue: p.totalMarketValue,
    totalUnrealizedGainLoss: p.totalMarketValue - p.totalCostBasis,
    totalUnrealizedGainLossPercent:
      ((p.totalMarketValue - p.totalCostBasis) / p.totalCostBasis) * 100,
    accounts: p.accounts,
    weight: (p.totalMarketValue / totalPortfolioValue) * 100
  }));
}

/** Get asset allocation breakdown */
export function getAssetAllocation(): AssetAllocation[] {
  const allocationMap = new Map<AssetClass, number>();

  for (const holding of mockHoldings) {
    const current = allocationMap.get(holding.assetClass) || 0;
    allocationMap.set(holding.assetClass, current + holding.marketValue);
  }

  const totalValue = Array.from(allocationMap.values()).reduce(
    (sum, v) => sum + v,
    0
  );

  // Target allocations for Sarah Chen's investment strategy
  const targets: Record<AssetClass, number> = {
    us_equity: 50,
    international_equity: 10,
    fixed_income: 15,
    crypto: 8,
    real_estate: 8,
    commodities: 4,
    cash: 3,
    alternatives: 2
  };

  return Array.from(allocationMap.entries()).map(([assetClass, marketValue]) => {
    const currentWeight = (marketValue / totalValue) * 100;
    const targetWeight = targets[assetClass] || 0;
    return {
      assetClass,
      currentWeight: Math.round(currentWeight * 100) / 100,
      targetWeight,
      marketValue,
      drift: Math.round((currentWeight - targetWeight) * 100) / 100
    };
  });
}
