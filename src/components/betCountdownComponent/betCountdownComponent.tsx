import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { BetCountdownClockElementComponent } from '../BetCountdownClockElementComponent/BetCountdownClockElementComponent';

const PREFIX = 'BetCountdownComponent';

const classes = {
    container: `${PREFIX}-container`,
    caption: `${PREFIX}-caption`,
    timerComponents: `${PREFIX}-timerComponents`,
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
    },

    [`& .${classes.timerComponents}`]: {
        display: "flex",
        textAlign: "center",
        justifyContent: "space-between",
    }
}));

type TimeLeft = { [key in string]: number };

export interface TimeComponent {
    value: number;
    unit: string;
}

export type BetCountdownComponentProps = {
    endDate: Date;
    label?: string;
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
        setTimeLeft(calculateTimeLeft());
    }, [props.endDate]);

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
                <div className={classes.timerComponents}>
                    {timerComponents.map(timerComponent => {
                        return <BetCountdownClockElementComponent value={timerComponent.value} unit={timerComponent.unit} key={timerComponent.unit}/>
                    })}
                </div>
                <div className={classes.caption}>
                    {props.label}
                </div>
            </div>
        </Root>
    );
}