import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Observable, of } from 'rxjs';

import { SvgIcons } from '../../../shared';
import { TicketBase } from '../../models/ticket';
import { TicketAction } from '../../models/ticket-action';
import { Store } from '@ngrx/store';
import { getActionsLoading, getActions, getTicket } from '../../reducers';
import { RefreshActions } from '../../actions/ticket-view.actions';
import { TicketStatus } from '../../models/ticket-status.enum';

@Component({
  selector: 'dps-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrls: ['./ticket-view.component.scss']
})
export class TicketViewComponent implements OnInit {

  @Output() closeView = new EventEmitter();

  loading$: Observable<boolean> = of(false);
  actions$: Observable<TicketAction[]> = of([]);
  tiket$: Observable<TicketBase> = of(null);

  SvgIcons = SvgIcons;
  TicketStatus = TicketStatus;

  displayedColumns = ['actionId', 'actionName', 'text', 'actionLoggedBy', 'dateAdded'];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.loading$ = this.store.select(getActionsLoading);
    this.actions$ = this.store.select(getActions);
    this.tiket$ = this.store.select(getTicket);
  }
  onViewClose() {
    this.closeView.emit();
  }
  onActionsRefresh() {
    this.store.dispatch(new RefreshActions());
  }
}
