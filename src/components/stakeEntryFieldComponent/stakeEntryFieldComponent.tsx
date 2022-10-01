import { Box } from "@mui/material";
import { TextField, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { StakeDirection, StakeValidity } from "../openStakeComponent/openStakeComponent";

export interface StakeEntryFieldComponentProps {
    stakeAmount: number,
    direction: StakeDirection,
    setStakeAmount: (amount: number) => void,
    selectedBetTypeStr: string,
    validity: StakeValidity,
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
        margin: "0",
    }
}));

const validNumber = new RegExp(/^\d*\.?\d*$/);

export const StakeEntryFieldComponent = (props: StakeEntryFieldComponentProps) => {
    const classes = useStyles();
    const helperTextStyles = useHelperTextStyles();

    const [helperText, setHelperText] = useState<string>();

    // Set to true when field is inputted for first time
    const [hasHadEntry, setHasHadEntry] = useState<boolean>(false);

    useEffect(() => {
        let newText = props.direction === StakeDirection.STAKE ? "Staking" : "Unstaking";
        newText += " " + props.stakeAmount + " DAI on " + props.selectedBetTypeStr + ".";
        setHelperText(newText);
    }, [props.stakeAmount, props.direction, props.selectedBetTypeStr]);

    const onStakeChange = (event: any) => {
        // Regex selector ensures numeric input only
        event.currentTarget.value = validNumber.test(event.currentTarget.value) ? event.currentTarget.value : props.stakeAmount;
        const stake = event.currentTarget.value ? event.currentTarget.value : 0;
        props.setStakeAmount(stake);
        setHasHadEntry(true);
    };

    return (
        <Box className={classes.container}>
            <TextField
                label="Enter amount"
                type="decimal"
                variant="outlined"
                fullWidth
                size="small"
                helperText={props.validity.isValid ? helperText : props.validity.errorStr}
                error={!props.validity.isValid && hasHadEntry}
                onChange={onStakeChange}
                inputProps={{
                    classes: {
                        root: classes.input
                    },
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