import { useEffect, useState } from "react";
import { Fixture } from "../../$types/fixture";
import { Team } from "../../$types/team";
import { useFixtureEnrichment } from "../../hooks/fixtureState";
import { useTypedSelector } from "../../redux/store";
import { handleEnrichmentAndDispatch } from "../../services/sportsContractService";
import { FixtureInfoComponent } from "../fixtureInfoComponent/fixtureInfoComponent";

export interface FixtureComponentProps {
    fixture: Fixture,
};

export const FixtureListItemComponent = (props: FixtureComponentProps) => {

    // Important: this hook ensures we have the latest enriched fixture data for each rendered fixture list item
    const { enrichment } = useFixtureEnrichment(props.fixture.fixture_id);
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

    return (
        <div key={props.fixture?.fixture_id}>
            {props.fixture && homeTeam && awayTeam && <FixtureInfoComponent fixture={props.fixture} homeTeam={homeTeam} awayTeam={awayTeam}></FixtureInfoComponent>}
        </div>
    )
}