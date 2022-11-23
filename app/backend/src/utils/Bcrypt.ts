import * as bcrypt from 'bcryptjs';

class Bcrypt {
  static async checkPassword(password: string, hash: string): Promise<boolean> {
    const isPasswordValid = await bcrypt.compare(password, hash);
    return isPasswordValid;
  }
}

export default Bcrypt;
