import {ThunkDispatch} from 'redux-thunk';

import {Action} from 'redux';
import {AlertState} from './alerts/alerts.reducer';
import {AuthenticationState} from './authentication/authentication.reducer';
import {RegistrationState} from './registration/registration.reducer';
import {DoctorsState} from '@store/doctors';

export interface RootState {
    alert: AlertState;
    auth: AuthenticationState;
    registration: RegistrationState,
    doctors: DoctorsState
}

export type DispatchThunk = ThunkDispatch<RootState, void, Action>;
