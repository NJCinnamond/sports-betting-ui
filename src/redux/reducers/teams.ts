import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Team } from "../../$types/team"

export type TeamsState = {
    [key: string]: Team
};

export const teamsInitialState: TeamsState = {};

export const teamsReducer = createSlice({
    name: 'teams',
    initialState: teamsInitialState,
    reducers: {
        new(state, action: PayloadAction<Team>) {
            state[action.payload.team_id] = action.payload;
        },
    },
});

export const teamsActions = teamsReducer.actions;