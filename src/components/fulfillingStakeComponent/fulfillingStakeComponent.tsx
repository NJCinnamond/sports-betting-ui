import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: "center",
        fontSize: "0.9em",
    },
}));

export const FulfillingStakeComponent = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div>
                The smart contract is currently paying out winning stakers for this fixture.
            </div>
        </div>
    )
}