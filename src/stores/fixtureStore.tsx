import { Fixture } from '../types/Fixture';

export default class FixtureStore {
    static myInstance: FixtureStore | null = null;
    static getInstance(): FixtureStore {
        if (FixtureStore.myInstance == null) {
            FixtureStore.myInstance = new FixtureStore();
        }
        return this.myInstance as FixtureStore;
    };

    fixturesByID: { [key: string]: Fixture } = {};

    addFixturesFromOracle = (data: any[]) => {
        data.forEach((fixture) => {
            // Parse API ko time into JS Date type
            fixture.ko_time = new Date(Date.parse(fixture.ko_time));

            const newFixture = fixture as Fixture;
            this.fixturesByID[newFixture.fixture_id] = newFixture;
        });
    };

    getFixtures = (): Fixture[] => {
        let fixtures: Fixture[] = [];
        for (const [key, value] of Object.entries(this.fixturesByID)) {
            fixtures.push(value);
        }
        return fixtures;
    }
}



