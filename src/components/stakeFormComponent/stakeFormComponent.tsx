import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
import { StakeDirection, StakeValidity } from "../openStakeComponent/openStakeComponent";
import { HiSwitchVertical } from 'react-icons/hi';
import { useEffect, useState } from "react";
import { BetType } from "../../$types/betType";
import { Fixture } from "../../$types/fixture";
import { useFixtureTransacting } from "../../hooks/view";
import { useUSDCAllowance, useFixtureBettingEndTime } from "../../hooks/stake";
import { StakeButtonComponent } from "../stakeButtonComponent/stakeButtonComponent";
import { USDCApprovalButtonComponent } from "../usdcApprovalButtonComponent/usdcApprovalButtonComponent";

const PREFIX = 'StakeFormComponent';

const classes = {
    container: `${PREFIX}-container`,
    actionBtn: `${PREFIX}-actionBtn`,
    dirBtn: `${PREFIX}-dirBtn`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.container}`]: {
        display: "flex",
        marginTop: "0.4em",
        height: "3em",
    },

    [`& .${classes.dirBtn}`]: {
        margin: "0 0.3em",
        flexBasis: "20%",
    }
}));

export interface StakeFormComponentProps {
    fixture: Fixture,
    betType: BetType,
    stakeAmount: number,
    direction: StakeDirection,
    toggleStakeDirection: () => void;
    validity: StakeValidity,
}

export const StakeFormComponent = (props: StakeFormComponentProps) => {
    // Hook into whether a user transaction on this fixture is mining. Disable staking if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixture?.fixture_id);

    // Get USDC amount that contract is allowed to spend on user's behalf
    const allowance = useUSDCAllowance();
    const hasStakeAmountApproved = allowance > props.stakeAmount;
    //const hasStakeAmountApproved = false;

    // Calculate if we are within betting window
    const { betEndTime } = useFixtureBettingEndTime(props.fixture.fixture_id);
    const [timeUp, setTimeUp] = useState<boolean>(true);
    useEffect(() => {
        if (betEndTime) {
            const timeIsUp = new Date() > betEndTime;
            setTimeUp(timeIsUp);
        } else {
            setTimeUp(true);
        }
    }, [betEndTime]);

    // Determine if stake actions should be disabled
    const stakeActionDisabled: boolean = !props.validity.isValid || isFixtureTransacting || timeUp;

    return (
        (<Root>
            <Box className={classes.container}>
                {!hasStakeAmountApproved && props.direction == StakeDirection.STAKE && (
                    <USDCApprovalButtonComponent
                        disabled={stakeActionDisabled}
                    />
                )}
                {(hasStakeAmountApproved || (!hasStakeAmountApproved && props.direction == StakeDirection.UNSTAKE)) && (
                    <StakeButtonComponent
                        fixture={props.fixture}
                        betType={props.betType}
                        stakeAmount={props.stakeAmount}
                        direction={props.direction}
                        disabled={stakeActionDisabled}
                    />
                )}
                <Button className={classes.dirBtn} color="primary" variant="contained" onClick={() => props.toggleStakeDirection()} disabled={isFixtureTransacting}>
                    <HiSwitchVertical />
                </Button>
            </Box >
        </Root>)
    );
}