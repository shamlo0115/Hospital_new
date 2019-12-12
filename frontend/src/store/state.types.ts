import {ThunkDispatch} from 'redux-thunk';

import {Action} from 'redux';
import {AlertState} from './alerts/alerts.reducer';
import {AuthenticationState} from './authentication/authentication.reducer';
import {RegistrationState} from './registration/registration.reducer';
import {DoctorsState} from '@store/doctors';
import {MedicinesState} from '@store/medicines';
import {PatientsState} from '@store/patients';
import {PersonsState} from '@store/persons';
import {PrescriptionsState} from '@store/prescriptions';

export interface RootState {
    alert: AlertState;
    auth: AuthenticationState;
    registration: RegistrationState,
    doctors: DoctorsState
    medicines: MedicinesState
    patients: PatientsState
    persons: PersonsState
    prescriptions: PrescriptionsState
}

export type DispatchThunk = ThunkDispatch<RootState, void, Action>;
