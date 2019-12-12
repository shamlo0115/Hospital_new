import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {Patient} from '../../models/patient/Patient';

export const START_FETCHING_PATIENTS = '[PATIENTS] START_FETCHING_PATIENTS';
export const FINISH_FETCHING_PATIENTS = '[PATIENTS] FINISH_FETCHING_PATIENTS';
export const FAULT_FETCHING_PATIENTS = '[PATIENTS] FAULT_FETCHING_PATIENTS';

export const START_FETCHING_PATIENT = '[PATIENTS] START_FETCHING_PATIENT';
export const FINISH_FETCHING_PATIENT = '[PATIENTS] FINISH_FETCHING_PATIENT';
export const FAULT_FETCHING_PATIENT = '[PATIENTS] FAULT_FETCHING_PATIENT';

export const CREATE_PATIENT = '[PATIENTS] CREATE_PATIENT';

export const UPDATE_PATIENT = '[PATIENTS] UPDATE_PATIENT';
export const DELETE_PATIENT = '[PATIENTS] DELETE_PATIENT';

export const CAN_DELETE_PATIENT = '[PATIENTS] CAN_DELETE_PATIENT';

const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(ACCESS_TOKEN),
        }
    };
};

export const Actions = {
    startFetchingPatients: () => createAction(START_FETCHING_PATIENTS),
    startFetchingPatient: () => createAction(START_FETCHING_PATIENT),
    createPatient: (patient: Patient) => createAction(CREATE_PATIENT, patient),
    finishFetchingPatients: (payload: any) => createAction(FINISH_FETCHING_PATIENTS, payload),
    finishFetchingPatient: (payload: any) => createAction(FINISH_FETCHING_PATIENT, payload),
    updatePatient: (patient: Patient) => createAction(UPDATE_PATIENT, patient),
    deletePatient: (id: number) => createAction(DELETE_PATIENT, id),
};

export const Thunks = {
    getPatients: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingPatients());

            const promise = axios.get(`${API_BASE_URL}/patients/`, getConfig());
            promise.then(response => {
                    dispatch(Actions.finishFetchingPatients(response.data));
                }
            );
        };
    },
    getPatient: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingPatient());
            const promise = axios.get(`${API_BASE_URL}/patients/${id}`, getConfig());
            promise.then(response => {
                    console.log('response patient', response);
                    dispatch(Actions.finishFetchingPatient(response.data));
                }
            );
        };
    },
    createPatient: (patient: Patient) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.createPatient(patient));
            axios.post(`${API_BASE_URL}/patients/`, patient, getConfig());
        };
    },
    updatePatient: (patient: Patient) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.updatePatient(patient));
            axios.post(`${API_BASE_URL}/patients/update`, patient, getConfig());
        };
    },
    deletePatient: (id: number) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.deletePatient(id));
            axios.delete(`${API_BASE_URL}/patients/${id}`, getConfig());
        };
    }
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
