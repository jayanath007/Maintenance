import * as Actions from '../actions/core.actions';
import { Department } from '../models/department';

export interface State {
    readonly departments: Department[];
    readonly clientDomains: string[];
    readonly selectedDomain: string;
}

const initialState: State = {
    departments: null,
    clientDomains: null,
    selectedDomain: '',
};

export function reducer(state = initialState, action: Actions.Any): State {
    switch (action.type) {
        case Actions.GET_DEPARTMENTS_SUCCESS: {
            return { ...state, departments: action.departments };
        }
        case Actions.GET_CLIENT_DOMAINS_SUCCESS: {
            return { ...state, clientDomains: action.domains };
        }
        case Actions.SET_INIT_DOMAIN: {
            return { ...state, selectedDomain: action.domain };
        }
        case Actions.CHANGE_SELECTED_DOMAIN: {
            return { ...state, selectedDomain: action.domain };
        }
        default: {
            return state;
        }
    }
}

export const getDepartments = (state: State) => state.departments;
export const getDomains = (state: State) => state.clientDomains;
export const getSelectedDomain = (state: State) => state.selectedDomain;
