/**
 * Vault Financial Dashboard - Mock Account Data
 *
 * Sample data representing Sarah Chen's brokerage accounts across 5 brokers.
 * This data is used to demonstrate the Vault dashboard's multi-broker
 * aggregation capabilities.
 *
 * Case Study: Sarah Chen - Individual investor with $750K+ portfolio
 * spread across Fidelity, Schwab, Kraken, Vanguard, and Interactive Brokers.
 *
 * In Phase 2, this mock data will be replaced by real data from the
 * BrokerAdapter (see /src/lib/integrations/brokerAdapter.ts).
 */

import type { Account, AccountType, BrokerName } from '@/lib/types';

/** All accounts for Sarah Chen's portfolio */
export const mockAccounts: Account[] = [
  {
    id: 'acc-fidelity-001',
    broker: 'fidelity',
    accountType: 'brokerage',
    accountName: 'Individual Brokerage',
    accountNumber: '****4821',
    balance: 245000,
    currency: 'USD',
    lastUpdated: '2025-01-15T14:30:00Z',
    isActive: true
  },
  {
    id: 'acc-fidelity-002',
    broker: 'fidelity',
    accountType: 'ira_roth',
    accountName: 'Roth IRA',
    accountNumber: '****4822',
    balance: 85000,
    currency: 'USD',
    lastUpdated: '2025-01-15T14:30:00Z',
    isActive: true
  },
  {
    id: 'acc-schwab-001',
    broker: 'schwab',
    accountType: 'brokerage',
    accountName: 'Individual Brokerage',
    accountNumber: '****7734',
    balance: 180000,
    currency: 'USD',
    lastUpdated: '2025-01-15T14:25:00Z',
    isActive: true
  },
  {
    id: 'acc-schwab-002',
    broker: 'schwab',
    accountType: 'ira_traditional',
    accountName: 'Traditional IRA',
    accountNumber: '****7735',
    balance: 62000,
    currency: 'USD',
    lastUpdated: '2025-01-15T14:25:00Z',
    isActive: true
  },
  {
    id: 'acc-kraken-001',
    broker: 'kraken',
    accountType: 'crypto',
    accountName: 'Crypto Trading',
    accountNumber: '****9102',
    balance: 45000,
    currency: 'USD',
    lastUpdated: '2025-01-15T14:35:00Z',
    isActive: true
  },
  {
    id: 'acc-vanguard-001',
    broker: 'vanguard',
    accountType: '401k',
    accountName: '401(k) Retirement',
    accountNumber: '****3356',
    balance: 98000,
    currency: 'USD',
    lastUpdated: '2025-01-15T12:00:00Z',
    isActive: true
  },
  {
    id: 'acc-ib-001',
    broker: 'interactive_brokers',
    accountType: 'brokerage',
    accountName: 'Margin Account',
    accountNumber: '****5501',
    balance: 35750,
    currency: 'USD',
    lastUpdated: '2025-01-15T14:28:00Z',
    isActive: true
  }
];

/** Get total balance across all accounts */
export function getTotalBalance(): number {
  return mockAccounts.reduce((sum, account) => sum + account.balance, 0);
}

/** Get accounts grouped by broker */
export function getAccountsByBroker(): Record<BrokerName, Account[]> {
  return mockAccounts.reduce(
    (grouped, account) => {
      if (!grouped[account.broker]) {
        grouped[account.broker] = [];
      }
      grouped[account.broker].push(account);
      return grouped;
    },
    {} as Record<BrokerName, Account[]>
  );
}

/** Get accounts grouped by type */
export function getAccountsByType(): Record<AccountType, Account[]> {
  return mockAccounts.reduce(
    (grouped, account) => {
      if (!grouped[account.accountType]) {
        grouped[account.accountType] = [];
      }
      grouped[account.accountType].push(account);
      return grouped;
    },
    {} as Record<AccountType, Account[]>
  );
}
