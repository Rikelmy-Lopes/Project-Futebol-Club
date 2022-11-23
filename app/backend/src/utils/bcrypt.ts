import * as bcrypt from 'bcryptjs';

class Bcrypt {
  private _password: string;
  private _hash: string;

  constructor(password: string, hash: string) {
    this._password = password;
    this._hash = hash;
  }

  async checkPassword(): Promise<boolean> {
    return bcrypt.compare(this._password, this._hash);
  }
}

export default Bcrypt;
