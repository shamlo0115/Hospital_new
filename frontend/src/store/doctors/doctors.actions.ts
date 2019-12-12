import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {Doctor} from '../../models/doctor/Doctor';

export const START_FETCHING_DOCTORS = '[DOCTORS] START_FETCHING_DOCTORS';
export const FINISH_FETCHING_DOCTORS = '[DOCTORS] FINISH_FETCHING_DOCTORS';
export const FAULT_FETCHING_DOCTORS = '[DOCTORS] FAULT_FETCHING_DOCTORS';

export const START_FETCHING_DOCTOR = '[DOCTORS] START_FETCHING_DOCTOR';
export const FINISH_FETCHING_DOCTOR = '[DOCTORS] FINISH_FETCHING_DOCTOR';
export const FAULT_FETCHING_DOCTOR = '[DOCTORS] FAULT_FETCHING_DOCTOR';

export const CREATE_DOCTOR = '[DOCTORS] CREATE_DOCTOR';

export const UPDATE_DOCTOR = '[DOCTORS] UPDATE_DOCTOR';
export const DELETE_DOCTOR = '[DOCTORS] DELETE_DOCTOR';

export const CAN_DELETE_DOCTOR = '[DOCTORS] CAN_DELETE_DOCTOR';

const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(ACCESS_TOKEN),
        }
    };
};

export const Actions = {
    startFetchingDoctors: () => createAction(START_FETCHING_DOCTORS),
    startFetchingDoctor: () => createAction(START_FETCHING_DOCTOR),
    createDoctor: (doctor: Doctor) => createAction(CREATE_DOCTOR, doctor),
    finishFetchingDoctors: (payload: any) => createAction(FINISH_FETCHING_DOCTORS, payload),
    finishFetchingDoctor: (payload: any) => createAction(FINISH_FETCHING_DOCTOR, payload),
    updateDoctor: (doctor: Doctor) => createAction(UPDATE_DOCTOR, doctor),
    deleteDoctor: (id: number) => createAction(DELETE_DOCTOR, id),
};

export const Thunks = {
    getDoctors: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingDoctors());

            const promise = axios.get(`${API_BASE_URL}/doctors/`, getConfig());
            promise.then(response => {
                    dispatch(Actions.finishFetchingDoctors(response.data));
                }
            );
        };
    },
    getDoctor: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingDoctor());
            const promise = axios.get(`${API_BASE_URL}/doctors/${id}`, getConfig());
            promise.then(response => {
                    console.log('response doctor', response);
                    dispatch(Actions.finishFetchingDoctor(response.data));
                }
            );
        };
    },
    createDoctor: (doctor: Doctor) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.createDoctor(doctor));
            axios.post(`${API_BASE_URL}/doctors/`, doctor, getConfig());
        };
    },
    updateDoctor: (doctor: Doctor) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.updateDoctor(doctor));
            axios.post(`${API_BASE_URL}/doctors/update`, doctor, getConfig());
        };
    },
    deleteDoctor: (id: number) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.deleteDoctor(id));
            axios.delete(`${API_BASE_URL}/doctors/${id}`, getConfig());
        };
    }
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
