import { TicketsFilterOptions } from './tickets-filter-options';
import { Paginator } from '../../core';

export class TicketListRequest {
    constructor(public filters: TicketsFilterOptions, public paginator: Paginator, public domain: string) { }

    get queryString() {
        return `?take=${this.paginator.pageSize}&skip=${this.paginator.pageIndex * this.paginator.pageSize}&` +
            `${Object.keys(this.filters)
                .filter(key => this.filters[key] !== null && this.filters[key] !== '')
                .map(key => key + '=' +
                    ((this.filters[key] instanceof Date) ? (this.filters[key] as Date).toDpsString() : this.filters[key])).join('&')}` +
            `&domain=${this.domain}`;
    }
}
