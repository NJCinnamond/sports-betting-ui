import { styled } from '@mui/material/styles';
import { TimeComponent } from "../betCountdownComponent/betCountdownComponent";
import { BetCountdownClockElementComponent } from "../BetCountdownClockElementComponent/BetCountdownClockElementComponent";

const PREFIX = 'BetCountdownClockComponent';

const classes = {
    container: `${PREFIX}-container`
};

const Root = styled('div')((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        display: "flex",
        textAlign: "center",
        justifyContent: "space-between",
    }
}));

export type BetCountdownClockComponentProps = {
    timerComponents: TimeComponent[];
}

export const BetCountdownClockComponent = (props: BetCountdownClockComponentProps) => {


    const elements: any[] = [];

    props.timerComponents.forEach(timerComponent => {
        elements.push(
            <BetCountdownClockElementComponent value={timerComponent.value} unit={timerComponent.unit} key={timerComponent.unit}/>
        );
    });

    return (
        <Root className={classes.container}>
            {elements}
        </Root>
    );
}