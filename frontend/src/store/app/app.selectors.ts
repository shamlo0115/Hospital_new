import {createSelector} from 'reselect';
import {RootState} from '@store/state.types';

export const getApp = (state: RootState) => state.app;

export const getFetching = createSelector(
    getApp,
    appState => appState.fetching,
);

export const getItems = createSelector(
    getApp,
    appState => appState.items,
);
