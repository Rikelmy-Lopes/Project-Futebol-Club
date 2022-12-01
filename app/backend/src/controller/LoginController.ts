import { Request, Response } from 'express';
import LoginServicer from '../service/LoginServicer';

class LoginController {
  static async checkPasswordAndEmail(request: Request, response: Response) {
    const { email, password } = request.body;
    const { error, result } = await LoginServicer.checkPasswordAndEmail(email, password);

    if (error) return response.status(401).json({ message: 'Incorrect email or password' });

    response.status(200).json({ token: result });
  }

  static async validateToken(request: Request, response: Response) {
    const { userEmail } = request.body;
    const { error, result } = await LoginServicer.validateToken(userEmail);

    if (!error) {
      response.status(200).json({ role: result });
      return;
    }

    response.status(404).json({ message: 'User not found' });
  }
}

export default LoginController;
