import { ArbitrumGoerli } from "@usedapp/core"
import { ChainSelectorComponent } from "./chainSelector"

export const ArbitrumGoerliSelector = () => {
    return (
        <ChainSelectorComponent label="Arbitrum Goerli" img="" chainId={ArbitrumGoerli.chainId}/>
    )
}