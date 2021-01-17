import { TicketListItem, TicketBase } from '../models/ticket';
import * as Actions from '../actions/ticket-list.actions';
import { TicketStatus } from '../models/ticket-status.enum';
import { TicketsFilterOptions } from '../models/tickets-filter-options';
import { Paginator, CHANGE_SELECTED_DOMAIN, ChangeSelectedDomain } from '../../core';
import { TicketListRequest } from '../models/ticket-list-request';
import { TopCaller } from '../models/top-caller';
import { Durations } from '../models/duration';
import { SummaryRequest } from '../models/summary-request';

export interface State {
    readonly ticketList: TicketListItem[];
    readonly selectedTicket: TicketListItem;
    readonly loading: boolean;
    readonly showChart: boolean;
    readonly filters: TicketsFilterOptions;
    readonly paginator: Paginator;
    readonly summaryLoading: boolean;
    readonly topCallers: TopCaller[];
    readonly durations: Durations;
}
const initialstate: Readonly<State> = Object.freeze<State>({
    ticketList: null,
    selectedTicket: null,
    loading: true,
    showChart: false,
    filters: {
        searchText: '',
        statusOfTicket: TicketStatus.Open,
        startDate: null,
        endDate: null,
        departmentId: 0
    },
    paginator: {
        pageIndex: 0,
        pageSize: 25,
        length: 0,
        pageSizeOptions: [10, 25, 50, 100]
    },
    summaryLoading: true,
    topCallers: [],
    durations: {
        firstFiftyAvg: '0 : 0',
        nextTwentyFiveAvg: '0 : 0',
        lastTwentyFiveAvg: '0 : 0',
    }
});

export function reducer(state: Readonly<State> = initialstate, action: Actions.Any | ChangeSelectedDomain): Readonly<State> {
    switch (action.type) {
        case Actions.INIT_TICKET_LIST:
            return { ...state, ticketList: [] };
        case Actions.SELECT_TICKET:
            return {
                ...state,
                selectedTicket: action.ticket,
                loading: false
            };
        case Actions.CHANGE_SHOW_CHART:
            return {
                ...state,
                showChart: action.value,
                loading: false
            };
        case Actions.CHANGE_SEARCH_TEXT:
            return {
                ...state,
                filters: { ...state.filters, searchText: action.value },
                paginator: { ...state.paginator, pageIndex: 0 }
            };
        case Actions.CHANGE_DATE_RANGE:
            return {
                ...state,
                filters: { ...state.filters, startDate: action.startDate, endDate: action.endDate },
                paginator: { ...state.paginator, pageIndex: 0 }
            };
        case Actions.CHANGE_TICKETS_STATUS:
            return {
                ...state,
                filters: { ...state.filters, statusOfTicket: action.status },
                paginator: { ...state.paginator, pageIndex: 0 }
            };
        case Actions.CHANGE_DEPARTMENT:
            return {
                ...state,
                filters: { ...state.filters, departmentId: action.department.id },
                paginator: { ...state.paginator, pageIndex: 0 }
            };
        case Actions.CHANGE_PAGE_INDEX:
            return {
                ...state,
                paginator: { ...state.paginator, pageIndex: action.index }
            };
        case Actions.CHANGE_PAGE_SIZE:
            return {
                ...state,
                paginator: { ...state.paginator, pageSize: action.size }
            };
        case Actions.REFRESH_TICKET_LIST:
            return {
                ...state,
                paginator: { ...state.paginator, pageIndex: 0 }
            };
        case CHANGE_SELECTED_DOMAIN:
            return {
                ...state,
                filters: { ...state.filters, searchText: '' },
                paginator: { ...state.paginator, pageIndex: 0 }
            };
        case Actions.GET_TICKET_LIST:
            return { ...state, loading: true };
        case Actions.GET_TICKET_LIST_SUCCESS:
            return getTicketListSuccess(state, action.tickets, action.length, action.request, action.domain);
        case Actions.GET_TICKET_LIST_FAIL:
            return getTicketListFail(state, action.request, action.domain);
        case Actions.GET_SUMMARY:
            return {
                ...state, summaryLoading: true, topCallers: [],
                durations: {
                    firstFiftyAvg: '0 : 0',
                    nextTwentyFiveAvg: '0 : 0',
                    lastTwentyFiveAvg: '0 : 0',
                }
            };
        case Actions.GET_SUMMARY_SUCCESS:
            return getSummarySuccess(state, action.topCallers, action.durations, action.request, action.domain);
        case Actions.GET_SUMMARY_FAIL:
            return getSummaryFail(state, action.request, action.domain);
        default: {
            return state;
        }
    }
}

function getTicketListSuccess(state: State, tickets: TicketBase[], length: number, request: TicketListRequest, domain: string): State {
    if (request.queryString === new TicketListRequest(state.filters, state.paginator, domain).queryString) {
        return {
            ...state, loading: false,
            ticketList: tickets.map(val => ({
                ...val,
                raisedBy: val.contactEmailAddress.replace('@' + val.clientDomain, ''),
                duration: val.durationHours + ' : ' + val.durationMins
            })),
            paginator: { ...state.paginator, length }
        };
    }
    return state;
}
function getTicketListFail(state: State, request: TicketListRequest, domain: string): State {
    if (request.queryString === new TicketListRequest(state.filters, state.paginator, domain).queryString) {
        return { ...state, loading: false };
    }
    return state;
}

function getSummarySuccess(state: State, topCallers: TopCaller[], durations: Durations, request: SummaryRequest, domain: string): State {
    if (request.queryString === new SummaryRequest(state.filters, domain).queryString) {
        return { ...state, summaryLoading: false, topCallers, durations };
    }
    return state;
}
function getSummaryFail(state: State, request: SummaryRequest, domain: string): State {
    if (request.queryString === new SummaryRequest(state.filters, domain).queryString) {
        return { ...state, summaryLoading: false };
    }
    return state;
}

export const getTicketList = (state: State) => state.ticketList;
export const getTicketListLoding = (state: State) => state.loading;
export const getSelectedTicket = (state: State) => state.selectedTicket;
export const getShowChart = (state: State) => state.showChart;
export const getFilters = (state: State) => state.filters;
export const getPaginator = (state: State) => state.paginator;
export const getSummaryLoading = (state: State) => state.summaryLoading;
export const getTopCallers = (state: State) => state.topCallers;
export const getDurations = (state: State) => state.durations;
