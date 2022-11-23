import { Request, Response } from 'express';
import LoginServicer from '../service/LoginServicer';

class LoginController {
  static async checkPassword(request: Request, response: Response) {
    const { email, password } = request.body;
    const { error, result } = await LoginServicer.checkPassword(email, password);

    if (error) return response.status(404).json({ message: 'Invalid Password' });

    response.status(200).json({ token: result });
  }
}

export default LoginController;
