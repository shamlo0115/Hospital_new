import {createSelector} from 'reselect';
import {RootState} from '../state.types';

export const getMedicinesState = (state: RootState) => state.medicines;

export const isLoading = createSelector(
    getMedicinesState,
    state => state.isLoading,
);

export const getMedicines = createSelector(
    getMedicinesState,
    state => state.medicines,
);


export const getChosenMedicine = createSelector(
    getMedicinesState,
    state => state.chosenMedicine,
);
