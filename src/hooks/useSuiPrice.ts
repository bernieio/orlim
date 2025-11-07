import { useState, useEffect } from 'react';

// CoinGecko Public API (no API key required)
const COINGECKO_API = 'https://api.coingecko.com/api/v3/simple/price?ids=sui&vs_currencies=usd';
const DEFAULT_SUI_PRICE = parseFloat(import.meta.env.VITE_DEFAULT_SUI_PRICE || '2.0');

export function useSuiPrice() {
  const [price, setPrice] = useState<number>(DEFAULT_SUI_PRICE); // Fallback from env or $2
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const retryCountRef = { current: 0 };
    const isFirstFetchRef = { current: true };
    const MAX_RETRIES = 3;

    const fetchPrice = async (isInitial = false) => {
      try {
        // Only show loading spinner on first fetch
        if (isInitial || isFirstFetchRef.current) {
          setLoading(true);
          isFirstFetchRef.current = false;
        }

        const response = await fetch(COINGECKO_API, {
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          // Handle rate limit (429) or other errors
          if (response.status === 429) {
            throw new Error('Rate limit exceeded. Please wait...');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const suiPrice = data.sui?.usd;
        
        if (suiPrice && suiPrice > 0) {
          setPrice(suiPrice);
          setError(null);
          setLastUpdate(new Date());
          retryCountRef.current = 0; // Reset retry count on success
        } else {
          throw new Error('Invalid price data');
        }
      } catch (err: any) {
        console.error('Failed to fetch SUI price:', err);
        
        // Retry logic for transient errors
        if (retryCountRef.current < MAX_RETRIES && !err.message?.includes('Rate limit')) {
          retryCountRef.current++;
          setTimeout(() => fetchPrice(false), 2000 * retryCountRef.current); // Exponential backoff
          return;
        }
        
        setError(err.message || `Không thể lấy giá SUI. Sử dụng giá mặc định $${DEFAULT_SUI_PRICE.toFixed(2)}.`);
      } finally {
        setLoading(false);
      }
    };

    // Fetch ngay lập tức (initial load)
    fetchPrice(true);

    // Poll mỗi 20 giây để cập nhật giá
    // CoinGecko public API: 10-50 calls/phút (rate limit)
    // 20 giây = 3 calls/phút → an toàn với rate limit
    const POLL_INTERVAL = 20000; // 20 seconds

    const interval = setInterval(() => {
      fetchPrice(false);
    }, POLL_INTERVAL);

    // Fetch khi user quay lại tab (visibility change)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Tab được focus lại → fetch ngay để có giá mới nhất
        fetchPrice(false);
      }
    };

    // Fetch khi window được focus lại
    const handleFocus = () => {
      fetchPrice(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return { price, loading, error, lastUpdate };
}

