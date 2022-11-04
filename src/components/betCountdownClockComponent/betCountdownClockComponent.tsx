import { makeStyles } from "@material-ui/core";
import { TimeComponent } from "../betCountdownComponent/betCountdownComponent";
import { BetCountdownClockElementComponent } from "../BetCountdownClockElementComponent/BetCountdownClockElementComponent";

export type BetCountdownClockComponentProps = {
    timerComponents: TimeComponent[];
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        textAlign: "center",
        justifyContent: "space-between"
    },
}));

export const BetCountdownClockComponent = (props: BetCountdownClockComponentProps) => {
    const classes = useStyles();

    const elements: any[] = [];

    props.timerComponents.forEach(timerComponent => {
        elements.push(
            <BetCountdownClockElementComponent value={timerComponent.value} unit={timerComponent.unit} key={timerComponent.unit}/>
        );
    });

    return (
        <div className={classes.container}>
            {elements}
        </div>
    )
}