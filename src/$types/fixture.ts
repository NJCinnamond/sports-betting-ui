import { FixtureResult } from "./fixtureResult";

export type Fixture = {
    fixture_id: string,
    home_team_id: number,
    away_team_id: number,
    gameweek: number,
    ko: number,
    result: FixtureResult,
    season: string,
    last_modified: string;
}