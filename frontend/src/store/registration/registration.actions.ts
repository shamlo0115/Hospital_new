import {ActionsUnion, createAction} from '@store/actions-helpers';
import {Dispatch} from "redux";
import {User} from "@models";
import {Actions as alertActions, Thunks as alertThunks} from '@store/alerts';
import {Thunks as authenticationThunks} from '@store/authentication';
import {history} from "@store";
import axios from 'axios';

export const REGISTRATION_REQUEST = '[REGISTRATION] REGISTER_REQUEST';
export const REGISTER_SUCCESS = '[REGISTRATION] USERS_REGISTER_SUCCESS';
export const REGISTER_FAILURE = '[REGISTRATION] USERS_REGISTER_FAILURE';

const hostname = window.location.hostname;

export const Actions = {
    registrationRequest: (user: User) => createAction(REGISTRATION_REQUEST, user),
    registrationSuccess: () => createAction(REGISTER_SUCCESS),
    registrationFailure: () => createAction(REGISTER_FAILURE),
};

export const Thunks = {
        register: (user: User) => {
            return (dispatch: Dispatch) => {
                dispatch(Actions.registrationRequest(user));
                const config = {
                    headers: {'Content-Type': 'application/json'},
                    data: JSON.stringify({user})
                };
                let promise = axios.post('http://' + hostname + ':8080/api/auth/signup', config);
                promise.then(Thunks.handleResponse)
                    .then(
                        user => {
                            dispatch(Actions.registrationSuccess());
                            history.push('/login');
                            alertThunks.success('Registration successful');
                        },
                        error => {
                            dispatch(Actions.registrationFailure());
                            alertThunks.error(error);
                        }
                    );
                dispatch(alertActions.clearAlerts());
            }
        },

        handleResponse: (response: any) => {
            return response.text().then(text => {
                const data = text && JSON.parse(text);
                if (!response.ok) {
                    if (response.status === 401) {
                        authenticationThunks.logout();
                        location.reload();
                    }
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }
                return data;
            });
        }
    }
;


export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
