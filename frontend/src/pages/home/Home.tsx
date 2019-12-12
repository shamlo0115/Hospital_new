import React from 'react';
import {DispatchThunk, RootState} from "@store";
import {Thunks as authenticationThunks} from "@store/authentication";
import {connect} from 'react-redux';
import {AppNavBar} from "../common/AppNavBar";
import {Link} from 'react-router-dom';
import {Button, Container} from 'reactstrap';

interface Props {
    logout: any;
}

interface State {

}

class HomePageComponent extends React.Component<Props, State> {
    handleLogout = (e) => {
        e.preventDefault();
        this.props.logout();
    };


    render() {
        return (
            <div>
                <AppNavBar/>
                <Container fluid>
                    <Button
                        color="link"
                    >
                        <Link to="/doctors">
                            Manage doctors
                        </Link>
                    </Button>
                    <Button color="link">
                        <Link to="/patients">
                            Manage patients
                        </Link>
                    </Button>
                    <Button color="link">
                        <Link to="/people">
                            Manage people
                        </Link>
                    </Button>
                    <Button color="link">
                        <Link to="/prescriptions">
                            Manage prescriptions
                        </Link>
                    </Button>
                    <Button color="link">
                        <Link to="/medicines">
                            Manage medicines
                        </Link>
                    </Button>
                </Container>
                <Button
                    onClick={this.handleLogout}
                >
                    Logout
                </Button>
            </div>
        );
    }
}


const mapStateToProps = (state: RootState) => {
    return {};
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    logout: () => {
        dispatch(authenticationThunks.logout());
    }
});

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(HomePageComponent);

