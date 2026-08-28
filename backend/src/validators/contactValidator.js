import { normalizeBoolean, sanitizeEmail, sanitizeOptionalString, sanitizePhone, sanitizeString } from '../utils/sanitize.js';

export function validateContactLead(payload = {}) {
  const errors = {};

  const fullName = sanitizeString(payload.fullName);
  const email = sanitizeEmail(payload.email);
  const company = sanitizeOptionalString(payload.company);
  const phone = sanitizePhone(payload.phone);
  const service = sanitizeString(payload.service);
  const message = sanitizeString(payload.message);
  const consentGiven = normalizeBoolean(payload.consentGiven);

  if (!fullName) {
    errors.fullName = 'Full name is required.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (company && company.length > 120) {
    errors.company = 'Company name is too long.';
  }

  if (phone && !/^[0-9+\s\-().]{7,20}$/.test(phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!service) {
    errors.service = 'Please select the service you are interested in.';
  }

  if (!message) {
    errors.message = 'Please add a short message.';
  }

  if (!consentGiven) {
    errors.consentGiven = 'You must consent before submitting your inquiry.';
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      fullName,
      email,
      company,
      phone: phone || undefined,
      service,
      message,
      consentGiven,
    },
  };
}
