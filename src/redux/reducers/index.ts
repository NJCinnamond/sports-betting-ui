import { combineReducers } from '@reduxjs/toolkit';
import { fixturesByDateReducer, fixturesReducer } from './fixtures';
import { fixturesEnrichmentReducer } from './fixturesEnrichment';
import { teamsReducer } from './teams';

export const rootReducer = combineReducers({
    [fixturesReducer.name]: fixturesReducer.reducer,
    [fixturesByDateReducer.name]: fixturesByDateReducer.reducer,
    [teamsReducer.name]: teamsReducer.reducer,
    [fixturesEnrichmentReducer.name]: fixturesEnrichmentReducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;