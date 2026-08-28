import fs from 'fs/promises';
import { CareerService } from '../services/careerService.js';
import { validateCareerApplication } from '../validators/careerValidator.js';

export class CareerController {
  static async submitApplication(req, res, next) {
    try {
      const payload = {
        jobId: req.body.jobId,
        jobTitle: req.body.jobTitle,
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        location: req.body.location,
        linkedinUrl: req.body.linkedinUrl || undefined,
        githubUrl: req.body.githubUrl || undefined,
        portfolioUrl: req.body.portfolioUrl || undefined,
        coverNote: req.body.coverNote || undefined,
        consentGiven: req.body.consentGiven === 'true' || req.body.consentGiven === true,
      };

      const result = validateCareerApplication(payload);
      if (!result.ok) {
        return res.status(400).json({
          success: false,
          message: 'Please review the application fields and try again.',
          errors: result.errors,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please attach a PDF or DOC/DOCX resume.',
          errors: { resume: 'A resume file is required.' },
        });
      }

      let application;
      try {
        application = await CareerService.createCareerApplication(result.sanitized, {
          ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
          userAgent: req.headers['user-agent'],
        }, req.file);
      } catch (error) {
        if (req.file.path) await fs.unlink(req.file.path).catch(() => { });
        throw error;
      }

      return res.status(201).json({
        success: true,
        message: 'Application submitted successfully. Our talent team will review your profile.',
        application: {
          id: application.id,
          jobId: application.jobId,
          jobTitle: application.jobTitle,
          status: application.status,
          submittedAt: application.submittedAt,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
}
