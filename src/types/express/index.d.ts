/* eslint-disable no-unused-vars */
import { UserAttributes } from '../user.types';

declare global {
  namespace Express {
    interface User extends UserAttributes {}
  }
}

export {};
