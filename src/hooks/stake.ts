import { ArbitrumGoerli, ERC20, Goerli, useCall, useContractFunction, useEthers } from "@usedapp/core";
import { BetType } from "../$types/betType";
import { useSportsBettingContract } from "../hooks/contract";
import { utils } from "ethers";
import { getStakingTransactionName } from "../services/notificationService";
import { useTypedSelector } from "../redux/store";
import { Contract } from "@ethersproject/contracts";
import { parseBigNumber } from "../services/sportsContractService";
import { FixtureResult } from "../$types/fixtureResult";

const { MaxUint256  } = require("@ethersproject/constants");

export const useDAIContract = () => {
    const { chainId } = useEthers();
    
    // TODO: Parametrize token address
    let tokenAddress;
    if (chainId == Goerli.chainId) {
        tokenAddress = "0x97cb342cf2f6ecf48c1285fb8668f5a4237bf862";
    } else {
        tokenAddress = '';
    }

    const erc20ABI = ERC20.abi;
    const erc20Interface = new utils.Interface(erc20ABI);
    return new Contract(tokenAddress, erc20Interface);
};

export const useDAIApproval = () => {
    const sportsBetting = useSportsBettingContract();
    const dai = useDAIContract();

    // approve
    const { send: approveSend, state: approveState } =
        useContractFunction(dai, "approve", {
            transactionName: "Approve DAI transfer",
        })
    const approve = () => {
        return approveSend(sportsBetting.address, MaxUint256)
    }

    return { approveState, approve };
}

export const useDAIAllowance = () => {
    const sportsBetting = useSportsBettingContract();
    const dai = useDAIContract();

    const { account } = useEthers();
    const { value, error } =
        useCall({
                contract: dai,
                method: 'allowance',
                args: [account, sportsBetting.address],
        }) ?? {};
    if (error) {
        return 0;
    }
    const daiAllowance = value != undefined ? parseBigNumber(value?.[0]) : 0;
    return daiAllowance;
}

export const useDAIBalance = () => {
    const dai = useDAIContract();
    const { account } = useEthers();
    const { value, error } =
        useCall({
                contract: dai,
                method: 'balanceOf',
                args: [account],
        }) ?? {};
    if (error) {
        return 0;
    }
    const daiBalance = value != undefined ? parseBigNumber(value?.[0]) : 0;
    return daiBalance;
}

export const useFixtureStake = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureStakeState, send: fixtureStakeSend } = useContractFunction(sportsBetting, 'stake', {
        transactionName: getStakingTransactionName(fixtureID),
        gasLimitBufferPercentage: 10,
    });

    const stake = (fixtureID: string, betType: BetType, amount: number) => {
        const amountInWei = utils.parseEther(amount.toString());
        fixtureStakeSend(fixtureID, betType, amountInWei);
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

export const useFixtureWithdrawPayout = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixturePayoutState, send: fixturePayoutSend } = useContractFunction(sportsBetting, 'withdrawPayout', {
        transactionName: getStakingTransactionName(fixtureID),
        gasLimitBufferPercentage: 10,
    });

    const withdrawPayout = (fixtureID: string) => {
        fixturePayoutSend(fixtureID);
    };

    return { fixturePayoutState, withdrawPayout };
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
        return {};
    }
    return { value };
};

export const useFixtureBettingEndTime = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();
    const fixtures = useTypedSelector((state) => state.fixtures);
    const { value, error } =
        useCall({
                contract: sportsBetting,
                method: 'BET_CUTOFF_TIME',
                args: [],
        }) ?? {};
    if (error) {
        return {};
    }
    const fixture = fixtures[fixtureID];
    if (fixture === undefined || fixture === null) {
        return {};
    }

    const difference = fixture.ko - value;
    const betEndTime = new Date(difference * 1000); // Multiplied by 1000 so arg is in ms
    return { betEndTime };
};

export const useFixtureOpeningAdvanceTime = () => {
    const sportsBetting = useSportsBettingContract();
    const { value, error } =
        useCall({
                contract: sportsBetting,
                method: 'BET_ADVANCE_TIME',
                args: [],
        }) ?? {};
    if (error) {
        return {};
    }
    const betAdvanceTime = new Date(value * 1000); // Multiplied by 1000 so arg is in ms
    return { betAdvanceTime };
};

export const useUserWasPaidForFixture = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();
    const { account } = useEthers();
    const { value, error } =
        useCall({
                contract: sportsBetting,
                method: 'userWasPaid',
                args: [fixtureID, account],
        }) ?? {};
    if (error) {
        return {};
    }
    const userWasPaid = value && value[0];
    return { userWasPaid };
}

export const useUserIsEligibleForFixturePayout = (fixtureID: string, result: FixtureResult) => {
    const { userWasPaid } = useUserWasPaidForFixture(fixtureID);
    // Get user stakes on fixture-result combo with enrichment
    const enrichment = useTypedSelector((state) => state.fixturesEnrichment[fixtureID]);
    const stake = enrichment.user[result as any as BetType]
    return !userWasPaid && stake > 0;
}

export const useUserIsEligibleForFixtureRefund = (fixtureID: string) => {
    const { userWasPaid } = useUserWasPaidForFixture(fixtureID);
    const enrichment = useTypedSelector((state) => state.fixturesEnrichment[fixtureID]);
    const hasStake = Object.values(enrichment.user).filter(x => x > 0).length;
    return !userWasPaid && hasStake;
}