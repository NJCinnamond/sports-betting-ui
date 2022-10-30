import { Box } from "@mui/material";
import { Button, makeStyles } from "@material-ui/core";
import { Team } from "../../$types/team";
import { BetType } from "../../$types/betType";

import "./betTypeSelectorComponent.css";
import { useFixtureTransacting, useSelectedBetType } from "../../hooks/view";

export interface BetTypeSelectorComponentProps {
    fixtureID: string,
    homeTeam: Team,
    awayTeam: Team,
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        width: "70%",
        flexDirection: "column",
        margin: "auto",
        '& > * + *': {
            marginTop: "1em",
        },
    },
    betTypeButton: {

        maxHeight: "2em",
    }
}));

export const BetTypeSelectorComponent = (props: BetTypeSelectorComponentProps) => {
    const classes = useStyles();

    const { selectedBetType, setSelectedBetType } = useSelectedBetType(props.fixtureID);

    // Hook into whether a user transaction on this fixture is mining. Disable staking if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixtureID);

    const isDisabled = (betType: BetType) => selectedBetType == betType || isFixtureTransacting;

    const selectType = (betType: BetType) => {
        setSelectedBetType(betType);
    };

    return (
        <Box className={classes.container}>
            <Button className={classes.betTypeButton} color="primary" variant="contained" onClick={() => selectType(BetType.HOME)} disabled={isDisabled(BetType.HOME)}>{props.homeTeam.short_name} WIN</Button >
            <Button className={classes.betTypeButton} color="primary" variant="contained" onClick={() => selectType(BetType.DRAW)} disabled={isDisabled(BetType.DRAW)}>DRAW</Button>
            <Button className={classes.betTypeButton} color="primary" variant="contained" onClick={() => selectType(BetType.AWAY)} disabled={isDisabled(BetType.AWAY)}>{props.awayTeam.short_name} WIN</Button>
        </Box >
    );
}