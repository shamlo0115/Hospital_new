import {createSelector} from 'reselect';
import {RootState} from '../state.types';

export const getPatientsState = (state: RootState) => state.patients;

export const isLoading = createSelector(
    getPatientsState,
    state => state.isLoading,
);

export const getPatients = createSelector(
    getPatientsState,
    state => state.patients,
);


export const getChosenPatient = createSelector(
    getPatientsState,
    state => state.chosenPatient,
);
