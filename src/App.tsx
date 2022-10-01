import {
  Goerli,
  Config,
  DAppProvider,
} from '@usedapp/core'
import { Header } from './components/header/headerComponent';
import { Container } from '@material-ui/core';
import { Main } from './components/main/mainComponent';
import { getDefaultProvider } from 'ethers'

export const config: Config = {
  readOnlyChainId: Goerli.chainId,
  readOnlyUrls: {
    [Goerli.chainId]: getDefaultProvider('goerli'),
  },
  notifications: {
    expirationPeriod: 1000,
    checkInterval: 1000,
  },
  networks: [
    Goerli,
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