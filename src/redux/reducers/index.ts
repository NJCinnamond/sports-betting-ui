import { combineReducers } from '@reduxjs/toolkit';
import { fixturesByDateReducer, fixturesReducer } from './fixtures';
import { teamsReducer } from './teams';

export const rootReducer = combineReducers({
    [fixturesReducer.name]: fixturesReducer.reducer,
    [fixturesByDateReducer.name]: fixturesByDateReducer.reducer,
    [teamsReducer.name]: teamsReducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;