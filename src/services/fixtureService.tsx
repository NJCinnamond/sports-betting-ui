import { Fixture } from '../$types/fixture';
import { store } from '../redux/store';
import { fixturesActions, FixturesState, gameweekActions, GameweekState } from '../redux/reducers/fixtures';

export default class FixtureService {

    addFixturesFromOracle = (data: any[]) => {
        data.forEach((fixture) => {
            // Extract day string
            let fixtureDate = this.formatDate(new Date(Date.parse(fixture.ko_time)));
            const newFixture = fixture as Fixture;
            store.dispatch(fixturesActions.new(newFixture));
            store.dispatch(gameweekActions.new({fixture: newFixture, date_str: fixtureDate}));
        });
    };

    getFixturesFromFixturesIDs = (fixturesByIDs: FixturesState, fixtureIDs: string[]) => fixtureIDs.map((id: string) => fixturesByIDs[id]);

    getFixtureIDsForGameweek = (gameweekState: GameweekState, gameweek: number) => gameweekState[gameweek];

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



