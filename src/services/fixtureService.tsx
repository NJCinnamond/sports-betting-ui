import { Fixture } from '../$types/fixture';
import { store } from '../redux/store';
import { fixturesActions, fixturesByDateActions, FixturesByDateState, FixturesState } from '../redux/reducers/fixtures';

export default class FixtureService {

    addFixturesFromOracle = (data: any[]) => {
        data.forEach((fixture) => {
            // Extract day string
            let fixtureDate = this.formatDate(new Date(Date.parse(fixture.ko_time)));

            const newFixture = fixture as Fixture;

            store.dispatch(fixturesActions.new(newFixture));
            store.dispatch(fixturesByDateActions.new({ date: fixtureDate, fixture_id: newFixture.fixture_id }));
        });
    };

    getFixturesFromFixturesIDs = (fixturesByIDs: FixturesState, fixtureIDs: string[]) => fixtureIDs.map((id: string) => fixturesByIDs[id]);

    getFixturesFromFixturesByDateState = (fixturesByIDs: FixturesState, fixtureIDsByDate: FixturesByDateState) => {
        const fixturesByDate: { [key: string]: Fixture[] } = {};
        for (const [key, value] of Object.entries(fixtureIDsByDate)) {
            fixturesByDate[key] = this.getFixturesFromFixturesIDs(fixturesByIDs, value);
        };
        return fixturesByDate;
    }

    getFixtureIDsInDateRange = (fixturesByDate: FixturesByDateState, _startDate: Date, _endDate: Date) => {
        let startDate = new Date(_startDate);
        let endDate = new Date(_endDate);

        let fixturesInDateRange: FixturesByDateState = {};
        while (startDate < endDate) {
            let dateString = this.formatDate(startDate);
            if (Object.keys(fixturesByDate).includes(dateString)) {
                fixturesInDateRange[dateString] = fixturesByDate[dateString];
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



