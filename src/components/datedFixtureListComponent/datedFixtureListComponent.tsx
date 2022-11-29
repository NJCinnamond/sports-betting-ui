import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import FixtureService from "../../services/fixtureService";
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
        padding: "1em 0",
        fontWeight: "bold",
        fontSize: "1.3em",
    }
}));


export const DatedFixtureListComponent = (props: DatedFixtureListComponentProps) => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fixtureService = new FixtureService();

    // Redux stores
    const fixtures = useTypedSelector((state) => state.fixtures);
    const fixturesByDate = useTypedSelector((state) => state.fixturesByDate);

    const [filteredFixturesByDate, setFilteredFixturesByDate] = useState<{ [key: string]: Fixture[] }>();

    // Call oracle service to fetch fixtures and store in FixtureStore
    useEffect(() => {
        if (fixtures && Object.keys(fixtures).length && fixturesByDate && Object.keys(fixturesByDate).length) {
            setIsLoading(true);
            const newFixturesIDsByDate = fixtureService.getFixtureIDsInDateRange(fixturesByDate, props.startDate, props.endDate);
            const newFixturesByDate = fixtureService.getFixturesFromFixturesByDateState(fixtures, newFixturesIDsByDate);
            if (newFixturesIDsByDate) {
                setFilteredFixturesByDate(newFixturesByDate);
                setIsLoading(false);
            }
        }
    }, [fixtures, fixturesByDate, props.startDate, props.endDate]);

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