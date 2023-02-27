import {
  Goerli,
  Arbitrum,
  Config,
  DAppProvider,
  ArbitrumGoerli,
} from '@usedapp/core'
import { Header } from './components/header/headerComponent';
import { Container } from '@mui/material';
import { Main } from './components/main/mainComponent';
import { providers } from 'ethers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Web3Modal } from '@web3modal/react';

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
    
import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, arbitrumGoerli, mainnet, polygon, goerli } from "wagmi/chains";

const chains = [arbitrum, mainnet, polygon, goerli, arbitrumGoerli];

// Wagmi client
const { provider, webSocketProvider } = configureChains(chains, [
  walletConnectProvider({ projectId: process.env.REACT_APP_WM_PROJECT_KEY || '' }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains, projectId: process.env.REACT_APP_WM_PROJECT_KEY || ''}),
  provider,
  webSocketProvider
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

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
}

function App() {
  
  return (
    <DAppProvider
      config={config}
    >
      <WagmiConfig client={wagmiClient}>
        <Header />
        <Container maxWidth="lg">
          <Main></Main>
        </Container>
      </WagmiConfig>
      
      <Web3Modal
          projectId={process.env.REACT_APP_WM_PROJECT_KEY || ''}
          ethereumClient={ethereumClient}
      />
    </DAppProvider>
  );
}

export default App;