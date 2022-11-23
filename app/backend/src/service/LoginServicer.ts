import { createToken } from '../utils/jwt';
import { IServiceResponse } from '../interface/interfaces';
import Bcrypt from '../utils/Bcrypt';
import LoginModel from '../model/LoginModel';

class LoginService {
  static async checkPasswordAndEmail(email: string, password: string): Promise<IServiceResponse> {
    const encryptedPassword = await LoginModel.getUserByEmail(email);

    if (encryptedPassword === undefined) return { error: 'Invalid Email', result: null };

    const isPasswordValid = await Bcrypt.checkPassword(password, encryptedPassword);

    if (isPasswordValid) {
      const token = createToken(email);
      return { error: null, result: token };
    }

    return { error: 'Invalid Password', result: null };
  }
}

export default LoginService;
