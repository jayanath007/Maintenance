import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TicketListRequest } from '../models/ticket-list-request';
import { AppConfig } from '../../app.config';
import { DataSourceResponse } from '../../core';
import { TicketBase } from '../models/ticket';
import { Durations } from '../models/duration';
import { TopCaller } from '../models/top-caller';
import { SummaryRequest } from '../models/summary-request';
import { TicketAction } from '../models/ticket-action';

@Injectable()
export class TicketsService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  getTicketList(request: TicketListRequest) {
    return this.http.get<DataSourceResponse<TicketBase[]>>(`${this.appConfig.serviceBase}Ticket/GetTicketList${request.queryString}`);
  }

  getDurationtoSolve(request: SummaryRequest) {
    return this.http.get<Durations>(`${this.appConfig.serviceBase}Report/GetDurationtoSolve${request.queryString}`);
  }

  getTopCallers(request: SummaryRequest) {
    return this.http.get<TopCaller[]>(`${this.appConfig.serviceBase}Report/GetTopCallers${request.queryString}`);
  }

  getTicketActions(id: number) {
    return this.http.get<TicketAction[]>(`${this.appConfig.serviceBase}TicketAction/GetTicketActions?ticketId=${id}`);
  }

}
