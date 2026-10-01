import { Request, Response } from 'express';
import { UnauthorizedError } from '@/shared/errors';
import { responseSuccess } from '@/shared/response';
import UsersService from './users.service';

class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  public list = async (_req: Request, res: Response) => {
    const users = await this.usersService.listUsers();
    return responseSuccess(res, users);
  };

  public getMe = async (req: Request, res: Response) => {
    if (!req.user?.id) {
      throw new UnauthorizedError();
    }

    const user = await this.usersService.getMe(req.user.id);
    return responseSuccess(res, user);
  };
}

export default UsersController;
