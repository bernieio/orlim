import { Transaction } from '@mysten/sui/transactions';
import { CONTRACTS } from '../constants/contracts';

export class ContractService {
  private packageId: string;
  private moduleName: string;

  constructor() {
    this.packageId = CONTRACTS.PACKAGE_ID;
    this.moduleName = CONTRACTS.MODULE_NAME;
  }

  // Create Order Manager (first time setup)
  createOrderManagerTx(clockObjectId: string): Transaction {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${this.packageId}::${this.moduleName}::create_order_manager_entry`,
      arguments: [
        tx.object(clockObjectId), // Clock object (0x6)
      ],
    });
    return tx;
  }

  // Place Limit Order
  placeOrderTx(params: {
    orderManager: string;
    poolId: string;
    price: number;
    quantity: number;
    isBid: boolean;
    clockObjectId: string;
  }): Transaction {
    const tx = new Transaction();
    
    // Convert pool_id string to vector<u8>
    // Remove '0x' prefix if present
    const poolIdHex = params.poolId.replace('0x', '');
    // Convert hex string to byte array (browser-compatible)
    const poolIdBytes = poolIdHex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || [];
    
    tx.moveCall({
      target: `${this.packageId}::${this.moduleName}::place_limit_order_entry`,
      arguments: [
        tx.object(params.orderManager),
        tx.pure.vector('u8', poolIdBytes),
        tx.pure.u64(Math.floor(params.price * 1e8)), // Price with 8 decimals
        tx.pure.u64(params.quantity),
        tx.pure.bool(params.isBid),
        tx.object(params.clockObjectId), // 0x6
      ],
    });
    return tx;
  }

  // Cancel Single Order
  cancelOrderTx(params: {
    orderManager: string;
    orderId: string;
    clockObjectId: string;
  }): Transaction {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${this.packageId}::${this.moduleName}::cancel_limit_order_entry`,
      arguments: [
        tx.object(params.orderManager),
        tx.pure.u64(params.orderId),
        tx.object(params.clockObjectId),
      ],
    });
    return tx;
  }

  // Batch Cancel Orders (PTB!)
  batchCancelOrdersTx(params: {
    orderManager: string;
    orderIds: string[];
    clockObjectId: string;
  }): Transaction {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${this.packageId}::${this.moduleName}::cancel_multiple_orders_safe_entry`,
      arguments: [
        tx.object(params.orderManager),
        tx.pure.vector('u64', params.orderIds.map(id => BigInt(id))),
        tx.object(params.clockObjectId),
      ],
    });
    return tx;
  }

  // Modify Order
  modifyOrderTx(params: {
    orderManager: string;
    orderId: string;
    newPrice: number;
    newQuantity: number;
    clockObjectId: string;
  }): Transaction {
    const tx = new Transaction();
    
    tx.moveCall({
      target: `${this.packageId}::${this.moduleName}::modify_order_entry`,
      arguments: [
        tx.object(params.orderManager),
        tx.pure.u64(params.orderId),
        tx.pure.u64(Math.floor(params.newPrice * 1e8)),
        tx.pure.u64(params.newQuantity),
        tx.object(params.clockObjectId),
      ],
    });
    return tx;
  }
}

export const contractService = new ContractService();

