import { TicketStatus } from './ticket-status.enum';

export interface TicketsFilterOptions {
    readonly searchText: string;
    readonly statusOfTicket: TicketStatus;
    readonly startDate: Date;
    readonly endDate: Date;
    readonly departmentId: number;
    readonly agentID?: number;
}
