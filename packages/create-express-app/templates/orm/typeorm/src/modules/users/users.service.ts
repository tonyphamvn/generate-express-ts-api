import { AppDataSource } from '@/libs/typeorm';
import { User } from '@/entities/user.entity';

class UsersService {
  public async listUsers() {
    return AppDataSource.getRepository(User).find({
      select: ['id', 'email', 'createdAt', 'updatedAt'],
    });
  }
}

export default UsersService;
