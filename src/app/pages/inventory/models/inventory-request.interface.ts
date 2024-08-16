export interface InventoryRequest {
    equipmentTypeId: number;
    brand: string;
    series: string;
    model: string;
    price: string;
    details: string;
    image: File;
    state: number;
  }
  
  export interface InventoryUpdateRequest {
    inventoryId: number;
    equipmentTypeId: number;
    brand: string;
    series: string;
    model: string;
    price: string;
    details: string;
    image: File;
    state: number;
  }
  