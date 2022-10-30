import { makeStyles } from "@material-ui/core";

export type BetSlipComponentProps = {
    fixtureID: string;
}

const useStyles = makeStyles((theme) => ({
    container: {
        width: "70%",
        marginTop: "-0.5em",
        textAlign: "center",
    },
}));

export const BetSlipComponent = (props: BetSlipComponentProps) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <p>STAKE: </p>
            <p>RESULT: </p>
            <p>PAYOUT: </p>
        </div>
    )
}