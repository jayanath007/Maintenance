import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of, combineLatest, forkJoin } from 'rxjs';
import { map, switchMap, mergeMap, catchError, take, filter } from 'rxjs/operators';

import * as TicketList from '../actions/ticket-list.actions';
import { getFilters, getPaginator } from '../reducers';
import { TicketListRequest } from '../models/ticket-list-request';
import { TicketsService } from '../services/tickets.service';
import { getSelectedDomain, LocalStorageKeys, CHANGE_SELECTED_DOMAIN } from '../../core';
import { TicketStatus } from '../models/ticket-status.enum';
import { SummaryRequest } from '../models/summary-request';


@Injectable()
export class TicketListEffects {
    constructor(private action$: Actions, private store: Store<Date>, private service: TicketsService) { }

    @Effect()
    initTicketList$ = this.action$.pipe(
        ofType(
            TicketList.INIT_TICKET_LIST,
            TicketList.CHANGE_DEPARTMENT,
            TicketList.CHANGE_SEARCH_TEXT,
            TicketList.REFRESH_TICKET_LIST,
            TicketList.CHANGE_TICKETS_STATUS,
            TicketList.CHANGE_DATE_RANGE,
            TicketList.CHANGE_PAGE_INDEX,
            TicketList.CHANGE_PAGE_SIZE,
            CHANGE_SELECTED_DOMAIN
        ),
        map(() => new TicketList.GetTicketList())
    );

    @Effect()
    initTicketList2$ = this.action$.pipe(
        ofType(
            TicketList.INIT_TICKET_LIST,
            TicketList.CHANGE_DEPARTMENT,
            TicketList.REFRESH_TICKET_LIST,
            TicketList.CHANGE_TICKETS_STATUS,
            TicketList.CHANGE_DATE_RANGE,
            CHANGE_SELECTED_DOMAIN
        ),
        map(() => new TicketList.GetSummary())
    );

    @Effect()
    getTicketList$ = this.action$.pipe(ofType(TicketList.GET_TICKET_LIST),
        switchMap(() => combineLatest(
            this.store.select(getFilters),
            this.store.select(getPaginator),
            this.store.select(getSelectedDomain)
        ).pipe(take(1))),
        map(([filters, paginator, domain]) => new TicketListRequest(filters, paginator, domain)),
        switchMap((request) => this.service.getTicketList(request).pipe(
            map(data => new TicketList.GetTicketListSuccess(data.data, data.total,
                request, localStorage.getItem(LocalStorageKeys.SelectedDomin))),
            catchError(error => of(new TicketList.GetTicketListFail(error, request, localStorage.getItem(LocalStorageKeys.SelectedDomin))))
        ))
    );

    @Effect()
    getTopCallersAndDurations$ = this.action$.pipe(ofType(TicketList.GET_TICKET_LIST),
        switchMap(() => combineLatest(
            this.store.select(getFilters),
            this.store.select(getPaginator),
            this.store.select(getSelectedDomain)
        ).pipe(take(1))),
        filter(([filters, paginator, domain]) => filters.statusOfTicket !== TicketStatus.Open),
        map(([filters, paginator, domain]) => new SummaryRequest(filters, domain)),
        switchMap((request) => forkJoin(this.service.getTopCallers(request), this.service.getDurationtoSolve(request)).pipe(
            map(data => new TicketList.GetSummarySuccess(data[0], data[1],
                request, localStorage.getItem(LocalStorageKeys.SelectedDomin))),
            catchError(error =>
                of(new TicketList.GetSummaryFail(error, request, localStorage.getItem(LocalStorageKeys.SelectedDomin)))
            )
        ))
    );
}
