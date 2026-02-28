/**
 * Vault Financial Dashboard - Mock Alerts Data
 *
 * Sample alerts and notifications for Sarah Chen's portfolio. Alerts
 * cover rebalancing needs, tax-loss harvesting opportunities, risk
 * warnings, and performance milestones.
 *
 * Case Study: Sarah Chen receives automated alerts when her portfolio
 * drifts from target allocation by more than 5%, when tax-loss harvesting
 * opportunities arise, and when significant market events affect her holdings.
 *
 * In Phase 2, alerts will be generated dynamically by the PortfolioCalculator
 * (see /src/lib/integrations/portfolioCalculator.ts).
 */

import type { Alert, AlertCategory, AlertSeverity } from '@/lib/types';

/** Active alerts for Sarah Chen's portfolio */
export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    category: 'rebalancing',
    severity: 'warning',
    title: 'US Equity Overweight',
    message:
      'Your US equity allocation is 64.2% vs target of 50%. Consider rebalancing by selling $95K of US equities and redistributing to underweight asset classes.',
    timestamp: '2025-01-15T10:00:00Z',
    isRead: false,
    relatedSymbol: 'VOO'
  },
  {
    id: 'alert-002',
    category: 'tax_loss_harvesting',
    severity: 'info',
    title: 'Tax-Loss Harvesting: BND',
    message:
      'Vanguard Total Bond Market ETF (BND) has an unrealized loss of $637.50. Consider selling to harvest the tax loss and replacing with a similar bond fund (e.g., AGG) to maintain exposure.',
    timestamp: '2025-01-15T09:30:00Z',
    isRead: false,
    relatedSymbol: 'BND',
    relatedAccountId: 'acc-fidelity-001'
  },
  {
    id: 'alert-003',
    category: 'performance',
    severity: 'success',
    title: 'NVDA Up 191% Since Purchase',
    message:
      'NVIDIA Corp. in your Schwab account has gained 191.77% since purchase. Your position is now $52,518 from a $18,000 cost basis. Consider taking partial profits.',
    timestamp: '2025-01-15T08:00:00Z',
    isRead: true,
    relatedSymbol: 'NVDA',
    relatedAccountId: 'acc-schwab-001'
  },
  {
    id: 'alert-004',
    category: 'risk',
    severity: 'warning',
    title: 'Concentration Risk: Tech Sector',
    message:
      'Your combined AAPL, MSFT, NVDA, and TSLA positions represent 18.2% of your portfolio. Consider diversifying to reduce single-sector concentration risk.',
    timestamp: '2025-01-14T16:00:00Z',
    isRead: false
  },
  {
    id: 'alert-005',
    category: 'dividend',
    severity: 'info',
    title: 'Upcoming Dividend: SCHD',
    message:
      'Schwab US Dividend Equity ETF (SCHD) has an upcoming ex-dividend date on Jan 22, 2025. Expected dividend: ~$0.62/share ($248 for your 400 shares).',
    timestamp: '2025-01-14T12:00:00Z',
    isRead: true,
    relatedSymbol: 'SCHD',
    relatedAccountId: 'acc-schwab-001'
  },
  {
    id: 'alert-006',
    category: 'account',
    severity: 'critical',
    title: 'Vanguard Sync Delayed',
    message:
      'Your Vanguard 401(k) account has not synced since 12:00 PM. Last sync was 2+ hours ago. Data may not reflect current positions.',
    timestamp: '2025-01-15T14:15:00Z',
    isRead: false,
    relatedAccountId: 'acc-vanguard-001'
  },
  {
    id: 'alert-007',
    category: 'rebalancing',
    severity: 'info',
    title: 'Fixed Income Underweight',
    message:
      'Your fixed income allocation is 10.8% vs target of 15%. Consider adding $31K in bond funds to reach your target allocation.',
    timestamp: '2025-01-13T10:00:00Z',
    isRead: true
  },
  {
    id: 'alert-008',
    category: 'price',
    severity: 'info',
    title: 'BTC Price Alert: $62,000',
    message:
      'Bitcoin has reached $62,000, up 1.39% today. Your 0.5 BTC position is now worth $31,000.',
    timestamp: '2025-01-15T13:00:00Z',
    isRead: false,
    relatedSymbol: 'BTC',
    relatedAccountId: 'acc-kraken-001'
  }
];

/** Get unread alerts */
export function getUnreadAlerts(): Alert[] {
  return mockAlerts.filter((alert) => !alert.isRead);
}

/** Get alerts by category */
export function getAlertsByCategory(category: AlertCategory): Alert[] {
  return mockAlerts.filter((alert) => alert.category === category);
}

/** Get alerts by severity */
export function getAlertsBySeverity(severity: AlertSeverity): Alert[] {
  return mockAlerts.filter((alert) => alert.severity === severity);
}

/** Get critical and warning alerts count (for badge display) */
export function getUrgentAlertCount(): number {
  return mockAlerts.filter(
    (alert) =>
      !alert.isRead &&
      (alert.severity === 'critical' || alert.severity === 'warning')
  ).length;
}
