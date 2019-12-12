import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {Person} from '../../models/person/Person';
import {AppNavBar} from '../common/AppNavBar';
import {connect} from 'react-redux';
import {DispatchThunk} from '@store';
import {getChosenPerson, getPersons, isLoading, Thunks as personsThunks} from '@store/persons';

interface Props {
    match: any;
    persons: any;
    isLoading: boolean;
    onGetPerson: any;
    onEditPerson: any;
    onCreatePerson: any;
    chosenPerson: any;
}

interface State {
    person: Person;
}

class PersonEditComponent extends React.Component<Props, State> {

    person;

    state = {
        person: {
            id: 0,
            fullName: undefined,
            passportNumber: undefined,
            passportSeries: undefined,
            birthDate: undefined,
            healthInsuranceNumber: undefined,
            cellPhone: undefined,
        },
    };

    componentDidMount() {
        console.log('this props', this.props);
        if (this.props.match.params.id !== 'new') {
            this.props.onGetPerson(this.props.match.params.id);
            console.log('got person', this.props);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.person;
        item[name] = value;
        this.setState({person: item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = this.state.person;
        if (item.id && item.id !== 0) {
            this.props.onEditPerson(item);
        } else {
            this.props.onCreatePerson(item);
        }
    }

    render() {
        if (this.props.persons.isLoading) {
            return (<p>Loading</p>);
        }
        this.person = this.state.person.id || this.props.chosenPerson ?
            this.props.chosenPerson : this.state.person;
        const title = <h2>{this.person.id ? 'Edit Person' : 'Add Person'}</h2>;
        return (
            <div>
                <AppNavBar/>
                <Container>
                    {title}
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label for="fullName">Full Name</Label>
                            <Input
                                type="text"
                                name="fullName"
                                id="fullName"
                                value={this.person.fullName || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="name"
                            />
                            <Label for="passportNumber">Passport Number</Label>
                            <Input
                                type="number"
                                name="passportNumber"
                                id="passportNumber"
                                value={this.person.passportNumber || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="passportNumber"
                            />
                            <Label for="passportSeries">Passport Series</Label>
                            <Input
                                type="number"
                                name="passportSeries"
                                id="passportSeries"
                                value={this.person.passportSeries || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="passportSeries"
                            />
                            <Label for="birthDate">BirthDate</Label>
                            <Input
                                type="text"
                                name="birthDate"
                                id="birthDate"
                                value={this.person.birthDate || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="birthDate"
                            />
                            <Label for="healthInsuranceNumber">Health Insurance Number</Label>
                            <Input
                                type="number"
                                name="healthInsuranceNumber"
                                id="healthInsuranceNumber"
                                value={this.person.healthInsuranceNumber || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="healthInsuranceNumber"
                            />
                            <Label for="cellPhone">Cell Phone</Label>
                            <Input
                                type="number"
                                name="cellPhone"
                                id="cellPhone"
                                value={this.person.cellPhone || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="cellPhone"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/persons">Cancel</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: isLoading(state),
        persons: getPersons(state),
        chosenPerson: getChosenPerson(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onCreatePerson: (person) => {
        dispatch(personsThunks.createPerson(person));
    },
    onEditPerson: (person) => {
        dispatch(personsThunks.updatePerson(person));
    },
    onGetPerson: (id) => {
        dispatch(personsThunks.getPerson(id));
    },
});

export const PersonEdit = connect(mapStateToProps, mapDispatchToProps)(PersonEditComponent);
