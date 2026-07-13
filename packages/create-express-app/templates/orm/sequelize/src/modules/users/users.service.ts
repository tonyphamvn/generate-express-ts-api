import userModel from '@/models/user.model';
import { UserStatic } from '@/types/user.types';

class UsersService {
  private userModel: UserStatic;

  constructor() {
    this.userModel = userModel;
  }

  public async listUsers() {
    return this.userModel.findAll({
      attributes: ['id', 'email', 'createdAt', 'updatedAt'],
    });
  }
}

export default UsersService;
