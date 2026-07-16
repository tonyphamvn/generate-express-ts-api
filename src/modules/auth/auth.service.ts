import { AuthResponse } from '@/modules/auth/auth.dto';
import { UserAttributes } from '@/modules/users/users.dto';
import { generateToken } from '@/infrastructure/auth/passport';
import Bcrypt from '@/infrastructure/auth/bcrypt';
import { ConflictError, EntityNotFoundError } from '@/shared/errors';
import messages from '@/shared/messages';
import { getEM } from '@/infrastructure/database/mikro-orm';
import { User } from '@/infrastructure/database/entities/User';

class AuthService {
  public async register(email: string, password: string): Promise<AuthResponse> {
    const existing = await this.findByEmail(email);

    if (existing) {
      throw new ConflictError(messages.auth.userExists);
    }

    const user = await this.createUser(email, await Bcrypt.generateHashPassword(password));

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
    const user = await this.findByEmail(email);

    if (user?.password) {
      const compare = await Bcrypt.comparePassword(password, user.password);
      if (!compare) {
        return null;
      }
    }

    return user;
  }

  private async findByEmail(email: string): Promise<User | null> {
    return getEM().findOne(User, { email });
  }

  private async createUser(email: string, hashedPassword: string): Promise<User> {
    const em = getEM();
    const user = em.create(User, {
      email,
      password: hashedPassword,
    });
    await em.persist(user).flush();
    return user;
  }
}

export default AuthService;
