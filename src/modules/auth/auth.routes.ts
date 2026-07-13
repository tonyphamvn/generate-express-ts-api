import express from 'express';
import { validate } from 'express-validation';
import AuthController from '@/modules/auth/auth.controller';
import wrap from '@/shared/wrap';
import authValidation from '@/modules/auth/auth.validation';

const router = express.Router();
const authController = new AuthController();

router.post('/register', validate(authValidation.auth), wrap(authController.register));
router.post('/login', validate(authValidation.auth), wrap(authController.login));

export default router;
