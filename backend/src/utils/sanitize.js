export const sanitizeString = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.replace(/\s+/g, ' ').trim();
};

export const sanitizeOptionalString = (value) => {
  const cleaned = sanitizeString(value || '');
  return cleaned || undefined;
};

export const sanitizeEmail = (value) => sanitizeString(value).toLowerCase();

export const sanitizePhone = (value) => sanitizeString(value);

export const normalizeBoolean = (value) => {
  if (value === true || value === 'true' || value === 1 || value === '1') {
    return true;
  }

  return false;
};
