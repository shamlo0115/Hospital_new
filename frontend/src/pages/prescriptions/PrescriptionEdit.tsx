import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {Prescription} from '../../models/prescription/Prescription';
import {AppNavBar} from '../common/AppNavBar';
import {connect} from 'react-redux';
import {DispatchThunk} from '@store';
import {getChosenPrescription, getPrescriptions, isLoading, Thunks as prescriptionsThunks} from '@store/prescriptions';

interface Props {
    match: any;
    prescriptions: any;
    isLoading: boolean;
    onGetPrescription: any;
    onEditPrescription: any;
    onCreatePrescription: any;
    chosenPrescription: any;
}

interface State {
    prescription: Prescription;
}

class PrescriptionEditComponent extends React.Component<Props, State> {

    prescription;

    state = {
        prescription: {
            id: 0,
            volume: undefined,
            description: undefined,
        },
    };

    componentDidMount() {
        console.log('this props', this.props);
        if (this.props.match.params.id !== 'new') {
            this.props.onGetPrescription(this.props.match.params.id);
            console.log('got prescription', this.props);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.prescription;
        item[name] = value;
        this.setState({prescription: item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = this.state.prescription;
        if (item.id && item.id !== 0) {
            this.props.onEditPrescription(item);
        } else {
            this.props.onCreatePrescription(item);
        }
    }

    render() {
        if (this.props.prescriptions.isLoading) {
            return (<p>Loading</p>);
        }
        this.prescription = this.state.prescription.id || this.props.chosenPrescription ?
            this.props.chosenPrescription : this.state.prescription;
        const title = <h2>{this.prescription.id ? 'Edit Prescription' : 'Add Prescription'}</h2>;
        return (
            <div>
                <AppNavBar/>
                <Container>
                    {title}
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label for="volume">Volume</Label>
                            <Input
                                type="number"
                                name="volume"
                                id="volume"
                                value={this.prescription.volume || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="volume"
                            />
                            <Label for="description">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                id="description"
                                value={this.prescription.description || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="description"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/prescriptions">Cancel</Button>
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
        prescriptions: getPrescriptions(state),
        chosenPrescription: getChosenPrescription(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onCreatePrescription: (prescription) => {
        dispatch(prescriptionsThunks.createPrescription(prescription));
    },
    onEditPrescription: (prescription) => {
        dispatch(prescriptionsThunks.updatePrescription(prescription));
    },
    onGetPrescription: (id) => {
        dispatch(prescriptionsThunks.getPrescription(id));
    },
});

export const PrescriptionEdit = connect(mapStateToProps, mapDispatchToProps)(PrescriptionEditComponent);
