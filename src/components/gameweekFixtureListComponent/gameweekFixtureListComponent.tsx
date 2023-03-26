import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import FixtureService from "../../services/fixtureService";
import { LoadingSpinner } from "../loadingSpinner/loadingSpinner";
import { useTypedSelector } from "../../redux/store";
import { FixturesByDate } from '../../redux/reducers/fixtures';
import { DatedFixtureListComponent } from '../datedFixtureListComponent/datedFixtureListComponent';
import { fetchFixturesForGameweek } from '../../services/sportsOracleService';
import { GameweekFixtureListHeaderComponent } from './gameweekFixtureListHeaderCompoent';

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
        marginLeft: "auto"
    }
}));

export const GameweekFixtureListComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fixtureService = new FixtureService();

    // Redux stores
    const fixtures = useTypedSelector((state) => state.fixtures);
    const fixturesByGameweek = useTypedSelector((state) => state.gameweek);

    const defaultGameweek = 29; // TODO: Source this from somewhere
    const [gameweek, setGameweek] = useState<number>(defaultGameweek);

    const [filteredFixturesByGameweek, setFilteredFixturesByGameweek] = useState<FixturesByDate>();

    // TODO: Create gameweek change component, calls setGameweek here which renders new fixture list

    // When gameweek view changes, fetch fixtures for that gameweek
    useEffect(() => {
        fetchFixturesForGameweek(gameweek);
    }, [gameweek]);

    // Call oracle service to fetch fixtures and store in FixtureStore
    useEffect(() => {
        if (fixtures && Object.keys(fixtures).length && fixturesByGameweek && Object.keys(fixturesByGameweek).length) {
            setIsLoading(true);
            const newFixturesIDsByGameweek = fixtureService.getFixtureIDsForGameweek(fixturesByGameweek, gameweek);
            if (newFixturesIDsByGameweek) {
                setFilteredFixturesByGameweek(newFixturesIDsByGameweek);
                setIsLoading(false);
            }
        }
    }, [fixtures, fixturesByGameweek, gameweek]);

    return (
        (<Root>
            <div className={classes.title}>
                <GameweekFixtureListHeaderComponent gameweek={gameweek} setGameweek={setGameweek}/>
            </div>
            
            {isLoading && (
                <LoadingSpinner></LoadingSpinner>
            )}
            {!isLoading && (
                <DatedFixtureListComponent fixturesByDate={filteredFixturesByGameweek}/>
            )}
        </Root>)
    );
}