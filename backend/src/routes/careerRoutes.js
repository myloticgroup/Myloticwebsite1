import { Router } from 'express';
import { CareerController } from '../controllers/careerController.js';
import { publicFormRateLimiter } from '../middleware/rateLimiter.js';
import { uploadResume } from '../middleware/upload.js';

const router = Router();

router.post('/apply', publicFormRateLimiter, uploadResume.single('resume'), CareerController.submitApplication);

export default router;
