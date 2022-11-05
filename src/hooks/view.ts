import { BetType } from "../$types/betType";
import { useTypedSelector } from "../redux/store";
import { setFixtureSelectedBetType } from "../services/viewService";

// useSelectedBetType hooks into UI view redux state to retrieve selected bet type for each fixture in order than it
// can persist as user cycles through fixtures
const useSelectedBetType = (fixtureID: string) => {
    // Redux store for fixture view state
    const fixtureViewStates = useTypedSelector((state) => state.view.fixtureViewStates);

    // Deduce selected bet type from redux store
    const selectedBetType = fixtureViewStates[fixtureID]?.selectedBetType ? fixtureViewStates[fixtureID]?.selectedBetType : BetType.HOME;

    const setSelectedBetType = (betType: BetType) => setFixtureSelectedBetType(fixtureID, betType);

    return { selectedBetType, setSelectedBetType };
}

// useFixtureTransacting hooks into UI view redux state to retrieve information about transactions on given fixture (opening, staking)
// based on user input
const useFixtureTransacting = (fixtureID: string) => {
    // Redux store for fixture view state
    const fixtureViewStates = useTypedSelector((state) => state.view.fixtureViewStates);

    // Deduce if fixture is transacting (opening, staking, etc)
    const isFixtureTransacting = 
        fixtureViewStates[fixtureID]?.staking === 'Mining' || 
        fixtureViewStates[fixtureID]?.opening === 'Mining' || 
        fixtureViewStates[fixtureID]?.fulfilling === 'Mining' || 
        fixtureViewStates[fixtureID]?.awaiting === 'Mining';

    return { isFixtureTransacting };
}

export { useSelectedBetType, useFixtureTransacting }