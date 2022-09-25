import { BetType } from "./betType";
import { FixtureBettingState } from "./fixtureBettingState";

export type StakeSummary = { [key in BetType]: number };

export type FixtureEnrichment = {
    fixture_id: string,
    state: FixtureBettingState,
    user: StakeSummary,
    total: StakeSummary,
}