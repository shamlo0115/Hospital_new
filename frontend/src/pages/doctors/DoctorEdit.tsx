import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {Doctor} from '../../models/doctor/Doctor';
import {AppNavBar} from '../common/AppNavBar';
import {connect} from 'react-redux';
import {DispatchThunk} from '@store';
import {getDoctors, isLoading, Thunks as doctorsThunks} from '@store/doctors';

interface Props {
    match: any;
    doctors: any;
    isLoading: boolean;
    onGetDoctor: any;
    onEditDoctor: any;
    onCreateDoctor: any;
}

interface State {
    doctor: Doctor;
}

class DoctorEditComponent extends React.Component<Props, State> {

    doctor;

    state = {
        doctor: {
            id: 0,
            fullName: undefined,
            experience: undefined,
            workingNumber: undefined,
            cellPhone: undefined,
        },
    };

    componentDidMount() {
        console.log('this props', this.props);
        if (this.props.match.params.id !== 'new') {
            this.props.onGetDoctor(this.props.match.params.id);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.doctor;
        item[name] = value;
        this.setState({doctor: item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = this.state.doctor;
        if (item.id && item.id !== 0) {
            this.props.onEditDoctor(item);
        } else {
            this.props.onCreateDoctor(item);
        }
    }

    render() {
        if (this.props.doctors.isLoading) {
            return (<p>Loading</p>);
        }
        this.doctor = this.state.doctor.id || this.props.doctors.chosenDoctor ?
            this.props.doctors.chosenDoctor : this.state.doctor;
        const title = <h2>{this.doctor.id ? 'Edit Doctor' : 'Add Doctor'}</h2>;
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
                                value={this.doctor.name || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="name"
                            />
                            <Label for="career">Career</Label>
                            <Input
                                type="number"
                                name="career"
                                id="career"
                                value={this.doctor.career || 0}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="career"
                            />
                            <Label for="workingNumber">Working number</Label>
                            <Input
                                type="text"
                                name="workingNumber"
                                id="workingNumber"
                                value={this.doctor.workingNumber || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="workingNumber"
                            />
                            <Label for="experience">Experience</Label>
                            <Input
                                type="number"
                                name="experience"
                                id="experience"
                                value={this.doctor.experience || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="experience"
                            />
                            <Label for="cellPhone">Cell Phone</Label>
                            <Input
                                type="number"
                                name="cellPhone"
                                id="cellPhone"
                                value={this.doctor.cellPhone || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="cellPhone"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/doctors">Cancel</Button>
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
        doctors: getDoctors(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onCreateDoctor: (doctor) => {
        dispatch(doctorsThunks.createDoctor(doctor));
    },
    onEditDoctor: (doctor) => {
        dispatch(doctorsThunks.updateDoctor(doctor));
    },
    onGetDoctor: (id) => {
        dispatch(doctorsThunks.getDoctor(id));
    },
});

export const DoctorEdit = connect(mapStateToProps, mapDispatchToProps)(DoctorEditComponent);
