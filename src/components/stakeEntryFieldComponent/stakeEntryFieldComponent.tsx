import { Box, TextField } from "@mui/material";
import { Button, makeStyles } from "@material-ui/core";

export interface StakeEntryFieldComponentProps {
    stakeAmount: number,
    setStakeAmount: (amount: number) => void,
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
    },
}));

export const StakeEntryFieldComponent = (props: StakeEntryFieldComponentProps) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <TextField type="number" label="Enter amount" variant="outlined" />
        </Box >
    );
}