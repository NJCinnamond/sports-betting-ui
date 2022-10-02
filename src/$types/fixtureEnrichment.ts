import { BetType } from "./betType";
import { FixtureBettingState } from "./fixtureBettingState";

type StakeAmountPayload = {
    _hex: string,
    _isBigNumber: boolean
}

export type StakeSummaryPayload = StakeAmountPayload[];

export type StakeSummary = { [key in BetType]: number };

export type FixtureEnrichment = {
    fixture_id: string,
    state: FixtureBettingState,
    user: StakeSummary,
    total: StakeSummary,
}