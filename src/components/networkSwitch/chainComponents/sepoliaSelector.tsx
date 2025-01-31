import { Sepolia } from "@usedapp/core"
import { ChainSelectorComponent } from "./chainSelector"

export const SepoliaSelector = () => {
    return (
        <ChainSelectorComponent label="Sepolia" img="" chainId={Sepolia.chainId}/>
    )
}