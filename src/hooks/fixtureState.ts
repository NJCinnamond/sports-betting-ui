import { useContractFunction } from "@usedapp/core";
import { useSportsBettingContract } from "../hooks/contract";
import { getOpeningFixtureTransactionName, getAwaitingFixtureTransactionName, getFulfillingTransactionName } from "../services/notificationService";

export const useFixtureOpen = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureOpenState, send: fixtureOpenSend } = useContractFunction(sportsBetting, 'openBetForFixture', {
        transactionName: getOpeningFixtureTransactionName(fixtureID),
        bufferGasLimitPercentage: 10000
    });

    const openFixture = (fixtureID: string) => fixtureOpenSend(fixtureID, { gasLimit: 500000 }); // TODO: What should this manual gas limit be?

    return { fixtureOpenState, openFixture };
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

export const useFixtureRequestKickoff = () => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureRequestKickoffState, send: fixtureRequestKickoffSend } = useContractFunction(sportsBetting, 'requestFixtureKickoffTime', {
        transactionName: 'requestKickoffTime', // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        bufferGasLimitPercentage: 6000000
    });

    const requestFixtureKickoff = (fixtureID: string) => fixtureRequestKickoffSend(fixtureID, { gasLimit: 500000 }); // TODO: What should this manual gas limit be?

    return { fixtureRequestKickoffState, requestFixtureKickoff };
};

export const useFixtureRequestResult = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureRequestResultState, send: fixtureRequestResultSend } = useContractFunction(sportsBetting, 'requestFixtureResult', {
        transactionName: getFulfillingTransactionName(fixtureID), // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        bufferGasLimitPercentage: 6000000
    });

    const requestFixtureResult = (fixtureID: string) => fixtureRequestResultSend(fixtureID, { gasLimit: 500000 }); // TODO: What should this manual gas limit be?

    return { fixtureRequestResultState, requestFixtureResult };
};
