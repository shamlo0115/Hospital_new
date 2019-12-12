import * as doctorsActions from "@store/doctors/doctors.actions";
import {START_FETCHING_DOCTORS} from "@store/doctors/doctors.actions";

export interface DoctorsState {
    doctors: [];
    newActor: {};
    chosenActor: {};
    isLoading: boolean;
    canDelete: boolean;
}

const initialState: DoctorsState = {
    doctors: [],
    newActor: {},
    chosenActor: {},
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
        default:
            return state;
    }
};
