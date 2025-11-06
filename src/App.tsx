import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { WalletConnection } from './components/WalletConnection';
import { OrderForm } from './components/OrderForm';
import { ActiveOrdersList } from './components/ActiveOrdersList';
import { OrderBookView } from './components/OrderBookView';

function App() {
  const account = useCurrentAccount();

  return (
    <div className="min-vh-100 bg-light">
      <WalletConnection />
      
      <Container className="py-4">
        {!account ? (
          <Alert variant="info">
            Please connect your wallet to continue. Supported wallets: Sui Wallet, Suiet, and Slush Wallet.
          </Alert>
        ) : (
          <>
            <Row className="mb-4">
              <Col md={12}>
                <OrderBookView />
              </Col>
            </Row>
            <Row>
              <Col md={4} className="mb-4">
                <OrderForm />
              </Col>
              <Col md={8} className="mb-4">
                <ActiveOrdersList />
              </Col>
            </Row>
          </>
        )}
      </Container>
      
      <footer className="text-center py-3 mt-5 bg-dark text-light">
        <Container>
          <small>Orlim - Built for Sui Hackathon 2025</small>
        </Container>
      </footer>
    </div>
  );
}

export default App;
