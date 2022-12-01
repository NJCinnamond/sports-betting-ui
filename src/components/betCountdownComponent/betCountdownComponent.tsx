import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { BetCountdownClockComponent } from "../betCountdownClockComponent/betCountdownClockComponent";

const PREFIX = 'BetCountdownComponent';

const classes = {
    container: `${PREFIX}-container`,
    caption: `${PREFIX}-caption`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        width: "100%",
        textAlign: "center",
        justifyContent: "center",
        height: "100%",
        fontSize: "0.9em"
    },

    [`& .${classes.caption}`]: {
        marginTop: "0.8em",
    }
}));

type TimeLeft = { [key in string]: number };

export interface TimeComponent {
    value: number;
    unit: string;
}

export type BetCountdownComponentProps = {
    endDate: Date;
}

export const BetCountdownComponent = (props: BetCountdownComponentProps) => {


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
        <Root className={classes.container}>
            <div>
                <BetCountdownClockComponent timerComponents={timerComponents}/>
                <div className={classes.caption}>
                    left until betting closes
                </div>
            </div>
        </Root>
    );
}