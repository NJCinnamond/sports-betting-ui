import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useLinkTransferred } from "../../hooks/link";
import { useEffect, useState } from "react";
import { handleUserLinkTransferred } from "../../services/sportsContractService";
import { StakeDirection, StakeValidity } from "../openStakeComponent/openStakeComponent";
import { LinkEntryFieldComponent } from "../linkEntryFieldComponent/linkEntryFieldComponent";
import { LinkFundFormComponent } from "../linkFundFormComponent/linkFundFormComponent";


const PREFIX = 'LinkFundComponent';

const classes = {
    title: `${PREFIX}-title`,
    helper: `${PREFIX}-helper`
};

const StyledBox  = styled(Box )((
    {
        theme
    }
) => ({
    [`& .${classes.title}`]: {
        textAlign: "center",
        marginBottom: "1em",
        fontSize: "1.1em"
    },

    [`& .${classes.helper}`]: {
        fontSize: "0.8em",
        marginBottom: "1em",
    }
}));

const defaultValid = {
    isValid: true,
    errorStr: '',
} as StakeValidity;

export const LinkFundComponent = () => {

    // Get Link currently transferred by users
    const [linkTransferred, setLinkTransferred] = useState<number>(0);
    const { linkResponse } = useLinkTransferred();
    useEffect(() => {
        const link = handleUserLinkTransferred(linkResponse);
        setLinkTransferred(link.userLinkTransferred);
    }, [linkResponse]);

    // Link entry 
    const [stakeDirection, setStakeDirection] = useState<StakeDirection>(StakeDirection.STAKE);
    const [stakeAmount, setStakeAmount] = useState<number>(0);
    const setStakeAmountCB = (amount: number) => setStakeAmount(amount);

    // stakeValidity 
    const [stakeValidity, setStakeValidity] = useState<StakeValidity>(defaultValid);
    useEffect(() => {
        if (stakeAmount == 0) {
            setStakeValidity({
                isValid: false,
                errorStr: "Enter quantity."
            });
        } else if (stakeDirection == StakeDirection.UNSTAKE && stakeAmount > linkTransferred) {
            setStakeValidity({
                isValid: false,
                errorStr: "Cannot unstake more than existing stake."
            });
        }   else {
            setStakeValidity(defaultValid);
        }
    }, [stakeAmount, stakeDirection]);

    const toggleStakeDirection = () => {
        const dir = stakeDirection == StakeDirection.STAKE ? StakeDirection.UNSTAKE : StakeDirection.STAKE;
        setStakeDirection(dir);
    }

    return (
        <StyledBox>
            <div className={classes.title}>
                <span>
                    Total LINK transferred: {linkTransferred}
                </span>
            </div>
            <div className={classes.helper}>
                <span>
                    Use the form below to transfer or withdraw LINK
                </span>
            </div>
            <div>
                <LinkEntryFieldComponent
                    stakeAmount={stakeAmount}
                    direction={stakeDirection}
                    setStakeAmount={setStakeAmountCB}
                    validity={stakeValidity}
                />
                <LinkFundFormComponent
                    stakeAmount={stakeAmount}
                    direction={stakeDirection}
                    toggleStakeDirection={() => toggleStakeDirection()}
                    validity={stakeValidity}
                />
            </div>
        </StyledBox >

    );
}