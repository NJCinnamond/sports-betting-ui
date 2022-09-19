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
};

export enum StakeDirection {
    STAKE,
    UNSTAKE
}

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column-reverse",
        margin: "0 0 .5em 1em"
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
            <StakeFormComponent direction={stakeDirection} toggleStakeDirection={() => toggleStakeDirection()} />
            <StakeEntryFieldComponent stakeAmount={stakeAmount} setStakeAmount={setStakeAmountCB} />
        </Box >
    );
}