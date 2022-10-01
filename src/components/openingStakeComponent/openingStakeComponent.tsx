import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "0.5em",
        textAlign: 'center',
    },
}));

export const OpeningStakeComponent = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            Hold tight! This fixture is being opened for betting...
        </div>
    );
}