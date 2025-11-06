import { DeepBookClient } from '@mysten/deepbook-v3';
import type { SuiClient } from '@mysten/sui/client';
import type { OrderBookData, OrderBookLevel } from '../types/orlim';

export class DeepBookService {
  private dbClient: DeepBookClient;

  constructor(suiClient: SuiClient, userAddress: string, env: 'testnet' | 'mainnet' | 'devnet') {
    // DeepBook SDK only supports 'testnet' or 'mainnet'
    // Map 'devnet' to 'testnet' for DeepBook compatibility
    const deepbookEnv = env === 'devnet' ? 'testnet' : env;
    
    this.dbClient = new DeepBookClient({
      client: suiClient,
      address: userAddress,
      env: deepbookEnv as 'testnet' | 'mainnet',
    });
  }

  /**
   * Get Order Book (Level 2 data)
   * Returns bids and asks with price levels
   */
  async getOrderBook(
    poolKey: string,
    priceLow: number,
    priceHigh: number,
    isBid: boolean
  ): Promise<OrderBookLevel[]> {
    try {
      const result = await this.dbClient.getLevel2Range(
        poolKey,
        priceLow,
        priceHigh,
        isBid
      );
      // Handle different return types from DeepBook SDK
      if (result && typeof result === 'object' && 'prices' in result && 'quantities' in result) {
        // If returned as arrays of prices and quantities
        const prices = (result as { prices: number[]; quantities: number[] }).prices || [];
        const quantities = (result as { prices: number[]; quantities: number[] }).quantities || [];
        return prices.map((price: number, idx: number) => ({
          price,
          quantity: quantities[idx] || 0,
          orders: 1, // Default to 1 order per level
        }));
      } else if (Array.isArray(result)) {
        // If returned as array of level objects
        return (result as any[]).map((level: any) => ({
          price: level.price || level.price_level || 0,
          quantity: level.quantity || level.size || 0,
          orders: level.open_quantity || level.orders || 1,
        }));
      }
      return [];
    } catch (error) {
      console.error('Error fetching order book:', error);
      return [];
    }
  }

  /**
   * Get Full Order Book (Bids + Asks)
   */
  async getFullOrderBook(poolKey: string): Promise<OrderBookData> {
    // Get best bid and ask to determine range
    const midPrice = 2.0; // Default mid price - can be fetched from market data
    const range = midPrice * 0.1; // ±10% range
    
    const [bids, asks] = await Promise.all([
      this.getOrderBook(poolKey, midPrice - range, midPrice, true),
      this.getOrderBook(poolKey, midPrice, midPrice + range, false),
    ]);

    return {
      bids: bids.reverse(), // Highest bid first
      asks, // Lowest ask first
      midPrice,
    };
  }

  /**
   * Get User's Orders from DeepBook
   * (This queries on-chain orders, not Orlim receipts)
   */
  async getUserOrders(_poolKey: string): Promise<any[]> {
    // Note: DeepBook V3 SDK doesn't expose direct user order query yet
    // You'll need to track via Orlim OrderManager instead
    // This is a placeholder for future SDK updates
    return [];
  }

  /**
   * Check Balance Manager balance
   * (If using DeepBook's balance manager for collateral)
   */
  async checkManagerBalance(managerKey: string, coinType: string): Promise<number> {
    try {
      const balance = await this.dbClient.checkManagerBalance(managerKey, coinType);
      // Handle different return types
      if (typeof balance === 'number') {
        return balance;
      } else if (balance && typeof balance === 'object' && 'balance' in balance) {
        return (balance as { balance: number }).balance;
      }
      return 0;
    } catch (error) {
      console.error('Error checking manager balance:', error);
      return 0;
    }
  }
}

