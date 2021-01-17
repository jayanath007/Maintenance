import { TicketBase } from '../models/ticket';
import * as Actions from '../actions/ticket-view.actions';
import { TicketAction } from '../models/ticket-action';
import { SELECT_TICKET, SelectTicket } from '../actions/ticket-list.actions';

export interface State {
    readonly actions: TicketAction[];
    readonly ticket: TicketBase;
    readonly actionsLoading: boolean;
}
const initialstate: Readonly<State> = Object.freeze<State>({
    actions: null,
    ticket: null,
    actionsLoading: true,
});

export function reducer(state: Readonly<State> = initialstate, action: Actions.Any | SelectTicket): Readonly<State> {
    switch (action.type) {
        case SELECT_TICKET:
            return {
                ...state,
                ticket: action.ticket
            };
        case Actions.GET_ACTIONS:
            return { ...state, actionsLoading: true, actions: [] };
        case Actions.GET_ACTIONS_SUCCESS:
            return getActionsSuccess(state, action.actions, action.id);
        case Actions.GET_ACTIONS_FAIL:
            return getActionsFail(state, action.id);
        default: {
            return state;
        }
    }
}

function getActionsSuccess(state: State, actions: TicketAction[], id: number): State {
    if (state.ticket && state.ticket.id === id) {
        return { ...state, actionsLoading: false, actions };
    }
    return state;
}
function getActionsFail(state: State, id: number): State {
    if (state.ticket && state.ticket.id === id) {
        return { ...state, actionsLoading: false };
    }
    return state;
}

export const getActions = (state: State) => state.actions;
export const getActionsLoading = (state: State) => state.actionsLoading;
export const getTicket = (state: State) => state.ticket;
