export interface EquipmentTypeResponse {
    equipmentTypeId: number;
    name: string;
    auditCreateDate: Date;
    stateEquipmentType: any;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface EquipmentTypeByIdResponse {
    equipmentTypeId: number;
    name: string;
    state: string;
  }