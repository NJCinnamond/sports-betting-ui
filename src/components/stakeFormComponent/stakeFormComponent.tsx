import { Box } from "@mui/material";
import { Button, CircularProgress, makeStyles, Snackbar } from "@material-ui/core";
import { StakeDirection, StakeValidity } from "../openStakeComponent/openStakeComponent";
import { HiSwitchVertical } from 'react-icons/hi';
import { useFixtureStake, useFixtureUnstake } from "../../hooks";
import { useEffect, useState } from "react";
import { BetType } from "../../$types/betType";
import { Fixture } from "../../$types/fixture";
import Alert from "@material-ui/lab/Alert";
import { useNotifications } from "@usedapp/core";
import { useTypedSelector } from "../../redux/store";
import { useFixtureTransacting } from "../../hooks/view";

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

    const { stake } = useFixtureStake(props.fixture?.fixture_id);
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

    return (
        <>
            <Box className={classes.container}>
                <Button
                    className={classes.stakeBtn}
                    color="primary"
                    variant="contained"
                    onClick={() => handleStakeAction(props.direction)}
                    disabled={!props.validity.isValid || isFixtureTransacting}
                >
                    {isFixtureTransacting ? <CircularProgress size={26} /> : props.direction == StakeDirection.STAKE ? "STAKE" : "UNSTAKE"}
                </Button>
                <Button className={classes.dirBtn} color="primary" variant="contained" onClick={() => props.toggleStakeDirection()} disabled={isFixtureTransacting}>
                    <HiSwitchVertical />
                </Button>
            </Box >
        </>
    );
}