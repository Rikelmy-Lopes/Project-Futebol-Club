export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IServiceResponse {
  error: null | string;
  result: null | string;
}
