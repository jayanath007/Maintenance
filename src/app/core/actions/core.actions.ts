import { Action } from '@ngrx/store';
import { Department } from '../models/department';

export const GET_DEPARTMENTS = 'DPS_CORE_GET_DEPARTMENTS';
export const GET_DEPARTMENTS_SUCCESS = 'DPS_CORE_GET_DEPARTMENTS_SUCCESS';
export const GET_DEPARTMENTS_FAIL = 'DPS_CORE_GET_DEPARTMENTS_FAIL';

export const GET_CLIENT_DOMAINS = 'DPS_CORE_GET_CLIENT_DOMAINS';
export const GET_CLIENT_DOMAINS_SUCCESS = 'DPS_CORE_GET_CLIENT_DOMAINS_SUCCESS';
export const GET_CLIENT_DOMAINS_FAIL = 'DPS_CORE_GET_CLIENT_DOMAINS_FAIL';

export const SET_INIT_DOMAIN = 'DPS_CORE_SET_INIT_DOMAIN';
export const CHANGE_SELECTED_DOMAIN = 'DPS_CORE_CHANGE_SELECTED_DOMAIN';

export class GetDepartments implements Action {
    readonly type = GET_DEPARTMENTS;
    constructor() { }
}

export class GetDepartmentsSuccess implements Action {
    readonly type = GET_DEPARTMENTS_SUCCESS;
    constructor(public departments: Department[]) { }
}

export class GetDepartmentsFail implements Action {
    readonly type = GET_DEPARTMENTS_FAIL;
    constructor(public error) { }
}

export class GetClientDomains implements Action {
    readonly type = GET_CLIENT_DOMAINS;
    constructor() { }
}

export class GetClientDomainsSuccess implements Action {
    readonly type = GET_CLIENT_DOMAINS_SUCCESS;
    constructor(public domains: string[]) { }
}

export class GetClientDomainsFail implements Action {
    readonly type = GET_CLIENT_DOMAINS_FAIL;
    constructor(public error) { }
}

export class ChangeSelectedDomain implements Action {
    readonly type = CHANGE_SELECTED_DOMAIN;
    constructor(public domain: string) { }
}

export class SetInitDomain implements Action {
    readonly type = SET_INIT_DOMAIN;
    constructor(public domain: string) { }
}

export type Any = GetDepartments | GetDepartmentsSuccess | GetDepartmentsFail |
    GetClientDomains | GetClientDomainsSuccess | GetClientDomainsFail | ChangeSelectedDomain | SetInitDomain;
