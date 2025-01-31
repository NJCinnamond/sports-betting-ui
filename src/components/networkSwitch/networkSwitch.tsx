import { MenuItem, Select, styled } from "@mui/material";
import { Sepolia, useEthers } from "@usedapp/core";
import { ChainSelectorComponent } from "./chainComponents/chainSelector";
import { SepoliaSelector } from "./chainComponents/sepoliaSelector";

const chains = [Sepolia.chainId];

const chainComponentMap = new Map<number, JSX.Element>([
    [Sepolia.chainId, <SepoliaSelector/>],
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