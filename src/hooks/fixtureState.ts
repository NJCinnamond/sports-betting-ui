import { useCall, useContractFunction, useEthers } from "@usedapp/core";
import { FixtureEnrichment } from "../$types/fixtureEnrichment";
import { useSportsBettingContract } from "../hooks/contract";
import { getOpeningFixtureTransactionName } from "../services/notificationService";

export const useFixtureOpen = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureOpenState, send: fixtureOpenSend } = useContractFunction(sportsBetting, 'openBetForFixture', {
        transactionName: getOpeningFixtureTransactionName(fixtureID), // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        bufferGasLimitPercentage: 10000
    });

    const openFixture = (fixtureID: string) => fixtureOpenSend(fixtureID, { gasLimit: 500000 }); // TODO: What should this manual gas limit be?

    return { fixtureOpenState, openFixture };
};

export const useFixtureFulfill = () => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureFulfillState, send: fixtureFulfillSend } = useContractFunction(sportsBetting, 'fulfillBetForFixture', {
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
