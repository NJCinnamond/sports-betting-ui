import { useEffect, useState } from "react";
import { Fixture } from "../../$types/fixture";
import { Team } from "../../$types/team";
import { FixtureListItemComponent } from "../fixtureListItemComponent/fixtureListItemComponent";
import Collapsible from 'react-collapsible';
import { StakePanelComponent } from "../stakePanelComponent/stakePanelComponent";

export type FixtureListComponentProps = {
    fixtures: Fixture[],
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
                <Collapsible transitionTime={200} key={fixture.fixture_id} trigger={<FixtureListItemComponent fixture={fixture}></FixtureListItemComponent>}>
                    <StakePanelComponent fixture={fixture} />
                </Collapsible>
            ))}
        </div>
    )
}