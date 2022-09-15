import { combineReducers } from '@reduxjs/toolkit';
import { fixturesByDateReducer, fixturesReducer } from './fixtures';

export const rootReducer = combineReducers({
    [fixturesReducer.name]: fixturesReducer.reducer,
    [fixturesByDateReducer.name]: fixturesByDateReducer.reducer
});

export type RootState = ReturnType<typeof rootReducer>;