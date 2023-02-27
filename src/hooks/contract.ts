import { ChainId } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import Deployments from "../deployments.json";
import { useNetwork } from "wagmi";

type Deployment = { [key: string]: any[] }

const useSportsBettingContract = () => {
    const { chain } = useNetwork();
    const deployments: Deployment = Deployments;

    let chainIdString = ChainId.ArbitrumGoerli.toString();

    if (chain?.id !== undefined) {
        chainIdString = chain?.id.toString();
    }
    const { abi, address } = deployments[chainIdString][0].contracts.SportsBetting;
    const sportsBettingInterface = new utils.Interface(abi);
    return new Contract(address, sportsBettingInterface);
};

export { useSportsBettingContract };