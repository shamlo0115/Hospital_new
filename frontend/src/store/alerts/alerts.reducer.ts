import * as appActions from '@store/alerts/alerts.actions';
import {AlertItem} from "@models";

export interface AlertState {
    alert: AlertItem;
}

const initialState: AlertState = {
    alert: {type: '', message: undefined},
};

export const alertsReducer = (
    state = initialState,
    action: appActions.Actions
): AlertState => {
    switch (action.type) {
        case appActions.CLEAR:
            return {
                ...state,
                alert: {}
            };
        default:
            return state;
    }
};
