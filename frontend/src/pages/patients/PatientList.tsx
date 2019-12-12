import React from 'react';
import {AppNavBar} from '../common/AppNavBar';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DispatchThunk, RootState} from '@store';
import {getPatients, isLoading, Thunks as patientsThunks} from '@store/patients';
import {connect} from 'react-redux';

interface Props {
    getPatients: any;
    patients: any;
    isLoading: boolean;
    deletePatient: any
}

interface State {

}

class PatientsListComponent extends React.Component<Props, State> {
    componentDidMount(): void {
        this.props.getPatients();
    }

    render() {
        const patientsList = this.props.patients.map(patient => {
            return (
                <tr key={patient.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{patient.hospitalizationDate}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{patient.illness}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{patient.healthState}</td>
                    <td>
                        <ButtonGroup>
                            <Button
                                size="sm"
                                color="primary"
                                tag={Link}
                                to={'/patients/' + patient.id}
                            >
                                Edit
                            </Button>
                            <Button size="sm"
                                    color="danger"
                                    onClick={() => this.props.deletePatient(patient.id)}
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
                            to="/patients/new "
                        >
                            Add Patient
                        </Button>
                    </div>
                    <h3>Patients</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Hospitalization Date</th>
                            <th>Illness</th>
                            <th>Health State</th>
                        </tr>
                        </thead>
                        <tbody>
                        {patientsList}
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
        patients: getPatients(state),
    };
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    getPatients: () => {
        dispatch(patientsThunks.getPatients());
    },
    deletePatient: (id: number) => {
        dispatch(patientsThunks.deletePatient(id))
    }
});

export const PatientsList = connect(mapStateToProps, mapDispatchToProps)(PatientsListComponent);
