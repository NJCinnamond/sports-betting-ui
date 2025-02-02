import { ChainId, useEthers } from "@usedapp/core";

const arbitrumGoerliExplorer = 'https://goerli.arbiscan.io/tx/';
const goerliExplorer = 'https://goerli.etherscan.io/tx/';
const ethereumMainnetExplorer = 'https://etherscan.io/tx/';
const sepoliaExplorer = 'https://sepolia.etherscan.io/tx/';

const useBlockExplorerForTxn = (txnHash: string) => {
    const { chainId } = useEthers();

    let base = '';
    if (chainId !== undefined) {
        if (chainId.toString() == ChainId.ArbitrumGoerli.toString()) {
            base = arbitrumGoerliExplorer;
        } else if (chainId.toString() == ChainId.Goerli.toString()) {
            base = goerliExplorer;
        } else if (chainId.toString() == ChainId.Mainnet.toString()) {
            base = ethereumMainnetExplorer;
        } else if (chainId.toString() == ChainId.Sepolia.toString()) {
            base = sepoliaExplorer;
        }
    }
    return base + txnHash;
}

export { useBlockExplorerForTxn }