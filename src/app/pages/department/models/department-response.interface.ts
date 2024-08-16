export interface DepartmentResponse {
    departmentId: number;
    name: string;
    company: string;
    auditCreateDate: Date;
    stateDepartment: any;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface DepartmentByIdResponse {
    departmentId: number;
    name: string;
    company: string;
    state: string;
  }