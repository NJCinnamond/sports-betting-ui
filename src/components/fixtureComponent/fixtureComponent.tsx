import moment from "moment";
import { Fixture } from "../../types/Fixture";

export interface FixtureComponentProps {
    fixture: Fixture,
};

export const FixtureComponent = (props: FixtureComponentProps) => {
    const formatKickoffTime = (ko: Date) => moment(ko).format('hh:mm');

    return (
        <li key={props.fixture.fixture_id}>
            <>
                {props.fixture.home_team_id} {formatKickoffTime(props.fixture.ko_time)} {props.fixture.away_team_id}
            </>
        </li>
    )
}