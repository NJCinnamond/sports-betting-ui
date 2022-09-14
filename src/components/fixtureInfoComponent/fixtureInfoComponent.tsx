import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import moment from "moment";
import { Fixture } from "../../types/Fixture";
import TeamStore from "../../stores/teamStore";
import { useEffect, useState } from "react";
import { Team } from "../../types/Team";
import { FixtureNameBadgeComponent } from '../fixtureNameBadge/fixtureNameBadgeComponent';

export interface FixtureInfoComponentProps {
    fixture: Fixture | undefined,
    teams: Team[] | undefined,
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "5vh",
    },
    nameBadge: {
        width: "6em",
    },
    fixtureTimeBox: {
        margin: "0 8vh",
        backgroundColor: "grey",
        padding: "1vh",
        borderRadius: "5px",
        fontWeight: "bold",
        color: theme.palette.common.white
    }
}));

export const FixtureInfoComponent = (props: FixtureInfoComponentProps) => {
    const classes = useStyles();
    const formatKickoffTime = (ko: Date | undefined) => {
        const kickofftime = moment(ko).format('HH:mm');
        return kickofftime;
    };
    const [teamStore] = useState<TeamStore>(TeamStore.getInstance());

    const [homeTeam, setHomeTeam] = useState<Team>();
    const [awayTeam, setAwayTeam] = useState<Team>();

    useEffect(() => {
        let newHomeTeam = teamStore.getTeamByID(props.fixture?.home_team_id);
        if (newHomeTeam) {
            setHomeTeam(newHomeTeam);
        };
        let newAwayTeam = teamStore.getTeamByID(props.fixture?.away_team_id);
        if (newAwayTeam) {
            setAwayTeam(newAwayTeam);
        };
    }, [props.fixture, props.teams]);

    return (
        <Box className={classes.container}>
            <div className={classes.nameBadge} >
                <FixtureNameBadgeComponent displayName={homeTeam?.short_name} crest={homeTeam?.crest_url} home={true}></FixtureNameBadgeComponent>
            </div>
            <Box className={classes.fixtureTimeBox}>
                {formatKickoffTime(props.fixture?.ko_time)}
            </Box>
            <div className={classes.nameBadge} >
                <FixtureNameBadgeComponent displayName={awayTeam?.short_name} crest={awayTeam?.crest_url} home={false}></FixtureNameBadgeComponent>
            </div>
        </Box>
    );
}