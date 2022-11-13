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

    let address: string;
    if (account === undefined) {
        address = AddressZero;
    } else {
        address = account;
    }
    const { value: enrichment, error } =
        useCall(
            sportsBetting && {
                contract: sportsBetting,
                method: "getEnrichedFixtureData",
                args: [fixtureId, address],
            }
        ) ?? {};
    if (error) {
        console.error(error.message)
        return { enrichment: {} as FixtureEnrichment }
    }
    return { enrichment }; // TODO: Does this typecasting work?
}

export { useFixtureEnrichment, useFixtureBettingState }