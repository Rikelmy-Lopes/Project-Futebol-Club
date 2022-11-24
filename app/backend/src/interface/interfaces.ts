import { ITeam } from './interfaceTeam';

export interface IUser {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IServiceResponse {
  error: null | string;
  result: null | string | ITeam[];
}

export interface IPayloadJWT {
  email: string;
  iat: number;
}
