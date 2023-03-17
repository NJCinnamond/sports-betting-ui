import { useCall, useEthers } from "@usedapp/core";
import { FixtureEnrichment } from "../$types/fixtureEnrichment";
import { useTypedSelector } from "../redux/store";
import { useSportsBettingContract } from "./contract";

const { AddressZero } = require("@ethersproject/constants");

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

    let addressParameter: string;
    if (account === undefined) {
        addressParameter = AddressZero;
    } else {
        addressParameter = account;
    }
    const { value: enrichment, error } =
        useCall(
            sportsBetting && {
                contract: sportsBetting,
                method: "getEnrichedFixtureData",
                args: [fixtureId, addressParameter],
            }
        ) ?? {};
    if (error) {
        return { enrichment: {} as FixtureEnrichment }
    }
    return { enrichment };
}

export { useFixtureEnrichment, useFixtureBettingState }