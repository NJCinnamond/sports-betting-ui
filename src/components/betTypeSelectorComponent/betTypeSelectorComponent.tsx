import { Box } from "@mui/material";
import { Button, makeStyles } from "@material-ui/core";
import { Team } from "../../$types/team";
import { BetType } from "../../$types/betType";

export interface BetTypeSelectorComponentProps {
    homeTeam: Team,
    awayTeam: Team,
    selectedBetType: BetType,
    setSelectedBetType: (betType: BetType) => void,
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column-reverse",
        margin: "0 0 .5em 1em"
    },
    button: {
        margin: ".5em",
        maxHeight: "2em",
    }
}));

export const BetTypeSelectorComponent = (props: BetTypeSelectorComponentProps) => {
    const classes = useStyles();

    const selectType = (betType: BetType) => {
        props.setSelectedBetType(betType);
    }

    const isDisabled = (betType: BetType) => props.selectedBetType == betType;

    return (
        <Box className={classes.container}>
            <Button className={classes.button} color="primary" variant="contained" onClick={() => selectType(BetType.AWAY)} disabled={isDisabled(BetType.AWAY)}>{props.awayTeam.short_name} WIN</Button>
            <Button className={classes.button} color="primary" variant="contained" onClick={() => selectType(BetType.DRAW)} disabled={isDisabled(BetType.DRAW)}>DRAW</Button>
            <Button className={classes.button} color="primary" variant="contained" onClick={() => selectType(BetType.HOME)} disabled={isDisabled(BetType.HOME)}>{props.homeTeam.short_name} WIN</Button >
        </Box >
    );
}