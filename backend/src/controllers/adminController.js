import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { ContactService } from '../services/contactService.js';
import { ConsultationService } from '../services/consultationService.js';
import { TalentService } from '../services/talentService.js';
import { CareerService } from '../services/careerService.js';
import { config } from '../config/env.js';
import { listActivity, recordActivity } from '../services/activityLog.service.js';
import Admin from '../models/admin.model.js';
import {
  validateApplicationStatus,
  validateLeadStatus,
  validateTalentStatus,
} from '../validators/adminValidator.js';

const sendNotFound = (res, label) => res.status(404).json({
  success: false,
  message: `${label} not found.`,
});

const sendStatusError = (res, result) => res.status(400).json({
  success: false,
  message: 'Please provide a valid status.',
  errors: result.errors,
});

export class AdminController {
  static async getAdmins(_req, res, next) {
    try {
      const admins = await Admin.find().select('name email role isActive createdAt updatedAt lastLoginAt').sort({ createdAt: 1 }).lean();
      return res.json({ success: true, data: admins });
    } catch (error) { return next(error); }
  }

  static async createAdmin(req, res, next) {
    try {
      const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
      const email = typeof req.body?.email === 'string' ? req.body.email.trim().toLowerCase() : '';
      const password = typeof req.body?.password === 'string' ? req.body.password : '';
      if (!name || !/^\S+@\S+\.\S+$/.test(email) || password.length < 12) return res.status(400).json({ success: false, message: 'Name, valid email, and a password of at least 12 characters are required.' });
      const admin = await Admin.create({ name, email, passwordHash: await bcrypt.hash(password, 12), role: 'ADMIN', isActive: true });
      await recordActivity({ admin: req.admin, action: 'ADMIN_CREATED', entityType: 'admin', entityId: admin._id.toString(), summary: `Admin account created for ${email}.`, ipAddress: req.ip });
      return res.status(201).json({ success: true, data: { id: admin._id, name: admin.name, email: admin.email, role: admin.role, isActive: admin.isActive } });
    } catch (error) { return next(error); }
  }

  static async updateAdmin(req, res, next) {
    try {
      const target = await Admin.findById(req.params.id);
      if (!target) return sendNotFound(res, 'Admin');
      const action = req.body?.isActive === false ? 'ADMIN_DEACTIVATED' : req.body?.isActive === true ? 'ADMIN_REACTIVATED' : null;
      if (action === 'ADMIN_DEACTIVATED' && target.isActive) {
        const activeCount = await Admin.countDocuments({ isActive: true, role: 'ADMIN' });
        if (activeCount <= 1) return res.status(400).json({ success: false, message: 'The last active Admin cannot be deactivated.' });
      }
      if (typeof req.body?.isActive === 'boolean') target.isActive = req.body.isActive;
      if (typeof req.body?.password === 'string' && req.body.password.length >= 12) target.passwordHash = await bcrypt.hash(req.body.password, 12);
      await target.save();
      if (action) await recordActivity({ admin: req.admin, action, entityType: 'admin', entityId: target._id.toString(), summary: `${target.email} account status changed.`, ipAddress: req.ip });
      return res.json({ success: true, data: { id: target._id, name: target.name, email: target.email, role: target.role, isActive: target.isActive } });
    } catch (error) { return next(error); }
  }

  static async getActivity(_req, res, next) {
    try { return res.json({ success: true, message: 'Activity retrieved.', data: await listActivity() }); }
    catch (error) { return next(error); }
  }

  static async getDashboardSummary(_req, res, next) {
    try {
      const [applications, contactLeads, consultationLeads, talentLeads] = await Promise.all([
        CareerService.getAllApplications(),
        ContactService.getAllLeads(),
        ConsultationService.getAllLeads(),
        TalentService.getAllLeads(),
      ]);

      return res.json({
        success: true,
        message: 'Dashboard summary retrieved.',
        data: {
          applications: applications.length,
          messages: contactLeads.length,
          consultations: consultationLeads.length,
          talent: talentLeads.length,
          newApplications: applications.filter((item) => item.status === 'APPLIED').length,
          newMessages: contactLeads.filter((item) => item.status === 'NEW').length,
          newConsultations: consultationLeads.filter((item) => item.status === 'NEW').length,
          newTalent: talentLeads.filter((item) => item.status === 'NEW').length,
        },
      });
    } catch (error) { return next(error); }
  }

  static async getApplications(_req, res, next) {
    try {
      return res.json({ success: true, message: 'Applications retrieved', data: await CareerService.getAllApplications() });
    } catch (error) { return next(error); }
  }

  static async getApplicationById(req, res, next) {
    try {
      const application = await CareerService.getApplicationById(req.params.id);
      if (!application) return sendNotFound(res, 'Application');
      return res.json({ success: true, message: 'Application retrieved', data: application });
    } catch (error) { return next(error); }
  }

