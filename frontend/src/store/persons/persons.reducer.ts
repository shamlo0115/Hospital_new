import * as personsActions from '@store/persons/persons.actions';
import {Person} from '../../models/person/Person';

export interface PersonsState {
    persons: Person[];
    newPerson: any;
    chosenPerson: any;
    isLoading: boolean;
    canDelete: boolean;
}

const initialState: PersonsState = {
    persons: [],
    newPerson: {},
    chosenPerson: {},
    isLoading: false,
    canDelete: false,
};

export const personsReducer = (
    state = initialState,
    action: personsActions.Actions
): PersonsState => {
    switch (action.type) {
        case personsActions.START_FETCHING_PERSONS:
            return {...state, isLoading: true};
        case personsActions.FINISH_FETCHING_PERSONS:
            return {
                ...state,
                persons: action.payload,
                isLoading: false,
            };
        case personsActions.START_FETCHING_PERSON:
            return {
                ...state,
                isLoading: true,
            };
        case personsActions.FINISH_FETCHING_PERSON:
            const person = action.payload;
            console.log('person', person);
            return {
                ...state,
                chosenPerson: person,
                isLoading: false,
            };
        case personsActions.CREATE_PERSON:
            return {...state};
        case personsActions.UPDATE_PERSON:
            return {
                ...state,
                chosenPerson: initialState.chosenPerson,
                persons: state.persons.map(
                    person =>
                        person.id === action.payload.id ?
                            action.payload : person
                )
            };
        case personsActions.DELETE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(
                    actor =>
                        actor.id !== action.payload
                ),
            };
        default:
            return state;
    }
};
