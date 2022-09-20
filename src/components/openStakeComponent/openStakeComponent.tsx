import { Box } from "@mui/material";
import { Button, makeStyles } from "@material-ui/core";
import { BetType } from "../../$types/betType";
import { Fixture } from "../../$types/fixture";
import { useState } from "react";
import { StakeEntryFieldComponent } from "../stakeEntryFieldComponent/stakeEntryFieldComponent";
import { StakeFormComponent } from "../../stakeFormComponent/stakeFormComponent";

export interface OpenStakeComponentProps {
    fixture: Fixture,
    selectedBetType: BetType,
    selectedBetTypeStr: string,
};

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

export const OpenStakeComponent = (props: OpenStakeComponentProps) => {
    const classes = useStyles();

    const [stakeDirection, setStakeDirection] = useState<StakeDirection>(StakeDirection.STAKE);
    const [stakeAmount, setStakeAmount] = useState<number>(0);
    const setStakeAmountCB = (amount: number) => setStakeAmount(amount);

    const toggleStakeDirection = () => {
        const dir = stakeDirection == StakeDirection.STAKE ? StakeDirection.UNSTAKE : StakeDirection.STAKE;
        setStakeDirection(dir);
    }

    return (
        <Box className={classes.container}>
            <StakeEntryFieldComponent stakeAmount={stakeAmount} direction={stakeDirection} setStakeAmount={setStakeAmountCB} selectedBetTypeStr={props.selectedBetTypeStr} />
            <StakeFormComponent stakeAmount={stakeAmount} direction={stakeDirection} toggleStakeDirection={() => toggleStakeDirection()} />
        </Box >
    );
}