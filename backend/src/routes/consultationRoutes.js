import { Router } from 'express';
import { ConsultationController } from '../controllers/consultationController.js';
import { publicFormRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/', publicFormRateLimiter, ConsultationController.submitConsultation);

export default router;
