import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchFixtures, fetchTeams } from "../../services/SportsOracleService";
import FixtureStore from "../../stores/fixtureStore";
import TeamStore from "../../stores/teamStore";
import { Fixture } from "../../types/Fixture";
import { Team } from "../../types/Team";
import { dateToUTCString } from "../../utils/dateUtils";
import { FixtureListComponent } from "../fixtureListComponent/fixtureListComponent";
import { LoadingSpinner } from "../loadingSpinner/loadingSpinner";

export interface DatedFixtureListComponentProps {
    startDate: Date,
    endDate: Date,
}

const useStyles = makeStyles((theme) => ({
    title: {
        textAlign: "center",
        padding: "1vh 0",
        fontWeight: "bold",
        fontSize: "1.1em",
    }
}));


export const DatedFixtureListComponent = (props: DatedFixtureListComponentProps) => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [fixtureStore] = useState<FixtureStore>(FixtureStore.getInstance());
    const [fixturesByDate, setFixturesByDate] = useState<{ [key: string]: Fixture[] }>();

    const [teamStore] = useState<TeamStore>(TeamStore.getInstance());
    const [teams, setTeams] = useState<Team[]>();

    // Call oracle service to fetch fixtures and store in FixtureStore
    useEffect(() => {
        setIsLoading(true);
        fetchFixtures().then(() => {
            setFixturesByDate(fixtureStore.getFixturesInDateRange(props.startDate, props.endDate));
        });
    }, [props.startDate, props.endDate]);

    useEffect(() => {
        setIsLoading(true);
        fetchTeams().then(() => {
            setTeams(teamStore.getTeams())
        });
    }, []);

    useEffect(() => {
        if (teams && fixturesByDate) {
            setIsLoading(false);
        }
    }, [teams, fixturesByDate])

    const formatDate = (date: string) => dateToUTCString(new Date(Date.parse(date)));

    return (
        <>
            {isLoading && (
                <LoadingSpinner></LoadingSpinner>
            )}
            {!isLoading && fixturesByDate && Object.entries(fixturesByDate)
                .map(([date, fixtures]) => (
                    <div key={date}>
                        <div className={classes.title}>{formatDate(date)}</div>
                        <FixtureListComponent fixtures={fixtures} teams={teams}></FixtureListComponent>
                    </div>
                ))
            }
        </>
    )
}