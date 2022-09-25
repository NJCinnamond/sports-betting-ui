import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FixtureEnrichment } from "../../$types/fixtureEnrichment";

export type FixturesEnrichmentState = {
    [key: string]: FixtureEnrichment
};

export const fixturesEnrichmentInitialState: FixturesEnrichmentState = {};

export const fixturesEnrichmentReducer = createSlice({
    name: 'fixturesEnrichment',
    initialState: fixturesEnrichmentInitialState,
    reducers: {
        new(state, action: PayloadAction<FixtureEnrichment>) {
            state[action.payload.fixture_id] = action.payload;
        },
    },
});

export const fixturesEnrichmentActions = fixturesEnrichmentReducer.actions;