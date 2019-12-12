import React, {Component} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {getAlert, Thunks as appThunks} from '@store/alerts';

import {DispatchThunk, history, RootState} from '@store';
import {AlertItem} from '@models';
import {PrivateRoute} from '../shared';
import {HomePage} from '../home/Home';
import {LoginPage} from '../user/LoginPage';
import {RegisterPage} from '../user/RegisterPage';
import {DoctorsList} from '../doctors/DoctorList';
import {DoctorEdit} from '../doctors/DoctorEdit';
import {PersonsList} from '../persons/PersonList';
import {PersonEdit} from '../persons/PersonEdit';
import {MedicinesList} from '../medicines/MedicineList';
import {MedicineEdit} from '../medicines/MedicineEdit';
import {PatientsList} from '../patients/PatientList';
import {PatientEdit} from '../patients/PatientEdit';
import {PrescriptionsList} from '../prescriptions/PrescriptionList';
import {PrescriptionEdit} from '../prescriptions/PrescriptionEdit';

interface Props {
    alert?: AlertItem
    clearAlerts: any;
}

interface State {

}

class AppComponent extends Component<Props, State> {
    constructor(props) {
        super(props);

        history.listen(() => {
            this.props.clearAlerts();
        });
    }

    render() {
        const {alert} = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {
                            alert && alert.message &&
                            <div className={`alert ${alert.type}`}>
                                {alert.message}
                            </div>
                        }
                        <Router history={history}>
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage}/>
                                <PrivateRoute exact path="/doctors" component={DoctorsList}/>
                                <PrivateRoute path='/doctors/:id' component={DoctorEdit}/>
                                <PrivateRoute exact path="/persons" component={PersonsList}/>
                                <PrivateRoute path='/persons/:id' component={PersonEdit}/>
                                <PrivateRoute exact path="/medicines" component={MedicinesList}/>
                                <PrivateRoute path='/medicines/:id' component={MedicineEdit}/>
                                <PrivateRoute exact path="/patients" component={PatientsList}/>
                                <PrivateRoute path='/patients/:id' component={PatientEdit}/>
                                <PrivateRoute exact path="/prescriptions" component={PrescriptionsList}/>
                                <PrivateRoute path='/prescriptions/:id' component={PrescriptionEdit}/>
                                <Route path="/login" component={LoginPage}/>
                                <Route path="/register" component={RegisterPage}/>
                                <Redirect from="*" to="/"/>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    alert: getAlert(state)
});

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    clearAlerts: () => {
        dispatch(appThunks.clearAlerts());
    }
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
