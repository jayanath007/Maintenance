import { Component, OnInit, Output, EventEmitter, OnChanges, SimpleChanges, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { SvgIcons } from '../../../shared';
import { Durations } from '../../models/duration';
import { TopCaller } from '../../models/top-caller';
import { getSummaryLoading, getTopCallers, getDurations } from '../../reducers';


@Component({
  selector: 'dps-tickets-summary',
  templateUrl: './tickets-summary.component.html',
  styleUrls: ['./tickets-summary.component.scss']
})
export class TicketsSummaryComponent implements OnInit, OnChanges {

  @Input() showCharts: boolean;

  @Output() closeView = new EventEmitter();

  _showCharts = false;

  loading$: Observable<boolean> = of(false);
  topCallers$: Observable<TopCaller[]> = of([]);
  durations$: Observable<Durations> = of(null);

  colorScheme = {
    domain: ['#f7931e', '#ffbc64', '#8cc63f', '#44a7d3', '#6d69b2']
  };
  topCallers: { name: string, value: number }[] = [];
  SvgIcons = SvgIcons;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.loading$ = this.store.select(getSummaryLoading);
    this.topCallers$ = this.store.select(getTopCallers);
    this.durations$ = this.store.select(getDurations);
    this.topCallers$.subscribe(callers => {
      const totalCalls = callers.sum('count');
      const _topCallers: { name: string, value: number }[] = [];
      let otherCalls = 0;
      if (totalCalls > 0) {
        callers.forEach(caller => {
          if (((caller.count / totalCalls) * 100 < 2) || _topCallers.length > 3) {
            otherCalls += caller.count;
          } else {
            _topCallers.push({ name: caller.contactEmailAddress.replace('@' + caller.clientDomain, ''), value: caller.count });
          }
        });

        if (otherCalls > 0) {
          _topCallers.push({ name: 'Others', value: otherCalls });
        }
      }

      this.topCallers = _topCallers;
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.showCharts) {
      setTimeout(() => {
        this._showCharts = this.showCharts;
      }, 200);
    }
  }

  onViewClose() {
    this.closeView.emit();
  }
}

