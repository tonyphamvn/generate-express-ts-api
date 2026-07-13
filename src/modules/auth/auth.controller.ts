import { NextFunction, Request, Response } from 'express';
import { responseSuccess } from '@/shared/response';
import AuthService from '@/modules/auth/auth.service';
import { BadRequestError } from '@/shared/errors';

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;
    const data = await this.authService.register(email, password);
    return responseSuccess(res, data);
  };

  public login = async (req: Request, res: Response, _next: NextFunction) => {
    const { email, password } = req.body;

    const data = await this.authService.login(email, password);
    if (!data) {
      throw new BadRequestError();
    }
    return responseSuccess(res, data);
  };
}

export default AuthController;
