import {combineReducers, Reducer} from 'redux';
import {RootState} from './state.types';
import {alertsReducer} from '@store/alerts';
import {authenticationReducer} from '@store/authentication';
import {registrationReducer} from '@store/registration';
import {doctorsReducer} from '@store/doctors';

export const reducer: Reducer<RootState> = combineReducers<RootState>({
    alert: alertsReducer,
    auth: authenticationReducer,
    registration: registrationReducer,
    doctors: doctorsReducer,
});
