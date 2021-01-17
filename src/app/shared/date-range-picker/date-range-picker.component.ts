import {
  Component, OnInit, TemplateRef, ViewChild, ViewContainerRef, Input, Output,
  EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges, ViewEncapsulation
} from '@angular/core';
import { trigger, state, style, group, transition, query, animateChild, animate } from '@angular/animations';

import { Subject } from 'rxjs';
import { MatCalendar } from '@angular/material/datepicker';

// const transformPanel = trigger('transformPanel', [
//   state('void', style({ opacity: 0, height: '1px' })),
//   state('enter', style({ opacity: 1, height: '*' })),
//   transition('void => enter', group([
//     query('@fadeInCalendar', animateChild()),
//     animate('400ms')
//   ])),
//   transition('* => void', animate('100ms linear', style({ opacity: 0, height: '1px', display: 'none' })))
// ]);

// const fadeInCalendar = trigger('fadeInCalendar', [
//   state('void', style({ opacity: 0, height: '1px', display: 'none' })),
//   state('enter', style({ opacity: 1, height: '*' })),
//   transition('void => *', animate('400ms 100ms'))
// ]);

const transformPanel = trigger('transformPanel', [
  state('void', style({ opacity: 0, transform: 'scale(1, 0)' })),
  state('enter', style({ opacity: 1, transform: 'scale(1, 1)' })),
  transition('void => enter', group([
    query('@fadeInCalendar', animateChild(), { optional: true }),
    animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')
  ])),
  transition('* => void', animate('100ms linear', style({ opacity: 0 })))
]);

const fadeInCalendar = trigger('fadeInCalendar', [
  state('void', style({ opacity: 0 })),
  state('enter', style({ opacity: 1 })),
  transition('void => *', animate('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
]);


@Component({
  selector: 'dps-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[@transformPanel]': '"enter"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [transformPanel, fadeInCalendar]
})
export class DateRangePickerComponent implements OnInit {

  @ViewChild('fromCalendar') fromCalendar: MatCalendar<Date>;
  @ViewChild('toCalendar') toCalendar: MatCalendar<Date>;

  public _fromDate: Date;
  public _toDate: Date;

  okCancelbtnClick = new Subject<'Ok' | 'Cancel'>();

  get dateNow() {
    return new Date();
  }

  constructor() { }

  ngOnInit() {
  }

  onOkClick() {
    this.okCancelbtnClick.next('Ok');
  }
  onCancelClick() {
    this.okCancelbtnClick.next('Cancel');
  }

  onRefreshMatCalendar(matCalendar: MatCalendar<Date>) {
    setTimeout(() => {
      matCalendar._goToDateInView(matCalendar.selected, 'month');
      // tslint:disable-next-line: no-string-literal
      matCalendar['_intlChanges'].next();
      if (matCalendar.monthView) {
        matCalendar.monthView._init();
      }
    }, 100);
  }

  refreshMatCalendars() {
    if (this._fromDate && this.fromCalendar) {
      this.onRefreshMatCalendar(this.fromCalendar);
    }
    if (this._toDate && this.toCalendar) {
      this.onRefreshMatCalendar(this.toCalendar);
    }
  }
}
