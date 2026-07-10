/* eslint-disable */
import { UserStatic } from '@/types/user.types';

declare namespace Express {
  export interface Request {
    user?: UserStatic;
  }
}
