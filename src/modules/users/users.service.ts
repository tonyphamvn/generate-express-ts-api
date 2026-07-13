import { getEM } from '@/libs/mikro-orm';
import { User } from '@/entities/User';
import { EntityNotFoundError } from '@/shared/errors';

class UsersService {
  public async listUsers() {
    return getEM().find(
      User,
      {},
      {
        fields: ['id', 'email', 'createdAt', 'updatedAt'],
      },
    );
  }

  public async getMe(userId: number) {
    const user = await getEM().findOne(
      User,
      { id: userId },
      {
        fields: ['id', 'email', 'createdAt', 'updatedAt'],
      },
    );

    if (!user) {
      throw new EntityNotFoundError();
    }

    return user;
  }
}

export default UsersService;
