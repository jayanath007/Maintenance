import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, map, switchMap, take, filter, tap } from 'rxjs/operators';

import * as Core from '../actions/core.actions';
import { CoreService } from '../services/core.service';
import { getDepartments } from '../reducers';
import { LocalStorageKeys } from '../models/local-storage-keys.enum';


@Injectable()
export class CoreEffects {
    constructor(private action$: Actions, private store: Store<Date>, private service: CoreService) { }

    @Effect()
    getDepartments$ = this.action$.pipe(ofType(Core.GET_DEPARTMENTS),
        switchMap(() => this.store.select(getDepartments).pipe(
            take(1),
            filter(department => !department || department.length < 1)
        )),
        switchMap(() => this.service.getDepartments().pipe(
            map(data => new Core.GetDepartmentsSuccess(data)),
            catchError(error => of(new Core.GetDepartmentsFail(error)))
        ))
    );

    @Effect()
    getClientDomains$ = this.action$.pipe(ofType(Core.GET_CLIENT_DOMAINS),
        switchMap(() => this.service.getClientDomains().pipe(
            map(data => new Core.GetClientDomainsSuccess(data)),
            catchError(error => of(new Core.GetClientDomainsFail(error)))
        ))
    );

    @Effect({ dispatch: false })
    changeSelectedDomain$ = this.action$.pipe(ofType(Core.CHANGE_SELECTED_DOMAIN, Core.SET_INIT_DOMAIN),
        tap((action: Core.ChangeSelectedDomain) => {
            localStorage.setItem(LocalStorageKeys.SelectedDomin, action.domain);
        })
    );
}
