export interface TicketRequest {
    assignedToId: number;
    receivedById: number;
    deliveredById: number;
    details: string;
    ticketDetails: TicketDetailRequest[];
  }
  
  export interface TicketDetailRequest {
    inventoryId: number;
  }