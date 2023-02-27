import { useCall } from "@usedapp/core";
import { useAccount } from "wagmi";
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

    const { address } = useAccount();

    let addressParameter: string;
    if (address === undefined) {
        addressParameter = AddressZero;
    } else {
        addressParameter = address;
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