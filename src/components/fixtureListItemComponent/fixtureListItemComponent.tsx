import { emphasize } from "@mui/material";
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { Fixture } from "../../$types/fixture";
import { Team } from "../../$types/team";
import { useFixtureEnrichmentCall } from "../../hooks/enrichment";
import { useTypedSelector } from "../../redux/store";
import { handleEnrichmentAndDispatch } from "../../services/sportsContractService";
import { setSelected } from "../../services/viewService";
import { FixtureInfoComponent } from "../fixtureInfoComponent/fixtureInfoComponent";
import { FixtureNotificationsComponent } from "../fixtureNotificationsComponent/fixtureNotificationsComponent";

const PREFIX = 'FixtureListItemComponent';

const classes = {
    container: `${PREFIX}-container`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
    {
        theme
    }
) => ({
    [`& .${classes.container}`]: {
        "&:hover, &:focus": {
            backgroundColor: emphasize("#ccccff", 0.01),
            transition: "0.5s",
            cursor: "pointer"
        },
    }
}));

export interface FixtureComponentProps {
    fixture: Fixture,
}

export const FixtureListItemComponent = (props: FixtureComponentProps) => {


    // Important: this hook ensures we have the latest enriched fixture data for each rendered fixture list item
    const { enrichment } = useFixtureEnrichmentCall(props.fixture.fixture_id);
    useEffect(() => {
        handleEnrichmentAndDispatch(props.fixture.fixture_id, enrichment);
    }, [enrichment]);

    // Redux store
    const teams = useTypedSelector((state) => state.teams);

    const [homeTeam, setHomeTeam] = useState<Team>();
    const [awayTeam, setAwayTeam] = useState<Team>();

    useEffect(() => {
        if (props.fixture?.home_team_id != null) {
            setHomeTeam(teams[props.fixture.home_team_id]);
        };
        if (props.fixture?.away_team_id != null) {
            setAwayTeam(teams[props.fixture.away_team_id]);
        };
    }, [props.fixture, teams]);

    // Handles clicking list item to set selected fixture
    const onClickHandler = () => {
        setSelected(props.fixture);
        window.scrollTo(0, 0);
    };

    return (
        (<Root>
            <div key={props.fixture?.fixture_id} onClick={() => onClickHandler()} className={classes.container}>
                {props.fixture && homeTeam && awayTeam && (
                    <FixtureInfoComponent fixture={props.fixture} homeTeam={homeTeam} awayTeam={awayTeam}></FixtureInfoComponent>
                )}
            </div>
        </Root>)
    );
}