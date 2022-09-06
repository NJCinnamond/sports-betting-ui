import { Fixture } from "../../types/Fixture";
import { Team } from "../../types/Team";
import { FixtureInfoComponent } from "../fixtureInfoComponent/fixtureInfoComponent";

export interface FixtureComponentProps {
    fixture: Fixture | undefined,
    teams: Team[] | undefined,
};

export const FixtureComponent = (props: FixtureComponentProps) => {


    return (
        <div key={props.fixture?.fixture_id}>
            <>
                <FixtureInfoComponent fixture={props.fixture} teams={props.teams}></FixtureInfoComponent>
            </>
        </div>
    )
}