import React from 'react';
import {AppNavBar} from '../common/AppNavBar';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {DispatchThunk, RootState} from '@store';
import {getPersons, isLoading, Thunks as personsThunks} from '@store/persons';
import {connect} from 'react-redux';

interface Props {
    getPersons: any;
    persons: any;
    isLoading: boolean;
    deletePerson: any
}

interface State {

}

class PersonsListComponent extends React.Component<Props, State> {
    componentDidMount(): void {
        this.props.getPersons();
    }

    render() {
        const personsList = this.props.persons.map(person => {
            return (
                <tr key={person.id}>
                    <td style={{whiteSpace: 'nowrap'}}>{person.fullName}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{person.passportNumber}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{person.passportSeries}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{person.birthDate}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{person.healthInsuranceNumber}</td>
                    <td style={{whiteSpace: 'nowrap'}}>{person.cellPhone}</td>
                    <td>
                        <ButtonGroup>
                            <Button
                                size="sm"
                                color="primary"
                                tag={Link}
                                to={'/persons/' + person.id}
                            >
                                Edit
                            </Button>
                            <Button size="sm"
                                    color="danger"
                                    onClick={() => this.props.deletePerson(person.id)}
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
                            to="/persons/new "
                        >
                            Add Person
                        </Button>
                    </div>
                    <h3>Persons</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Passport Number</th>
                            <th>Passport Series</th>
                            <th>BirthDate</th>
                            <th>Health Insurance Number</th>
                            <th>Cell phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {personsList}
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
        persons: getPersons(state),
    };
};
const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    getPersons: () => {
        dispatch(personsThunks.getPersons());
    },
    deletePerson: (id: number) => {
        dispatch(personsThunks.deletePerson(id))
    }
});

export const PersonsList = connect(mapStateToProps, mapDispatchToProps)(PersonsListComponent);
