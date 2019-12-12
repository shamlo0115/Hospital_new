import React from 'react';
import {AppNavBar} from '../common/AppNavBar';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DispatchThunk, RootState} from '@store';
import {getPrescriptions, isLoading, Thunks as prescriptionsThunks} from '@store/prescriptions';
import {connect} from 'react-redux';

interface Props {
    getPrescriptions: any;
    prescriptions: any;
    isLoading: boolean;
    deletePrescription: any
}

interface State {

}

class PrescriptionsListComponent extends React.Component<Props, State> {
    componentDidMount(): void {
        this.props.getPrescriptions();
    }

    render() {
        const prescriptionsList = this.props.prescriptions.map(prescription => {
            return (
                <tr key={prescription.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{prescription.volume}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{prescription.description}</td>
                    <td>
                        <ButtonGroup>
                            <Button
                                size="sm"
                                color="primary"
                                tag={Link}
                                to={'/prescriptions/' + prescription.id}
                            >
                                Edit
                            </Button>
                            <Button size="sm"
                                    color="danger"
                                    onClick={() => this.props.deletePrescription(prescription.id)}
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
                            to="/prescriptions/new "
                        >
                            Add Prescription
                        </Button>
                    </div>
                    <h3>Prescriptions</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Volume</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        {prescriptionsList}
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
        prescriptions: getPrescriptions(state),
    };
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    getPrescriptions: () => {
        dispatch(prescriptionsThunks.getPrescriptions());
    },
    deletePrescription: (id: number) => {
        dispatch(prescriptionsThunks.deletePrescription(id))
    }
});

export const PrescriptionsList = connect(mapStateToProps, mapDispatchToProps)(PrescriptionsListComponent);
