import { useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";
import SportsBetting from "../artifacts/contracts/SportsBetting.sol/SportsBetting.json";
import { FixtureEnrichment, StakeSummary } from "../$types/fixtureEnrichment";
import { store } from "../redux/store";
import { fixturesEnrichmentActions } from "../redux/reducers/fixturesEnrichment";

const useSportsBettingContract = () => {
    const { chainId } = useEthers();
    const { abi } = SportsBetting;

    // TODO: Use ChainID to get sportsbetting ctx address from some deployment map TBA
    // meanwhile use dummy addr (nathanc.eth)
    const dummyAddr = '0xe58b52d74fa00f94d61c6dcb73d79a8ea704a36a';

    const sportsBettingInterface = new utils.Interface(abi);
    return new Contract(dummyAddr, sportsBettingInterface);
};

const handleEnrichmentAndDispatch = (fixtureID: string, response: any) => {
    const enrichment: FixtureEnrichment = {
        fixture_id: fixtureID,
        state: response?.fixtureState,
        user: response?.user as StakeSummary,
        total: response?.total as StakeSummary
    };
    store.dispatch(fixturesEnrichmentActions.new(enrichment));
}

export { useSportsBettingContract, handleEnrichmentAndDispatch }