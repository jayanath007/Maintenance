import { Action } from '@ngrx/store';

import { TicketListItem, TicketBase } from '../models/ticket';
import { TicketStatus } from '../models/ticket-status.enum';
import { TicketListRequest } from '../models/ticket-list-request';
import { Department } from '../../core';
import { Durations } from '../models/duration';
import { TopCaller } from '../models/top-caller';
import { SummaryRequest } from '../models/summary-request';

export const INIT_TICKET_LIST = 'DPS_TICKET_LIST_INIT_TICKET_LIST';
export const SELECT_TICKET = 'DPS_TICKET_LIST_SELECT_TICKET';
export const CHANGE_SHOW_CHART = 'DPS_TICKET_LIST_CHANGE_SHOW_CHART';
export const CHANGE_SEARCH_TEXT = 'DPS_TICKET_LIST_CHANGE_SEARCH_TEXT';
export const CHANGE_DATE_RANGE = 'DPS_TICKET_LIST_CHANGE_DATE_RANGE';
export const CHANGE_TICKETS_STATUS = 'DPS_TICKET_LIST_CHANGE_TICKETS_STATUS';
export const CHANGE_DEPARTMENT = 'DPS_TICKET_LIST_CHANGE_DEPARTMENT';
export const CHANGE_PAGE_INDEX = 'DPS_TICKET_LIST_CHANGE_PAGE_INDEX';
export const CHANGE_PAGE_SIZE = 'DPS_TICKET_LIST_CHANGE_PAGE_SIZE';
export const REFRESH_TICKET_LIST = 'DPS_TICKET_LIST_REFRESH_TICKET_LIST';

export const GET_TICKET_LIST = 'DPS_TICKET_LIST_GET_TICKET_LIST';
export const GET_TICKET_LIST_SUCCESS = 'DPS_TICKET_LIST_GET_TICKET_LIST_SUCCESS';
export const GET_TICKET_LIST_FAIL = 'DPS_TICKET_LIST_GET_TICKET_LIST_FAIL';

export const GET_SUMMARY = 'DPS_TICKET_LIST_GET_SUMMARY';
export const GET_SUMMARY_SUCCESS = 'DPS_TICKET_LIST_GET_SUMMARY_SUCCESS';
export const GET_SUMMARY_FAIL = 'DPS_TICKET_LIST_GET_SUMMARY_FAIL';

export class InitTicketList implements Action {
    readonly type = INIT_TICKET_LIST;
    constructor() { }
}

export class SelectTicket implements Action {
    readonly type = SELECT_TICKET;
    constructor(public ticket: TicketListItem) { }
}

export class ChangeShowChart implements Action {
    readonly type = CHANGE_SHOW_CHART;
    constructor(public value: boolean) { }
}

export class ChangeSearchText implements Action {
    readonly type = CHANGE_SEARCH_TEXT;
    constructor(public value: string) { }
}

export class ChangeDateRange implements Action {
    readonly type = CHANGE_DATE_RANGE;
    constructor(public startDate: Date, public endDate: Date) { }
}

export class ChangeTicketsStatus implements Action {
    readonly type = CHANGE_TICKETS_STATUS;
    constructor(public status: TicketStatus) { }
}

export class ChangeDepartment implements Action {
    readonly type = CHANGE_DEPARTMENT;
    constructor(public department: Department) { }
}

export class ChangePageIndex implements Action {
    readonly type = CHANGE_PAGE_INDEX;
    constructor(public index: number) { }
}

export class ChangePageSize implements Action {
    readonly type = CHANGE_PAGE_SIZE;
    constructor(public size: number) { }
}

export class RefreshTicketList implements Action {
    readonly type = REFRESH_TICKET_LIST;
    constructor() { }
}

export class GetTicketList implements Action {
    readonly type = GET_TICKET_LIST;
    constructor() { }
}

export class GetTicketListSuccess implements Action {
    readonly type = GET_TICKET_LIST_SUCCESS;
    constructor(public tickets: TicketBase[], public length: number, public request: TicketListRequest, public domain: string) { }
}

export class GetTicketListFail implements Action {
    readonly type = GET_TICKET_LIST_FAIL;
    constructor(public error: any, public request: TicketListRequest, public domain: string) { }
}

export class GetSummary implements Action {
    readonly type = GET_SUMMARY;
    constructor() { }
}

export class GetSummarySuccess implements Action {
    readonly type = GET_SUMMARY_SUCCESS;
    constructor(public topCallers: TopCaller[], public durations: Durations, public request: SummaryRequest, public domain: string) { }
}

export class GetSummaryFail implements Action {
    readonly type = GET_SUMMARY_FAIL;
    constructor(public error: any, public request: SummaryRequest, public domain: string) { }
}

export type Any = InitTicketList | SelectTicket | ChangeShowChart | ChangeSearchText | ChangeDateRange | ChangeTicketsStatus |
    ChangeDepartment | ChangePageIndex | ChangePageSize | RefreshTicketList | GetTicketList | GetTicketListSuccess | GetTicketListFail |
    GetSummary | GetSummarySuccess | GetSummaryFail;
