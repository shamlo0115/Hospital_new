import {createSelector} from 'reselect';
import {RootState} from '../state.types';

export const getDoctorsState = (state: RootState) => state.doctors;

export const isLoading = createSelector(
    getDoctorsState,
    state => state.isLoading,
);

export const getDoctors = createSelector(
    getDoctorsState,
    state => state.doctors,
);


export const getChosenDoctor = createSelector(
    getDoctorsState,
    state => state.chosenDoctor,
);
