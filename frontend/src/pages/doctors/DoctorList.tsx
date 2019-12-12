import React from "react";
import {AppNavBar} from "../common/AppNavBar";
import {Button, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DispatchThunk, RootState} from "@store";
import {getDoctors, isLoading, Thunks as doctorsThunks} from "@store/doctors";
import {connect} from 'react-redux';

interface Props {
    getDoctors: any;
    doctors: any;
    isLoading: boolean;
}

interface State {

}

class DoctorsListComponent extends React.Component<Props, State> {
    componentDidMount(): void {
        this.props.getDoctors();
    }


    render() {
        console.log('this.props', this.props.doctors);
        return (
            <div>
                <AppNavBar/>
                <Container fluid>
                    <div className="float-right">
                        <Button
                            color="success"
                            tag={Link}
                            to="/actors/new "
                        >
                            Add Doctor
                        </Button>
                    </div>
                    <h3>Doctors</h3>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-2"></div>
                        <div className="col-2"></div>
                        <div className="col-2"></div>
                        <div className="col-2"></div>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        isLoading: isLoading(state),
        doctors: getDoctors(state),
    };
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    getDoctors: () => {
        dispatch(doctorsThunks.getDoctors());
    }
});

export const DoctorsList = connect(mapStateToProps, mapDispatchToProps)(DoctorsListComponent);
