import {createSelector} from 'reselect';
import {RootState} from '@store/state.types';

export const getAlertState = (state: RootState) => state.alert;

export const getAlert = createSelector(
    getAlertState,
    alertState => alertState.alert,
);
