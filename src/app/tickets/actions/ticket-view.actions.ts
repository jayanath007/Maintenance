import { Action } from '@ngrx/store';
import { TicketAction } from '../models/ticket-action';

export const GET_ACTIONS = 'DPS_TICKET_VIEW_GET_ACTIONS';
export const GET_ACTIONS_SUCCESS = 'DPS_TICKET_VIEW_GET_ACTIONS_SUCCESS';
export const GET_ACTIONS_FAIL = 'DPS_TICKET_VIEW_GET_ACTIONS_FAIL';

export const REFRESH_ACTIONS = 'DPS_TICKET_VIEW_REFRESH_ACTIONS';

export class GetActions implements Action {
    readonly type = GET_ACTIONS;
    constructor() { }
}

export class GetActionsSuccess implements Action {
    readonly type = GET_ACTIONS_SUCCESS;
    constructor(public actions: TicketAction[], public id: number) { }
}

export class GetActionsFail implements Action {
    readonly type = GET_ACTIONS_FAIL;
    constructor(public error: any, public id: number) { }
}

export class RefreshActions implements Action {
    readonly type = REFRESH_ACTIONS;
    constructor() { }
}

export type Any = GetActions | GetActionsSuccess | GetActionsFail | RefreshActions;
