// Contract addresses and configuration
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

