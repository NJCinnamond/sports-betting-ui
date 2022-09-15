import { useEffect, useState } from "react";
import { Fixture } from "../../$types/fixture";
import { Team } from "../../$types/team";
import { FixtureComponent } from "../fixtureComponent/fixtureComponent";
import Collapsible from 'react-collapsible';

export type FixtureListComponentProps = {
    fixtures: Fixture[] | undefined,
}

export const FixtureListComponent = (props: FixtureListComponentProps) => {
    const [sortedFixtures, setSortedFixture] = useState<Fixture[]>([]);

    useEffect(() => {
        if (props.fixtures) {
            setSortedFixture(props.fixtures.sort((a, b) => a.ko_time - b.ko_time));
        }
    }, [props.fixtures])

    return (
        <div>
            {sortedFixtures && sortedFixtures.map(fixture => (
                <Collapsible transitionTime={200} key={fixture.fixture_id} trigger={<FixtureComponent fixture={fixture}></FixtureComponent>}>
                    <p>
                        This is the collapsible content. It can be any element or React
                        component you like.
                    </p>
                    <p>
                        It can even be another Collapsible component. Check out the next
                        section!
                    </p>
                </Collapsible>

            ))}
        </div>
    )
}