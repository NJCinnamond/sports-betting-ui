import { ChainId } from "@usedapp/core";
import { useNetwork } from "wagmi";

const arbitrumGoerliExplorer = 'https://goerli.arbiscan.io/tx/';
const goerliExplorer = 'https://goerli.etherscan.io/tx/';
const ethereumMainnetExplorer = 'https://etherscan.io/tx/';

const useBlockExplorerForTxn = (txnHash: string) => {
    const { chain } = useNetwork();

    let base = '';
    if (chain?.id !== undefined) {
        if (chain?.id.toString() == ChainId.ArbitrumGoerli.toString()) {
            base = arbitrumGoerliExplorer;
        } else if (chain?.id.toString() == ChainId.Goerli.toString()) {
            base = goerliExplorer;
        } else if (chain?.id.toString() == ChainId.Mainnet.toString()) {
            base = ethereumMainnetExplorer;
        }
    }
    return base + txnHash;
}

export { useBlockExplorerForTxn }