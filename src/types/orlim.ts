// TypeScript types for Orlim contract and frontend

export interface OrderReceiptData {
  order_id: string;
  pool_id: string;
  price: string;
  quantity: string;
  is_bid: boolean;
  created_at: string;
  is_active: boolean;
  cancelled_at?: string;
}

export interface OrderManager {
  id: string;
  owner: string;
  active_orders: string[];
  total_orders_created: string;
  is_paused: boolean;
  created_at: string;
}

export interface PlaceOrderParams {
  pool_id: string;
  price: number;
  quantity: number;
  is_bid: boolean;
}

export interface CancelOrderParams {
  order_id: string;
}

export interface BatchCancelParams {
  order_ids: string[];
}

export interface ModifyOrderParams {
  order_id: string;
  new_price: number;
  new_quantity: number;
}

// DeepBook types
export interface DeepBookOrder {
  orderId: string;
  price: number;
  quantity: number;
  filledQuantity: number;
  isBid: boolean;
  status: 'open' | 'filled' | 'cancelled';
}

export interface OrderBookLevel {
  price: number;
  quantity: number;
  orders: number;
}

export interface OrderBookData {
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  midPrice: number;
}

