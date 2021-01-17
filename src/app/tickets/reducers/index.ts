import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as ticketList from './ticket-list.reducer';
import * as ticketView from './ticket-view.reducer';

declare interface State {
    ticketList: ticketList.State;
    ticketView: ticketView.State;
}

export const featureName = 'dpsTickets';

export const reducers = {
    ticketList: ticketList.reducer,
    ticketView: ticketView.reducer
};

export const getRootState = createFeatureSelector<State>(featureName);

export const getTicketListState = createSelector(getRootState, (state) => state.ticketList);
export const getTicketList = createSelector(getTicketListState, ticketList.getTicketList);
export const getTicketListLoding = createSelector(getTicketListState, ticketList.getTicketListLoding);
export const getSelectedTicket = createSelector(getTicketListState, ticketList.getSelectedTicket);
export const getShowChart = createSelector(getTicketListState, ticketList.getShowChart);
export const getFilters = createSelector(getTicketListState, ticketList.getFilters);
export const getPaginator = createSelector(getTicketListState, ticketList.getPaginator);
export const getSummaryLoading = createSelector(getTicketListState, ticketList.getSummaryLoading);
export const getTopCallers = createSelector(getTicketListState, ticketList.getTopCallers);
export const getDurations = createSelector(getTicketListState, ticketList.getDurations);

export const getTicketViewState = createSelector(getRootState, (state) => state.ticketView);
export const getActions = createSelector(getTicketViewState, ticketView.getActions);
export const getActionsLoading = createSelector(getTicketViewState, ticketView.getActionsLoading);
export const getTicket = createSelector(getTicketViewState, ticketView.getTicket);
