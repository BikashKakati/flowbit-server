import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { catchAsync } from '../utils/catchAsync';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/auth/signup', catchAsync(authController.signup));
router.post('/auth/login', catchAsync(authController.login));
router.get('/users/me', requireAuth, catchAsync(authController.getProfile));
router.put('/users/me/profile', requireAuth, catchAsync(authController.updateProfile));

export default router;
