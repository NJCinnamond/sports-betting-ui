import { FixtureEnrichment, StakeSummary } from "../$types/fixtureEnrichment";
import { store } from "../redux/store";
import { fixturesEnrichmentActions } from "../redux/reducers/fixturesEnrichment";

// TODO: Parse enrichment payload 
// Currently response is in some array format with hex numbers
const handleEnrichmentAndDispatch = (fixtureID: string, response: any) => {
    if (response) {
        const enrichment = response[0];
        const parsedEnrichment: FixtureEnrichment = {
            fixture_id: fixtureID,
            state: response?.fixtureState,
            user: response?.user as StakeSummary,
            total: response?.total as StakeSummary
        };
        console.log("GOT ENRICHMENT: ", enrichment);
        store.dispatch(fixturesEnrichmentActions.new(parsedEnrichment));
    }
}

export { handleEnrichmentAndDispatch }