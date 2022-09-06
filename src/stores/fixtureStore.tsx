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
    fixturesByDate: { [key: string]: Fixture[] } = {};

    addFixturesFromOracle = (data: any[]) => {
        data.forEach((fixture) => {
            // Parse API ko time into JS Date type
            fixture.ko_time = new Date(Date.parse(fixture.ko_time));

            const newFixture = fixture as Fixture;

            this.fixturesByID[newFixture.fixture_id] = newFixture;

            // Extract day string
            let fixtureDate = this.formatDate(newFixture.ko_time);
            if (this.fixturesByDate[fixtureDate]) {
                if (!this.fixtureIDInArray(this.fixturesByDate[fixtureDate], newFixture.fixture_id)) {
                    this.fixturesByDate[fixtureDate].push(newFixture);
                }
            } else {
                this.fixturesByDate[fixtureDate] = [newFixture];
            };
        }
        )
    };

    fixtureIDInArray = (fixtureArr: Fixture[], fixtureID: string) => fixtureArr.some(function (element) { if (element.fixture_id == fixtureID) return true; });

    getFixtures = (): Fixture[] => {
        let fixtures: Fixture[] = [];
        for (const [key, value] of Object.entries(this.fixturesByID)) {
            fixtures.push(value);
        }
        return fixtures;
    }

    getFixturesInDateRange = (_startDate: Date, _endDate: Date) => {
        let startDate = new Date(_startDate);
        let endDate = new Date(_endDate);

        let fixturesInDateRange: { [key: string]: Fixture[] } = {};
        while (startDate < endDate) {
            let dateString = this.formatDate(startDate);
            if (Object.keys(this.fixturesByDate).includes(dateString)) {
                fixturesInDateRange[dateString] = this.fixturesByDate[dateString];
            };
            startDate = new Date(startDate.setDate(startDate.getDate() + 1));
        };
        return fixturesInDateRange;
    }

    formatDate = (date: Date): string => {
        // Get year, month, and day part from the date
        var year = date.toLocaleString("default", { year: "numeric" });
        var month = date.toLocaleString("default", { month: "2-digit" });
        var day = date.toLocaleString("default", { day: "2-digit" });

        // Generate yyyy-mm-dd date string
        var formattedDate = year + "-" + month + "-" + day;
        return formattedDate;
    }
}



