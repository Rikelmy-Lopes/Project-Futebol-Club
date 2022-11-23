import { IUser } from '../interface/interfaces';
import UserModel from '../database/models/UserModel';

class LoginModel {
  static async getUserByEmail(email: string): Promise<IUser | undefined> {
    const [result] = await UserModel.findAll({
      where: {
        email,
      },
    }) as IUser[];

    return result;
  }
}

export default LoginModel;
