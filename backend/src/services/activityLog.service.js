import ActivityLog from '../models/activityLog.model.js';
import { isDbConnected } from '../config/database.js';

const localLogs = [];

export async function recordActivity({ admin, action, entityType, entityId, summary, ipAddress }) {
  const data = { adminId: admin?.id, action, entityType, entityId, summary, ipAddress };
  if (isDbConnected() && admin?.id !== 'api-key') return ActivityLog.create(data);
  localLogs.unshift({ id: `activity-${Date.now()}`, ...data, createdAt: new Date().toISOString() });
  return null;
}

export async function listActivity() {
  if (isDbConnected()) return ActivityLog.find().sort({ createdAt: -1 }).limit(200).lean();
  return localLogs;
}