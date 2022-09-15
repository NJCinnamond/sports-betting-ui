import { Box } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import moment from "moment";
import { Fixture } from "../../$types/fixture";
import TeamStore from "../../services/teamService";
import { useEffect, useState } from "react";
import { Team } from "../../$types/team";
import { FixtureNameBadgeComponent } from '../fixtureNameBadge/fixtureNameBadgeComponent';

export interface FixtureInfoComponentProps {
    fixture: Fixture | undefined,
    homeTeam: Team | undefined,
    awayTeam: Team | undefined,
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
                {formatKickoffTime(props.fixture?.ko_time)}
            </Box>
            <div className={classes.nameBadge} >
                <FixtureNameBadgeComponent displayName={props.awayTeam?.short_name} crest={props.awayTeam?.crest_url} home={false}></FixtureNameBadgeComponent>
            </div>
        </Box>
    );
}