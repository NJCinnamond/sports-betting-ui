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
    [ArbitrumGoerli.chainId]: new providers.AlchemyProvider("arbitrum-goerli", "b0XzEKP50JHFBu21CJUeIuyPfNTdauMj"), //TODO Put this in a .env
    [Goerli.chainId]: new providers.AlchemyProvider("goerli", "cZaW6FLl5hOIzuPMWJYRgJggWZQe4XC4"),
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