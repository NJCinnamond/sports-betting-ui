import { TransactionState } from "@usedapp/core";
import { BetType } from "../$types/betType";
import { Fixture } from "../$types/fixture";
import { SetSelectedBetTypePayload, SetTransactionStatePayload, viewActions } from "../redux/reducers/view"
import { store } from "../redux/store"

const setSelected = (fixture: Fixture) => store.dispatch(viewActions.setSelected(fixture));

const setFixtureSelectedBetType = (fixtureID: string, betType: BetType) => store.dispatch(viewActions.setSelectedBetType({ fixtureID, betType } as SetSelectedBetTypePayload));

const setOpeningTransactionState = (fixtureID: string, state: TransactionState) => store.dispatch(viewActions.setOpeningTransactionState({ fixtureID, transactionState: state } as SetTransactionStatePayload));

const setStakingTransactionState = (fixtureID: string, state: TransactionState) => store.dispatch(viewActions.setStakingTransactionState({ fixtureID, transactionState: state } as SetTransactionStatePayload));

const setFulfillingTransactionState = (fixtureID: string, state: TransactionState) => store.dispatch(viewActions.setFulfillingTransactionState({ fixtureID, transactionState: state } as SetTransactionStatePayload));

export { setSelected, setFixtureSelectedBetType, setOpeningTransactionState, setStakingTransactionState, setFulfillingTransactionState }