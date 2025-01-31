import {
  Sepolia,
  Config,
  DAppProvider,
  CoinbaseWalletConnector,
  MetamaskConnector,
} from '@usedapp/core'
import { Header } from './components/header/headerComponent';
import { Container } from '@mui/material';
import { Main } from './components/main/mainComponent';
import { providers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';

export const config: Config = {
  readOnlyChainId: Sepolia.chainId,
  readOnlyUrls: {
    [Sepolia.chainId]: new providers.InfuraProvider("sepolia", process.env.REACT_APP_INFURA_API_KEY),
  },
  notifications: {
    expirationPeriod: 500,
    checkInterval: 1000,
  },
  networks: [
    Sepolia
  ],
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
  },
};

function App() {
  return (
    <DAppProvider
      config={config}
    >
        <Header />
        <Container maxWidth="lg">
          <Main></Main>
        </Container>
    </DAppProvider>
  );
}

export default App;