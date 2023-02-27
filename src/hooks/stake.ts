import { ArbitrumGoerli, ERC20, Goerli, useCall, useContractFunction } from "@usedapp/core";
import { BetType } from "../$types/betType";
import { useSportsBettingContract } from "../hooks/contract";
import { utils } from "ethers";
import { getStakingTransactionName } from "../services/notificationService";
import { useTypedSelector } from "../redux/store";
import { Contract } from "@ethersproject/contracts";
import { parseBigNumber } from "../services/sportsContractService";
import { useAccount, useNetwork } from "wagmi";

const { MaxUint256  } = require("@ethersproject/constants");

export const useDAIContract = () => {
    const { chain } = useNetwork();
    
    // TODO: Parametrize token address
    let tokenAddress;
    if (chain?.id == Goerli.chainId) {
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

    const { address } = useAccount();
    const { value, error } =
        useCall({
                contract: dai,
                method: 'allowance',
                args: [address, sportsBetting.address],
        }) ?? {};
    if (error) {
        console.error(error.message);
        return 0;
    }
    const daiAllowance = value != undefined ? parseBigNumber(value?.[0]) : 0;
    return daiAllowance;
}

export const useDAIBalance = () => {
    const dai = useDAIContract();
    const { address } = useAccount();
    const { value, error } =
        useCall({
                contract: dai,
                method: 'balanceOf',
                args: [address],
        }) ?? {};
    if (error) {
        console.error(error.message);
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

export const useFixturePayout = (fixtureID: string) => {
    const sportsBetting = useSportsBettingContract();
    const { address } = useAccount();
    const { value, error } =
        useCall(
            address && {
                contract: sportsBetting,
                method: 'payouts',
                args: [fixtureID, address],
            }
        ) ?? {};
    if (error) {
        console.error(error.message);
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
        console.error(error.message);
        return {};
    }
    const fixture = fixtures[fixtureID];
    if (fixture === undefined || fixture === null) {
        return {};
    }

    const difference = fixture.ko - value;
    const betEndTime = new Date(difference * 1000); // Multiplied by 1000 so arg is in ms
    return { betEndTime };
}

export const useFixtureOpeningAdvanceTime = () => {
    const sportsBetting = useSportsBettingContract();
    const { value, error } =
        useCall({
                contract: sportsBetting,
                method: 'BET_ADVANCE_TIME',
                args: [],
        }) ?? {};
    if (error) {
        console.error(error.message);
        return {};
    }
    const betAdvanceTime = new Date(value * 1000); // Multiplied by 1000 so arg is in ms
    return { betAdvanceTime };
}
