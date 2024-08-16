export interface TicketRequest {
    observation: string;
    subtotal: number;
    iva: number;
    totalAmount: number;
    warehouseId: number;
    clientId: number;
    voucherNumber: string;
    voucherDocumentTypeId: number;
    ticketDetails: TicketDetailRequest[];
  }
  
  export interface TicketDetailRequest {
    inventoryId: number;
  }