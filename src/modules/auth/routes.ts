import express from 'express';
import { validate } from 'express-validation';
import AuthController from '@/modules/auth/auth.controller';
import wrap from '@/shared/wrap';
import authSchema from '@/modules/auth/auth.schema';
import { authRateLimiter } from '@/shared/middlewares/rate-limit';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authRateLimiter, validate(authSchema.auth), wrap(authController.register));
router.post('/login', authRateLimiter, validate(authSchema.auth), wrap(authController.login));

export default router;
