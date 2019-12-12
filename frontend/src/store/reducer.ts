import {combineReducers, Reducer} from 'redux';
import {RootState} from './state.types';
import {alertsReducer} from '@store/alerts';
import {authenticationReducer} from '@store/authentication';
import {registrationReducer} from '@store/registration';
import {doctorsReducer} from '@store/doctors';
import {medicinesReducer} from '@store/medicines';
import {personsReducer} from '@store/persons';
import {patientsReducer} from '@store/patients';
import {prescriptionsReducer} from '@store/prescriptions';

export const reducer: Reducer<RootState> = combineReducers<RootState>({
    alert: alertsReducer,
    auth: authenticationReducer,
    registration: registrationReducer,
    doctors: doctorsReducer,
    medicines: medicinesReducer,
    persons: personsReducer,
    patients: patientsReducer,
    prescriptions: prescriptionsReducer,
});
