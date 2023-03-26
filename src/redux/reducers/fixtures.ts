import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Fixture } from "../../$types/fixture"

export type FixturesState = {
    [key: string]: Fixture
};

export type GameweekState = {
    [key: number]: FixturesByDate,
};

export type FixturesByDate = { [key: string]: string[] };

export const fixturesInitialState: FixturesState = {};
export const gameweekInitialState: GameweekState = {};

export const fixturesReducer = createSlice({
    name: 'fixtures',
    initialState: fixturesInitialState,
    reducers: {
        new(state, action: PayloadAction<Fixture>) {
            state[action.payload.fixture_id] = action.payload;
        },
    },
});

export const gameweekReducer = createSlice({
    name: 'gameweek',
    initialState: gameweekInitialState,
    reducers: {
        new(state, action: PayloadAction<{ fixture: Fixture, date_str: string }>) {
            if (state[action.payload.fixture.gameweek] == undefined) {
                state[action.payload.fixture.gameweek] = {};
            }

            if (state[action.payload.fixture.gameweek][action.payload.date_str] == undefined) {
                state[action.payload.fixture.gameweek][action.payload.date_str] = [action.payload.fixture.fixture_id];
            } else {
                if (!state[action.payload.fixture.gameweek][action.payload.date_str].includes(action.payload.fixture.fixture_id)) { 
                    state[action.payload.fixture.gameweek][action.payload.date_str] = state[action.payload.fixture.gameweek][action.payload.date_str].concat(action.payload.fixture.fixture_id);
                }
            };
        },
    },
});

export const fixturesActions = fixturesReducer.actions;
export const gameweekActions = gameweekReducer.actions;