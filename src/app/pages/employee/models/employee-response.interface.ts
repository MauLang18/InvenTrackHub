export interface EmployeeResponse {
    employeeId: number;
    name: string;
    lastName: string;
    location: string;
    department: string;
    email: string;
    phone: string;
    auditCreateDate: Date;
    stateEmployee: any;
    icDownload: any;
    icEdit: any;
    icDelete: any;
  }
  
  export interface EmployeeByIdResponse {
    employeeId: number;
    name: string;
    lastName: string;
    locationId: number;
    departmentId: number;
    email: string;
    phone: string;
    state: string;
  }