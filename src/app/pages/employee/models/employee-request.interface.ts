export interface EmployeeRequest {
    name: string;
    lastName: string;
    locationId: number;
    departmentId: number;
    email: string;
    phone: string;
    state: number;
  }
  
  export interface EmployeeUpdateRequest {
    employeeId: number;
    name: string;
    lastName: string;
    locationId: number;
    departmentId: number;
    email: string;
    phone: string;
    state: number;
  }
  