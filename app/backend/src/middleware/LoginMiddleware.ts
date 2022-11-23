import { NextFunction, Request, Response } from 'express';
import * as jwt from '../utils/jwt';

class LoginMiddleware {
  static async validateLogin(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    if (!email || !password) {
      response.status(400).json({ message: 'All fields must be filled' });
      return;
    }
    next();
  }

  static async validateToken(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    if (!authorization) {
      response.status(401).json({ message: 'Token not found' });
      return;
    }

    const { decoded } = jwt.validateToken(authorization);

    if (decoded === null) {
      response.status(401).json({ message: 'Expired or invalid token' });
      return;
    }

    request.body.userEmail = decoded.email;
    next();
  }
}

export default LoginMiddleware;
