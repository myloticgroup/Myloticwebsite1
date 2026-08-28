import { Router } from 'express';
import { AdminController } from '../controllers/adminController.js';
import { requireAdminSession } from '../middleware/adminSession.js';
import { adminApiRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.use(requireAdminSession);
router.use(adminApiRateLimiter);

router.get('/summary', AdminController.getDashboardSummary);
router.get('/activity', AdminController.getActivity);
router.get('/admins', AdminController.getAdmins);
router.post('/admins', AdminController.createAdmin);
router.patch('/admins/:id', AdminController.updateAdmin);
router.get('/applications', AdminController.getApplications);
router.get('/applications/:id', AdminController.getApplicationById);
router.get('/applications/:id/resume', AdminController.getApplicationResume);
router.patch('/applications/:id', AdminController.updateApplicationStatus);

router.get('/contact-leads', AdminController.getContactLeads);
router.get('/contact-leads/:id', AdminController.getContactLeadById);
router.patch('/contact-leads/:id', AdminController.updateContactLeadStatus);

router.get('/consultation-leads', AdminController.getConsultationLeads);
router.get('/consultation-leads/:id', AdminController.getConsultationLeadById);
router.patch('/consultation-leads/:id', AdminController.updateConsultationLeadStatus);

router.get('/talent-leads', AdminController.getTalentLeads);
router.get('/talent-leads/:id', AdminController.getTalentLeadById);
router.patch('/talent-leads/:id', AdminController.updateTalentLeadStatus);

export default router;
