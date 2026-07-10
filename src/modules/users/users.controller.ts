import { Request, Response } from 'express';
import UsersService from '@/modules/users/users.service';
import { responseSuccess } from '@/shared/response';

class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  public list = async (_req: Request, res: Response) => {
    const users = await this.usersService.listUsers();
    return responseSuccess(res, users);
  };
}

export default UsersController;
