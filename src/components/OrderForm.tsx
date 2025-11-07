import { useState, useMemo, useEffect } from 'react';
import { Card, Form, Button, Alert, InputGroup, Badge, Spinner } from 'react-bootstrap';
import { useOrlimContract } from '../hooks/useOrlimContract';
import { useOrderManager } from '../hooks/useOrderManager';
import { useSuiPrice } from '../hooks/useSuiPrice';
import { useTradingPairs } from '../hooks/useTradingPairs';
import { CreateOrderManager } from './CreateOrderManager';
import { validateOrderParams, formatTokenAmount, fromRawValue } from '../utils/tradingValidation';

export function OrderForm() {
  const { orderManagerId } = useOrderManager();
  const { placeOrder } = useOrlimContract(orderManagerId || '');
  const { price: suiPrice, loading: priceLoading, error: priceError } = useSuiPrice();
  const { selectedPair } = useTradingPairs();
  const [quantity, setQuantity] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [isBid, setIsBid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Reset form when pair changes
  useEffect(() => {
    setQuantity('');
    setPriceInput('');
    setError('');
    setValidationErrors([]);
  }, [selectedPair.pool_id]);

  // Auto-calculate Amount from Quantity and Price
  const calculatedAmount = useMemo(() => {
    const qty = parseFloat(quantity) || 0;
    const price = parseFloat(priceInput) || (selectedPair.quote_asset.symbol === 'SUI' ? suiPrice : 0);
    return qty * price;
  }, [quantity, priceInput, suiPrice, selectedPair]);

  // Get step size based on decimals
  const quantityStep = useMemo(() => {
    return Math.pow(10, -selectedPair.base_asset.decimals);
  }, [selectedPair.base_asset.decimals]);

  const priceStep = useMemo(() => {
    return Math.pow(10, -selectedPair.quote_asset.decimals);
  }, [selectedPair.quote_asset.decimals]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setValidationErrors([]);

    if (!orderManagerId) {
      setError('Please create an Order Manager first');
      return;
    }

    if (!quantity) {
      setError('Please enter quantity');
      return;
    }

    const quantityNum = parseFloat(quantity);
    const defaultPrice = selectedPair.quote_asset.symbol === 'SUI' ? suiPrice : 0;
    const priceNum = parseFloat(priceInput) || defaultPrice;

    if (isNaN(quantityNum) || quantityNum <= 0) {
      setError('Please enter a valid quantity');
      return;
    }

    if (isNaN(priceNum) || priceNum <= 0) {
      setError('Please enter a valid price');
      return;
    }

    // Validate trading parameters
    const validation = validateOrderParams(quantityNum, priceNum, selectedPair);
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      setError('Validation failed. Please check your inputs.');
      return;
    }

    setLoading(true);
    try {
      const result = await placeOrder({
        pool_id: selectedPair.pool_id,
        price: priceNum,
        quantity: quantityNum,
        is_bid: isBid,
      });
      setSuccess(`Order placed! TX: ${result.digest.slice(0, 8)}...`);
      setPriceInput('');
      setQuantity('');
      setValidationErrors([]);
    } catch (err: any) {
      setError(err.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!orderManagerId) {
    return <CreateOrderManager />;
  }

  const pairLabel = `${selectedPair.base_asset.symbol}/${selectedPair.quote_asset.symbol}`;
  const minSizeHuman = fromRawValue(selectedPair.trading_params.min_size, selectedPair.base_asset.decimals);
  const showSuiPrice = selectedPair.quote_asset.symbol === 'SUI';

  return (
    <Card>
      <Card.Header>
        <strong>Place Limit Order - {pairLabel}</strong>
        {showSuiPrice && (
          <>
            <Badge bg="info" className="ms-2">
              SUI Price: {priceLoading ? (
                <>
                  <Spinner size="sm" className="me-1" />
                  Loading...
                </>
              ) : (
                `$${suiPrice.toFixed(4)}`
              )}
            </Badge>
            {!priceLoading && (
              <small className="text-muted ms-2">
                (updates every 10s)
              </small>
            )}
          </>
        )}
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {validationErrors.length > 0 && (
          <Alert variant="warning">
            <strong>Validation Errors:</strong>
            <ul className="mb-0 mt-2">
              {validationErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          </Alert>
        )}
        {success && <Alert variant="success">{success}</Alert>}
        {priceError && showSuiPrice && (
          <Alert variant="warning" className="small">
            {priceError}
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              <strong>Limit Order</strong> - {isBid ? 'Buy' : 'Sell'} {selectedPair.base_asset.symbol}
            </Form.Label>
            <Form.Select
              value={isBid ? 'buy' : 'sell'}
              onChange={(e) => setIsBid(e.target.value === 'buy')}
            >
              <option value="buy">Buy {selectedPair.base_asset.symbol} with {selectedPair.quote_asset.symbol}</option>
              <option value="sell">Sell {selectedPair.base_asset.symbol} for {selectedPair.quote_asset.symbol}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity ({selectedPair.base_asset.symbol})</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                step={quantityStep}
                placeholder={`Enter ${selectedPair.base_asset.symbol} quantity`}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <InputGroup.Text>{selectedPair.base_asset.symbol}</InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-muted">
              Minimum: {minSizeHuman} {selectedPair.base_asset.symbol}
              {showSuiPrice && (
                <>
                  {' '}| Current SUI price: {priceLoading ? (
                    <Spinner size="sm" className="ms-1" />
                  ) : (
                    `$${suiPrice.toFixed(4)}` 
                  )} (from CoinGecko)
                </>
              )}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Amount ({selectedPair.quote_asset.symbol}) <small className="text-muted">- Auto-calculated</small></Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={calculatedAmount > 0 ? formatTokenAmount(calculatedAmount, selectedPair.quote_asset.decimals) : '0.00'}
                readOnly
                className="bg-light"
              />
              <InputGroup.Text>{selectedPair.quote_asset.symbol}</InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Custom Price ({selectedPair.quote_asset.symbol}/{selectedPair.base_asset.symbol}) <small className="text-muted">- Optional</small></Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                step={priceStep}
                placeholder={showSuiPrice ? `Use market price: ${suiPrice.toFixed(4)}` : 'Enter price'}
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
              <InputGroup.Text>{selectedPair.quote_asset.symbol}/{selectedPair.base_asset.symbol}</InputGroup.Text>
            </InputGroup>
            <Form.Text className="text-muted">
              {showSuiPrice ? (
                `Leave empty to use real-time market price: $${suiPrice.toFixed(4)}`
              ) : (
                `Tick size: ${fromRawValue(selectedPair.trading_params.tick_size, selectedPair.quote_asset.decimals)}`
              )}
            </Form.Text>
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

