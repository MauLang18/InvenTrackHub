export interface LocationRequest {
    name: string;
    address: string;
    state: number;
  }
  
  export interface LocationUpdateRequest {
    locationId: number;
    name: string;
    address: string;
    state: number;
  }
  