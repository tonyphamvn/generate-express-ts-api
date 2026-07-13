import { UserStatic } from '@/types/user.types';

// eslint-disable-next-line no-unused-vars
declare namespace Express {
  export interface Request {
    user?: UserStatic;
  }
}
