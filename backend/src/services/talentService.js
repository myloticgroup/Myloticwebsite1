import TalentLeadModel from '../models/talentLead.model.js';
import {
  sanitizeEmail,
  sanitizeOptionalString,
  sanitizePhone,
  sanitizeString,
} from '../utils/sanitize.js';

export class TalentService {
  static async createTalentLead(payload, metadata = {}) {
    const lead = await TalentLeadModel.create({
      fullName: sanitizeString(payload.fullName),
      email: sanitizeEmail(payload.email),
      phone: sanitizePhone(payload.phone),
      skills: sanitizeString(payload.skills),
      linkedinUrl: sanitizeOptionalString(payload.linkedinUrl),
      portfolioUrl: sanitizeOptionalString(payload.portfolioUrl),
      ipAddress: metadata.ipAddress || null,
      userAgent: metadata.userAgent || null,
    });

    return lead;
  }

  static getAllLeads() {
    return TalentLeadModel.findAll();
  }

  static getLeadById(id) {
    return TalentLeadModel.findById(id);
  }

  static updateLeadStatus(id, status, notes) {
    return TalentLeadModel.updateStatus(id, status, notes);
  }
}
