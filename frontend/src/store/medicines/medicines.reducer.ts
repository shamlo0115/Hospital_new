import * as medicinesActions from '@store/medicines/medicines.actions';
import {Medecine} from '../../models/medicine/Medicine';

export interface MedicinesState {
    medicines: Medecine[];
    newMedicine: any;
    chosenMedicine: any;
    isLoading: boolean;
    canDelete: boolean;
}

const initialState: MedicinesState = {
    medicines: [],
    newMedicine: {},
    chosenMedicine: {},
    isLoading: false,
    canDelete: false,
};

export const medicinesReducer = (
    state = initialState,
    action: medicinesActions.Actions
): MedicinesState => {
    switch (action.type) {
        case medicinesActions.START_FETCHING_MEDICINES:
            return {...state, isLoading: true};
        case medicinesActions.FINISH_FETCHING_MEDICINES:
            return {
                ...state,
                medicines: action.payload,
                isLoading: false,
            };
        case medicinesActions.START_FETCHING_MEDICINE:
            return {
                ...state,
                isLoading: true,
            };
        case medicinesActions.FINISH_FETCHING_MEDICINE:
            const medicine = action.payload;
            console.log('medicine', medicine);
            return {
                ...state,
                chosenMedicine: medicine,
                isLoading: false,
            };
        case medicinesActions.CREATE_MEDICINE:
            return {...state};
        case medicinesActions.UPDATE_MEDICINE:
            return {
                ...state,
                chosenMedicine: initialState.chosenMedicine,
                medicines: state.medicines.map(
                    medicine =>
                        medicine.id === action.payload.id ?
                            action.payload : medicine
                )
            };
        case medicinesActions.DELETE_MEDICINE:
            return {
                ...state,
                medicines: state.medicines.filter(
                    actor =>
                        actor.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
