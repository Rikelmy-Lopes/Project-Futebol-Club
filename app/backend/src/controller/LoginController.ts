import { Request, Response } from 'express';
import LoginServicer from '../service/LoginServicer';

class LoginController {
  static async checkPassword(request: Request, response: Response) {
    const { email, password } = request.body;
    const result = await LoginServicer.checkPassword(email, password);

    response.status(200).json(result);
  }
}

export default LoginController;
