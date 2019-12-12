import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from "axios";
import {ACCESS_TOKEN, API_BASE_URL} from "../../constants";

export const START_FETCHING_DOCTORS = "[DOCTORS] START_FETCHING_DOCTORS";
export const FINISH_FETCHING_DOCTORS = "[DOCTORS] FINISH_FETCHING_DOCTORS";
export const FAULT_FETCHING_DOCTORS = "[DOCTORS] FAULT_FETCHING_DOCTORS";

export const START_FETCHING_DOCTOR = "[DOCTORS] START_FETCHING_DOCTOR";
export const FINISH_FETCHING_DOCTOR = "[DOCTORS] FINISH_FETCHING_DOCTOR";
export const FAULT_FETCHING_DOCTOR = "[DOCTORS] FAULT_FETCHING_DOCTOR";

export const CREATE_DOCTOR = "[DOCTORS] CREATE_DOCTOR";

export const UPDATE_DOCTOR = "[DOCTORS] UPDATE_DOCTOR";
export const DELETE_DOCTOR = "[DOCTORS] DELETE_DOCTOR";

export const CAN_DELETE_DOCTOR = "[DOCTORS] CAN_DELETE_DOCTOR";

const getConfig = () => {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem(ACCESS_TOKEN),
        }
    }
};

export const Actions = {
    startFetchingDoctors: () => createAction(START_FETCHING_DOCTORS),
    finishFetchingDoctors: (payload: any) => createAction(FINISH_FETCHING_DOCTORS, payload),
};

export const Thunks = {
    getDoctors: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingDoctors());
            console.log('config', getConfig());
            const promise = axios.get(`${API_BASE_URL}/doctors/`, getConfig());
            promise.then( response => {
                    console.log('response', response);
                    dispatch(Actions.finishFetchingDoctors(response.data));
                }
            )
        };
    }

};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
