import { normalizeBoolean, sanitizeEmail, sanitizeOptionalString, sanitizePhone, sanitizeString } from '../utils/sanitize.js';

export function validateCareerApplication(payload = {}) {
  const errors = {};

  const jobId = sanitizeString(payload.jobId);
  const jobTitle = sanitizeString(payload.jobTitle);
  const fullName = sanitizeString(payload.fullName);
  const email = sanitizeEmail(payload.email);
  const phone = sanitizePhone(payload.phone);
  const location = sanitizeString(payload.location);
  const linkedinUrl = sanitizeOptionalString(payload.linkedinUrl);
  const githubUrl = sanitizeOptionalString(payload.githubUrl);
  const portfolioUrl = sanitizeOptionalString(payload.portfolioUrl);
  const coverNote = sanitizeOptionalString(payload.coverNote);
  const consentGiven = normalizeBoolean(payload.consentGiven ?? false);

  if (!jobId) {
    errors.jobId = 'Job id is required.';
  }

  if (!jobTitle) {
    errors.jobTitle = 'Job title is required.';
  }

  if (!fullName) {
    errors.fullName = 'Full name is required.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!phone || !/^[0-9+\s\-().]{7,20}$/.test(phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (!location) {
    errors.location = 'Current location is required.';
  }

  if (linkedinUrl && !/^https?:\/\//i.test(linkedinUrl)) {
    errors.linkedinUrl = 'Please enter a valid LinkedIn URL.';
  }

  if (githubUrl && !/^https?:\/\//i.test(githubUrl)) {
    errors.githubUrl = 'Please enter a valid GitHub URL.';
  }

  if (portfolioUrl && !/^https?:\/\//i.test(portfolioUrl)) {
    errors.portfolioUrl = 'Please enter a valid portfolio URL.';
  }

  if (!consentGiven) {
    errors.consentGiven = 'Please agree to the data-processing consent before submitting.';
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      jobId,
      jobTitle,
      fullName,
      email,
      phone,
      location,
      linkedinUrl,
      githubUrl,
      portfolioUrl,
      coverNote,
      consentGiven,
    },
  };
}
