import { ChainId, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import Deployments from "../deployments.json";

type Deployment = { [key: string]: any[] }

const useSportsBettingContract = () => {
    const { chainId } = useEthers();
    const deployments: Deployment = Deployments;

    let chainIdString;
    if (chainId !== undefined) {
        chainIdString = chainId.toString();
    } else {
        chainIdString = "5"; // TODO don't default to goerli
    }
    
    const { abi, address } = deployments[chainIdString][0].contracts.SportsBetting;

    const sportsBettingInterface = new utils.Interface(abi);
    return new Contract(address, sportsBettingInterface);
};

export { useSportsBettingContract };