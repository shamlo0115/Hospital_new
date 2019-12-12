import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {Medecine} from '../../models/medicine/Medicine';
import {AppNavBar} from '../common/AppNavBar';
import {connect} from 'react-redux';
import {DispatchThunk} from '@store';
import {getChosenMedicine, getMedicines, isLoading, Thunks as medecinesThunks} from '@store/medicines';

interface Props {
    match: any;
    medecines: any;
    isLoading: boolean;
    onGetMedicine: any;
    onEditMedicine: any;
    onCreateMedicine: any;
    chosenMedicine: any;
}

interface State {
    medecine: Medecine;
}

class MedicineEditComponent extends React.Component<Props, State> {

    medecine;

    state = {
        medecine: {
            id: 0,
            name: undefined,
            rate: undefined,
            contr: undefined,
        },
    };

    componentDidMount() {
        console.log('this props', this.props);
        if (this.props.match.params.id !== 'new') {
            this.props.onGetMedicine(this.props.match.params.id);
            console.log('got medicine', this.props);
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.medecine;
        item[name] = value;
        this.setState({medecine: item});
    }

    handleSubmit(event) {
        event.preventDefault();
        const item = this.state.medecine;
        if (item.id && item.id !== 0) {
            this.props.onEditMedicine(item);
        } else {
            this.props.onCreateMedicine(item);
        }
    }

    render() {
        if (this.props.medecines.isLoading) {
            return (<p>Loading</p>);
        }
        this.medecine = this.state.medecine.id || this.props.chosenMedicine ?
            this.props.chosenMedicine : this.state.medecine;
        const title = <h2>{this.medecine.id ? 'Edit Medicine' : 'Add Medicine'}</h2>;
        return (
            <div>
                <AppNavBar/>
                <Container>
                    {title}
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={this.medecine.name || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="name"
                            />
                            <Label for="rate">Rate</Label>
                            <Input
                                type="text"
                                name="rate"
                                id="rate"
                                value={this.medecine.rate || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="rate"
                            />
                            <Label for="contr">Contraversy</Label>
                            <Input
                                type="text"
                                name="contr"
                                id="contr"
                                value={this.medecine.contr || ''}
                                onChange={
                                    (evt) => this.handleChange(evt)
                                }
                                autoComplete="contr"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" type="submit">Save</Button>{' '}
                            <Button color="secondary" tag={Link} to="/medecines">Cancel</Button>
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
        medecines: getMedicines(state),
        chosenMedicine: getChosenMedicine(state),
    };
};

const mapDispatchToProps = (dispatch: DispatchThunk) => ({
    onCreateMedicine: (medecine) => {
        dispatch(medecinesThunks.createMedicine(medecine));
    },
    onEditMedicine: (medecine) => {
        dispatch(medecinesThunks.updateMedicine(medecine));
    },
    onGetMedicine: (id) => {
        dispatch(medecinesThunks.getMedicine(id));
    },
});

export const MedicineEdit = connect(mapStateToProps, mapDispatchToProps)(MedicineEditComponent);
