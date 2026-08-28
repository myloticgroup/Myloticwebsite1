import ConsultationLeadModel from '../models/consultationLead.model.js';
import {
  sanitizeEmail,
  sanitizeOptionalString,
  sanitizePhone,
  sanitizeString,
} from '../utils/sanitize.js';

export class ConsultationService {
  static async createConsultationLead(payload, metadata = {}) {
    const lead = await ConsultationLeadModel.create({
      fullName: sanitizeString(payload.fullName),
      email: sanitizeEmail(payload.email),
      phone: sanitizePhone(payload.phone),
      company: sanitizeOptionalString(payload.company),
      jobTitle: sanitizeOptionalString(payload.jobTitle),
      location: sanitizeOptionalString(payload.location),
      requirement: sanitizeString(payload.requirement),
      preferredDate: sanitizeOptionalString(payload.preferredDate),
      preferredTime: sanitizeOptionalString(payload.preferredTime),
      message: sanitizeOptionalString(payload.message),
      ipAddress: metadata.ipAddress || null,
      userAgent: metadata.userAgent || null,
    });

    return lead;
  }

  static getAllLeads() {
    return ConsultationLeadModel.findAll();
  }

  static getLeadById(id) {
    return ConsultationLeadModel.findById(id);
  }

  static updateLeadStatus(id, status, notes) {
    return ConsultationLeadModel.updateStatus(id, status, notes);
  }
}
