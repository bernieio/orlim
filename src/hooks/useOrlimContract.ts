import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { contractService } from '../services/contractService';
import type { PlaceOrderParams } from '../types/orlim';

const CLOCK_OBJECT_ID = '0x6'; // Sui Clock object

export function useOrlimContract(orderManagerId: string) {
  const { mutateAsync: signAndExecute } = useSignAndExecuteTransaction();

  // Place Order
  const placeOrder = async (params: PlaceOrderParams) => {
    if (!orderManagerId) {
      throw new Error('Order Manager not found. Please create one first.');
    }

    const tx = contractService.placeOrderTx({
      orderManager: orderManagerId,
      poolId: params.pool_id,
      price: params.price,
      quantity: params.quantity,
      isBid: params.is_bid,
      clockObjectId: CLOCK_OBJECT_ID,
    });

    const result = await signAndExecute({
      transaction: tx,
    });
    return result;
  };

  // Cancel Order
  const cancelOrder = async (orderId: string) => {
    if (!orderManagerId) {
      throw new Error('Order Manager not found.');
    }

    const tx = contractService.cancelOrderTx({
      orderManager: orderManagerId,
      orderId,
      clockObjectId: CLOCK_OBJECT_ID,
    });

    return await signAndExecute({ transaction: tx });
  };

  // Batch Cancel
  const batchCancelOrders = async (orderIds: string[]) => {
    if (!orderManagerId) {
      throw new Error('Order Manager not found.');
    }

    if (orderIds.length === 0) {
      throw new Error('No orders selected for cancellation.');
    }

    const tx = contractService.batchCancelOrdersTx({
      orderManager: orderManagerId,
      orderIds,
      clockObjectId: CLOCK_OBJECT_ID,
    });

    return await signAndExecute({ transaction: tx });
  };

  // Modify Order
  const modifyOrder = async (params: {
    orderId: string;
    newPrice: number;
    newQuantity: number;
  }) => {
    if (!orderManagerId) {
      throw new Error('Order Manager not found.');
    }

    const tx = contractService.modifyOrderTx({
      orderManager: orderManagerId,
      orderId: params.orderId,
      newPrice: params.newPrice,
      newQuantity: params.newQuantity,
      clockObjectId: CLOCK_OBJECT_ID,
    });

    return await signAndExecute({ transaction: tx });
  };

  return {
    placeOrder,
    cancelOrder,
    batchCancelOrders,
    modifyOrder,
  };
}

