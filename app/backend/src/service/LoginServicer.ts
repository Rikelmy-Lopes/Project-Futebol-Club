import UserModel from '../database/models/UserModel';
import Bcrypt from '../utils/bcrypt';

class LoginService {
  static async checkPassword(email: string, password: string): Promise<boolean> {
    const [result] = await UserModel.findAll({
      where: {
        email,
      },
    }) as any;
    const bcrypt = new Bcrypt(password, result.password);
    const isPasswordValid = await bcrypt.checkPassword();
    return isPasswordValid;
  }
}

export default LoginService;
