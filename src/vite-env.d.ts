/// <reference types="vite/client" />

interface ImportMetaEnv {
  // CoinGecko API configuration (can use COINGECKO_API_KEY or VITE_COINGECKO_API_KEY)
  readonly COINGECKO_API_KEY?: string;
  readonly VITE_COINGECKO_API_KEY?: string; // Legacy support
  readonly DEFAULT_SUI_PRICE?: string;
  readonly VITE_DEFAULT_SUI_PRICE?: string; // Legacy support
  readonly VITE_DEEPBOOK_INDEXER_API?: string;
  // Add more env variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

