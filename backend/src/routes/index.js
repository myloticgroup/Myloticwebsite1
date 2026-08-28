import { Router } from 'express';
import contactRoutes from './contactRoutes.js';
import consultationRoutes from './consultationRoutes.js';
import talentRoutes from './talentRoutes.js';
import careerRoutes from './careerRoutes.js';
import adminAuthRoutes from './adminAuthRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Mylotic API is ready',
    endpoints: [
      '/health',
      '/api/contact',
      '/api/consultations',
      '/api/talent',
      '/api/careers',
      '/api/admin',
    ],
  });
});

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Backend is running',
    timestamp: new Date().toISOString(),
  });
});

router.use('/contact', contactRoutes);
router.use('/consultations', consultationRoutes);
router.use('/talent', talentRoutes);
router.use('/careers', careerRoutes);
router.use('/admin/auth', adminAuthRoutes);
router.use('/admin', adminRoutes);

export default router;
