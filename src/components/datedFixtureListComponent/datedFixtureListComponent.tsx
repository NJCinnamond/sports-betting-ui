import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import FixtureService from "../../services/fixtureService";
import { dateToUTCString } from "../../utils/dateUtils";
import { FixtureListComponent } from "../fixtureListComponent/fixtureListComponent";
import { LoadingSpinner } from "../loadingSpinner/loadingSpinner";
import { Fixture } from "../../$types/fixture";
import { useTypedSelector } from "../../redux/store";

const PREFIX = 'DatedFixtureListComponent';

const classes = {
    title: `${PREFIX}-title`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.title}`]: {
        textAlign: "center",
        padding: "1em 0",
        fontWeight: "bold",
        fontSize: "1.3em",
    }
}));

export interface DatedFixtureListComponentProps {
    startDate: Date,
    endDate: Date,
}


export const DatedFixtureListComponent = (props: DatedFixtureListComponentProps) => {
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
        (<Root>
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
        </Root>)
    );
}