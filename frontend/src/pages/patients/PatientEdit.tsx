import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {Patient} from '../../models/patient/Patient';
import {AppNavBar} from '../common/AppNavBar';
import {connect} from 'react-redux';
import {DispatchThunk} from '@store';
import {getChosenPatient, getPatients, isLoading, Thunks as patientsThunks} from '@store/patients';

interface Props {
    match: any;
    patients: any;
    isLoading: boolean;
    onGetPatient: any;
    onEditPatient: any;
    onCreatePatient: any;
    chosenPatient: any;
}

interface State {
    patient: Patient;
}

class PatientEditComponent extends React.Component<Props, State> {

    patient;

    state = {
        patient: {
            id: 0,
            hospitalizationDate: undefined,
            illness: undefined,
            healthState: undefined,
        },
    };

    componentDidMount() {
        console.log('this props', this.props);
        if (this.props.match.params.id !== 'new') {
            this.props.onGetPatient(this.props.match.params.id);
            console.log('got patient', this.props);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.patient;
        item[name] = value;
        this.setState({patient: item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = this.state.patient;
        if (item.id && item.id !== 0) {
            this.props.onEditPatient(item);
        } else {
            this.props.onCreatePatient(item);
        }
    }

    render() {
        if (this.props.patients.isLoading) {
            return (<p>Loading</p>);
        }
        this.patient = this.state.patient.id || this.props.chosenPatient ?
            this.props.chosenPatient : this.state.patient;
        const title = <h2>{this.patient.id ? 'Edit Patient' : 'Add Patient'}</h2>;
        return (
            <div>
                <AppNavBar/>
                <Container>
                    {title}
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label for="hospitalizationDate">Hospitalization Date</Label>
                            <Input
                                type="text"
                                name="hospitalizationDate"
                                id="hospitalizationDate"
                                value={this.patient.hospitalizationDate || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="hospitalizationDate"
                            />
                            <Label for="illness">Illness</Label>
                            <Input
                                type="text"
                                name="illness"
                                id="illness"
                                value={this.patient.illness || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="illness"
                            />
                            <Label for="healthState">Health State</Label>
                            <Input
                                type="text"
                                name="healthState"
                                id="healthState"
                                value={this.patient.healthState || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="healthState"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/patients">Cancel</Button>
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
        patients: getPatients(state),
        chosenPatient: getChosenPatient(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onCreatePatient: (patient) => {
        dispatch(patientsThunks.createPatient(patient));
    },
    onEditPatient: (patient) => {
        dispatch(patientsThunks.updatePatient(patient));
    },
    onGetPatient: (id) => {
        dispatch(patientsThunks.getPatient(id));
    },
});

export const PatientEdit = connect(mapStateToProps, mapDispatchToProps)(PatientEditComponent);
