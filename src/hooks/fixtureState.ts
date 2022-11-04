import { useContractFunction } from "@usedapp/core";
import { useSportsBettingContract } from "../hooks/contract";
import { getOpeningFixtureTransactionName, getFulfillingTransactionName, getAwaitingFixtureTransactionName } from "../services/notificationService";

export const useFixtureOpen = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureOpenState, send: fixtureOpenSend } = useContractFunction(sportsBetting, 'openBetForFixture', {
        transactionName: getOpeningFixtureTransactionName(fixtureID), // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        bufferGasLimitPercentage: 10000
    });

    const openFixture = (fixtureID: string) => fixtureOpenSend(fixtureID, { gasLimit: 500000 }); // TODO: What should this manual gas limit be?

    return { fixtureOpenState, openFixture };
};

export const useFixtureRequestKickoff = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureRequestKickoffState, send: fixtureRequestKickoffSend } = useContractFunction(sportsBetting, 'requestFixtureKickoffTime', {
        transactionName: 'requestKickoffTime', // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        bufferGasLimitPercentage: 10000
    });

    const requestFixtureKickoff = (fixtureID: string) => fixtureRequestKickoffSend(fixtureID, { gasLimit: 500000 }); // TODO: What should this manual gas limit be?

    return { fixtureRequestKickoffState, requestFixtureKickoff };
};

export const useFixtureAwaiting = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureAwaitState, send: fixtureAwaitSend } = useContractFunction(sportsBetting, 'awaitBetForFixture', {
        transactionName: getAwaitingFixtureTransactionName(fixtureID),
        bufferGasLimitPercentage: 10000
    });

    const awaitFixture = (fixtureID: string) => fixtureAwaitSend(fixtureID, { gasLimit: 500000 }); // TODO: What should this manual gas limit be?

    return { fixtureAwaitState, awaitFixture };
};

export const useFixtureFulfill = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureFulfillState, send: fixtureFulfillSend } = useContractFunction(sportsBetting, 'fulfillBetForFixture', {
        transactionName: getFulfillingTransactionName(fixtureID), // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        gasLimitBufferPercentage: 10,
    });

    const fulfillFixture = (fixtureID: string) => fixtureFulfillSend(fixtureID);

    return { fixtureFulfillState, fulfillFixture };
};
