import {
  Goerli,
  Arbitrum,
  Config,
  DAppProvider,
  ArbitrumGoerli,
} from '@usedapp/core'
import { Header } from './components/header/headerComponent';
import { Container } from '@material-ui/core';
import { Main } from './components/main/mainComponent';
import { providers } from 'ethers';

export const config: Config = {
  readOnlyChainId: ArbitrumGoerli.chainId,
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
}

function App() {
  return (
    <DAppProvider
      config={config}
    >
      <Header />
      <Container maxWidth="md">
        <Main></Main>
      </Container>
    </DAppProvider>
  );
}

export default App;