import { Arbitrum, ERC20, Goerli, useCall, useContractFunction, useEthers } from "@usedapp/core";
import { BetType } from "../$types/betType";
import { useSportsBettingContract } from "../hooks/contract";
import { utils } from "ethers";
import { getStakingTransactionName } from "../services/notificationService";
import { useTypedSelector } from "../redux/store";
import { Contract } from "@ethersproject/contracts";
import { parseSixDecimal } from "../services/sportsContractService";
import { FixtureResult } from "../$types/fixtureResult";

const { MaxUint256  } = require("@ethersproject/constants");

export const useUSDCContract = () => {
    const { chainId } = useEthers();
    
    // TODO: Parametrize token address
    let tokenAddress;
    if (chainId == Goerli.chainId) {
        tokenAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"; // USDC on Goerli
    } else if (chainId == Arbitrum.chainId) {
        tokenAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"; // USDC on Arbitrum
    } else {
        tokenAddress = '';
    }

    const erc20ABI = ERC20.abi;
    const erc20Interface = new utils.Interface(erc20ABI);
    return new Contract(tokenAddress, erc20Interface);
};

export const useUSDCApproval = () => {
    const sportsBetting = useSportsBettingContract();
    const usdc = useUSDCContract();

    // approve
    const { send: approveSend, state: approveState } =
        useContractFunction(usdc, "approve", {
            transactionName: "Approve USDC transfer",
        })
    const approve = () => {
        return approveSend(sportsBetting.address, MaxUint256)
    }

    return { approveState, approve };
}

export const useUSDCAllowance = () => {
    const sportsBetting = useSportsBettingContract();
    const usdc = useUSDCContract();

    const { account } = useEthers();
    const { value, error } =
        useCall({
                contract: usdc,
                method: 'allowance',
                args: [account, sportsBetting.address],
        }) ?? {};
    if (error) {
        return 0;
    }
    const allowance = value != undefined ? parseSixDecimal(value?.[0]) : 0;
    return allowance;
}

export const useUSDCBalance = () => {
    const usdc = useUSDCContract();
    const { account } = useEthers();
    const { value, error } =
        useCall({
                contract: usdc,
                method: 'balanceOf',
                args: [account],
        }) ?? {};
    if (error) {
        return 0;
    }
    const balance = value != undefined ? parseSixDecimal(value?.[0]) : 0;
    return balance;
}

export const useFixtureStake = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();

    const { state: fixtureStakeState, send: fixtureStakeSend } = useContractFunction(sportsBetting, 'stake', {
        transactionName: getStakingTransactionName(fixtureID),
        gasLimitBufferPercentage: 10,
    });

    const stake = (fixtureID: string, betType: BetType, amount: number) => {
        const amountInWei = utils.parseUnits(amount.toString(), 6);
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
        const amountInWei = utils.parseUnits(amount.toString(), 6);
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
    return Boolean(!userWasPaid && hasStake);
}