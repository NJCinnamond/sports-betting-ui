import { makeStyles } from "@material-ui/core";
import { PayoutComponent } from "../payoutComponent/payoutComponent";

export type AwaitingStakeComponentProps = {
    fixtureID: string;
}

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: "center",
    },
    info: {
        fontSize: "0.9em",
        marginBottom: "0.6em",
    }
}));

export const AwaitingStakeComponent = (props: AwaitingStakeComponentProps) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.info}>
                Betting has closed while we await the fixture result. When we detect the fixture result is available, you will be able to click the button below to initiate payout to winners.
            </div>
            <PayoutComponent fixtureID={props.fixtureID} />
        </div>
    )
}