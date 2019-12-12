import {combineReducers, Reducer} from 'redux';
import {RootState} from './state.types';
import {alertsReducer} from './alerts/alerts.reducer';
import {authenticationReducer} from './authentication/authentication.reducer';
import {registrationReducer} from './registration/registration.reducer';

export const reducer: Reducer<RootState> = combineReducers<RootState>({
    alert: alertsReducer,
    auth: authenticationReducer,
    registration: registrationReducer,
});
