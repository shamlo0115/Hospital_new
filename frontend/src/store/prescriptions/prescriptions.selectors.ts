import {createSelector} from 'reselect';
import {RootState} from '../state.types';

export const getPrescriptionsState = (state: RootState) => state.prescriptions;

export const isLoading = createSelector(
    getPrescriptionsState,
    state => state.isLoading,
);

export const getPrescriptions = createSelector(
    getPrescriptionsState,
    state => state.prescriptions,
);


export const getChosenPrescription = createSelector(
    getPrescriptionsState,
    state => state.chosenPrescription,
);
