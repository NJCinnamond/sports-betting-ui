import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { Fixture } from "../../$types/fixture";
import { OpenFixtureButtonComponent } from "../openFixtureButtonComponent/openFixtureButtonComponent";
import { useEthers } from "@usedapp/core";
import { useFixtureOpeningAdvanceTime } from "../../hooks/stake";
import { useEffect, useState } from "react";

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
}));

export const ClosedStakeComponent = (props: ClosedStakeComponentProps) => {
    const classes = useStyles();

    const { account } = useEthers();

    const [isWithinOpenWindow, setIsWithinOpenWindow] = useState<boolean>(false);
    const { betAdvanceTime } = useFixtureOpeningAdvanceTime();

    useEffect(() => {
        if (betAdvanceTime !== undefined) {
            let now = Date.now() / 1000; // Current timestamp in seconds
            let betAdvanceTimeSeconds = (betAdvanceTime.getTime() / 1000); // Time before KO fixture can be opened, in seconds
            if (props.fixture.ko - betAdvanceTimeSeconds <= now) {
                setIsWithinOpenWindow(true);
            } else {
                setIsWithinOpenWindow(false);
            };
        }
    }, [betAdvanceTime, props.fixture]);

    return (
        <Box className={classes.container}>
            {!isWithinOpenWindow && (
                <div className={classes.section}>
                    This fixture is currently closed.
                </div>
            )}
            {isWithinOpenWindow && !account && (
                <div className={classes.section}>
                    This fixture is currently closed. To request to Open it, please connect your wallet.
                </div>
            )}
            {isWithinOpenWindow && account && (
                <div className={classes.section}>
                    This fixture is currently closed. Click below to request to Open it.
                </div>
            )}
            {isWithinOpenWindow && (
                <div className={classes.section}>
                    <OpenFixtureButtonComponent fixture={props.fixture}/>
                </div>
            )}
        </Box >
    );
}