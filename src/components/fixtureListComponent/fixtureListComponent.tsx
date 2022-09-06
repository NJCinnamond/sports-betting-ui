import { useEffect, useState } from "react";
import { Fixture } from "../../types/Fixture";
import { Team } from "../../types/Team";
import { FixtureComponent } from "../fixtureComponent/fixtureComponent";

export type FixtureListComponentProps = {
    fixtures: Fixture[] | undefined,
    teams: Team[] | undefined,
}

export const FixtureListComponent = (props: FixtureListComponentProps) => {
    const [sortedFixtures, setSortedFixture] = useState<Fixture[]>([]);

    useEffect(() => {
        if (props.fixtures) {
            setSortedFixture(props.fixtures.sort((a, b) => a.ko_time.getTime() - b.ko_time.getTime()));
        }
    }, [props.fixtures])

    return (
        <div>
            {sortedFixtures && sortedFixtures.map(fixture => <FixtureComponent key={fixture.fixture_id} fixture={fixture} teams={props.teams}></FixtureComponent>)}
        </div>
    )
}