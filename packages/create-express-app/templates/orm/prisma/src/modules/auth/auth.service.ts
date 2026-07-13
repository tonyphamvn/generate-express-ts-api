import { AuthResponse, UserAttributes } from '@/types/user.types';
import { generateToken } from '@/libs/passport';
import prisma from '@/libs/prisma';
import Bcrypt from '@/libs/bcrypt';
import { EntityNotFoundError } from '@/shared/errors';

class AuthService {
  public async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.checkAuthenticated(email, password);
    if (!user) {
      throw new EntityNotFoundError();
    }
    const token = generateToken(user);

    return { token };
  }

  private async checkAuthenticated(
    email: string,
    password: string,
  ): Promise<UserAttributes | null> {
    const user = await prisma.user.findUnique({ where: { email } });

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
