import { Fixture } from "../../types/Fixture";
import { FixtureComponent } from "../fixtureComponent/fixtureComponent";
export type FixtureListComponentProps = {
    fixtures: Fixture[] | undefined,
};

export const FixtureListComponent = (props: FixtureListComponentProps) => {
    return (
        <div>
            {props.fixtures && props.fixtures.map(fixture => <FixtureComponent fixture={fixture}></FixtureComponent>)}
        </div>
    )
}