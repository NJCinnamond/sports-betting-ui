import { useContractFunction } from "@usedapp/core";
import { BetType } from "../$types/betType";

export const useFixtureStake = () => {
    // TODO: Set up Contract interface for SportsBettingCtx

    const { state: fixtureStakeState, send: fixtureStakeSend } = useContractFunction(contract, 'stake', {
        transactionName: 'Stake', // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        gasLimitBufferPercentage: 10,
    });

    const stake = (fixtureID: string, betType: BetType, amount: string) => fixtureStakeSend(fixtureID, betType, { value: amount });

    return { fixtureStakeState, stake };
};

export const useFixtureUnstake = () => {
    // TODO: Set up Contract interface for SportsBettingCtx

    const { state: fixtureUnstakeState, send: fixtureUnstakeSend } = useContractFunction(contract, 'unstake', {
        transactionName: 'Unstake', // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        gasLimitBufferPercentage: 10,
    });

    const unstake = (fixtureID: string, betType: BetType, amount: string) => fixtureUnstakeSend(fixtureID, betType, amount);

    return { fixtureUnstakeState, unstake };
};
