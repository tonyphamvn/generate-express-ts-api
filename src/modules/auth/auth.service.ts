import { AuthResponse, UserModel, UserStatic } from '@/types/user.types';
import { generateToken } from '@/libs/passport';
import userModel from '@/models/user.model';
import Bcrypt from '@/libs/bcrypt';
import { EntityNotFoundError } from '@/shared/errors';

class AuthService {
  private userModel: UserStatic;

  constructor() {
    this.userModel = userModel;
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.checkAuthenticated(email, password);
    if (!user) {
      throw new EntityNotFoundError();
    }
    const token = generateToken(user);

    return { token };
  }

  private async checkAuthenticated(email: string, password: string): Promise<UserModel | null> {
    const user = await this.userModel.findOne({ where: { email } });

    if (user?.password) {
      const compare = await Bcrypt.comparePassword(password, user.password);
      if (!compare) {
        return null;
      }
    }

    return user;
  }
}

export default AuthService;
