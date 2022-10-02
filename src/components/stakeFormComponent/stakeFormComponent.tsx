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
    const { notifications } = useNotifications();

    const { stake } = useFixtureStake(props.fixture?.fixture_id);
    const { unstake } = useFixtureUnstake(props.fixture?.fixture_id);

    // Redux store for fixture view state
    const fixtureViewStates = useTypedSelector((state) => state.view.fixtureViewStates);

    //const isMining = stakeState.status === "Mining" || unstakeState.status === "Mining";

    // Deduce whether fixture is currently staking/unstaking from redux store
    const [isStaking, setIsStaking] = useState(false);
    useEffect(() => {
        const isStakingTxMining = fixtureViewStates[props.fixture.fixture_id]?.staking === 'Mining';
        setIsStaking(isStakingTxMining);
    }, [props.fixture.fixture_id, [fixtureViewStates[props.fixture.fixture_id]]]);

    // Handle logic for fixture staking/unstaking failing, so snackbar appears with alert
    const [showStakeFailed, setShowStakeFailed] = useState(false);
    useEffect(() => {
        if (notifications.filter((n) => n.type === "transactionFailed" && (n.transactionName === "Stake" || n.transactionName === "Unstake")).length > 0) {
            setShowStakeFailed(true);
        };
    }, [notifications]);

    const handleStakeAction = (dir: StakeDirection) => {
        if (dir == StakeDirection.STAKE) {
            stake(props.fixture.fixture_id, props.betType, props.stakeAmount);
        } else {
            unstake(props.fixture.fixture_id, props.betType, props.stakeAmount);
        }
    };

    const handleSnackbarClose = () => {
        setShowStakeFailed(false);
    };

    return (
        <>
            <Box className={classes.container}>
                <Button
                    className={classes.stakeBtn}
                    color="primary"
                    variant="contained"
                    onClick={() => handleStakeAction(props.direction)}
                    disabled={!props.validity.isValid || isStaking}
                >
                    {isStaking ? <CircularProgress size={26} /> : props.direction == StakeDirection.STAKE ? "STAKE" : "UNSTAKE"}
                </Button>
                <Button className={classes.dirBtn} color="primary" variant="contained" onClick={() => props.toggleStakeDirection()}>
                    <HiSwitchVertical />
                </Button>
            </Box >
            <Snackbar
                open={showStakeFailed}
                onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error">Stake action failed.</Alert>
            </Snackbar>
        </>
    );
}