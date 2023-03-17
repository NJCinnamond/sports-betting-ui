import { ChainId, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import Deployments from "../deployments.json";

type Deployment = { [key: string]: any[] }

const useSportsBettingContract = () => {
    const { chainId } = useEthers();
    const deployments: Deployment = Deployments;

    let chainIdString = ChainId.ArbitrumGoerli.toString();

    if (chainId !== undefined) {
        chainIdString = chainId.toString();
    }
    const { abi, address } = deployments[chainIdString][0].contracts.SportsBetting;
    const sportsBettingInterface = new utils.Interface(abi);
    return new Contract(address, sportsBettingInterface);
};

export { useSportsBettingContract };