  static async getApplicationResume(req, res, next) {
    try {
      const application = await CareerService.getApplicationById(req.params.id);
      if (!application) return sendNotFound(res, 'Application');

      const fileName = application.resumeStoredFileName || application.resumeFileName;
      if (typeof fileName !== 'string' || !fileName.trim()) {
        return res.status(404).json({ success: false, message: 'Resume file not available for this application.' });
      }

      const resumesDirectory = path.resolve(process.cwd(), config.uploadsDir, 'resumes');
      const candidatePath = path.resolve(resumesDirectory, path.basename(fileName));
      const relativePath = path.relative(resumesDirectory, candidatePath);
      if (relativePath.startsWith('..') || path.isAbsolute(relativePath) || !fs.existsSync(candidatePath)) {
        return res.status(404).json({ success: false, message: 'Resume file not found.' });
      }

      const contentType = application.resumeMimeType || 'application/octet-stream';
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(application.resumeFileName || fileName)}"`);
      return res.sendFile(candidatePath);
    } catch (error) { return next(error); }
  }

  static async updateApplicationStatus(req, res, next) {
    try {
      const result = validateApplicationStatus(req.body);
      if (!result.ok) return sendStatusError(res, result);
      const application = await CareerService.updateApplicationStatus(req.params.id, result.status, result.internalNotes);
      if (!application) return sendNotFound(res, 'Application');
      await recordActivity({ admin: req.admin, action: 'APPLICATION_STATUS_UPDATED', entityType: 'application', entityId: req.params.id, summary: `Application status changed to ${result.status}.`, ipAddress: req.ip });
      return res.json({ success: true, message: 'Application status updated successfully.', data: application });
    } catch (error) { return next(error); }
  }

  static async getContactLeads(_req, res, next) {
    try { return res.json({ success: true, message: 'Contact leads retrieved', data: await ContactService.getAllLeads() }); }
    catch (error) { return next(error); }
  }

  static async getContactLeadById(req, res, next) {
    try {
      const lead = await ContactService.getLeadById(req.params.id);
      if (!lead) return sendNotFound(res, 'Contact lead');
      return res.json({ success: true, message: 'Contact lead retrieved', data: lead });
    } catch (error) { return next(error); }
  }

  static async updateContactLeadStatus(req, res, next) {
    try {
      const result = validateLeadStatus(req.body);
      if (!result.ok) return sendStatusError(res, result);
      const lead = await ContactService.updateLeadStatus(req.params.id, result.status, result.notes);
      if (!lead) return sendNotFound(res, 'Contact lead');
      await recordActivity({ admin: req.admin, action: 'CONTACT_STATUS_UPDATED', entityType: 'contact-lead', entityId: req.params.id, summary: `Contact status changed to ${result.status}.`, ipAddress: req.ip });
      return res.json({ success: true, message: 'Contact lead status updated successfully.', data: lead });
    } catch (error) { return next(error); }
  }

  static async getConsultationLeads(_req, res, next) {
    try { return res.json({ success: true, message: 'Consultation leads retrieved', data: await ConsultationService.getAllLeads() }); }
    catch (error) { return next(error); }
  }

  static async getConsultationLeadById(req, res, next) {
    try {
      const lead = await ConsultationService.getLeadById(req.params.id);
      if (!lead) return sendNotFound(res, 'Consultation lead');
      return res.json({ success: true, message: 'Consultation lead retrieved', data: lead });
    } catch (error) { return next(error); }
  }

  static async updateConsultationLeadStatus(req, res, next) {
    try {
      const result = validateLeadStatus(req.body);
      if (!result.ok) return sendStatusError(res, result);
      const lead = await ConsultationService.updateLeadStatus(req.params.id, result.status, result.notes);
      if (!lead) return sendNotFound(res, 'Consultation lead');
      await recordActivity({ admin: req.admin, action: 'CONSULTATION_STATUS_UPDATED', entityType: 'consultation-lead', entityId: req.params.id, summary: `Consultation status changed to ${result.status}.`, ipAddress: req.ip });
      return res.json({ success: true, message: 'Consultation lead status updated successfully.', data: lead });
    } catch (error) { return next(error); }
  }

  static async getTalentLeads(_req, res, next) {
    try { return res.json({ success: true, message: 'Talent leads retrieved', data: await TalentService.getAllLeads() }); }
    catch (error) { return next(error); }
  }

  static async getTalentLeadById(req, res, next) {
    try {
      const lead = await TalentService.getLeadById(req.params.id);
      if (!lead) return sendNotFound(res, 'Talent lead');
      return res.json({ success: true, message: 'Talent lead retrieved', data: lead });
    } catch (error) { return next(error); }
  }

  static async updateTalentLeadStatus(req, res, next) {
    try {
      const result = validateTalentStatus(req.body);
      if (!result.ok) return sendStatusError(res, result);
      const lead = await TalentService.updateLeadStatus(req.params.id, result.status, result.internalNotes);
      if (!lead) return sendNotFound(res, 'Talent lead');
      await recordActivity({ admin: req.admin, action: 'TALENT_STATUS_UPDATED', entityType: 'talent-lead', entityId: req.params.id, summary: `Talent status changed to ${result.status}.`, ipAddress: req.ip });
      return res.json({ success: true, message: 'Talent lead status updated successfully.', data: lead });
    } catch (error) { return next(error); }
  }
}
