import { useCall, useContractFunction } from "@usedapp/core";
import { FixtureEnrichment } from "../$types/fixtureEnrichment";
import { useSportsBettingContract } from "../services/sportsContractService";

export const useFixtureOpen = () => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureOpenState, send: fixtureOpenSend } = useContractFunction(sportsBetting, 'openBetForFixture', {
        transactionName: 'FixtureOpen', // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        gasLimitBufferPercentage: 10,
    });

    const openFixture = (fixtureID: string) => fixtureOpenSend(fixtureID);

    return { fixtureOpenState, openFixture };
};

export const useFixtureFulfill = () => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureFulfillState, send: fixtureFulfillSend } = useContractFunction(sportsBetting, 'openBetForFixture', {
        transactionName: 'FixtureFulfill', // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        gasLimitBufferPercentage: 10,
    });

    const fulfillFixture = (fixtureID: string) => fixtureFulfillSend(fixtureID);

    return { fixtureFulfillState, fulfillFixture };
};

export const useFixtureEnrichment = (
    fixtureId: string,
) => {
    const sportsBetting = useSportsBettingContract();
    const { value: enrichment, error } =
        useCall(
            sportsBetting && {
                contract: sportsBetting,
                method: "getEnrichedFixtureData",
                args: [fixtureId],
            }
        ) ?? {};
    if (error) {
        console.error(error.message)
        return { enrichment: {} as FixtureEnrichment }
    }
    return { enrichment }; // TODO: Does this typecasting work?
}
