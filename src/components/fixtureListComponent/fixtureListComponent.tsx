import { useEffect, useState } from "react";
import { Fixture } from "../../$types/fixture";
import { useTypedSelector } from "../../redux/store";
import FixtureService from "../../services/fixtureService";
import { FixtureListItemComponent } from "../fixtureListItemComponent/fixtureListItemComponent";

export type FixtureListComponentProps = {
    fixtureIDs: string[],
}

export const FixtureListComponent = (props: FixtureListComponentProps) => {
    const fixtureService = new FixtureService();
    const fixtures = useTypedSelector((state) => state.fixtures);
    const filteredFixtures = fixtureService.getFixturesFromFixturesIDs(fixtures, props.fixtureIDs);
    const sortedFixtures = filteredFixtures.sort((a, b) => a.ko - b.ko);
    return (
        <div>
            {sortedFixtures && sortedFixtures.map(fixture => (
                <FixtureListItemComponent key={fixture.fixture_id} fixture={fixture}></FixtureListItemComponent>
            ))}
        </div>
    )
}