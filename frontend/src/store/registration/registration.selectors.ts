import {createSelector} from 'reselect';
import {RootState} from '@store/state.types';

export const getRegistrationState = (state: RootState) => state.registration;

export const getRegistering = createSelector(
    getRegistrationState,
    state => state.registering,
);
