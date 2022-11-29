import { makeStyles } from "@material-ui/core";
import { Body } from '../body/bodyComponent';

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        fontSize: "2.5em",
        fontWeight: "bold"
    }
}))

export const Main = () => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.title}>
                Premier League ETH Staking
            </div>
            <Body />
        </>
    )
}