import React from 'react';
import {AppNavBar} from '../common/AppNavBar';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DispatchThunk, RootState} from '@store';
import {getDoctors, isLoading, Thunks as doctorsThunks} from '@store/doctors';
import {connect} from 'react-redux';

interface Props {
    getDoctors: any;
    doctors: any;
    isLoading: boolean;
    deleteDoctor: any
}

interface State {

}

class DoctorsListComponent extends React.Component<Props, State> {
    componentDidMount(): void {
        this.props.getDoctors();
    }

    render() {
        const doctorsList = this.props.doctors.map(doctor => {
            return (
                <tr key={doctor.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{doctor.fullName}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{doctor.career}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{doctor.experience}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{doctor.workingNumber}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{doctor.cellPhone}</td>
                    <td>
                        <ButtonGroup>
                            <Button
                                size="sm"
                                color="primary"
                                tag={Link}
                                to={'/doctors/' + doctor.id}
                            >
                                Edit
                            </Button>
                            <Button size="sm"
                                    color="danger"
                                    onClick={() => this.props.deleteDoctor(doctor.id)}
                            >
                                Delete
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <AppNavBar/>
                <Container fluid>
                    <div className="float-right">
                        <Button
                            color="success"
                            tag={Link}
                            to="/doctors/new "
                        >
                            Add Doctor
                        </Button>
                    </div>
                    <h3>Doctors</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Career</th>
                            <th>Experience</th>
                            <th>Working number</th>
                            <th>Cell phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {doctorsList}
                        </tbody>
                    </Table>
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
    },
    deleteDoctor: (id: number) => {
        dispatch(doctorsThunks.deleteDoctor(id))
    }
});

export const DoctorsList = connect(mapStateToProps, mapDispatchToProps)(DoctorsListComponent);
