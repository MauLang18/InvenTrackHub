export interface LocationResponse {
    locationId: number;
    name: string;
    address: string;
    auditCreateDate: Date;
    stateLocate: any;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface LocationByIdResponse {
    locationId: number;
    name: string;
    address: string;
    state: string;
  }