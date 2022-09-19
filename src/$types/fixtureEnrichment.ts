import { BetType } from "./betType";
import { FixtureBettingState } from "./fixtureBettingState";

export type FixtureEnrichment = {
    fixture_id: string,
    state: FixtureBettingState,
    userStakesWEI: { [key in BetType]: number },
}