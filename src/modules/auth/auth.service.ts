import { AuthResponse, UserAttributes } from '@/types/user.types';
import { generateToken } from '@/libs/passport';
import { getEM } from '@/libs/mikro-orm';
import { User } from '@/entities/User';
import Bcrypt from '@/libs/bcrypt';
import { ConflictError, EntityNotFoundError } from '@/shared/errors';
import messages from '@/shared/messages';

class AuthService {
  public async register(email: string, password: string): Promise<AuthResponse> {
    const em = getEM();
    const existing = await em.findOne(User, { email });

    if (existing) {
      throw new ConflictError(messages.auth.userExists);
    }

    const user = em.create(User, {
      email,
      password: await Bcrypt.generateHashPassword(password),
    });
    await em.persist(user).flush();

    return { token: generateToken(user) };
  }

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
    const user = await getEM().findOne(User, { email });

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
