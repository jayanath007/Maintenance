export interface TicketBase {
    id: number;
    contactEmailAddress: string;
    dateCreated: string;
    dateClosed: string;
    durationHours: number;
    durationMins: number;
    agentCode: string;
    agentName: string;
    departmentId: number;
    department: string;
    productName: string;
    ticketStatus: number;
    summary: string;
    detail: string;
    clientDomain: string;
    signatureHandle: string;
    handler: string;
    privateTicket: boolean;
    lastActionDate: string;
    deleted: boolean;
}

export interface TicketListItem extends TicketBase {
    raisedBy: string;
    duration: string;
}
