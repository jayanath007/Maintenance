import { PageEvent } from '@angular/material/paginator';

export interface Paginator extends PageEvent {
    pageSizeOptions: number[];
}
