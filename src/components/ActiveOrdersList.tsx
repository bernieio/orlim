import { useState } from 'react';
import { Card, Table, Button, Badge, Spinner, Form } from 'react-bootstrap';
import { useOrderManager } from '../hooks/useOrderManager';
import { useOrlimContract } from '../hooks/useOrlimContract';
import { CreateOrderManager } from './CreateOrderManager';

export function ActiveOrdersList() {
  const { orderManagerId, activeOrders, refetch } = useOrderManager();
  const { cancelOrder, batchCancelOrders } = useOrlimContract(orderManagerId || '');
  
  const [loading, setLoading] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const handleCancel = async (orderId: string) => {
    setLoading(orderId);
    try {
      await cancelOrder(orderId);
      refetch();
    } catch (err) {
      console.error(err);
      alert('Failed to cancel order: ' + (err as Error).message);
    } finally {
      setLoading(null);
    }
  };

  const handleBatchCancel = async () => {
    if (selected.size === 0) return;
    
    setLoading('batch');
    try {
      await batchCancelOrders(Array.from(selected));
      setSelected(new Set());
      refetch();
    } catch (err) {
      console.error(err);
      alert('Failed to cancel orders: ' + (err as Error).message);
    } finally {
      setLoading(null);
    }
  };

  const toggleSelect = (orderId: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelected(newSelected);
  };

  const toggleSelectAll = () => {
    if (selected.size === activeOrders.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(activeOrders));
    }
  };

  if (!orderManagerId) {
    return <CreateOrderManager />;
  }

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <strong>Your Active Orders</strong>
        {selected.size > 0 && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleBatchCancel}
            disabled={loading === 'batch'}
          >
            {loading === 'batch' ? (
              <>
                <Spinner size="sm" className="me-1" />
                Cancelling...
              </>
            ) : (
              `Cancel Selected (${selected.size})`
            )}
          </Button>
        )}
      </Card.Header>
      <Card.Body>
        {activeOrders.length === 0 ? (
          <p className="text-muted">No active orders</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>
                  <Form.Check
                    type="checkbox"
                    checked={selected.size === activeOrders.length && activeOrders.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Order ID</th>
                <th>Type</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeOrders.map((orderId) => (
                <tr key={orderId}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selected.has(orderId)}
                      onChange={() => toggleSelect(orderId)}
                    />
                  </td>
                  <td className="font-monospace">
                    {orderId.slice(0, 8)}...
                  </td>
                  <td>
                    <Badge bg="info">Limit</Badge>
                  </td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                    <Badge bg="success">Active</Badge>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleCancel(orderId)}
                      disabled={loading === orderId}
                    >
                      {loading === orderId ? (
                        <Spinner size="sm" />
                      ) : (
                        'Cancel'
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}

