import { BetType } from "../$types/betType";
import { useTypedSelector } from "../redux/store";

const useSelectedBetType = (fixtureID: string) => {
    // Redux store for fixture view state
    const fixtureViewStates = useTypedSelector((state) => state.view.fixtureViewStates);

    // Deduce selected bet type from redux store
    const selectedBetType = fixtureViewStates[fixtureID]?.selectedBetType ? fixtureViewStates[fixtureID]?.selectedBetType : BetType.HOME;

    return { selectedBetType };
}

export { useSelectedBetType }