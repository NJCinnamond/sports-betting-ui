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
import { getDefaultProvider } from 'ethers'

export const config: Config = {
  readOnlyChainId: ArbitrumGoerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: getDefaultProvider('goerli'),
    [ArbitrumGoerli.chainId]: "https://arb-goerli.g.alchemy.com/v2/b0XzEKP50JHFBu21CJUeIuyPfNTdauMj" //TODO Put this in a .env
  },
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 1000,
  },
  networks: [
    Goerli,
    ArbitrumGoerli
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