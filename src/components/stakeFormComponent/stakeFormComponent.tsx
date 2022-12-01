import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Button, CircularProgress } from "@mui/material";
import { StakeDirection, StakeValidity } from "../openStakeComponent/openStakeComponent";
import { HiSwitchVertical } from 'react-icons/hi';
import { useFixtureStake, useFixtureUnstake } from "../../hooks";
import { useEffect, useState } from "react";
import { BetType } from "../../$types/betType";
import { Fixture } from "../../$types/fixture";
import { useFixtureTransacting } from "../../hooks/view";
import { useFixtureBettingEndTime } from "../../hooks/stake";

const PREFIX = 'StakeFormComponent';

const classes = {
    container: `${PREFIX}-container`,
    stakeBtn: `${PREFIX}-stakeBtn`,
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
        height: "2.8em",
    },

    [`& .${classes.stakeBtn}`]: {
        flexBasis: "70%",
    },

    [`& .${classes.dirBtn}`]: {
        margin: "0 0.3em",
        flexBasis: "30%",
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


    const { fixtureStakeState, stake } = useFixtureStake(props.fixture?.fixture_id);
    const { unstake } = useFixtureUnstake(props.fixture?.fixture_id);

    // Hook into whether a user transaction on this fixture is mining. Disable staking if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixture?.fixture_id);

    const handleStakeAction = (dir: StakeDirection) => {
        if (dir == StakeDirection.STAKE) {
            stake(props.fixture.fixture_id, props.betType, props.stakeAmount);
        } else {
            unstake(props.fixture.fixture_id, props.betType, props.stakeAmount);
        }
    };

    const { betEndTime } = useFixtureBettingEndTime(props.fixture.fixture_id);

    const [timeUp, setTimeUp] = useState<boolean>();
    useEffect(() => {
        if (betEndTime) {
            const timeIsUp = new Date() > betEndTime;
            setTimeUp(timeIsUp);
        } else {
            setTimeUp(true);
        }
    }, [betEndTime]);

    return (
        (<Root>
            <Box className={classes.container}>
                <Button
                    className={classes.stakeBtn}
                    color="primary"
                    variant="contained"
                    onClick={() => handleStakeAction(props.direction)}
                    disabled={!props.validity.isValid || isFixtureTransacting || timeUp}
                >
                    {isFixtureTransacting ? <CircularProgress size={26} /> : props.direction == StakeDirection.STAKE ? "STAKE" : "UNSTAKE"}
                </Button>
                <Button className={classes.dirBtn} color="primary" variant="contained" onClick={() => props.toggleStakeDirection()} disabled={isFixtureTransacting}>
                    <HiSwitchVertical />
                </Button>
            </Box >
        </Root>)
    );
}