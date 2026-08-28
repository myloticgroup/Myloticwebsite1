import { Router } from 'express';
import { ContactController } from '../controllers/contactController.js';
import { publicFormRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', publicFormRateLimiter, ContactController.submitContact);

export default router;
