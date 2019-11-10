import {Dispatch} from 'redux';
import {ActionsUnion, createAction} from '@store/actions-helpers';
import {AlertItem} from "@models";

export const CLEAR = '[APP] CLEAR';
export const ERROR = '[APP] ERROR';
export const SUCCESS = '[APP] SUCCESS';

export const Actions = {
    clearAlerts: () => createAction(CLEAR),
    success: (response: AlertItem) => createAction(SUCCESS, response),
    error: (response: AlertItem) => createAction(ERROR, response),
};

export const Thunks = {
    clearAlerts: () => {
        return (dispatch: Dispatch) => {
            dispatch(Actions.clearAlerts());
        }
    },
    success: (message: string) => {
        return (dispatch: Dispatch) => {
            const response: AlertItem = {
                type: 'SUCCESS',
                message: message,
            };
            dispatch(Actions.success(response))
        }
    },
    error: (message: string) => {
        return (dispatch: Dispatch) => {
            const response: AlertItem = {
                type: 'ERROR',
                message: message,
            };
            dispatch(Actions.error(response))
        }
    }
};

export type Actions = ActionsUnion<typeof Actions>;
export type Thunks = ActionsUnion<typeof Thunks>;
