import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TransactionEntry = {
    name: string,
    hash: string,
}

export enum TransactionEntryType {
    NAME,
    HASH
};

export type TransactionMap = {
    [key: string]: string,
}

export type TransactionStore = {
    [key in TransactionEntryType]: TransactionMap;
};


// 0 = TransactionEntryType.NAME
// 1 = TransactionEntryType.HASH
export const transactionsInitialState: any = {
    0: {},
    1: {}
};

export const transactionsReducer = createSlice({
    name: 'transactions',
    initialState: transactionsInitialState,
    reducers: {
        new(state, action: PayloadAction<TransactionEntry>) {
            state[TransactionEntryType.NAME][action.payload.name] = action.payload.hash;
            state[TransactionEntryType.HASH][action.payload.hash] = action.payload.name;
        },
    },
});

export const transactionsActions = transactionsReducer.actions;