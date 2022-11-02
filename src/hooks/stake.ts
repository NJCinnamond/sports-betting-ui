import { useCall, useContractFunction, useEthers } from "@usedapp/core";
import { BetType } from "../$types/betType";
import { useSportsBettingContract } from "../hooks/contract";
import { utils } from "ethers";
import { getStakingTransactionName } from "../services/notificationService";

export const useFixtureStake = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureStakeState, send: fixtureStakeSend } = useContractFunction(sportsBetting, 'stake', {
        transactionName: getStakingTransactionName(fixtureID),
        gasLimitBufferPercentage: 10,
    });

    const stake = (fixtureID: string, betType: BetType, amount: number) => {
        const amountInWei = utils.parseEther(amount.toString());
        fixtureStakeSend(fixtureID, betType, { value: amountInWei });
    };

    return { fixtureStakeState, stake };
};

export const useFixtureUnstake = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureUnstakeState, send: fixtureUnstakeSend } = useContractFunction(sportsBetting, 'unstake', {
        transactionName: getStakingTransactionName(fixtureID),
        gasLimitBufferPercentage: 10,
    });

    const unstake = (fixtureID: string, betType: BetType, amount: number) => {
        const amountInWei = utils.parseEther(amount.toString());
        fixtureUnstakeSend(fixtureID, betType, amountInWei);
    };

    return { fixtureUnstakeState, unstake };
};

export const useFixturePayout = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();
    const { account } = useEthers();
    const { value, error } =
        useCall(
            account && {
                contract: sportsBetting,
                method: 'payouts',
                args: [fixtureID, account],
            }
        ) ?? {};
    if (error) {
        console.error(error.message);
        return {};
    }
    return { value };
};
