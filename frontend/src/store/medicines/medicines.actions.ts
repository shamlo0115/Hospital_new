import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {Medecine} from '../../models/medicine/Medicine';

export const START_FETCHING_MEDICINES = '[MEDICINES] START_FETCHING_MEDICINES';
export const FINISH_FETCHING_MEDICINES = '[MEDICINES] FINISH_FETCHING_MEDICINES';
export const FAULT_FETCHING_MEDICINES = '[MEDICINES] FAULT_FETCHING_MEDICINES';

export const START_FETCHING_MEDICINE = '[MEDICINES] START_FETCHING_MEDICINE';
export const FINISH_FETCHING_MEDICINE = '[MEDICINES] FINISH_FETCHING_MEDICINE';
export const FAULT_FETCHING_MEDICINE = '[MEDICINES] FAULT_FETCHING_MEDICINE';

export const CREATE_MEDICINE = '[MEDICINES] CREATE_MEDICINE';

export const UPDATE_MEDICINE = '[MEDICINES] UPDATE_MEDICINE';
export const DELETE_MEDICINE = '[MEDICINES] DELETE_MEDICINE';

export const CAN_DELETE_MEDICINE = '[MEDICINES] CAN_DELETE_MEDICINE';

const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(ACCESS_TOKEN),
        }
    };
};

export const Actions = {
    startFetchingMedicines: () => createAction(START_FETCHING_MEDICINES),
    startFetchingMedicine: () => createAction(START_FETCHING_MEDICINE),
    createMedicine: (medicine: Medecine) => createAction(CREATE_MEDICINE, medicine),
    finishFetchingMedicines: (payload: any) => createAction(FINISH_FETCHING_MEDICINES, payload),
    finishFetchingMedicine: (payload: any) => createAction(FINISH_FETCHING_MEDICINE, payload),
    updateMedicine: (medicine: Medecine) => createAction(UPDATE_MEDICINE, medicine),
    deleteMedicine: (id: number) => createAction(DELETE_MEDICINE, id),
};

export const Thunks = {
    getMedicines: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingMedicines());

            const promise = axios.get(`${API_BASE_URL}/medicines/`, getConfig());
            promise.then(response => {
                    dispatch(Actions.finishFetchingMedicines(response.data));
                }
            );
        };
    },
    getMedicine: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingMedicine());
            const promise = axios.get(`${API_BASE_URL}/medicines/${id}`, getConfig());
            promise.then(response => {
                    console.log('response medicine', response);
                    dispatch(Actions.finishFetchingMedicine(response.data));
                }
            );
        };
    },
    createMedicine: (medicine: Medecine) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.createMedicine(medicine));
            axios.post(`${API_BASE_URL}/medicines/`, medicine, getConfig());
        };
    },
    updateMedicine: (medicine: Medecine) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.updateMedicine(medicine));
            axios.post(`${API_BASE_URL}/medicines/update`, medicine, getConfig());
        };
    },
    deleteMedicine: (id: number) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.deleteMedicine(id));
            axios.delete(`${API_BASE_URL}/medicines/${id}`, getConfig());
        };
    }
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
