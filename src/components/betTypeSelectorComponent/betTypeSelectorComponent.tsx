import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
import { Team } from "../../$types/team";
import { BetType } from "../../$types/betType";

import "./betTypeSelectorComponent.css";
import { useFixtureTransacting, useSelectedBetType } from "../../hooks/view";

const PREFIX = 'BetTypeSelectorComponent';

const classes = {
    container: `${PREFIX}-container`,
    betTypeButton: `${PREFIX}-betTypeButton`
};

const StyledBox  = styled(Box )((
    {
        theme
    }
) => ({
    [`&.${classes.container}`]: {
        display: "flex",
        width: "70%",
        flexDirection: "column",
        margin: "auto",
        '& > * + *': {
            marginTop: "1em",
        },
    },

    [`& .${classes.betTypeButton}`]: {
        maxHeight: "2em",
    }
}));

export interface BetTypeSelectorComponentProps {
    fixtureID: string,
    homeTeam: Team,
    awayTeam: Team,
}

export const BetTypeSelectorComponent = (props: BetTypeSelectorComponentProps) => {


    const { selectedBetType, setSelectedBetType } = useSelectedBetType(props.fixtureID);

    // Hook into whether a user transaction on this fixture is mining. Disable staking if yes.
    const { isFixtureTransacting } = useFixtureTransacting(props.fixtureID);

    const isDisabled = (betType: BetType) => selectedBetType == betType || isFixtureTransacting;

    const selectType = (betType: BetType) => {
        setSelectedBetType(betType);
    };

    return (
        <StyledBox className={classes.container}>
            <Button className={classes.betTypeButton} color="primary" variant="contained" onClick={() => selectType(BetType.HOME)} disabled={isDisabled(BetType.HOME)}>{props.homeTeam.short_name} WIN</Button >
            <Button className={classes.betTypeButton} color="primary" variant="contained" onClick={() => selectType(BetType.DRAW)} disabled={isDisabled(BetType.DRAW)}>DRAW</Button>
            <Button className={classes.betTypeButton} color="primary" variant="contained" onClick={() => selectType(BetType.AWAY)} disabled={isDisabled(BetType.AWAY)}>{props.awayTeam.short_name} WIN</Button>
        </StyledBox >
    );
}