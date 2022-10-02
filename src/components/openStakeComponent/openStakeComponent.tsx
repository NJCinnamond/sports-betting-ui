import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { BetType } from "../../$types/betType";
import { Fixture } from "../../$types/fixture";
import { useEffect, useState } from "react";
import { StakeEntryFieldComponent } from "../stakeEntryFieldComponent/stakeEntryFieldComponent";
import { StakeFormComponent } from "../stakeFormComponent/stakeFormComponent";

export interface OpenStakeComponentProps {
    fixture: Fixture,
    selectedBetType: BetType,
    selectedBetTypeStr: string,
};

export interface StakeValidity {
    isValid: boolean,
    errorStr: string,
}

export enum StakeDirection {
    STAKE,
    UNSTAKE
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
    },
}));

const defaultValid = {
    isValid: true,
    errorStr: '',
} as StakeValidity;

export const OpenStakeComponent = (props: OpenStakeComponentProps) => {
    const classes = useStyles();

    const [stakeDirection, setStakeDirection] = useState<StakeDirection>(StakeDirection.STAKE);
    const [stakeAmount, setStakeAmount] = useState<number>(0);
    const setStakeAmountCB = (amount: number) => setStakeAmount(amount);

    // stakeValidity 
    const [stakeValidity, setStakeValidity] = useState<StakeValidity>(defaultValid);
    useEffect(() => {
        if (stakeAmount == 0) {
            setStakeValidity({
                isValid: false,
                errorStr: "Enter quantity."
            });
        }
        else { // TODO: Set to invalid if unstake and quantity > staked amount
            setStakeValidity(defaultValid);
        }
    }, [stakeAmount, stakeDirection])

    const toggleStakeDirection = () => {
        const dir = stakeDirection == StakeDirection.STAKE ? StakeDirection.UNSTAKE : StakeDirection.STAKE;
        setStakeDirection(dir);
    }

    return (
        <Box className={classes.container}>
            <StakeEntryFieldComponent
                stakeAmount={stakeAmount}
                direction={stakeDirection}
                setStakeAmount={setStakeAmountCB}
                selectedBetTypeStr={props.selectedBetTypeStr}
                validity={stakeValidity}
            />
            <StakeFormComponent
                fixture={props.fixture}
                betType={props.selectedBetType}
                stakeAmount={stakeAmount}
                direction={stakeDirection}
                toggleStakeDirection={() => toggleStakeDirection()}
                validity={stakeValidity}
            />
        </Box >
    );
}