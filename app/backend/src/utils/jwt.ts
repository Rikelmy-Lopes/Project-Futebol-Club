import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IPayloadJWT } from '../interface/interfaces';

export const createToken = (email: string): string => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string);
  return token;
};

export const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as IPayloadJWT;

    return { decoded };
  } catch (_error) {
    return { decoded: null };
  }
};
