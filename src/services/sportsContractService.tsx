import { FixtureEnrichment, StakeSummary, StakeSummaryPayload } from "../$types/fixtureEnrichment";
import { store } from "../redux/store";
import { fixturesEnrichmentActions } from "../redux/reducers/fixturesEnrichment";
import { FixtureBettingState } from "../$types/fixtureBettingState";
import { BetType } from "../$types/betType";

// TODO: Parse enrichment payload 
// Currently response is in some array format with hex numbers
const handleEnrichmentAndDispatch = (fixtureID: string, response: any) => {
    if (response) {
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
    stakeSummary[BetType.HOME] = parseInt(stakes[BetType.HOME]._hex) / 10 ** 18; // TODO: Lib fn for this. Also do we wanna show in wei/gwei/eth?
    stakeSummary[BetType.DRAW] = parseInt(stakes[BetType.DRAW]._hex) / 10 ** 18;
    stakeSummary[BetType.AWAY] = parseInt(stakes[BetType.AWAY]._hex) / 10 ** 18;
    return stakeSummary;
};

export { handleEnrichmentAndDispatch }