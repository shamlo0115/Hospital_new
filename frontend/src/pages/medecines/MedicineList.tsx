import React from 'react';
import {AppNavBar} from '../common/AppNavBar';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DispatchThunk, RootState} from '@store';
import {getMedicines, isLoading, Thunks as medicinesThunks} from '@store/medicines';
import {connect} from 'react-redux';

interface Props {
    getMedicines: any;
    medicines: any;
    isLoading: boolean;
    deleteMedicine: any
}

interface State {

}

class MedicinesListComponent extends React.Component<Props, State> {
    componentDidMount(): void {
        this.props.getMedicines();
    }

    render() {
        const medicinesList = this.props.medicines.map(medicine => {
            return (
                <tr key={medicine.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{medicine.name}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{medicine.rate}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{medicine.contr}</td>
                    <td>
                        <ButtonGroup>
                            <Button
                                size="sm"
                                color="primary"
                                tag={Link}
                                to={'/medicines/' + medicine.id}
                            >
                                Edit
                            </Button>
                            <Button size="sm"
                                    color="danger"
                                    onClick={() => this.props.deleteMedicine(medicine.id)}
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
                            to="/medicines/new "
                        >
                            Add Medicine
                        </Button>
                    </div>
                    <h3>Medicines</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rate</th>
                            <th>Contraversy</th>
                        </tr>
                        </thead>
                        <tbody>
                        {medicinesList}
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
        medicines: getMedicines(state),
    };
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    getMedicines: () => {
        dispatch(medicinesThunks.getMedicines());
    },
    deleteMedicine: (id: number) => {
        dispatch(medicinesThunks.deleteMedicine(id))
    }
});

export const MedicinesList = connect(mapStateToProps, mapDispatchToProps)(MedicinesListComponent);
