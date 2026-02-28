/**
 * Vault Financial Dashboard - Mock Performance Data
 *
 * Sample performance metrics for Sarah Chen's portfolio. This includes
 * time-series data for portfolio value charts, period returns, and
 * benchmark comparisons.
 *
 * Case Study: Sarah Chen's portfolio has outperformed the S&P 500
 * by 2.3% over the last 12 months, driven by strong tech holdings.
 *
 * In Phase 2, this mock data will be replaced by calculations from the
 * PortfolioCalculator (see /src/lib/integrations/portfolioCalculator.ts).
 */

import type { PerformanceMetrics, PerformanceDataPoint, TimePeriod } from '@/lib/types';

/** Performance metrics across different time periods */
export const mockPerformanceMetrics: PerformanceMetrics[] = [
  {
    period: '1D',
    startValue: 748200,
    endValue: 750750,
    absoluteReturn: 2550,
    percentReturn: 0.34,
    benchmarkReturn: 0.28,
    alpha: 0.06
  },
  {
    period: '1W',
    startValue: 742000,
    endValue: 750750,
    absoluteReturn: 8750,
    percentReturn: 1.18,
    benchmarkReturn: 0.95,
    alpha: 0.23
  },
  {
    period: '1M',
    startValue: 735000,
    endValue: 750750,
    absoluteReturn: 15750,
    percentReturn: 2.14,
    benchmarkReturn: 1.85,
    alpha: 0.29
  },
  {
    period: '3M',
    startValue: 710000,
    endValue: 750750,
    absoluteReturn: 40750,
    percentReturn: 5.74,
    benchmarkReturn: 4.92,
    alpha: 0.82
  },
  {
    period: '6M',
    startValue: 685000,
    endValue: 750750,
    absoluteReturn: 65750,
    percentReturn: 9.6,
    benchmarkReturn: 8.15,
    alpha: 1.45
  },
  {
    period: 'YTD',
    startValue: 720000,
    endValue: 750750,
    absoluteReturn: 30750,
    percentReturn: 4.27,
    benchmarkReturn: 3.85,
    alpha: 0.42
  },
  {
    period: '1Y',
    startValue: 650000,
    endValue: 750750,
    absoluteReturn: 100750,
    percentReturn: 15.5,
    benchmarkReturn: 13.2,
    alpha: 2.3,
    sharpeRatio: 1.45,
    maxDrawdown: -8.2
  },
  {
    period: '3Y',
    startValue: 520000,
    endValue: 750750,
    absoluteReturn: 230750,
    percentReturn: 44.38,
    benchmarkReturn: 38.5,
    alpha: 5.88,
    sharpeRatio: 1.32,
    maxDrawdown: -15.4
  },
  {
    period: 'ALL',
    startValue: 350000,
    endValue: 750750,
    absoluteReturn: 400750,
    percentReturn: 114.5,
    benchmarkReturn: 95.3,
    alpha: 19.2,
    sharpeRatio: 1.28,
    maxDrawdown: -22.1
  }
];

/** Monthly portfolio value data points for chart visualization (last 12 months) */
export const mockPerformanceHistory: PerformanceDataPoint[] = [
  { date: '2024-02-01', portfolioValue: 650000, benchmarkValue: 645000, dailyReturn: 0.12 },
  { date: '2024-03-01', portfolioValue: 668000, benchmarkValue: 660000, dailyReturn: 2.77 },
  { date: '2024-04-01', portfolioValue: 655000, benchmarkValue: 652000, dailyReturn: -1.95 },
  { date: '2024-05-01', portfolioValue: 680000, benchmarkValue: 670000, dailyReturn: 3.82 },
  { date: '2024-06-01', portfolioValue: 695000, benchmarkValue: 682000, dailyReturn: 2.21 },
  { date: '2024-07-01', portfolioValue: 685000, benchmarkValue: 678000, dailyReturn: -1.44 },
  { date: '2024-08-01', portfolioValue: 710000, benchmarkValue: 698000, dailyReturn: 3.65 },
  { date: '2024-09-01', portfolioValue: 698000, benchmarkValue: 690000, dailyReturn: -1.69 },
  { date: '2024-10-01', portfolioValue: 720000, benchmarkValue: 710000, dailyReturn: 3.15 },
  { date: '2024-11-01', portfolioValue: 735000, benchmarkValue: 722000, dailyReturn: 2.08 },
  { date: '2024-12-01', portfolioValue: 742000, benchmarkValue: 730000, dailyReturn: 0.95 },
  { date: '2025-01-01', portfolioValue: 750750, benchmarkValue: 738000, dailyReturn: 1.18 }
];

/** Get performance metrics for a specific time period */
export function getPerformanceByPeriod(
  period: TimePeriod
): PerformanceMetrics | undefined {
  return mockPerformanceMetrics.find((m) => m.period === period);
}

/** Get portfolio stat cards derived from performance data */
export function getPortfolioStatCards() {
  const ytd = getPerformanceByPeriod('YTD');
  const oneDay = getPerformanceByPeriod('1D');

  return {
    totalPortfolioValue: {
      title: 'Total Portfolio Value',
      value: '$750,750',
      change: oneDay?.percentReturn ?? 0,
      changeLabel: `${oneDay?.absoluteReturn ? '+$' + oneDay.absoluteReturn.toLocaleString() : '$0'} today`,
      trend: (oneDay?.percentReturn ?? 0) >= 0 ? 'up' as const : 'down' as const
    },
    ytdReturn: {
      title: 'YTD Return',
      value: `${ytd?.percentReturn ?? 0}%`,
      change: ytd?.percentReturn ?? 0,
      changeLabel: `+$${ytd?.absoluteReturn?.toLocaleString() ?? '0'}`,
      trend: (ytd?.percentReturn ?? 0) >= 0 ? 'up' as const : 'down' as const
    },
    activeAccounts: {
      title: 'Active Accounts',
      value: '7',
      change: 12.5,
      changeLabel: '5 brokers connected',
      trend: 'up' as const
    },
    alphaGenerated: {
      title: 'Alpha vs S&P 500',
      value: `+${ytd?.alpha ?? 0}%`,
      change: ytd?.alpha ?? 0,
      changeLabel: 'Outperforming benchmark',
      trend: (ytd?.alpha ?? 0) >= 0 ? 'up' as const : 'down' as const
    }
  };
}
