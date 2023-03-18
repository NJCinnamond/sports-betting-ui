import { Goerli } from "@usedapp/core"
import { ChainSelectorComponent } from "./chainSelector"

export const GoerliSelector = () => {
    return (
        <ChainSelectorComponent label="Goerli" img="" chainId={Goerli.chainId}/>
    )
}