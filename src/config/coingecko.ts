/**
 * CoinGecko API Configuration
 * 
 * This file loads the CoinGecko API key from environment variables.
 * 
 * IMPORTANT: In Vite, environment variables must have VITE_ prefix to be exposed to client-side.
 * However, this config file abstracts the naming and supports both formats:
 * - COINGECKO_API_KEY (preferred naming, but requires VITE_ prefix in .env for Vite)
 * - VITE_COINGECKO_API_KEY (Vite-compatible naming)
 * 
 * For Vite projects, use VITE_COINGECKO_API_KEY in your .env file.
 * The config will automatically detect and use it.
 */

// Load API key from environment variable
// Note: For Vite, you must use VITE_COINGECKO_API_KEY in .env file
// The config checks VITE_ prefix first (Vite standard), then falls back to non-prefixed
const getApiKey = (): string => {
  // Check VITE_ prefix first (Vite standard for client-side exposure)
  const apiKeyWithPrefix = import.meta.env.VITE_COINGECKO_API_KEY;
  if (apiKeyWithPrefix) {
    return apiKeyWithPrefix;
  }
  
  // Fallback to non-prefixed (for other build tools or future use)
  const apiKeyWithoutPrefix = (import.meta.env as any).COINGECKO_API_KEY;
  if (apiKeyWithoutPrefix) {
    return apiKeyWithoutPrefix;
  }
  
  return '';
};

// Load default SUI price from environment variable
// Note: For Vite, you must use VITE_DEFAULT_SUI_PRICE in .env file
const getDefaultPrice = (): number => {
  // Check VITE_ prefix first (Vite standard)
  const priceWithPrefix = import.meta.env.VITE_DEFAULT_SUI_PRICE;
  if (priceWithPrefix) {
    return parseFloat(priceWithPrefix) || 2.0;
  }
  
  // Fallback to non-prefixed (for other build tools or future use)
  const priceWithoutPrefix = (import.meta.env as any).DEFAULT_SUI_PRICE;
  if (priceWithoutPrefix) {
    return parseFloat(priceWithoutPrefix) || 2.0;
  }
  
  return 2.0;
};

export const COINGECKO_API_KEY = getApiKey();
export const DEFAULT_SUI_PRICE = getDefaultPrice();

/**
 * Build CoinGecko API URL with API key if provided
 */
export const getCoinGeckoApiUrl = (): string => {
  const baseUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd';
  if (COINGECKO_API_KEY) {
    return `${baseUrl}&x_cg_demo_api_key=${COINGECKO_API_KEY}`;
  }
  return baseUrl;
};

export const COINGECKO_API = getCoinGeckoApiUrl();

