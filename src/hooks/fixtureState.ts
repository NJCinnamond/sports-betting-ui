import { useContractFunction } from "@usedapp/core";

export const useFixtureOpen = (tokenAddress: string) => {
    // TODO: Set up Contract interface for SportsBettingCtx

    const { state: fixtureOpenState, send: fixtureOpenSend } = useContractFunction(contract, 'openBetForFixture', {
        transactionName: 'FixtureOpen', // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        gasLimitBufferPercentage: 10,
    });

    const openFixture = (fixtureID: string) => fixtureOpenSend(fixtureID);

    return { fixtureOpenState, openFixture };
};

export const useFixtureFulfill = (tokenAddress: string) => {
    // TODO: Set up Contract interface for SportsBettingCtx

    const { state: fixtureFulfillState, send: fixtureFulfillSend } = useContractFunction(contract, 'openBetForFixture', {
        transactionName: 'FixtureFulfill', // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        gasLimitBufferPercentage: 10,
    });

    const fulfillFixture = (fixtureID: string) => fixtureFulfillSend(fixtureID);

    return { fixtureFulfillState, fulfillFixture };
};
