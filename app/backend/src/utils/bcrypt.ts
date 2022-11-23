import * as bcrypt from 'bcryptjs';

class Bcrypt {
  static async checkPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export default Bcrypt;
