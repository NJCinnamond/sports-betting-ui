import { styled } from '@mui/material/styles';
import { useState, useEffect } from "react";
import { useFixtureBettingEndTime } from "../../hooks/stake";
import { BetCountdownComponent } from "../betCountdownComponent/betCountdownComponent";
import { BetTimeUpComponent } from "../betTimeUpComponent/betTimeUpComponent";

const PREFIX = 'OpenBetInsightComponent';

const classes = {
    container: `${PREFIX}-container`
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
    }
}));

export type OpenBetInsightComponentProps = {
    fixtureID: string;
}

export const OpenBetInsightComponent = (props: OpenBetInsightComponentProps) => {


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
        <Root className={classes.container}>
            {timeUp || betEndTime === undefined ? 
                (
                    <BetTimeUpComponent fixtureID={props.fixtureID}/>
                ) :
                (
                    <BetCountdownComponent endDate={betEndTime} label="left until betting closes"/>
                )
            }
        </Root>
    );
}