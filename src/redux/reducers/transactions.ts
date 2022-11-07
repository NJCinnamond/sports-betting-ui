import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TransactionEntry = {
    name: string,
    hash: string,
}

export type TransactionStore = {
    [key: string]: string
}

export const transactionsInitialState: TransactionStore = {};

export const transactionsReducer = createSlice({
    name: 'transactions',
    initialState: transactionsInitialState,
    reducers: {
        new(state, action: PayloadAction<TransactionEntry>) {
            state[action.payload.hash] = action.payload.name;
        },
    },
});

export const transactionsActions = transactionsReducer.actions;