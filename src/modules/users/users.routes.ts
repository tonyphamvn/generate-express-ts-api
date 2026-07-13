import express from 'express';
import UsersController from '@/modules/users/users.controller';
import wrap from '@/shared/wrap';
import { requireAuth } from '@/middlewares/auth';

const router = express.Router();
const usersController = new UsersController();

router.get('/me', requireAuth, wrap(usersController.getMe));
router.get('/', wrap(usersController.list));

export default router;
