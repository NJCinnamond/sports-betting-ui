import { Fixture } from "../../types/Fixture";

export type FixtureComponentProps = {
    fixture: Fixture;
}

export const FixtureComponent = (props: FixtureComponentProps) => {
    return (
        <li>
            {props.fixture.home_team_id} vs {props.fixture.away_team_id} {props.fixture.ko_time}
        </li>
    )
}