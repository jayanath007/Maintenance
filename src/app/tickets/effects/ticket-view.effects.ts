import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of, combineLatest, forkJoin } from 'rxjs';
import { map, switchMap, catchError, take, filter } from 'rxjs/operators';

import * as TicketView from '../actions/ticket-view.actions';
import { getTicket } from '../reducers';
import { TicketsService } from '../services/tickets.service';
import { SELECT_TICKET } from '../actions/ticket-list.actions';


@Injectable()
export class TicketViewEffects {
    constructor(private action$: Actions, private store: Store<Date>, private service: TicketsService) { }

    @Effect()
    initTicketView$ = this.action$.pipe(
        ofType(
            TicketView.REFRESH_ACTIONS,
            SELECT_TICKET
        ),
        map(() => new TicketView.GetActions())
    );

    @Effect()
    getActions$ = this.action$.pipe(ofType(TicketView.GET_ACTIONS),
        switchMap(() => this.store.select(getTicket).pipe(take(1))),
        filter(ticket => !!ticket),
        switchMap((ticket) => this.service.getTicketActions(ticket.id).pipe(
            map(data => new TicketView.GetActionsSuccess(data, ticket.id)),
            catchError(error => of(new TicketView.GetActionsFail(error, ticket.id)))
        ))
    );
}
