import { Box } from "@mui/material";
import { createTheme, makeStyles } from "@material-ui/core";
import moment from "moment";
import { Fixture } from "../../$types/fixture";
import { Team } from "../../$types/team";
import { FixtureNameBadgeComponent } from '../fixtureNameBadge/fixtureNameBadgeComponent';

export interface FixtureInfoComponentProps {
    fixture: Fixture | undefined,
    homeTeam: Team | undefined,
    awayTeam: Team | undefined,
};

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 300,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "4em",
        [theme.breakpoints.down(460)]: {
            fontSize: '3.5vw',
        },
    },
    nameBadge: {
        width: "6em",
    },
    fixtureTimeBox: {
        margin: "0 4em",
        backgroundColor: "grey",
        padding: "0.6em",
        borderRadius: "5px",
        fontWeight: "bold",
        color: theme.palette.common.white
    }
}));

export const FixtureInfoComponent = (props: FixtureInfoComponentProps) => {
    const classes = useStyles(theme);
    const formatKickoffTime = (ko: number | undefined) => {
        let kickoffTime = '';
        if (ko) {
            const date = new Date(ko * 1000);
            kickoffTime = moment(date).format('HH:mm');
        }
        return kickoffTime;
    };

    return (
        <Box className={classes.container}>
            <div className={classes.nameBadge} >
                <FixtureNameBadgeComponent displayName={props.homeTeam?.short_name} crest={props.homeTeam?.crest_url} home={true}></FixtureNameBadgeComponent>
            </div>
            <Box className={classes.fixtureTimeBox}>
                {formatKickoffTime(props.fixture?.ko)}
            </Box>
            <div className={classes.nameBadge} >
                <FixtureNameBadgeComponent displayName={props.awayTeam?.short_name} crest={props.awayTeam?.crest_url} home={false}></FixtureNameBadgeComponent>
            </div>
        </Box>
    );
}