export interface UserResponse {
  userId: number;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  passWord: string;
  auditCreateDate: Date;
  stateUser: any;
  icEdit: any;
  icDelete: any;
}

export interface UserByIdResponse {
  userId: number;
  name: string;
  lastName: string;
  userName: string;
  email: string;
  passWord: string;
  state: string;
}