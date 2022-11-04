import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useFixtureBettingEndTime } from "../../hooks/stake";
import { BetCountdownComponent } from "../betCountdownComponent/betCountdownComponent";
import { BetTimeUpComponent } from "../betTimeUpComponent/betTimeUpComponent";

export type OpenBetInsightComponentProps = {
    fixtureID: string;
}

const useStyles = makeStyles((theme) => ({
    container: {
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
    },
}));

export const OpenBetInsightComponent = (props: OpenBetInsightComponentProps) => {
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

    return (
        <div className={classes.container}>
            {timeUp || betEndTime === undefined ? 
                (
                    <BetTimeUpComponent fixtureID={props.fixtureID}/>
                ) :
                (
                    <BetCountdownComponent endDate={betEndTime}/>
                )
            }
        </div>
    )
}