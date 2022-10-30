import { useCall, useEthers } from "@usedapp/core";
import { FixtureBettingState } from "../$types/fixtureBettingState";
import { FixtureEnrichment } from "../$types/fixtureEnrichment";
import { useTypedSelector } from "../redux/store";
import { useSportsBettingContract } from "./contract";

const useFixtureEnrichment = (fixtureID: string) => useTypedSelector((state) => state.fixturesEnrichment[fixtureID]);

const useFixtureBettingState = (fixtureID: string) => {
    const enrichment = useFixtureEnrichment(fixtureID);
    return enrichment.state;
}

export const useFixtureEnrichmentCall = (
    fixtureId: string,
) => {
    const sportsBetting = useSportsBettingContract();
    const { account } = useEthers();
    const { value: enrichment, error } =
        useCall(
            sportsBetting && {
                contract: sportsBetting,
                method: "getEnrichedFixtureData",
                args: [fixtureId, account],
            }
        ) ?? {};
    if (error) {
        console.error(error.message)
        return { enrichment: {} as FixtureEnrichment }
    }
    return { enrichment }; // TODO: Does this typecasting work?
}

export { useFixtureEnrichment, useFixtureBettingState }