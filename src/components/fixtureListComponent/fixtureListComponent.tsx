import { Fixture } from "../../types/Fixture";
import { FixtureComponent } from "../fixtureComponent/fixtureComponent";
import FixtureStore from '../../stores/fixtureStore';
import { useState, useEffect } from "react";
import { fetchFixtures } from "../../services/SportsOracleService";

export const FixtureListComponent = () => {
    const [fixtures, setFixtures] = useState<Fixture[]>();
    const [fixtureStore] = useState<FixtureStore>(FixtureStore.getInstance());

    // Call oracle service to fetch fixtures and store in FixtureStore
    useEffect(() => {
        fetchFixtures().then(() => {
            setFixtures(fixtureStore.getFixtures());
        });
    }, []);

    return (
        <ul>
            {fixtures && fixtures.map(fixture => <FixtureComponent key={fixture.fixture_id} fixture={fixture}></FixtureComponent>)}
        </ul>
    )
}