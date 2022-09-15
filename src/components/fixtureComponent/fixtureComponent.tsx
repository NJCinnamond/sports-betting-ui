import { useEffect, useState } from "react";
import { Fixture } from "../../$types/fixture";
import { Team } from "../../$types/team";
import { useTypedSelector } from "../../redux/store";
import { FixtureInfoComponent } from "../fixtureInfoComponent/fixtureInfoComponent";

export interface FixtureComponentProps {
    fixture: Fixture | undefined,
};

export const FixtureComponent = (props: FixtureComponentProps) => {

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