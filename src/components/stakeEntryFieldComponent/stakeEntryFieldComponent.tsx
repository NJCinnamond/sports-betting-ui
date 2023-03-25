import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { StakeDirection, StakeValidity } from "../openStakeComponent/openStakeComponent";

const PREFIX = 'StakeEntryFieldComponent';

const classes = {
    container: `${PREFIX}-container`,
    input: `${PREFIX}-input`,
    helperTextStyles: `${PREFIX}-helperTextStyles`
};

const StyledBox  = styled(Box )((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        display: "flex",
        width: "100%",
    },

    [`& .${classes.input}`]: {
        maxHeight: "3.3em",
    },

    [`& .${classes.helperTextStyles}`]: {
        margin: "0",
    }
}));

export interface StakeEntryFieldComponentProps {
    stakeAmount: number,
    direction: StakeDirection,
    setStakeAmount: (amount: number) => void,
    selectedBetTypeStr: string,
    validity: StakeValidity,
}

const validNumber = new RegExp(/^\d*\.?\d*$/);

export const StakeEntryFieldComponent = (props: StakeEntryFieldComponentProps) => {
    const [helperText, setHelperText] = useState<string>();

    // Set to true when field is inputted for first time
    const [hasHadEntry, setHasHadEntry] = useState<boolean>(false);

    useEffect(() => {
        let newText = props.direction === StakeDirection.STAKE ? "Staking" : "Unstaking";
        newText += " " + props.stakeAmount + " USDC on " + props.selectedBetTypeStr + ".";
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
        <StyledBox className={classes.container}>
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
                        root: classes.helperTextStyles
                    }
                }}
            />
        </StyledBox >
    );
}