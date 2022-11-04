import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useFixtureBettingEndTime } from "../../hooks/stake";
import { BetCountdownComponent } from "../betCountdownComponent/betCountdownComponent";

export type OpenBetInsightComponent = {
    fixtureID: string;
}

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        height: "100%",
        position: "relative",
    },
    timeUpComp: {
        position: "absolute",
        width: "100%",
        height: "50%",
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
        margin: "auto"
    }
}));

export const OpenBetInsightComponent = (props: OpenBetInsightComponent) => {
    const classes = useStyles();

    const { betEndTime } = useFixtureBettingEndTime(props.fixtureID);

    const [timeUp, setTimeUp] = useState<boolean>();
    useEffect(() => {
        if (betEndTime) {
            const timeIsUp = new Date() > betEndTime;
            setTimeUp(timeIsUp);
        } else {
            setTimeUp(true);
        }
    }, [betEndTime]);

    // TODO: When time is up, render new AWAIT action button which calls awaitBetForFixture
    // to perform the OPEN -> AWAITING transition
    return (
        <div className={classes.container}>
            {timeUp || betEndTime === undefined ? 
                (
                    <div className={classes.timeUpComp}>
                        Betting has finished.
                    </div>
                ) :
                (
                    <BetCountdownComponent endDate={betEndTime}/>
                )
            }
        </div>
    )
}