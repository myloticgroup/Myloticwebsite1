const statusSets = {
  application: new Set(['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'SELECTED', 'REJECTED']),
  lead: new Set(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED']),
  talent: new Set(['NEW', 'CONTACTED', 'QUALIFIED', 'ARCHIVED']),
};

function validateStatus(payload, allowedStatuses) {
  const status = typeof payload?.status === 'string' ? payload.status.trim().toUpperCase() : '';
  const notes = typeof payload?.notes === 'string' ? payload.notes.trim() : undefined;
  const internalNotes = typeof payload?.internalNotes === 'string' ? payload.internalNotes.trim() : undefined;

  if (!allowedStatuses.has(status)) {
    return { ok: false, errors: { status: 'A valid status is required.' } };
  }

  return { ok: true, status, notes, internalNotes };
}

export const validateApplicationStatus = (payload) => validateStatus(payload, statusSets.application);
export const validateLeadStatus = (payload) => validateStatus(payload, statusSets.lead);
export const validateTalentStatus = (payload) => validateStatus(payload, statusSets.talent);
