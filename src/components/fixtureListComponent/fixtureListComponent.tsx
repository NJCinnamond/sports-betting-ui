import { useEffect, useState } from "react";
import { Fixture } from "../../$types/fixture";
import { FixtureListItemComponent } from "../fixtureListItemComponent/fixtureListItemComponent";

export type FixtureListComponentProps = {
    fixtures: Fixture[],
}

export const FixtureListComponent = (props: FixtureListComponentProps) => {
    const [sortedFixtures, setSortedFixture] = useState<Fixture[]>([]);

    useEffect(() => {
        if (props.fixtures) {
            setSortedFixture(props.fixtures.sort((a, b) => a.ko - b.ko));
        }
    }, [props.fixtures]);

    return (
        <div>
            {sortedFixtures && sortedFixtures.map(fixture => (
                <FixtureListItemComponent key={fixture.fixture_id} fixture={fixture}></FixtureListItemComponent>
            ))}
        </div>
    )
}