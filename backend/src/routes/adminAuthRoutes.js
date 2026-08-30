import { Router } from 'express';
import { AdminAuthController } from '../controllers/adminAuthController.js';
import { requireAdminSession } from '../middleware/adminSession.js';
import { publicFormRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();
router.post('/login', publicFormRateLimiter, AdminAuthController.login);
router.post('/logout', AdminAuthController.logout);
router.get('/me', requireAdminSession, AdminAuthController.me);
export default router;
