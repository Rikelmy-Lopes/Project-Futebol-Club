import { NextFunction, Request, Response } from 'express';

class LoginMiddleware {
  static async validateLogin(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    if (!email || !password) {
      response.status(400).json({ message: 'All fields must be filled' });
      return;
    }
    next();
  }
}

export default LoginMiddleware;
