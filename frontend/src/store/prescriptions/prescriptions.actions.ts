import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {Prescription} from '../../models/prescription/Prescription';

export const START_FETCHING_PRSCRIPTIONS = '[PRSCRIPTIONS] START_FETCHING_PRSCRIPTIONS';
export const FINISH_FETCHING_PRSCRIPTIONS = '[PRSCRIPTIONS] FINISH_FETCHING_PRSCRIPTIONS';
export const FAULT_FETCHING_PRSCRIPTIONS = '[PRSCRIPTIONS] FAULT_FETCHING_PRSCRIPTIONS';

export const START_FETCHING_PRSCRIPTION = '[PRSCRIPTIONS] START_FETCHING_PRSCRIPTION';
export const FINISH_FETCHING_PRSCRIPTION = '[PRSCRIPTIONS] FINISH_FETCHING_PRSCRIPTION';
export const FAULT_FETCHING_PRSCRIPTION = '[PRSCRIPTIONS] FAULT_FETCHING_PRSCRIPTION';

export const CREATE_PRSCRIPTION = '[PRSCRIPTIONS] CREATE_PRSCRIPTION';

export const UPDATE_PRSCRIPTION = '[PRSCRIPTIONS] UPDATE_PRSCRIPTION';
export const DELETE_PRSCRIPTION = '[PRSCRIPTIONS] DELETE_PRSCRIPTION';

export const CAN_DELETE_PRSCRIPTION = '[PRSCRIPTIONS] CAN_DELETE_PRSCRIPTION';

const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(ACCESS_TOKEN),
        }
    };
};

export const Actions = {
    startFetchingPrescriptions: () => createAction(START_FETCHING_PRSCRIPTIONS),
    startFetchingPrescription: () => createAction(START_FETCHING_PRSCRIPTION),
    createPrescription: (prescription: Prescription) => createAction(CREATE_PRSCRIPTION, prescription),
    finishFetchingPrescriptions: (payload: any) => createAction(FINISH_FETCHING_PRSCRIPTIONS, payload),
    finishFetchingPrescription: (payload: any) => createAction(FINISH_FETCHING_PRSCRIPTION, payload),
    updatePrescription: (prescription: Prescription) => createAction(UPDATE_PRSCRIPTION, prescription),
    deletePrescription: (id: number) => createAction(DELETE_PRSCRIPTION, id),
};

export const Thunks = {
    getPrescriptions: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingPrescriptions());

            const promise = axios.get(`${API_BASE_URL}/prescriptions/`, getConfig());
            promise.then(response => {
                    dispatch(Actions.finishFetchingPrescriptions(response.data));
                }
            );
        };
    },
    getPrescription: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingPrescription());
            const promise = axios.get(`${API_BASE_URL}/prescriptions/${id}`, getConfig());
            promise.then(response => {
                    console.log('response prescription', response);
                    dispatch(Actions.finishFetchingPrescription(response.data));
                }
            );
        };
    },
    createPrescription: (prescription: Prescription) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.createPrescription(prescription));
            axios.post(`${API_BASE_URL}/prescriptions/`, prescription, getConfig());
        };
    },
    updatePrescription: (prescription: Prescription) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.updatePrescription(prescription));
            axios.post(`${API_BASE_URL}/prescriptions/update`, prescription, getConfig());
        };
    },
    deletePrescription: (id: number) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.deletePrescription(id));
            axios.delete(`${API_BASE_URL}/prescriptions/${id}`, getConfig());
        };
    }
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
