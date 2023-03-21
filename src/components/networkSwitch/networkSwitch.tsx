import { emphasize, MenuItem, Select, styled } from "@mui/material";
import { ArbitrumGoerli, Goerli, useEthers } from "@usedapp/core";
import { ArbitrumGoerliSelector } from "./chainComponents/arbitrumGoerliSelector";
import { ChainSelectorComponent } from "./chainComponents/chainSelector";
import { GoerliSelector } from "./chainComponents/goerliSelector";

const chains = [Goerli.chainId, ArbitrumGoerli.chainId];

const chainComponentMap = new Map<number, JSX.Element>([
    [Goerli.chainId, <GoerliSelector/>],
    [ArbitrumGoerli.chainId, <ArbitrumGoerliSelector/>],
    [-1, <ChainSelectorComponent label="Unsupported" img=""/>]
]);

const PREFIX = 'NetworkSwitch';

const classes = {
    switch: `${PREFIX}-switch`,
};

const Switch = styled('div')(() => ({
    [`&.${classes.switch}`]: {
        borderRadius: "10px",
        border: "none",
    },
}));

export const NetworkSwitch = () => {
    const { chainId: selectedChainId } = useEthers();
    const chainComponentKey = selectedChainId == undefined || !chains.includes(selectedChainId) ?
        -1 :
        selectedChainId;

    return (
        <Switch className={classes.switch}>
            <Select
                renderValue={() => chainComponentMap.get(chainComponentKey)}
                value={chainComponentKey}
                sx={{ marginTop: ".4em", height: "2em", boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
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