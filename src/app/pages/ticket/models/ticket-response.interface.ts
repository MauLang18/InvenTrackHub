export interface TicketResponse {
    ticketId: number;
    location: string;
    department: string;
    assignedTo: string;
    receivedBy: string;
    deliveredBy: string;
    icReport: any;
    icVisibility: any;
    icCancel: any;
  }
  
  export interface InventoryDetailsResponse {
    inventoryId: number;
    code: string;
    active: string;
    equipmentType: string;
    brand: string;
    series: string;
    model: string;
    details: string;
    icAdd: any;
  }
  
  export interface TicketByIdResponse {
    ticketId: number;
    locationId: number;
    departmentId: number;
    assignedToId: number;
    receivedById: number;
    deliveredById: number;
    ticketDetails: TicketDetailByIdResponse[];
  }
  
  export interface TicketDetailByIdResponse {
    inventoryId: number;
    code: string;
    active: string;
    equipmentType: string;
    brand: string;
    series: string;
    model: string;
    details: string;
  }
  