import CareerApplicationModel from '../models/careerApplication.model.js';
import {
  sanitizeEmail,
  sanitizeOptionalString,
  sanitizePhone,
  sanitizeString,
} from '../utils/sanitize.js';

export class CareerService {
  static async createCareerApplication(payload, metadata = {}, file = null) {
    const application = await CareerApplicationModel.create({
      jobId: sanitizeString(payload.jobId),
      jobTitle: sanitizeString(payload.jobTitle),
      fullName: sanitizeString(payload.fullName),
      email: sanitizeEmail(payload.email),
      phone: sanitizePhone(payload.phone),
      location: sanitizeString(payload.location),
      linkedinUrl: sanitizeOptionalString(payload.linkedinUrl),
      githubUrl: sanitizeOptionalString(payload.githubUrl),
      portfolioUrl: sanitizeOptionalString(payload.portfolioUrl),
      coverNote: sanitizeOptionalString(payload.coverNote),
      consentGiven: Boolean(payload.consentGiven),
      resumeFileName: file?.originalname || null,
      resumeStoredFileName: file?.filename || null,
      resumeMimeType: file?.mimetype || null,
      resumeSizeBytes: file?.size || null,
      ipAddress: metadata.ipAddress || null,
      userAgent: metadata.userAgent || null,
    });

    return application;
  }

  static getAllApplications() {
    return CareerApplicationModel.findAll();
  }

  static getApplicationById(id) {
    return CareerApplicationModel.findById(id);
  }

  static updateApplicationStatus(id, status, notes) {
    return CareerApplicationModel.updateStatus(id, status, notes);
  }
}
