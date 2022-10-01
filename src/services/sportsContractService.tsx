import { FixtureEnrichment, StakeSummary } from "../$types/fixtureEnrichment";
import { store } from "../redux/store";
import { fixturesEnrichmentActions } from "../redux/reducers/fixturesEnrichment";
import { FixtureBettingState } from "../$types/fixtureBettingState";

// TODO: Parse enrichment payload 
// Currently response is in some array format with hex numbers
const handleEnrichmentAndDispatch = (fixtureID: string, response: any) => {
    if (response) {
        const enrichment = response[0];
        console.log("NEW ENRICHMENT FOR FIXTUE ", fixtureID, ": ", enrichment);
        const parsedEnrichment: FixtureEnrichment = {
            fixture_id: fixtureID,
            state: enrichment?.fixtureState as FixtureBettingState,
            user: {} as StakeSummary, // enrichment?.user as StakeSummary,
            total: {} as StakeSummary, //enrichment?.total as StakeSummary
        };
        store.dispatch(fixturesEnrichmentActions.new(parsedEnrichment));
    }
}

export { handleEnrichmentAndDispatch }