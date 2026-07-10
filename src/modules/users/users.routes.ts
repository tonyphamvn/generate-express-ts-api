import express from 'express';
import UsersController from '@/modules/users/users.controller';
import wrap from '@/shared/wrap';

const router = express.Router();
const usersController = new UsersController();

router.get('/', wrap(usersController.list));

export default router;
