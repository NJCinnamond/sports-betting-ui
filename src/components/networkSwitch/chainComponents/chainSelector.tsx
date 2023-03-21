import styled from "@emotion/styled";
import { useEthers } from "@usedapp/core";

const PREFIX = 'ChainSelector';

const classes = {
    label: `${PREFIX}-label`,
};

const ChainSelector = styled('div')(() => ({
    [`& .${classes.label}`]: {
        fontSize: "1.1em"
    },
}));

export interface ChainSelectorProps {
    label: string;
    img: string;
    chainId?: number;
}

export const ChainSelectorComponent = (props: ChainSelectorProps) => {
    const { switchNetwork } = useEthers();
    
    const onClick = () => {
        if (props.chainId) {
            switchNetwork(props.chainId);
        }
    }
    return (
        <ChainSelector onClick={onClick}>
            <div className={classes.label}>
                <span>{props.label}</span>
            </div>
        </ChainSelector>
    )
} 