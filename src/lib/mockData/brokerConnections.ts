/**
 * Vault Financial Dashboard - Mock Broker Connections Data
 *
 * Sample broker connection data representing Sarah Chen's linked
 * brokerage accounts. Each connection represents a broker platform
 * that has been authorized to share data with Vault.
 *
 * Case Study: Sarah Chen has connected 5 brokers to her Vault dashboard:
 * Fidelity, Schwab, Kraken, Vanguard, and Interactive Brokers.
 *
 * In Phase 2, broker connections will be managed by the BrokerAdapter
 * (see /src/lib/integrations/brokerAdapter.ts) using OAuth 2.0 flows.
 */

import type { BrokerConnection, BrokerName } from '@/lib/types';

/** Broker display metadata */
export const brokerMetadata: Record<
  BrokerName,
  { displayName: string; description: string; supportedAccountTypes: string[] }
> = {
  fidelity: {
    displayName: 'Fidelity Investments',
    description: 'Full-service brokerage with mutual funds, ETFs, and retirement accounts.',
    supportedAccountTypes: ['brokerage', 'ira_traditional', 'ira_roth', '401k']
  },
  schwab: {
    displayName: 'Charles Schwab',
    description: 'Brokerage and banking with comprehensive investment products.',
    supportedAccountTypes: ['brokerage', 'ira_traditional', 'ira_roth', 'checking', 'savings']
  },
  kraken: {
    displayName: 'Kraken',
    description: 'Cryptocurrency exchange supporting Bitcoin, Ethereum, and 200+ digital assets.',
    supportedAccountTypes: ['crypto']
  },
  vanguard: {
    displayName: 'Vanguard',
    description: 'Low-cost index fund pioneer with mutual funds, ETFs, and retirement accounts.',
    supportedAccountTypes: ['brokerage', 'ira_traditional', 'ira_roth', '401k']
  },
  interactive_brokers: {
    displayName: 'Interactive Brokers',
    description: 'Advanced trading platform with global market access and margin accounts.',
    supportedAccountTypes: ['brokerage']
  }
};

/** Sarah Chen's connected broker accounts */
export const mockBrokerConnections: BrokerConnection[] = [
  {
    id: 'conn-fidelity',
    broker: 'fidelity',
    displayName: 'Fidelity Investments',
    status: 'connected',
    lastSync: '2025-01-15T14:30:00Z',
    accountCount: 2
  },
  {
    id: 'conn-schwab',
    broker: 'schwab',
    displayName: 'Charles Schwab',
    status: 'connected',
    lastSync: '2025-01-15T14:25:00Z',
    accountCount: 2
  },
  {
    id: 'conn-kraken',
    broker: 'kraken',
    displayName: 'Kraken',
    status: 'connected',
    lastSync: '2025-01-15T14:35:00Z',
    accountCount: 1
  },
  {
    id: 'conn-vanguard',
    broker: 'vanguard',
    displayName: 'Vanguard',
    status: 'syncing',
    lastSync: '2025-01-15T12:00:00Z',
    accountCount: 1
  },
  {
    id: 'conn-ib',
    broker: 'interactive_brokers',
    displayName: 'Interactive Brokers',
    status: 'connected',
    lastSync: '2025-01-15T14:28:00Z',
    accountCount: 1
  }
];

/** Get connected brokers only */
export function getConnectedBrokers(): BrokerConnection[] {
  return mockBrokerConnections.filter(
    (conn) => conn.status === 'connected' || conn.status === 'syncing'
  );
}

/** Get total number of accounts across all brokers */
export function getTotalAccountCount(): number {
  return mockBrokerConnections.reduce(
    (sum, conn) => sum + conn.accountCount,
    0
  );
}

/** Check if any broker has a sync error */
export function hasSyncErrors(): boolean {
  return mockBrokerConnections.some((conn) => conn.status === 'error');
}
