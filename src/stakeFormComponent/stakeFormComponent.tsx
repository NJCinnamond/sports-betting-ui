import { Box } from "@mui/material";
import { Button, makeStyles } from "@material-ui/core";
import { StakeDirection, StakeValidity } from "../components/openStakeComponent/openStakeComponent";
import { HiSwitchVertical } from 'react-icons/hi';

export interface StakeFormComponentProps {
    stakeAmount: number,
    direction: StakeDirection,
    toggleStakeDirection: () => void;
    validity: StakeValidity,
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        marginTop: "0.4em",
        height: "2.8em",
    },
    stakeBtn: {
        flexBasis: "70%",
    },
    dirBtn: {
        margin: "0 0.3em",
        flexBasis: "30%",
    },
}));

export const StakeFormComponent = (props: StakeFormComponentProps) => {
    const classes = useStyles();

    const stakeAction = (direction: StakeDirection) => console.log("DIR: ", direction);

    return (
        <Box className={classes.container}>
            <Button
                className={classes.stakeBtn}
                color="primary"
                variant="contained"
                onClick={() => stakeAction(props.direction)}
                disabled={!props.validity.isValid}
            >
                {props.direction == StakeDirection.STAKE ? "STAKE" : "UNSTAKE"}

            </Button>
            <Button className={classes.dirBtn} color="primary" variant="contained" onClick={() => props.toggleStakeDirection()}>
                <HiSwitchVertical />
            </Button>
        </Box >

    );
}