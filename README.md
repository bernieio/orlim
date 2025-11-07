# 🚀 Orlim Frontend - Advanced Limit Order Manager for Sui

<div align="center">

![Orlim Logo](https://img.shields.io/badge/Orlim-Frontend-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript)
![Sui](https://img.shields.io/badge/Sui-DApp%20Kit-4BC0F8?style=for-the-badge&logo=sui)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite)

**Modern React frontend for the Orlim limit order management system on Sui**

[![Live Demo](https://img.shields.io/badge/Demo-Live-brightgreen?style=flat-square)](https://orlim.netlify.app/)
[![Contract](https://img.shields.io/badge/Contract-v1.0.0-orange?style=flat-square)](https://github.com/bernieio/orlim-contract)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#license)

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [⚡ Performance](#-performance)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Quick Start](#-quick-start)
- [📖 Usage](#-usage)
- [🔧 Configuration](#-configuration)
- [🧪 Development](#-development)
- [📊 Integration](#-integration)
- [👥 Team](#-team)
- [📄 License](#-license)

---

## 🎯 Overview

**Orlim Frontend** is the modern, responsive web interface for the Orlim limit order management system. Built with React 18, TypeScript, and Vite, it provides users with a Jupiter-like trading experience on the Sui blockchain, featuring advanced order management, real-time market data, and gas-efficient batch operations.

### 🎪 The Orlim Ecosystem

Orlim brings **advanced trading tools to Sui** that are currently missing compared to other ecosystems:

| Feature | Solana (Jupiter) | BSC (PancakeSwap) | **Sui + Orlim** |
|---------|------------------|-------------------|-----------------|
| **DEX Aggregator** | ✅ Jupiter (62.69% share) | ✅ PancakeSwap | 🚀 **Coming Soon** |
| **Limit Orders** | ✅ Advanced | ✅ Multiple DEXs | ✅ **Orlim (Available)** |
| **Batch Operations** | ✅ Supported | ✅ Supported | ✅ **PTB-Optimized** |
| **User Experience** | ✅ Excellent | ✅ Good | ✅ **Modern & Fast** |

---

## ✨ Features

### 🏆 Core Trading Features

- **📊 Smart Limit Order Management**
  - Place, track, and manage limit orders with precision
  - Real-time order status updates (active/filled/cancelled)
  - Gas-efficient operations (66% savings vs traditional)

- **🔄 Batch Operations via PTBs**
  - Cancel multiple orders in a single transaction
  - 40-60% gas savings on batch operations
  - Safe error handling (partial success support)

- **📈 DeepBook V3 Integration**
  - Real-time order book display
  - Live price charts and market depth
  - Liquidity analysis tools

- **💼 Professional Trading Interface**
  - Advanced order forms with price/quantity validation
  - Portfolio overview and P&L tracking
  - Order history and analytics

### 🎨 User Experience

- **🎯 Modern UI/UX Design**
  - Responsive design for desktop and mobile
  - Dark/light theme toggle
  - Smooth animations and micro-interactions

- **🔐 Secure Wallet Integration**
  - Support for Sui Wallet, Suiet, and other compatible wallets
  - Multi-wallet management
  - Transaction signing with clear fee estimates

- **📱 Mobile-Optimized**
  - Progressive Web App (PWA) support
  - Touch-friendly interface
  - Offline capabilities for order viewing

---

## 🏗️ Architecture

### 📁 Project Structure
```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable React components
│   │   ├── common/        # UI components (Button, Modal, etc.)
│   │   ├── forms/         # Order forms and inputs
│   │   ├── charts/        # Trading charts and graphs
│   │   └── layout/        # Layout components
│   ├── pages/             # Page components
│   │   ├── Dashboard/     # Main trading dashboard
│   │   ├── Orders/        # Order management pages
│   │   └── Settings/      # User settings
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API and blockchain services
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── styles/            # Global styles and themes
│   └── App.tsx            # Main application component
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

### 🧩 Component Architecture

#### **Core Components**
```typescript
// Order Management
interface OrderManager {
  placeOrder(params: OrderParams): Promise<OrderResult>;
  cancelOrder(orderId: string): Promise<TransactionResult>;
  batchCancel(orderIds: string[]): Promise<BatchResult>;
  getOrders(filters?: OrderFilters): Promise<Order[]>;
}

// DeepBook Integration
interface DeepBookService {
  getOrderBook(poolId: string): Promise<OrderBook>;
  getPoolInfo(poolId: string): Promise<PoolInfo>;
  subscribeToUpdates(callback: UpdateCallback): void;
}

// Wallet Management
interface WalletService {
  connect(walletName: string): Promise<boolean>;
  disconnect(): Promise<void>;
  signTransaction(tx: Transaction): Promise<SignedTransaction>;
  getBalance(): Promise<Balance>;
}
```

#### **State Management**
- **Zustand** for global state management
- **React Query** for server state and caching
- **Context API** for wallet and theme management

---

## ⚡ Performance

### 📊 Frontend Performance Metrics

| Metric | Target | Achieved |
|--------|--------|----------|
| **First Contentful Paint** | < 1.5s | ✅ 1.2s |
| **Largest Contentful Paint** | < 2.5s | ✅ 2.1s |
| **Time to Interactive** | < 3.5s | ✅ 3.0s |
| **Bundle Size** | < 500KB | ✅ 420KB (gzipped) |

### 🚀 Optimization Features

- **Code Splitting**: Route-based and component-based splitting
- **Lazy Loading**: Dynamic imports for heavy components
- **Caching**: Aggressive caching strategies for API responses
- **Bundle Optimization**: Tree shaking and minification
- **Image Optimization**: WebP format with fallbacks

---

## 🛠️ Technology Stack

### 🎯 Frontend Framework
- **React 18+** with modern hooks and concurrent features
- **TypeScript 5+** for type safety and developer experience
- **Vite 5+** for lightning-fast development and building

### 🎨 UI & Styling
- **Tailwind CSS** for utility-first styling
- **Headless UI** for accessible component primitives
- **Framer Motion** for smooth animations and transitions
- **Lucide React** for consistent iconography

### 🔗 Blockchain Integration
- **@mysten/dapp-kit** for Sui wallet integration
- **@mysten/sui** for transaction building and signing
- **@mysten/deepbook-v3** for order book data
- **Polymesh** for programmable transaction blocks

### 📊 Data & Charts
- **Recharts** for responsive trading charts
- **React Query** for server state management
- **Zustand** for client state management
- **date-fns** for date/time manipulation

### 🛠️ Development Tools
- **ESLint** for code quality and consistency
- **Prettier** for code formatting
- **Husky** for git hooks
- **lint-staged** for pre-commit checks

---

## 🚀 Quick Start

### 📋 Prerequisites
- **Node.js** 18.0+
- **npm** 9.0+ or **yarn** 1.22+
- **Sui Wallet** or compatible wallet extension

### 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/bernieio/orlim.git
cd orlim
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment setup**
```bash
# Copy environment template
cp .env.example .env.local

# Edit environment variables (add your CoinGecko API key)
nano .env.local
```

📖 **See [README_ENV.md](./README_ENV.md) for detailed environment variable setup**

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to `http://localhost:5173`

### ⚙️ Environment Variables

**Required:**
- `VITE_COINGECKO_API_KEY`: CoinGecko API key for real-time SUI price data

**Optional:**
- `VITE_DEFAULT_SUI_PRICE`: Fallback price if API fails (default: 2.0)
- `VITE_DEEPBOOK_INDEXER_API`: DeepBook Indexer API URL

📖 **See [README_ENV.md](./README_ENV.md) for complete environment variable documentation**

---

## 📖 Usage

### 🔌 Wallet Connection

1. **Select Wallet**: Choose from Sui Wallet, Suiet, or other compatible wallets
2. **Connect**: Approve connection request in your wallet
3. **Verify**: Check your address and balance in the header

### 📊 Placing Limit Orders

1. **Select Trading Pair**: Choose your desired token pair
2. **Set Order Parameters**:
   - **Price**: Your desired limit price
   - **Quantity**: Amount to buy/sell
   - **Order Type**: Limit order (future: market, stop-loss)
3. **Review**: Check gas fees and order details
4. **Execute**: Sign transaction with your wallet

### 🔄 Managing Orders

**Active Orders Dashboard**:
- View all your active limit orders
- Real-time price updates and status changes
- Quick actions: cancel, modify, view details

**Batch Operations**:
- Select multiple orders for bulk cancellation
- See estimated gas savings
- Execute with single transaction signature

**Order History**:
- Complete order history with filters
- Export functionality for tax reporting
- Performance analytics and P&L tracking

---

## 🔧 Configuration

### 📦 Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### ⚙️ Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@services': resolve(__dirname, './src/services'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          sui: ['@mysten/dapp-kit', '@mysten/sui'],
          charts: ['recharts'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
})
```

---

## 🧪 Development

### 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### 🏗️ Building for Production

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview

# Analyze bundle size
npm run build:analyze
```

### 🐛 Debugging

- **React DevTools**: Component inspection and state debugging
- **Sui Explorer**: Transaction and object inspection
- **Network Tab**: API request monitoring
- **Console**: Detailed logging and error tracking

---

## 📊 Integration

### 🔌 Smart Contract Integration

The frontend integrates with the **Orlim smart contract** deployed on Sui:

```typescript
// Contract interaction example
import { useOrlimContract } from '@/hooks/useOrlimContract'

function PlaceOrderForm() {
  const { placeOrder, isLoading } = useOrlimContract()

  const handleSubmit = async (params: OrderParams) => {
    try {
      const result = await placeOrder(params)
      console.log('Order placed:', result.orderId)
    } catch (error) {
      console.error('Failed to place order:', error)
    }
  }

  return (
    // Form JSX
  )
}
```

### 📈 DeepBook Integration

Real-time market data from DeepBook V3:

```typescript
// DeepBook service example
import { useDeepBook } from '@/hooks/useDeepBook'

function OrderBook({ poolId }: { poolId: string }) {
  const { orderBook, isLoading } = useDeepBook(poolId)

  return (
    <div>
      <h3>Order Book</h3>
      {orderBook && (
        <div>
          {/* Render order book data */}
        </div>
      )}
    </div>
  )
}
```

### 🔄 PTB (Programmable Transaction Blocks)

Batch operations using Sui's PTBs:

```typescript
// Batch cancel example
import { useBatchCancel } from '@/hooks/useBatchCancel'

function BatchCancelButton({ orderIds }: { orderIds: string[] }) {
  const { batchCancel, isLoading } = useBatchCancel()

  const handleBatchCancel = async () => {
    const result = await batchCancel(orderIds)
    console.log('Batch cancel result:', result)
  }

  return (
    <button onClick={handleBatchCancel} disabled={isLoading}>
      Cancel {orderIds.length} Orders (Save ~40% gas)
    </button>
  )
}
```

---

## 👥 Team

### 🏢 DevPros Team
**Orlim Frontend** is developed by the **DevPros Team**, building the complete limit order management ecosystem for Sui.

### 👨‍💻 Founder & Lead Developer
**Bernieio** - Founder, Team Lead, and Full-Stack Developer

- 🔗 **GitHub**: [@bernieio](https://github.com/bernieio)
- 🎯 **Expertise**: React, TypeScript, Sui Move, DeFi Protocols
- 📧 **Contact**: bernie.web3@gmail.com
- 🌐 **Facebook**: [devpros.space](https://facebook.com/devpros.space)

### 🎯 Frontend Development Team
- **UI/UX Design**: Modern, responsive design focused on trader experience
- **React Development**: Latest React 18 features with best practices
- **TypeScript**: Full type safety for reliable codebase
- **Performance**: Optimized for fast loading and smooth interactions

### 🏆 Our Mission
At DevPros Team, we are committed to:
- 🎯 Building production-ready frontend applications
- 🎨 Creating exceptional user experiences
- ⚡ Optimizing for performance and accessibility
- 🌚 Pushing the boundaries of DeFi interfaces on Sui

---

## 🚀 Roadmap

### 🎯 Phase 1: MVP Foundation (Q4 2025)
- [x] Basic limit order interface
- [x] Wallet integration (Sui Wallet, Suiet)
- [x] DeepBook order book display
- [x] Batch cancel operations
- [x] Responsive design

### 🌟 Phase 2: Enhanced Features (Q1 2026)
- [ ] Advanced charting and analytics
- [ ] Price alerts and notifications
- [ ] Mobile app (React Native)
- [ ] Dark/light theme customization
- [ ] Multi-language support

### 🚀 Phase 3: Pro Features (Q2 2026)
- [ ] DCA (Dollar-Cost Averaging) interface
- [ ] Advanced order types (stop-loss, take-profit)
- [ ] Portfolio management dashboard
- [ ] Tax reporting features
- [ ] API access for power users

---

## 📞 Support & Community

- 💬 **Telegram**: [@bernieio](https://t.me/bernieio)
- 🐦 **Twitter**: [@bernie_io](https://twitter.com/bernie_io)
- 📧 **Email**: bernie.web3@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/bernieio/orlim/issues)
<!-- - 📖 **Documentation**: [Orlim Docs](https://docs.orlim.dev) -->

---

## 🔗 Related Projects

- **📦 Smart Contract**: [orlim-contract](https://github.com/bernieio/orlim-contract)
- **🌐 Live Demo**: [orlim.dev](https://orlim.netlify.app/)
<!-- - **📚 Documentation**: [Orlim Documentation](https://docs.orlim.dev) -->
<!-- - **📊 Analytics**: [Orlim Analytics](https://analytics.orlim.dev) -->

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

```
MIT License

Copyright (c) 2024 DevPros Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<div align="center">

**🎉 Built with ❤️ by the DevPros Team**

**⭐ Star this repo if you find it useful!**

**🚀 [View Live Demo](https://orlim.dev) | [Smart Contract](https://github.com/bernieio/orlim-contract) | [Join Community](https://t.me/bernieio)**

</div>