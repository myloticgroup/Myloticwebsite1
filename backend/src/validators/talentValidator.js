import {
  normalizeBoolean,
  sanitizeEmail,
  sanitizeOptionalString,
  sanitizePhone,
  sanitizeString,
} from '../utils/sanitize.js';

export function validateTalentLead(payload = {}) {
  const errors = {};

  const fullName = sanitizeString(payload.fullName);
  const email = sanitizeEmail(payload.email);
  const phone = sanitizePhone(payload.phone);
  const skills = sanitizeString(payload.skills);
  const linkedinUrl = sanitizeOptionalString(payload.linkedinUrl);
  const portfolioUrl = sanitizeOptionalString(payload.portfolioUrl);
  const consentGiven = normalizeBoolean(payload.consentGiven ?? true);

  if (!fullName) {
    errors.fullName = 'Full name is required.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (phone && !/^\d{7,20}$/.test(phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!skills) {
    errors.skills = 'Please share your key skills or focus areas.';
  }

  if (linkedinUrl && !/^https?:\/\//i.test(linkedinUrl)) {
    errors.linkedinUrl = 'Please enter a valid LinkedIn URL.';
  }

  if (portfolioUrl && !/^https?:\/\//i.test(portfolioUrl)) {
    errors.portfolioUrl = 'Please enter a valid portfolio URL.';
  }

  if (!consentGiven) {
    errors.consentGiven = 'You must agree to continue.';
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      fullName,
      email,
      phone: phone || undefined,
      skills,
      linkedinUrl,
      portfolioUrl,
      consentGiven,
    },
  };
}
