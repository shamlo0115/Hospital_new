import {createSelector} from 'reselect';
import {RootState} from '../state.types';

export const getPersonsState = (state: RootState) => state.persons;

export const isLoading = createSelector(
    getPersonsState,
    state => state.isLoading,
);

export const getPersons = createSelector(
    getPersonsState,
    state => state.persons,
);


export const getChosenPerson = createSelector(
    getPersonsState,
    state => state.chosenPerson,
);
