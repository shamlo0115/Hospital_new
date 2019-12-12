import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '../actions-helpers';
import axios from 'axios';
import {ACCESS_TOKEN, API_BASE_URL} from '../../constants';
import {Person} from '../../models/person/Person';

export const START_FETCHING_PERSONS = '[PERSONS] START_FETCHING_PERSONS';
export const FINISH_FETCHING_PERSONS = '[PERSONS] FINISH_FETCHING_PERSONS';
export const FAULT_FETCHING_PERSONS = '[PERSONS] FAULT_FETCHING_PERSONS';

export const START_FETCHING_PERSON = '[PERSONS] START_FETCHING_PERSON';
export const FINISH_FETCHING_PERSON = '[PERSONS] FINISH_FETCHING_PERSON';
export const FAULT_FETCHING_PERSON = '[PERSONS] FAULT_FETCHING_PERSON';

export const CREATE_PERSON = '[PERSONS] CREATE_PERSON';

export const UPDATE_PERSON = '[PERSONS] UPDATE_PERSON';
export const DELETE_PERSON = '[PERSONS] DELETE_PERSON';

export const CAN_DELETE_PERSON = '[PERSONS] CAN_DELETE_PERSON';

const getConfig = () => {
    return {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem(ACCESS_TOKEN),
        }
    };
};

export const Actions = {
    startFetchingPersons: () => createAction(START_FETCHING_PERSONS),
    startFetchingPerson: () => createAction(START_FETCHING_PERSON),
    createPerson: (person: Person) => createAction(CREATE_PERSON, person),
    finishFetchingPersons: (payload: any) => createAction(FINISH_FETCHING_PERSONS, payload),
    finishFetchingPerson: (payload: any) => createAction(FINISH_FETCHING_PERSON, payload),
    updatePerson: (person: Person) => createAction(UPDATE_PERSON, person),
    deletePerson: (id: number) => createAction(DELETE_PERSON, id),
};

export const Thunks = {
    getPersons: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingPersons());

            const promise = axios.get(`${API_BASE_URL}/persons/`, getConfig());
            promise.then(response => {
                    dispatch(Actions.finishFetchingPersons(response.data));
                }
            );
        };
    },
    getPerson: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.startFetchingPerson());
            const promise = axios.get(`${API_BASE_URL}/persons/${id}`, getConfig());
            promise.then(response => {
                    console.log('response person', response);
                    dispatch(Actions.finishFetchingPerson(response.data));
                }
            );
        };
    },
    createPerson: (person: Person) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.createPerson(person));
            axios.post(`${API_BASE_URL}/persons/`, person, getConfig());
        };
    },
    updatePerson: (person: Person) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.updatePerson(person));
            axios.post(`${API_BASE_URL}/persons/update`, person, getConfig());
        };
    },
    deletePerson: (id: number) => {
        return (dipatch: Dispatch) => {
            dipatch(Actions.deletePerson(id));
            axios.delete(`${API_BASE_URL}/persons/${id}`, getConfig());
        };
    }
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
