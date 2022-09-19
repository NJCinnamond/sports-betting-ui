import { Box } from "@mui/material";
import { Button, makeStyles } from "@material-ui/core";
import { StakeDirection } from "../components/openStakeComponent/openStakeComponent";
import { HiSwitchVertical } from 'react-icons/hi';

export interface StakeFormComponentProps {
    direction: StakeDirection,
    toggleStakeDirection: () => void;
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
    },
    stakeBtn: {
        margin: "1em 0",
        flexBasis: "70%",
    },
    dirBtn: {
        margin: "1em 0.2em",
        flexBasis: "30%",
    }
}));

export const StakeFormComponent = (props: StakeFormComponentProps) => {
    const classes = useStyles();

    const stakeAction = (direction: StakeDirection) => console.log("DIR: ", direction);

    return (
        <Box className={classes.container}>
            <Button className={classes.stakeBtn} color="primary" variant="contained" onClick={() => stakeAction(props.direction)}>{props.direction == StakeDirection.STAKE ? "STAKE" : "UNSTAKE"}</Button>
            <Button className={classes.dirBtn} color="primary" variant="contained" onClick={() => props.toggleStakeDirection()}>
                <HiSwitchVertical />
            </Button>
        </Box >
    );
}