import React, {Component} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {HomePage} from '../home/Home';
import {LoginPage} from '../user/LoginPage';
import {RegisterPage} from '../user/RegisterPage';
import {getAlert} from '../../store/alerts/alerts.selectors';
import {Thunks as appThunks} from '../../store/alerts/alerts.actions';
import {AlertItem} from '../../models/alert/AlertItem';
import {PrivateRoute} from '../shared/PrivateRoute';
import {DispatchThunk, RootState} from '../../store/state.types';
import {history} from '../../store/history';

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
