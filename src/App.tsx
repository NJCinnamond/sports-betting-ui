import {
  Goerli,
  Arbitrum,
  Config,
  DAppProvider,
  ArbitrumGoerli,
  CoinbaseWalletConnector,
  MetamaskConnector,
} from '@usedapp/core'
import { Header } from './components/header/headerComponent';
import { Container } from '@mui/material';
import { Main } from './components/main/mainComponent';
import { providers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';

export const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [ArbitrumGoerli.chainId]: new providers.AlchemyProvider("arbitrum-goerli", process.env.REACT_APP_ARB_GOERLI_ALCHEMY_KEY), //TODO Put this in a .env
    [Goerli.chainId]: new providers.AlchemyProvider("goerli", process.env.REACT_APP_GOERLI_ALCHEMY_KEY),
  },
  notifications: {
    expirationPeriod: 500,
    checkInterval: 1000,
  },
  networks: [
    ArbitrumGoerli,
    Goerli
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