import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Fixture } from "../../$types/fixture";
import { OpenFixtureButtonComponent } from "../openFixtureButtonComponent/openFixtureButtonComponent";
import { useFixtureOpeningAdvanceTime } from "../../hooks/stake";
import { useEffect, useState } from "react";
import { useEthers } from "@usedapp/core";
import { BetCountdownComponent } from "../betCountdownComponent/betCountdownComponent";

const PREFIX = 'ClosedStakeComponent';

const classes = {
    container: `${PREFIX}-container`,
    section: `${PREFIX}-section`,
    countdown: `${PREFIX}-countdown`
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
        marginTop: "0.5em",
        textAlign: "center"
    },

    [`& .${classes.countdown}`]: {
        maxWidth: "250px",
        textAlign: "center",
        margin: ".5em auto"
    },
}));

export interface ClosedStakeComponentProps {
    fixture: Fixture,
}

export const ClosedStakeComponent = (props: ClosedStakeComponentProps) => {
    const { account } = useEthers();

    const [isWithinOpenWindow, setIsWithinOpenWindow] = useState<boolean>(false);

    //const { betAdvanceTime } = useFixtureOpeningAdvanceTime();
    const betAdvanceTimeSeconds = 7 * 24 * 60 * 60; // We can open fixtures 7 days before kickoff

    const [openWindowStart, setOpenWindowStart] = useState<Date | undefined>(undefined);

    useEffect(() => {
        const newOpenWindowStart = new Date((props.fixture.ko - betAdvanceTimeSeconds) * 1000);
        setOpenWindowStart(newOpenWindowStart);
    }, [props.fixture]);

    useEffect(() => {
        if (openWindowStart != undefined && openWindowStart.getTime() < Date.now()) {
            setIsWithinOpenWindow(true);
        } else {
            setIsWithinOpenWindow(false);
        };
    }, [openWindowStart]);

    return (
        <StyledBox className={classes.container}>
            {!isWithinOpenWindow && (
                <div className={classes.section}>
                    This fixture can be opened in
                    {openWindowStart != undefined && (
                        <div className={classes.countdown}>
                            <BetCountdownComponent endDate={openWindowStart}/>
                        </div>
                    )}
                </div>
            )}
            {isWithinOpenWindow && !account && (
                <div className={classes.section}>
                    Connect your wallet to open the fixture.
                </div>
            )}
            {isWithinOpenWindow && account && (
                <div className={classes.section}>
                    Click below to open the fixture. You must have funded at least 0.1 LINK.
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