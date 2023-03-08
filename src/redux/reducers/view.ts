import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BetType } from "../../$types/betType";
import { Fixture } from "../../$types/fixture";
import { TransactionState } from '@usedapp/core';

export type ViewState = {
    page: Page,
    selected: Fixture | undefined,
    fixtureViewStates: { [key: string]: FixtureViewState }
};

export enum Page {
    HOME,
    GETTING_STARTED,
    FIXTURES,
    LINK_FUND
}

// FixtureViewState maintains the UI state for each fixture
// We store transaction status for different contract interactions such as
// opening fixture or staking on fixture so the UI can enable/disable actions to
// give the most accurate view for each fixture when the user cycles back and forth
// through fixtures
export type FixtureViewState = {
    selectedBetType: BetType,
    staking: TransactionState,
    opening: TransactionState,
    awaiting: TransactionState,
    fulfilling: TransactionState
};

export type SetSelectedBetTypePayload = {
    fixtureID: string,
    betType: BetType,
};

export type SetTransactionStatePayload = {
    fixtureID: string,
    transactionState: TransactionState
}

export const viewInitialState: ViewState = {
    page: Page.HOME,
    selected: undefined,
    fixtureViewStates: {}
};

export const viewReducer = createSlice({
    name: 'view',
    initialState: viewInitialState,
    reducers: {
        setPage(state, action: PayloadAction<Page>) {
            state.page = action.payload;
        },
        setSelected(state, action: PayloadAction<Fixture>) {
            state.selected = action.payload;
        },
        setSelectedBetType(state, action: PayloadAction<SetSelectedBetTypePayload>) {
            state.fixtureViewStates[action.payload.fixtureID] = {
                ...state.fixtureViewStates[action.payload.fixtureID],
                selectedBetType: action.payload.betType,
            } as FixtureViewState;
        },
        setOpeningTransactionState(state, action: PayloadAction<SetTransactionStatePayload>) {
            state.fixtureViewStates[action.payload.fixtureID] = {
                ...state.fixtureViewStates[action.payload.fixtureID],
                opening: action.payload.transactionState,
            } as FixtureViewState;
        },
        setStakingTransactionState(state, action: PayloadAction<SetTransactionStatePayload>) {
            state.fixtureViewStates[action.payload.fixtureID] = {
                ...state.fixtureViewStates[action.payload.fixtureID],
                staking: action.payload.transactionState,
            } as FixtureViewState;
        },
        setAwaitingTransactionState(state, action: PayloadAction<SetTransactionStatePayload>) {
            state.fixtureViewStates[action.payload.fixtureID] = {
                ...state.fixtureViewStates[action.payload.fixtureID],
                awaiting: action.payload.transactionState,
            } as FixtureViewState;
        },
        setFulfillingTransactionState(state, action: PayloadAction<SetTransactionStatePayload>) {
            state.fixtureViewStates[action.payload.fixtureID] = {
                ...state.fixtureViewStates[action.payload.fixtureID],
                fulfilling: action.payload.transactionState,
            } as FixtureViewState;
        },
    },
});

export const viewActions = viewReducer.actions;