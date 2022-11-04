import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: "center",
        fontSize: "0.9em",
    },
}));

export const FulfillingStakeComponent = () => {
    const classes = useStyles();
    
    // TODO: Add result and expected payout here
    return (
        <div className={classes.container}>
            <p>
                The smart contract is currently paying out winning stakers for this fixture.
            </p>
        </div>
    )
}