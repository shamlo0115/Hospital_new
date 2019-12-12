import * as doctorsActions from '@store/doctors/doctors.actions';
import {Doctor} from '../../models/doctor/Doctor';

export interface DoctorsState {
    doctors: Doctor[];
    newDoctor: any;
    chosenDoctor: any;
    isLoading: boolean;
    canDelete: boolean;
}

const initialState: DoctorsState = {
    doctors: [],
    newDoctor: {},
    chosenDoctor: {},
    isLoading: false,
    canDelete: false,
};

export const doctorsReducer = (
    state = initialState,
    action: doctorsActions.Actions
): DoctorsState => {
    switch (action.type) {
        case doctorsActions.START_FETCHING_DOCTORS:
            return {...state, isLoading: true};
        case doctorsActions.FINISH_FETCHING_DOCTORS:
            return {
                ...state,
                doctors: action.payload,
                isLoading: false,
            };
        case doctorsActions.START_FETCHING_DOCTOR:
            return {
                ...state,
                isLoading: true,
            };
        case doctorsActions.FINISH_FETCHING_DOCTOR:
            const doctor = action.payload;
            console.log('doctor', doctor);
            return {
                ...state,
                chosenDoctor: doctor,
                isLoading: false,
            };
        case doctorsActions.CREATE_DOCTOR:
            return {...state};
        case doctorsActions.UPDATE_DOCTOR:
            return {
                ...state,
                chosenDoctor: initialState.chosenDoctor,
                doctors: state.doctors.map(
                    doctor =>
                        doctor.id === action.payload.id ?
                            action.payload : doctor
                )
            };
        case doctorsActions.DELETE_DOCTOR:
            return {
                ...state,
                doctors: state.doctors.filter(
                    actor =>
                        actor.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
