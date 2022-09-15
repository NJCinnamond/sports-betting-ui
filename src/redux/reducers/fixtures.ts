import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Fixture } from "../../$types/fixture"

export type FixturesState = {
    [key: string]: Fixture
};

export type FixturesByDateState = {
    [key: string]: string[],
};

export const fixturesInitialState: FixturesState = {};
export const fixturesByDateInitialState: FixturesByDateState = {};

export const fixturesReducer = createSlice({
    name: 'fixtures',
    initialState: fixturesInitialState,
    reducers: {
        new(state, action: PayloadAction<Fixture>) {
            state[action.payload.fixture_id] = action.payload;
        },
    },
});

export const fixturesByDateReducer = createSlice({
    name: 'fixturesByDate',
    initialState: fixturesByDateInitialState,
    reducers: {
        new(state, action: PayloadAction<{ date: string, fixture_id: string }>) {
            if (state[action.payload.date]) {
                state[action.payload.date] = state[action.payload.date].concat(action.payload.fixture_id);
            } else {
                state[action.payload.date] = [action.payload.fixture_id];
            };
        },
    },
});

export const fixturesActions = fixturesReducer.actions;
export const fixturesByDateActions = fixturesByDateReducer.actions;