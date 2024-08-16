export interface InventoryResponse {
    inventoryId: number;
    code: string;
    active: string;
    equipmentTypeName: string;
    brand: string;
    series: string;
    model: string;
    price: number;
    details: string;
    image: string;
    auditCreateDate: Date;
    stateInventory: any;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface InventoryByIdResponse {
    inventoryId: number;
    code: string;
    active: string;
    equipmentTypeId: number;
    brand: string;
    series: string;
    model: string;
    price: number;
    details: string;
    image: string;
    state: string;
  }