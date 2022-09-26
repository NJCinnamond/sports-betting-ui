import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Fixture } from "../../$types/fixture"

export type ViewState = {
    selected: Fixture | undefined
};

export const viewInitialState: ViewState = {
    selected: undefined,
};

export const viewReducer = createSlice({
    name: 'view',
    initialState: viewInitialState,
    reducers: {
        setSelected(state, action: PayloadAction<Fixture>) {
            state.selected = action.payload;
        },
    },
});

export const viewActions = viewReducer.actions;