import express from 'express';
import authRoutes from '@/modules/auth/routes';
import usersRoutes from '@/modules/users/routes';

const router = express.Router();

router.get('/', function (_req, res) {
  res.redirect('/health-check');
});

router.get('/health-check', function (_req, res) {
  res.send('APIs OK!');
});

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

export default router;
