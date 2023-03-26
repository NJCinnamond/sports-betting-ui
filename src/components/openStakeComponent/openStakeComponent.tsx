import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
import { BetType } from "../../$types/betType";
import { Fixture } from "../../$types/fixture";
import { useEffect, useState } from "react";
import { StakeEntryFieldComponent } from "../stakeEntryFieldComponent/stakeEntryFieldComponent";
import { StakeFormComponent } from "../stakeFormComponent/stakeFormComponent";
import { useFixtureRequestKickoff } from "../../hooks/fixtureState";
import { useFixtureEnrichment } from "../../hooks/enrichment";
import { useUSDCBalance } from "../../hooks/stake";

const PREFIX = 'OpenStakeComponent';

const classes = {
    container: `${PREFIX}-container`,
    openKOBtn: `${PREFIX}-openKOBtn`
};

const StyledBox  = styled(Box )((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "auto"
    },

    [`& .${classes.openKOBtn}`]: {
        marginTop: "1em",
    }
}));

export interface OpenStakeComponentProps {
    fixture: Fixture,
    selectedBetType: BetType,
    selectedBetTypeStr: string,
}

export interface StakeValidity {
    isValid: boolean,
    errorStr: string,
}

export enum StakeDirection {
    STAKE,
    UNSTAKE
}

const defaultValid = {
    isValid: true,
    errorStr: '',
} as StakeValidity;

export const OpenStakeComponent = (props: OpenStakeComponentProps) => {
    const [stakeDirection, setStakeDirection] = useState<StakeDirection>(StakeDirection.STAKE);
    const [stakeAmount, setStakeAmount] = useState<number>(0);
    const setStakeAmountCB = (amount: number) => setStakeAmount(amount);

    // Fixture enriched info tells us bet amounts for this user
    const enrichment = useFixtureEnrichment(props.fixture.fixture_id);
    const existingStakeAmount = enrichment?.user[props.selectedBetType];

    // Need balance of USDC to ensure user holds USDC > stakeAmount
    const usdcBalance = useUSDCBalance();

    // stakeValidity 
    const [stakeValidity, setStakeValidity] = useState<StakeValidity>(defaultValid);
    useEffect(() => {
        if (stakeAmount == 0) {
            setStakeValidity({
                isValid: false,
                errorStr: "Enter quantity."
            });
        } else if (existingStakeAmount !== undefined && stakeDirection == StakeDirection.UNSTAKE && stakeAmount > existingStakeAmount) {
            setStakeValidity({
                isValid: false,
                errorStr: "Cannot unstake more than existing stake."
            });
        } else if (usdcBalance < stakeAmount && stakeDirection == StakeDirection.STAKE) {
            let errString = usdcBalance == 0 ? 'Your wallet has no USDC' : `Your wallet has only ${usdcBalance} USDC`;
            setStakeValidity({
                isValid: false,
                errorStr: errString,
            });
        } else { 
            setStakeValidity(defaultValid);
        }
    }, [stakeAmount, stakeDirection]);

    const toggleStakeDirection = () => {
        const dir = stakeDirection == StakeDirection.STAKE ? StakeDirection.UNSTAKE : StakeDirection.STAKE;
        setStakeDirection(dir);
    }
    
    // TODO: COMPONENTIZE
    const { requestFixtureKickoff } = useFixtureRequestKickoff();
    const handleRequestFixtureKickoff = () => {
        requestFixtureKickoff(props.fixture.fixture_id);
    };

    const showKickoffRequestBtn = false;

    return (
        <StyledBox className={classes.container}>
            <StakeEntryFieldComponent
                stakeAmount={stakeAmount}
                direction={stakeDirection}
                setStakeAmount={setStakeAmountCB}
                selectedBetTypeStr={props.selectedBetTypeStr}
                validity={stakeValidity}
            />
            <StakeFormComponent
                fixture={props.fixture}
                betType={props.selectedBetType}
                stakeAmount={stakeAmount}
                direction={stakeDirection}
                toggleStakeDirection={() => toggleStakeDirection()}
                validity={stakeValidity}
            />
            {showKickoffRequestBtn && (
                <Button className={classes.openKOBtn} color="primary" variant="contained" onClick={() => handleRequestFixtureKickoff()}>
                    GET KO TIME
                </Button>
            )}
        </StyledBox >
    );
}