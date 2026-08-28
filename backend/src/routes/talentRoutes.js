import { Router } from 'express';
import { TalentController } from '../controllers/talentController.js';
import { publicFormRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', publicFormRateLimiter, TalentController.submitTalentProfile);

export default router;
