import { createToken } from '../utils/jwt';
import { IServiceResponse } from '../interface/interfaces';
import Bcrypt from '../utils/Bcrypt';
import LoginModel from '../model/LoginModel';

class LoginService {
  static async checkPasswordAndEmail(email: string, password: string): Promise<IServiceResponse> {
    const result = await LoginModel.getUserByEmail(email);

    if (result === undefined) return { error: 'Invalid Email', result: null };

    const isPasswordValid = await Bcrypt.checkPassword(password, result.password);

    if (isPasswordValid) {
      const token = createToken(email);
      return { error: null, result: token };
    }

    return { error: 'Invalid Password', result: null };
  }

  static async validateToken(userEmail: string): Promise<IServiceResponse> {
    const result = await LoginModel.getUserByEmail(userEmail);

    if (result === undefined) {
      return { error: 'User not found', result: null };
    }

    return { error: null, result: result.role };
  }
}

export default LoginService;
