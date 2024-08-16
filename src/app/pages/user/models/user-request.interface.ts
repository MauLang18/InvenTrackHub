export interface UserRequest {
  name: string;
  lastName: string;
  userName: string;
  passWord: string;
  email: string;
  state: number;
}

export interface UserUpdateRequest {
  userId: number;
  name: string;
  lastName: string;
  userName: string;
  passWord: string;
  email: string;
  state: number;
}
