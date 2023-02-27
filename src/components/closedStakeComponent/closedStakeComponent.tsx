import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Fixture } from "../../$types/fixture";
import { OpenFixtureButtonComponent } from "../openFixtureButtonComponent/openFixtureButtonComponent";
import { useFixtureOpeningAdvanceTime } from "../../hooks/stake";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const PREFIX = 'ClosedStakeComponent';

const classes = {
    container: `${PREFIX}-container`,
    section: `${PREFIX}-section`
};

const StyledBox  = styled(Box )((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        display: "flex",
        flexDirection: "column",
    },

    [`& .${classes.section}`]: {
        margin: "0.5em",
        textAlign: "center"
    }
}));

export interface ClosedStakeComponentProps {
    fixture: Fixture,
}

export const ClosedStakeComponent = (props: ClosedStakeComponentProps) => {
    const { address } = useAccount();

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
        <StyledBox className={classes.container}>
            {!isWithinOpenWindow && (
                <div className={classes.section}>
                    This fixture is currently closed.
                </div>
            )}
            {isWithinOpenWindow && !address && (
                <div className={classes.section}>
                    This fixture is currently closed. To request to Open it, please connect your wallet.
                </div>
            )}
            {isWithinOpenWindow && address && (
                <div className={classes.section}>
                    This fixture is currently closed. Click below to request to Open it.
                </div>
            )}
            {isWithinOpenWindow && (
                <div className={classes.section}>
                    <OpenFixtureButtonComponent fixture={props.fixture}/>
                </div>
            )}
        </StyledBox >
    );
}