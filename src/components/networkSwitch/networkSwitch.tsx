import { MenuItem, Select, styled } from "@mui/material";
import { ArbitrumGoerli, Goerli, useEthers } from "@usedapp/core";
import { ArbitrumGoerliSelector } from "./chainComponents/arbitrumGoerliSelector";
import { ChainSelectorComponent } from "./chainComponents/chainSelector";
import { GoerliSelector } from "./chainComponents/goerliSelector";

const chains = [Goerli.chainId, ArbitrumGoerli.chainId];

const chainComponentMap = new Map<number, JSX.Element>([
    [Goerli.chainId, <GoerliSelector/>],
    [ArbitrumGoerli.chainId, <ArbitrumGoerliSelector/>],
]);

const PREFIX = 'NetworkSwitch';

const classes = {
    switch: `${PREFIX}-switch`,
    selectedChain: `${PREFIX}-selectedChain`,
};

const Switch = styled('div')(() => ({
    [`&.${classes.switch}`]: {
        marginTop: ".4em"
    },

    [`& .${classes.selectedChain}`]: {
        display: "flex",
        alignItems: "center",
        height: "1em"
    },

    [`& .select`]: {
        height: "5em"
    },
}));

export const NetworkSwitch = () => {
    const { chainId: selectedChainId } = useEthers();
    const selectedChain = () => (
        <div className={classes.selectedChain}>
            {selectedChainId && chainComponentMap.get(selectedChainId)}
            {selectedChainId == undefined && <ChainSelectorComponent label="Unsupported" img=""/>}
        </div>
    );

    return (
        <Switch className={classes.switch}>
            <Select
                renderValue={selectedChain}
                value={selectedChainId}
                defaultValue={-1}
                variant="standard"
            >
                {chains.map(chainId => {
                    return (<MenuItem value={chainId} key={chainId}>
                        {chainComponentMap.get(chainId)}
                    </MenuItem>)
                })}

            </Select>
        </Switch>
    )
}