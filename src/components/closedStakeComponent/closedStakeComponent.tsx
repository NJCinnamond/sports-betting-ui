import { Box } from "@mui/material";
import { Button, CircularProgress, makeStyles, Snackbar } from "@material-ui/core";
import { Fixture } from "../../$types/fixture";
import { useFixtureOpen } from "../../hooks/fixtureState";
import { useEffect, useState } from "react";
import { useNotifications } from "@usedapp/core";
import Alert from "@material-ui/lab/Alert";
import { useTypedSelector } from "../../redux/store";

export interface ClosedStakeComponentProps {
    fixture: Fixture,
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
    },
    section: {
        margin: "0.5em",
        textAlign: "center"
    },
    openBtn: {
        padding: "0.8em 3em",
    }
}));

export const ClosedStakeComponent = (props: ClosedStakeComponentProps) => {
    const classes = useStyles();
    const { notifications } = useNotifications();
    const { openFixture } = useFixtureOpen(props.fixture?.fixture_id);

    // Redux store for fixture view state
    const fixtureViewStates = useTypedSelector((state) => state.view.fixtureViewStates);

    // Deduce whether fixture is currently opening from redux store
    const [isOpening, setIsOpening] = useState(false);
    useEffect(() => {
        const isOpeningTxMining = fixtureViewStates[props.fixture.fixture_id]?.opening === 'Mining';
        setIsOpening(isOpeningTxMining);
    }, [props.fixture.fixture_id, [fixtureViewStates[props.fixture.fixture_id]]]);

    // Handle logic for fixture opening failing, so snackbar appears with alert
    // TODO: Move this to generic snackbar component which can display regardless of whether failing fixture is selected
    const [showFixtureOpenFailed, setShowFixtureOpenFailed] = useState(false);
    useEffect(() => {
        if (notifications.filter((n) => n.type === "transactionFailed" && n.transactionName === "FixtureOpen").length > 0) {
            setShowFixtureOpenFailed(true);
        };
    }, [notifications]);

    const handleSnackbarClose = () => {
        setShowFixtureOpenFailed(false);
    };

    // TODO: Improve alert text to explain time requirements for fixture opening
    return (
        <>
            <Box className={classes.container}>
                <div className={classes.section}>
                    This fixture is currently closed. To request to open it, press the button below.
                </div>
                <div className={classes.section}>
                    <Button
                        className={classes.openBtn}
                        color="primary"
                        variant="contained"
                        onClick={() => openFixture(props.fixture.fixture_id)}
                        disabled={isOpening}
                    >
                        {isOpening ? <CircularProgress size={26} /> : "OPEN"}
                    </Button>
                </div>
            </Box >
            <Snackbar
                open={showFixtureOpenFailed}
                onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="error">Opening fixture failed. Does the contract need more LINK?</Alert>
            </Snackbar>
        </>

    );
}