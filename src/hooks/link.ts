import { Arbitrum, Goerli, useCall, useContractFunction, useEthers } from "@usedapp/core";
import { useSportsBettingContract } from "./contract";
import ERC20 from "../LinkTokenInterface.json";
import { useEffect, useState } from "react";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import { handleUserLinkTransferred } from "../services/sportsContractService";

export const approveLinkTransactionName = "Approve LINK transfer";
export const transferLinkTransactionName = "Transfer LINK";

const useLinkContract = () => {
    const { chainId } = useEthers();

    // TODO: Parametrize token address
    let tokenAddress;
    if (chainId == Goerli.chainId) {
        tokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
    } else if (chainId == Arbitrum.chainId) {
        tokenAddress = "0xf97f4df75117a78c1a5a0dbb814af92458539fb4";
    } else {
        tokenAddress = '';
    }

    const erc20ABI = ERC20.abi;
    const erc20Interface = new utils.Interface(erc20ABI);
    return new Contract(tokenAddress, erc20Interface);
}

export const useLinkTransfer = () => {
    const sportsBetting = useSportsBettingContract();
    const linkToken = useLinkContract();

    // approve
    const { send: approveErc20Send, state: approveAndStakeErc20State } =
        useContractFunction(linkToken, "approve", {
            transactionName: approveLinkTransactionName,
        })
    const approveAndStake = (amount: string) => {
        setAmountToStake(amount)
        return approveErc20Send(sportsBetting.address, amount)
    }
    // stake
    const { send: stakeSend, state: stakeState } =
        useContractFunction(sportsBetting, "transferLink", {
            transactionName: transferLinkTransactionName,
        })
    const [amountToStake, setAmountToStake] = useState<string>('0');

    //useEffect
    useEffect(() => {
        if (approveAndStakeErc20State.status === "Success") {
            stakeSend(amountToStake)
        }
    }, [approveAndStakeErc20State, amountToStake]);


    const [state, setState] = useState(approveAndStakeErc20State)

    useEffect(() => {
        if (approveAndStakeErc20State.status === "Success") {
            setState(stakeState)
        } else {
            setState(approveAndStakeErc20State)
        }
    }, [approveAndStakeErc20State, stakeState])

    return { approveAndStake, state }
};

export const useLinkWithdraw = () => {
    const sportsBetting = useSportsBettingContract();

    const { state: linkWithdrawState, send: linkWithdrawSend } = useContractFunction(sportsBetting, 'withdrawLink', {
        transactionName: 'withdrawLink',
        gasLimitBufferPercentage: 10,
    });

    return { linkWithdrawSend, linkWithdrawState };
}

export const useLinkTransferred = (
) => {
    const sportsBetting = useSportsBettingContract();
    const { account } = useEthers();
    const { value: linkResponse, error } =
        useCall(
            sportsBetting && account && {
                contract: sportsBetting,
                method: 'userToLink',
                args: [account],
            }
        ) ?? {};
    if (error) {
        return {};
    }
    return { linkResponse };
};

export const useCanMakeOracleRequest = () => {
    const { linkResponse } = useLinkTransferred();
    const link = handleUserLinkTransferred(linkResponse);
    const canMakeOracleRequest = link.userLinkTransferred !== null && link.userLinkTransferred >= 0.1;
    return { canMakeOracleRequest }
}