import { useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import Deployments from "../deployments.json";

const useSportsBettingContract = () => {
    const { chainId } = useEthers();

    // TODO: Use ChainID to get sportsbetting ctx address from deployments.json LIST
    const { abi, address } = Deployments.contracts.SportsBetting;

    const sportsBettingInterface = new utils.Interface(abi);
    return new Contract(address, sportsBettingInterface);
};

export { useSportsBettingContract };