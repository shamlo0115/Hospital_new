import * as appActions from '@store/app/app.actions';

export interface AppState {
    fetching: boolean;
    items: any;
}

const initialState: AppState = {
    fetching: false,
    items: [],
};

export const appReducer = (
    state = initialState,
    action: appActions.Actions
): AppState => {
    switch (action.type) {
        case appActions.START_FETCHING_ITEMS:
            return {
                ...state,
                fetching: true,
            };
        case appActions.FINISH_FETCHING_ITEMS:
            return {
                ...state,
                fetching: false,
                items: action.payload,
            };
        default:
            return state;
    }
};
