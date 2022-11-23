import { createToken } from '../utils/jwt';
import { IUser, IServiceResponse } from '../interface/interfaces';
import UserModel from '../database/models/UserModel';
import Bcrypt from '../utils/bcrypt';

class LoginService {
  static async checkPassword(email: string, password: string): Promise<IServiceResponse> {
    const [result] = await UserModel.findAll({
      where: {
        email,
      },
    }) as IUser[];

    const isPasswordValid = await Bcrypt.checkPassword(password, result.password);

    if (isPasswordValid) {
      const token = createToken(email);
      return { error: null, result: token };
    }

    return { error: 'Invalid Password', result: null };
  }
}

export default LoginService;
