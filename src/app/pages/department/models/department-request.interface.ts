export interface DepartmentRequest {
    name: string;
    company: string;
    state: number;
  }
  
  export interface DepartmentUpdateRequest {
    departmentId: number;
    name: string;
    company: string;
    state: number;
  }
  