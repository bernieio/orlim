import { Card, Table, Badge, Spinner } from 'react-bootstrap';
import { useDeepBook } from '../hooks/useDeepBook';
import { CONTRACTS } from '../constants/contracts';

export function OrderBookView() {
  // Use default pool (SUI_DBUSDC)
  const poolId = CONTRACTS.DEEPBOOK.POOLS[CONTRACTS.DEEPBOOK.DEFAULT_POOL as keyof typeof CONTRACTS.DEEPBOOK.POOLS];
  const { orderBook, loading, error } = useDeepBook(poolId);

  if (loading) {
    return (
      <Card>
        <Card.Body className="text-center">
          <Spinner animation="border" />
          <p className="mt-2 text-muted">Loading order book...</p>
        </Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Card.Body>
          <p className="text-danger">Error loading order book: {error}</p>
        </Card.Body>
      </Card>
    );
  }

  if (!orderBook) {
    return (
      <Card>
        <Card.Body>
          <p className="text-muted">Connect wallet to view order book</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Header>
        <strong>Order Book - SUI/DBUSDC</strong>
        <Badge bg="info" className="ms-2">
          Mid: ${orderBook.midPrice.toFixed(4)}
        </Badge>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="row g-0">
          {/* Asks (Sell orders) */}
          <div className="col-6 border-end">
            <div className="p-2 bg-danger bg-opacity-10">
              <strong className="text-danger">Asks (Sell)</strong>
            </div>
            <Table size="sm" className="mb-0">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderBook.asks.slice(0, 10).map((level, idx) => (
                  <tr key={idx}>
                    <td className="text-danger">
                      {level.price.toFixed(6)}
                    </td>
                    <td>{level.quantity.toFixed(2)}</td>
                    <td>{(level.price * level.quantity).toFixed(2)}</td>
                  </tr>
                ))}
                {orderBook.asks.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center text-muted">
                      No asks available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {/* Bids (Buy orders) */}
          <div className="col-6">
            <div className="p-2 bg-success bg-opacity-10">
              <strong className="text-success">Bids (Buy)</strong>
            </div>
            <Table size="sm" className="mb-0">
              <thead>
                <tr>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderBook.bids.slice(0, 10).map((level, idx) => (
                  <tr key={idx}>
                    <td className="text-success">
                      {level.price.toFixed(6)}
                    </td>
                    <td>{level.quantity.toFixed(2)}</td>
                    <td>{(level.price * level.quantity).toFixed(2)}</td>
                  </tr>
                ))}
                {orderBook.bids.length === 0 && (
                  <tr>
                    <td colSpan={3} className="text-center text-muted">
                      No bids available
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

