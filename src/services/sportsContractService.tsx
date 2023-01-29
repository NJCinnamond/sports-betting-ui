import { FixtureEnrichment, StakeSummary, StakeSummaryPayload } from "../$types/fixtureEnrichment";
import { store } from "../redux/store";
import { fixturesEnrichmentActions } from "../redux/reducers/fixturesEnrichment";
import { FixtureBettingState } from "../$types/fixtureBettingState";
import { BetType } from "../$types/betType";

export interface UserLinkState {
    userLinkTransferred: any;
};

export interface UserPayout {
    amount: number;
}

export const parseBigNumber = (bigNumber: any) => parseInt(bigNumber._hex) / 10 ** 18;

// Currently response is in some array format with hex numbers
const handleEnrichmentAndDispatch = (fixtureID: string, response: any) => {
    if (response !== undefined && response.length) {
        const enrichment = response[0];
        const parsedEnrichment: FixtureEnrichment = {
            fixture_id: fixtureID,
            state: enrichment?.fixtureState as FixtureBettingState,
            user: parseStakeSummaryFromEnrichmentPayload(enrichment?.user), // enrichment?.user as StakeSummary,
            total: parseStakeSummaryFromEnrichmentPayload(enrichment?.total), //enrichment?.total as StakeSummary
        };
        store.dispatch(fixturesEnrichmentActions.new(parsedEnrichment));
    }
}

const parseStakeSummaryFromEnrichmentPayload = (stakes: StakeSummaryPayload) => {
    let stakeSummary = {} as StakeSummary;
    stakeSummary[BetType.HOME] = parseBigNumber(stakes[0]);
    stakeSummary[BetType.DRAW] = parseBigNumber(stakes[1]);
    stakeSummary[BetType.AWAY] = parseBigNumber(stakes[2]);
    return stakeSummary;
};

const handleUserLinkTransferred = (response: any) => {
    if (response) {
        const userLinkState: UserLinkState = {
            userLinkTransferred: parseBigNumber(response?.[0]),
        };
        return userLinkState;
    };
    return {} as UserLinkState;
};

const handleUserPayout = (response: any) => {
    if (response) {
        const userPayout: UserPayout = {
            amount: parseBigNumber(response?.[0]),
        };
        return userPayout;
    };
    return {} as UserPayout;
};

export { handleEnrichmentAndDispatch, handleUserLinkTransferred, handleUserPayout }