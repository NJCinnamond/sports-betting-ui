import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { BetCountdownClockComponent } from "../betCountdownClockComponent/betCountdownClockComponent";

type TimeLeft = { [key in string]: number };

export interface TimeComponent {
    value: number;
    unit: string;
}

export type BetCountdownComponentProps = {
    endDate: Date;
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

export const BetCountdownComponent = (props: BetCountdownComponentProps) => {
    const classes = useStyles();

    const timerComponents: TimeComponent[] = [];

    const calculateTimeLeft = () => {        
        let difference = +props.endDate - +new Date();
        
        let timeLeft = {};
        
        if (difference > 0) {
            timeLeft = {
                day: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hour: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minute: Math.floor((difference / 1000 / 60) % 60),
                second: Math.floor((difference / 1000) % 60)
            };
        }
        
        return timeLeft;
    }

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        
        return () => clearTimeout(timer);
    });


    Object.keys(timeLeft).forEach((interval) => {
        const unit = timeLeft[interval] == 1 ? interval : interval + 's';
        timerComponents.push(
            {
                value: timeLeft[interval],
                unit
            } as TimeComponent
        );
    });

    return (
        <div className={classes.container}>
            <div>
                <BetCountdownClockComponent timerComponents={timerComponents}/>
                <p>
                    left until betting closes
                </p>
            </div>
        </div>
    )
}