import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

export const createToken = (email: string): string => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string);
  return token;
};

export const verifyToken = () => {};
