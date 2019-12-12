import * as prescriptionsActions from '@store/prescriptions/prescriptions.actions';
import {Prescription} from '../../models/prescription/Prescription';

export interface PrescriptionsState {
    prescriptions: Prescription[];
    newPrescription: any;
    chosenPrescription: any;
    isLoading: boolean;
    canDelete: boolean;
}

const initialState: PrescriptionsState = {
    prescriptions: [],
    newPrescription: {},
    chosenPrescription: {},
    isLoading: false,
    canDelete: false,
};

export const prescriptionsReducer = (
    state = initialState,
    action: prescriptionsActions.Actions
): PrescriptionsState => {
    switch (action.type) {
        case prescriptionsActions.START_FETCHING_PRSCRIPTIONS:
            return {...state, isLoading: true};
        case prescriptionsActions.FINISH_FETCHING_PRSCRIPTIONS:
            return {
                ...state,
                prescriptions: action.payload,
                isLoading: false,
            };
        case prescriptionsActions.START_FETCHING_PRSCRIPTIONS:
            return {
                ...state,
                isLoading: true,
            };
        case prescriptionsActions.FINISH_FETCHING_PRSCRIPTIONS:
            const prescription = action.payload;
            console.log('prescription', prescription);
            return {
                ...state,
                chosenPrescription: prescription,
                isLoading: false,
            };
        case prescriptionsActions.CREATE_PRSCRIPTION:
            return {...state};
        case prescriptionsActions.UPDATE_PRSCRIPTION:
            return {
                ...state,
                chosenPrescription: initialState.chosenPrescription,
                prescriptions: state.prescriptions.map(
                    prescription =>
                        prescription.id === action.payload.id ?
                            action.payload : prescription
                )
            };
        case prescriptionsActions.DELETE_PRSCRIPTION:
            return {
                ...state,
                prescriptions: state.prescriptions.filter(
                    actor =>
                        actor.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
