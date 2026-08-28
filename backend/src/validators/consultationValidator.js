import {
  normalizeBoolean,
  sanitizeEmail,
  sanitizeOptionalString,
  sanitizePhone,
  sanitizeString,
} from '../utils/sanitize.js';

export function validateConsultationLead(payload = {}) {
  const errors = {};

  const fullName = sanitizeString(payload.fullName);
  const email = sanitizeEmail(payload.email);
  const phone = sanitizePhone(payload.phone);
  const company = sanitizeOptionalString(payload.company);
  const jobTitle = sanitizeOptionalString(payload.jobTitle);
  const location = sanitizeOptionalString(payload.location);
  const requirement = sanitizeString(payload.requirement);
  const preferredDate = sanitizeOptionalString(payload.preferredDate);
  const preferredTime = sanitizeOptionalString(payload.preferredTime);
  const message = sanitizeOptionalString(payload.message);
  const consentGiven = normalizeBoolean(payload.consentGiven ?? true);

  if (!fullName) {
    errors.fullName = 'Full name is required.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (phone && !/^[0-9+\s\-().]{7,20}$/.test(phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!requirement) {
    errors.requirement = 'Please select what you are looking for.';
  }

  if (preferredDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dateValue = new Date(`${preferredDate}T00:00:00`);

    if (Number.isNaN(dateValue.getTime()) || dateValue < today) {
      errors.preferredDate = 'Consultation date cannot be in the past.';
    }
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
      company,
      jobTitle,
      location,
      requirement,
      preferredDate,
      preferredTime,
      message,
      consentGiven,
    },
  };
}
