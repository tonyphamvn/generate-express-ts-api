/* eslint-disable no-unused-vars */
import { UserAttributes } from '@/modules/users/users.dto';

declare global {
  namespace Express {
    interface User extends UserAttributes {}
  }
}

export {};
