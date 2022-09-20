import { Box } from "@mui/material";
import { TextField, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { StakeDirection } from "../openStakeComponent/openStakeComponent";

export interface StakeEntryFieldComponentProps {
    stakeAmount: number,
    direction: StakeDirection,
    setStakeAmount: (amount: number) => void,
    selectedBetTypeStr: string,
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        width: "100%",
    },
    input: {
        maxHeight: "3.3em",
    }
}));

const useHelperTextStyles = makeStyles(() => ({
    root: {
        margin: "0.2em 0 0.8em 0",
        padding: "0",
    }
}));

export const StakeEntryFieldComponent = (props: StakeEntryFieldComponentProps) => {
    const classes = useStyles();
    const helperTextStyles = useHelperTextStyles();

    const [helperText, setHelperText] = useState<string>();

    useEffect(() => {
        let newText = props.direction === StakeDirection.STAKE ? "Staking" : "Unstaking";
        newText += " " + props.stakeAmount + " DAI on " + props.selectedBetTypeStr + ".";
        setHelperText(newText);
    }, [props.stakeAmount, props.direction, props.selectedBetTypeStr]);

    const onStakeChange = (event: any) => {
        const stake = event.target.value ? event.target.value : 0;
        props.setStakeAmount(stake);
    };

    return (
        <Box className={classes.container}>
            <TextField
                type="number"
                label="Enter amount"
                variant="outlined"
                fullWidth
                size="small"
                helperText={helperText}
                onChange={onStakeChange}
                InputProps={{
                    classes: {
                        root: classes.input
                    }
                }}
                FormHelperTextProps={{
                    classes: {
                        root: helperTextStyles.root
                    }
                }}
            />
        </Box >
    );
}