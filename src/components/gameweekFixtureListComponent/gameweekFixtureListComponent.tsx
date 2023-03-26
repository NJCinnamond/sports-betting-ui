import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import FixtureService from "../../services/fixtureService";
import { dateToUTCString } from "../../utils/dateUtils";
import { FixtureListComponent } from "../fixtureListComponent/fixtureListComponent";
import { LoadingSpinner } from "../loadingSpinner/loadingSpinner";
import { Fixture } from "../../$types/fixture";
import { useTypedSelector } from "../../redux/store";
import { FixturesByDate } from '../../redux/reducers/fixtures';
import { DatedFixtureListComponent } from '../datedFixtureListComponent/datedFixtureListComponent';

const PREFIX = 'GameweekFixtureListComponent';

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
        paddingTop: "1em",
        fontWeight: "bold",
        fontSize: "1.15em",
    }
}));

export interface GameweekFixtureListComponentProps {
    gameweek: number;
}

export const GameweekFixtureListComponent = (props: GameweekFixtureListComponentProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fixtureService = new FixtureService();

    // Redux stores
    const fixtures = useTypedSelector((state) => state.fixtures);
    const fixturesByGameweek = useTypedSelector((state) => state.gameweek);

    const [filteredFixturesByGameweek, setFilteredFixturesByGameweek] = useState<FixturesByDate>();

    // Call oracle service to fetch fixtures and store in FixtureStore
    useEffect(() => {
        if (fixtures && Object.keys(fixtures).length && fixturesByGameweek && Object.keys(fixturesByGameweek).length) {
            setIsLoading(true);
            const newFixturesIDsByGameweek = fixtureService.getFixtureIDsForGameweek(fixturesByGameweek, props.gameweek);
            if (newFixturesIDsByGameweek) {
                setFilteredFixturesByGameweek(newFixturesIDsByGameweek);
                setIsLoading(false);
            }
        }
    }, [fixtures, fixturesByGameweek, props.gameweek]);

    return (
        (<Root>
            {isLoading && (
                <LoadingSpinner></LoadingSpinner>
            )}
            {!isLoading && (
                <>
                    <div className={classes.title}>Gameweek {props.gameweek}</div>
                    <DatedFixtureListComponent fixturesByDate={filteredFixturesByGameweek}/>
                </>
            )}
        </Root>)
    );
}