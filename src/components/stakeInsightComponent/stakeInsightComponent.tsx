import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { StakeSummary } from "../../$types/fixtureEnrichment";
import { BetType } from "../../$types/betType";

export interface StakeInsightComponentProps {
    stakes: StakeSummary
};

const useStyles = makeStyles((theme) => ({
    stakeInsight: {
        textAlign: 'center',
    },
}));

export const StakeInsightComponent = (props: StakeInsightComponentProps) => {
    const classes = useStyles();

    return (
        <Box className={classes.stakeInsight}>
            <p>HOME: {props.stakes ? props.stakes[BetType.HOME] : ''}</p>
            <p>DRAW: {props.stakes ? props.stakes[BetType.DRAW] : ''}</p>
            <p>AWAY: {props.stakes ? props.stakes[BetType.AWAY] : ''}</p>
        </Box>
    );
}