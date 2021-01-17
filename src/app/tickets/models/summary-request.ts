import { TicketsFilterOptions } from './tickets-filter-options';

export class SummaryRequest {
    constructor(public filters: TicketsFilterOptions, public domain: string) { }

    get queryString() {
        return `?${Object.keys(this.filters)
            .filter(key => this.filters[key] !== null && this.filters[key] !== '' && key !== 'searchText')
            .map(key => key + '=' +
                ((this.filters[key] instanceof Date) ? (this.filters[key] as Date).toDpsString() : this.filters[key])).join('&')}` +
            `&domain=${this.domain}`;
    }
}
