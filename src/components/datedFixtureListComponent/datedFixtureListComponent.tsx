import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { fetchFixtures, fetchTeams } from "../../services/SportsOracleService";
import FixtureService from "../../services/fixtureService";
import TeamStore from "../../services/teamService";
import { Team } from "../../$types/team";
import { dateToUTCString } from "../../utils/dateUtils";
import { FixtureListComponent } from "../fixtureListComponent/fixtureListComponent";
import { LoadingSpinner } from "../loadingSpinner/loadingSpinner";
import { Fixture } from "../../$types/fixture";
import { useTypedSelector } from "../../redux/store";

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

    const fixtureService = new FixtureService();

    // Redux stores
    const fixtures = useTypedSelector((state) => state.fixtures);
    const fixturesByDate = useTypedSelector((state) => state.fixturesByDate);
    const teams = useTypedSelector((state) => state.teams);

    const [filteredFixturesByDate, setFilteredFixturesByDate] = useState<{ [key: string]: Fixture[] }>();

    // Call oracle service to fetch fixtures and store in FixtureStore
    useEffect(() => {
        if (fixtures && fixturesByDate) {
            setIsLoading(true);
            const newFixturesIDsByDate = fixtureService.getFixtureIDsInDateRange(fixturesByDate, props.startDate, props.endDate);
            const newFixturesByDate = fixtureService.getFixturesFromFixturesByDateState(fixtures, newFixturesIDsByDate)
            setFilteredFixturesByDate(newFixturesByDate);
        }
    }, [fixtures, fixturesByDate, props.startDate, props.endDate]);

    useEffect(() => {
        setIsLoading(true);
        fetchFixtures();
        fetchTeams();
    }, []);

    useEffect(() => {
        if (teams && filteredFixturesByDate) {
            setIsLoading(false);
        }
    }, [teams, filteredFixturesByDate]);

    const formatDate = (date: string) => dateToUTCString(new Date(Date.parse(date)));

    return (
        <>
            {isLoading && (
                <LoadingSpinner></LoadingSpinner>
            )}
            {!isLoading && filteredFixturesByDate && Object.entries(filteredFixturesByDate)
                .map(([date, fixtures]) => (
                    <div key={date}>
                        <div className={classes.title}>{formatDate(date)}</div>
                        <FixtureListComponent fixtures={fixtures}></FixtureListComponent>
                    </div>
                ))
            }
        </>
    )
}