// Contract addresses and configuration
import type { TradingPair } from '../types/orlim';

export const CONTRACTS = {
  PACKAGE_ID: '0x9a9f7a59d3024a19aed90be0d7295fc2283c3b0e356a92f7317f08a98a613445',
  MODULE_NAME: 'orlim',
  
  // DeepBook V3 constants (from SDK)
  DEEPBOOK: {
    PACKAGE_ID: '0xdee9', // DeepBook package (auto from SDK)
    INDEXER_API: 'https://deepbook-indexer.testnet.mystenlabs.com',
    POOLS: {
      // Pool IDs from DeepBook Indexer API (testnet)
      SUI_DBUSDC: '0x1c19362ca52b8ffd7a33cee805a67d40f31e6ba303753fd3a4cfdfacea7163a5', // SUI/DBUSDC
      DEEP_DBUSDC: '0xe86b991f8632217505fd859445f9803967ac84a9d4a1219065bf191fcb74b622', // DEEP/DBUSDC
      DEEP_SUI: '0x48c95963e9eac37a316b7ae04a0deb761bcdcc2b67912374d6036e7f0e9bae9f', // DEEP/SUI
      DBUSDT_DBUSDC: '0x83970bb02e3636efdff8c141ab06af5e3c9a22e2f74d7f02a9c3430d0d10c1ca', // DBUSDT/DBUSDC
      WAL_SUI: '0x8c1c1b186c4fddab1ebd53e0895a36c1d1b3b9a77cd34e607bef49a38af0150a', // WAL/SUI
      WAL_DBUSDC: '0xeb524b6aea0ec4b494878582e0b78924208339d360b62aec4a8ecd4031520dbb', // WAL/DBUSDC
    },
    // Default pool to use (SUI/DBUSDC is the closest to SUI/USDC)
    DEFAULT_POOL: 'SUI_DBUSDC',
  },
} as const;

// Trading Pairs Configuration
export const TRADING_PAIRS: TradingPair[] = [
  {
    pool_id: '0x1c19362ca52b8ffd7a33cee805a67d40f31e6ba303753fd3a4cfdfacea7163a5',
    pool_name: 'SUI_DBUSDC',
    base_asset: {
      id: '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI',
      decimals: 9,
      symbol: 'SUI',
      name: 'Sui',
    },
    quote_asset: {
      id: '0xf7152c05930480cd740d7311b5b8b45c6f488e3a53a11c3f74a6fac36a52e0d7::DBUSDC::DBUSDC',
      decimals: 6,
      symbol: 'DBUSDC',
      name: 'Deepbook USDC',
    },
    trading_params: {
      min_size: 1000000000, // 1 SUI (9 decimals)
      lot_size: 100000000, // 0.1 SUI
      tick_size: 10, // 0.00001 DBUSDC (6 decimals)
    },
  },
  {
    pool_id: '0x8c1c1b186c4fddab1ebd53e0895a36c1d1b3b9a77cd34e607bef49a38af0150a',
    pool_name: 'WAL_SUI',
    base_asset: {
      id: '0x9ef7676a9f81937a52ae4b2af8d511a28a0b080477c0c2db40b0ab8882240d76::wal::WAL',
      decimals: 9,
      symbol: 'WAL',
      name: 'Walrus',
    },
    quote_asset: {
      id: '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI',
      decimals: 9,
      symbol: 'SUI',
      name: 'Sui',
    },
    trading_params: {
      min_size: 1000000000, // 1 WAL (9 decimals)
      lot_size: 100000000, // 0.1 WAL
      tick_size: 1000, // 0.000001 SUI (9 decimals)
    },
  },
  {
    pool_id: '0x48c95963e9eac37a316b7ae04a0deb761bcdcc2b67912374d6036e7f0e9bae9f',
    pool_name: 'DEEP_SUI',
    base_asset: {
      id: '0x36dbef866a1d62bf7328989a10fb2f07d769f4ee587c0de4a0a256e57e0a58a8::deep::DEEP',
      decimals: 6,
      symbol: 'DEEP',
      name: 'Deepbook Token',
    },
    quote_asset: {
      id: '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI',
      decimals: 9,
      symbol: 'SUI',
      name: 'Sui',
    },
    trading_params: {
      min_size: 10000000, // 10 DEEP (6 decimals) = 0.01 DEEP in human-readable
      lot_size: 1000000, // 1 DEEP (6 decimals)
      tick_size: 10000000, // 0.01 SUI (9 decimals)
    },
  },
];

// Helper function to get pair by pool_id
export function getTradingPairByPoolId(poolId: string): TradingPair | undefined {
  return TRADING_PAIRS.find((pair) => pair.pool_id === poolId);
}

// Helper function to get pair by pool_name
export function getTradingPairByName(poolName: string): TradingPair | undefined {
  return TRADING_PAIRS.find((pair) => pair.pool_name === poolName);
}

// Error codes from the contract
export const ERROR_CODES = {
  EORDER_NOT_FOUND: 2,
  EINVALID_PRICE: 4,
  EINVALID_QUANTITY: 5,
  EUNAUTHORIZED: 6,
  ECONTRACT_PAUSED: 7,
  ETIMESTAMP_INVALID: 8,
  EORDER_ALREADY_CANCELLED: 9,
} as const;

