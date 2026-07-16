import express from 'express';
import { validate } from 'express-validation';
import AuthController from '@/modules/auth/auth.controller';
import wrap from '@/shared/wrap';
import authSchema from '@/modules/auth/auth.schema';

const router = express.Router();
const authController = new AuthController();

router.post('/register', validate(authSchema.auth), wrap(authController.register));
router.post('/login', validate(authSchema.auth), wrap(authController.login));

export default router;
