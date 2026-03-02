# Vault Financial Dashboard - Setup Guide

How to run the Vault demo locally, modify mock data, and extend the dashboard.

---

## Prerequisites

- **Node.js** 18+ or **Bun** runtime
- **Git** for cloning the repository
- A code editor (VS Code recommended)

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Avirage-official/Vault-Demo.git
cd Vault-Demo
```

### 2. Install Dependencies

```bash
# Using Bun (recommended)
bun install

# Using npm
npm install
```

### 3. Start Development Server

```bash
# Using Bun
bun run dev

# Using npm
npm run dev
```

The application will be available at **http://localhost:3000**.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server at localhost:3000 |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |
| `bun run lint:fix` | Fix ESLint issues and format code |
| `bun run lint:strict` | Lint with zero warnings tolerance |
| `bun run format` | Format all files with Prettier |
| `bun run format:check` | Check formatting without changes |

---

## How to Modify Mock Data

The Vault demo includes mock financial data for Sarah Chen's $750K portfolio. You can modify this data to test different portfolio scenarios.

### Change Portfolio Balances

Edit `/src/lib/mockData/accounts.ts`:

```typescript
// Change any account balance
{
  id: 'acc-fidelity-001',
  broker: 'fidelity',
  balance: 245000,  // ← Change this value
  // ...
}
```

### Add or Remove Holdings

Edit `/src/lib/mockData/holdings.ts`:

```typescript
// Add a new holding to the mockHoldings array
{
  id: 'hold-018',              // Unique ID
  accountId: 'acc-fidelity-001', // Must match an account
  symbol: 'AMZN',
  name: 'Amazon.com Inc.',
  assetClass: 'us_equity',
  quantity: 25,
  costBasis: 8750,
  currentPrice: 185.50,
  marketValue: 4637.50,
  unrealizedGainLoss: -4112.50,
  unrealizedGainLossPercent: -47.0,
  dayChange: 2.30,
  dayChangePercent: 1.25,
  lastUpdated: '2025-01-15T14:30:00Z'
}
```

### Add New Alerts

Edit `/src/lib/mockData/alerts.ts`:

```typescript
// Add a new alert to the mockAlerts array
{
  id: 'alert-009',
  category: 'performance',     // rebalancing | tax_loss_harvesting | risk | performance | account | dividend | price
  severity: 'success',         // info | warning | critical | success
  title: 'Portfolio Milestone: $800K',
  message: 'Your portfolio has reached $800,000 for the first time.',
  timestamp: '2025-01-16T10:00:00Z',
  isRead: false
}
```

### Modify Performance Metrics

Edit `/src/lib/mockData/performance.ts`:

- `mockPerformanceMetrics` — Period-based return summaries (1D, 1W, 1M, etc.)
- `mockPerformanceHistory` — Monthly data points for chart visualization

### Add a New Broker

1. Add the broker name to `BrokerName` type in `/src/lib/types/index.ts`
2. Add a connection to `mockBrokerConnections` in `/src/lib/mockData/brokerConnections.ts`
3. Add broker metadata to `brokerMetadata` in the same file
4. Create accounts and holdings for the new broker

---

## How to Add New Dashboard Sections

### Add a New Page

1. Create the route file:

```
src/app/dashboard/your-page/page.tsx
```

```typescript
export default function YourPage() {
  return (
    <div>
      <h1>Your Page</h1>
    </div>
  );
}
```

2. Add navigation item in `/src/config/nav-config.ts`:

```typescript
{
  title: 'Your Page',
  url: '/dashboard/your-page',
  icon: 'chart',
  shortcut: ['y', 'p'],
}
```

### Add a New Feature Module

Create a feature folder following the existing pattern:

```
src/features/your-feature/
├── components/
│   ├── your-component.tsx
│   └── your-other-component.tsx
├── utils/
│   └── helpers.ts
└── schemas/
    └── validation.ts
```

### Add a Shadcn Component

```bash
npx shadcn add component-name
```

This adds the component to `/src/components/ui/`.

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # Dashboard pages
│   │   ├── overview/       # Analytics with parallel routes
│   │   ├── product/        # Product management
│   │   ├── kanban/         # Task board
│   │   └── ...
│   └── api/                # API routes
│
├── components/             # Shared UI components
│   ├── ui/                 # Shadcn/UI components (50+)
│   └── layout/             # Sidebar, header, page container
│
├── features/               # Feature-based modules
│   ├── overview/           # Dashboard analytics components
│   ├── products/           # Product table + forms
│   └── kanban/             # Drag-and-drop task board
│
├── lib/                    # Core utilities
│   ├── types/index.ts      # Financial TypeScript interfaces
│   ├── mockData/           # Vault financial mock data
│   ├── integrations/       # Broker integration placeholders
│   └── utils.ts            # Helper functions
│
├── hooks/                  # Custom React hooks
├── config/                 # Navigation and app configuration
├── constants/              # Original dashboard mock data
├── types/                  # Navigation TypeScript types
└── styles/                 # Tailwind CSS and themes
```

---

## Troubleshooting

### Troubleshooting: Build Fails with Tailwind Errors
- Ensure using Tailwind CSS v4 syntax (`@import 'tailwindcss'`)
- Check that `postcss.config.js` uses `@tailwindcss/postcss`

### Theme Not Applying
- Check theme name matches in CSS `[data-theme]` and `theme.config.ts`
- Verify theme CSS is imported in `theme.css`

### Navigation Items Not Showing
- Check navigation items in `/src/config/nav-config.ts`

---

## Related Documentation

- **Data Model**: [`/docs/DATA_MODEL.md`](./DATA_MODEL.md) — TypeScript interfaces for all financial data
- **Mock Data**: [`/docs/MOCK_DATA.md`](./MOCK_DATA.md) — Where mock data lives and how it flows
- **Broker Integration**: [`/docs/BROKER_INTEGRATION.md`](./BROKER_INTEGRATION.md) — Future API integration roadmap
- **Architecture**: [`/docs/ARCHITECTURE.md`](./ARCHITECTURE.md) — System architecture overview
- **Component Inventory**: [`/docs/COMPONENT_INVENTORY.md`](./COMPONENT_INVENTORY.md) — Dashboard component documentation
- **Themes**: [`/docs/themes.md`](./themes.md) — Theme customization guide
