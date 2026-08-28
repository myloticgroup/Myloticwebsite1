import ContactLeadModel from '../models/contactLead.model.js';
import { sanitizeEmail, sanitizeOptionalString, sanitizePhone, sanitizeString } from '../utils/sanitize.js';

export class ContactService {
  static async createContactLead(payload, metadata = {}) {
    const lead = await ContactLeadModel.create({
      fullName: sanitizeString(payload.fullName),
      email: sanitizeEmail(payload.email),
      phone: sanitizePhone(payload.phone),
      company: sanitizeOptionalString(payload.company),
      service: sanitizeString(payload.service),
      message: sanitizeString(payload.message),
      consentGiven: Boolean(payload.consentGiven),
      ipAddress: metadata.ipAddress || null,
      userAgent: metadata.userAgent || null,
    });

    return lead;
  }

  static getAllLeads() {
    return ContactLeadModel.findAll();
  }

  static getLeadById(id) {
    return ContactLeadModel.findById(id);
  }

  static updateLeadStatus(id, status, notes) {
    return ContactLeadModel.updateStatus(id, status, notes);
  }
}
