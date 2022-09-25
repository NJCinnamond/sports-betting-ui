import { useContractFunction } from "@usedapp/core";
import { BetType } from "../$types/betType";
import { useSportsBettingContract } from "../services/sportsContractService";

export const useFixtureStake = () => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureStakeState, send: fixtureStakeSend } = useContractFunction(sportsBetting, 'stake', {
        transactionName: 'Stake', // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        gasLimitBufferPercentage: 10,
    });

    const stake = (fixtureID: string, betType: BetType, amount: string) => fixtureStakeSend(fixtureID, betType, { value: amount });

    return { fixtureStakeState, stake };
};

export const useFixtureUnstake = () => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureUnstakeState, send: fixtureUnstakeSend } = useContractFunction(sportsBetting, 'unstake', {
        transactionName: 'Unstake', // TODO: MAKE THIS A TYPED OBJ SO NOTIFS CAN REFER TO IT?
        gasLimitBufferPercentage: 10,
    });

    const unstake = (fixtureID: string, betType: BetType, amount: string) => fixtureUnstakeSend(fixtureID, betType, amount);

    return { fixtureUnstakeState, unstake };
};
