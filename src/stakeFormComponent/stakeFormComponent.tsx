import { Box } from "@mui/material";
import { Button, makeStyles } from "@material-ui/core";
import { StakeDirection, StakeValidity } from "../components/openStakeComponent/openStakeComponent";
import { HiSwitchVertical } from 'react-icons/hi';
import { useFixtureStake, useFixtureUnstake } from "../hooks";
import { useEffect } from "react";
import { BetType } from "../$types/betType";
import { Fixture } from "../$types/fixture";

export interface StakeFormComponentProps {
    fixture: Fixture,
    betType: BetType,
    stakeAmount: number,
    direction: StakeDirection,
    toggleStakeDirection: () => void;
    validity: StakeValidity,
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        marginTop: "0.4em",
        height: "2.8em",
    },
    stakeBtn: {
        flexBasis: "70%",
    },
    dirBtn: {
        margin: "0 0.3em",
        flexBasis: "30%",
    },
}));

export const StakeFormComponent = (props: StakeFormComponentProps) => {
    const classes = useStyles();

    const { fixtureStakeState: stakeState, stake } = useFixtureStake();
    const { fixtureUnstakeState: unstakeState, unstake } = useFixtureUnstake();

    const handleStakeAction = (dir: StakeDirection) => {
        if (dir == StakeDirection.STAKE) {
            stake(props.fixture.fixture_id, props.betType, props.stakeAmount);
        } else {
            unstake(props.fixture.fixture_id, props.betType, props.stakeAmount);
        }
    };

    useEffect(() => {
        console.log("NEW STAKE STATE: ", stakeState);
    }, [stakeState]);

    useEffect(() => {
        console.log("NEW UNSTAKE STATE: ", unstakeState);
    }, [unstakeState]);

    return (
        <Box className={classes.container}>
            <Button
                className={classes.stakeBtn}
                color="primary"
                variant="contained"
                onClick={() => handleStakeAction(props.direction)}
                disabled={!props.validity.isValid}
            >
                {props.direction == StakeDirection.STAKE ? "STAKE" : "UNSTAKE"}

            </Button>
            <Button className={classes.dirBtn} color="primary" variant="contained" onClick={() => props.toggleStakeDirection()}>
                <HiSwitchVertical />
            </Button>
        </Box >

    );
}