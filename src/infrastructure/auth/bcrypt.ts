import bcrypt from 'bcrypt';
import config from '@config';

class Bcrypt {
  private salt: string;

  constructor(salt: string) {
    this.salt = salt;
  }

  public async generateHashPassword(password: string): Promise<string> {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(parseInt(this.salt, 10)));
  }

  public async comparePassword(newPass: string, currentPass: string): Promise<boolean> {
    return bcrypt.compareSync(newPass, currentPass);
  }
}

export default new Bcrypt(config.salt);
