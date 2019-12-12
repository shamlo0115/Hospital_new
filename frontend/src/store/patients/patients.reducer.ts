import * as patientsActions from '@store/patients/patients.actions';
import {Patient} from '../../models/patient/Patient';

export interface PatientsState {
    patients: Patient[];
    newPatient: any;
    chosenPatient: any;
    isLoading: boolean;
    canDelete: boolean;
}

const initialState: PatientsState = {
    patients: [],
    newPatient: {},
    chosenPatient: {},
    isLoading: false,
    canDelete: false,
};

export const patientsReducer = (
    state = initialState,
    action: patientsActions.Actions
): PatientsState => {
    switch (action.type) {
        case patientsActions.START_FETCHING_PATIENTS:
            return {...state, isLoading: true};
        case patientsActions.FINISH_FETCHING_PATIENTS:
            return {
                ...state,
                patients: action.payload,
                isLoading: false,
            };
        case patientsActions.START_FETCHING_PATIENT:
            return {
                ...state,
                isLoading: true,
            };
        case patientsActions.FINISH_FETCHING_PATIENT:
            const patient = action.payload;
            console.log('patient', patient);
            return {
                ...state,
                chosenPatient: patient,
                isLoading: false,
            };
        case patientsActions.CREATE_PATIENT:
            return {...state};
        case patientsActions.UPDATE_PATIENT:
            return {
                ...state,
                chosenPatient: initialState.chosenPatient,
                patients: state.patients.map(
                    patient =>
                        patient.id === action.payload.id ?
                            action.payload : patient
                )
            };
        case patientsActions.DELETE_PATIENT:
            return {
                ...state,
                patients: state.patients.filter(
                    actor =>
                        actor.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
