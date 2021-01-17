import { Component, OnInit } from '@angular/core';

import { PageEvent } from '@angular/material/paginator';

import { fromEvent, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';

import { TicketListItem } from '../../models/ticket';
import { SvgIcons, DpsDateRangeChange } from '../../../shared';
import { getTicketList, getTicketListLoding, getSelectedTicket, getShowChart, getFilters, getPaginator } from '../../reducers';
import {
  InitTicketList, SelectTicket, ChangeShowChart, ChangeSearchText,
  ChangeTicketsStatus, ChangeDateRange, ChangePageIndex, ChangePageSize, ChangeDepartment, RefreshTicketList
} from '../../actions/ticket-list.actions';
import { TicketsFilterOptions } from '../../models/tickets-filter-options';
import { Paginator, Department, getDepartments, GetDepartments } from '../../../core';
import { TicketStatus } from '../../models/ticket-status.enum';
import { onSearchInputToggl } from '../../animations/search-input.amimation';

@Component({
  selector: 'dps-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss'],
  animations: [onSearchInputToggl]
})
export class TicketListComponent implements OnInit {

  ticketList$: Observable<TicketListItem[]> = of([]);
  loading$: Observable<boolean> = of(false);
  selectedTicket$: Observable<TicketListItem> = of(null);
  showChart$: Observable<boolean> = of(false);
  filters$: Observable<TicketsFilterOptions> = of(null);
  paginator$: Observable<Paginator> = of(null);
  departments$: Observable<Department[]> = of([]);

  showSecondToolbar = false;
  showSearchInput = false;
  defaultDepartment: Department = { id: 0, name: 'None' };
  closedColumns = ['id', 'raisedBy', 'dateCreated', 'dateClosed', 'duration', 'agentCode', 'summary'];
  openColumns = ['id', 'raisedBy', 'dateCreated', 'agentCode', 'summary'];

  SvgIcons = SvgIcons;
  TicketStatus = TicketStatus;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new GetDepartments());
    this.store.dispatch(new InitTicketList());

    this.ticketList$ = this.store.select(getTicketList);
    this.loading$ = this.store.select(getTicketListLoding);
    this.selectedTicket$ = this.store.select(getSelectedTicket);
    this.showChart$ = this.store.select(getShowChart);
    this.filters$ = this.store.select(getFilters);
    this.paginator$ = this.store.select(getPaginator);
    this.departments$ = this.store.select(getDepartments);

    fromEvent(window, 'resize').subscribe(() => {
      if (document.getElementById('dps-ticket-list-toolbar')) {
        this.showSecondToolbar = document.getElementById('dps-ticket-list-toolbar').offsetWidth < 1020;
      }
    });
  }
  onSearchClick(searchInput: HTMLInputElement) {
    this.showSearchInput = true;
    setTimeout(() => {
      searchInput.focus();
    }, 10);
  }
  onSearchInputBlur(searchInput: HTMLInputElement, searchText: string) {
    if (!searchText) {
      this.showSearchInput = false;
    }
    if (searchText !== searchInput.value) {
      this.onSearch(searchInput);
    }
  }
  onTicketClick(ticket: TicketListItem) {
    this.store.dispatch(new ChangeShowChart(false));
    this.store.dispatch(new SelectTicket(ticket));
  }
  onShowChartChange(event) {
    this.store.dispatch(new SelectTicket(null));
    this.store.dispatch(new ChangeShowChart(event));
  }
  onSearch(searchInput: HTMLInputElement) {
    this.store.dispatch(new ChangeSearchText(searchInput.value));
  }
  onRefresh() {
    this.store.dispatch(new RefreshTicketList());
  }
  onStatusChange(ticketStatus: TicketStatus, statusOfTicket: TicketStatus) {
    if (ticketStatus !== statusOfTicket) {
      this.store.dispatch(new ChangeTicketsStatus(ticketStatus));
    }
    if (ticketStatus === TicketStatus.Open) {
      this.store.dispatch(new ChangeShowChart(false));
    }
  }
  onDateRangeChange(event: DpsDateRangeChange) {
    this.store.dispatch(new ChangeDateRange(event.fromDate, event.toDate));
  }
  onPageChange(event: PageEvent, paginator: Paginator) {
    if (event.pageIndex !== paginator.pageIndex) {
      this.store.dispatch(new ChangePageIndex(event.pageIndex));
    }
    if (event.pageSize !== paginator.pageSize) {
      this.store.dispatch(new ChangePageSize(event.pageSize));
    }
  }
  onDepartmentChange(department: Department, departmentId: number) {
    if (department.id !== departmentId) {
      this.store.dispatch(new ChangeDepartment(department));
    }
  }
  getSelectedDepartment(id: number, departments: Department[]) {
    if (id === 0 || !departments) {
      return 'Department';
    } else {
      const department = departments.find(val => val.id === id);
      return department ? department.name : 'Undefined';
    }
  }

}
