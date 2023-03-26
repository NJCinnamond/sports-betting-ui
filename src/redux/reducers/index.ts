import { combineReducers } from '@reduxjs/toolkit';
import { fixturesReducer, gameweekReducer } from './fixtures';
import { fixturesEnrichmentReducer } from './fixturesEnrichment';
import { teamsReducer } from './teams';
import { transactionsReducer } from './transactions';
import { viewReducer } from './view';

export const rootReducer = combineReducers({
    [fixturesReducer.name]: fixturesReducer.reducer,
    [gameweekReducer.name]: gameweekReducer.reducer,
    [teamsReducer.name]: teamsReducer.reducer,
    [fixturesEnrichmentReducer.name]: fixturesEnrichmentReducer.reducer,
    [viewReducer.name]: viewReducer.reducer,
    [transactionsReducer.name]: transactionsReducer.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;