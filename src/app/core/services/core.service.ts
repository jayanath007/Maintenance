import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from '../../app.config';
import { Department } from '../models/department';


@Injectable()
export class CoreService {

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  getDepartments() {
    return this.http
      .get<Department[]>(`${this.appConfig.serviceBase}Ticket/GetDepartments`);
  }
  getClientDomains() {
    return this.http
      .get<string[]>(`${this.appConfig.serviceBase}Ticket/GetClientDomains`);
  }
}
