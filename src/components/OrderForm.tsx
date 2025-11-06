import { useState } from 'react';
import { Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { useOrlimContract } from '../hooks/useOrlimContract';
import { useOrderManager } from '../hooks/useOrderManager';
import { CreateOrderManager } from './CreateOrderManager';
import { CONTRACTS } from '../constants/contracts';

export function OrderForm() {
  const { orderManagerId } = useOrderManager();
  const { placeOrder } = useOrlimContract(orderManagerId || '');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isBid, setIsBid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!orderManagerId) {
      setError('Please create an Order Manager first');
      return;
    }

    if (!price || !quantity) {
      setError('Please fill in all fields');
      return;
    }

    const priceNum = parseFloat(price);
    const quantityNum = parseInt(quantity);

    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price');
      return;
    }

    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    setLoading(true);
    try {
      const result = await placeOrder({
        pool_id: CONTRACTS.DEEPBOOK.POOLS[CONTRACTS.DEEPBOOK.DEFAULT_POOL as keyof typeof CONTRACTS.DEEPBOOK.POOLS],
        price: priceNum,
        quantity: quantityNum,
        is_bid: isBid,
      });
      setSuccess(`Order placed! TX: ${result.digest.slice(0, 8)}...`);
      setPrice('');
      setQuantity('');
    } catch (err: any) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!orderManagerId) {
    return <CreateOrderManager />;
  }

  return (
    <Card>
      <Card.Header>
        <strong>Place Limit Order</strong>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Order Type</Form.Label>
            <Form.Select
              value={isBid ? 'bid' : 'ask'}
              onChange={(e) => setIsBid(e.target.value === 'bid')}
            >
              <option value="bid">Buy (Bid)</option>
              <option value="ask">Sell (Ask)</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price (DBUSDC)</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                step="0.000001"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <InputGroup.Text>DBUSDC</InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity (SUI)</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <InputGroup.Text>SUI</InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading || !orderManagerId}
            className="w-100"
          >
            {loading ? 'Placing Order...' : 'Place Limit Order'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

