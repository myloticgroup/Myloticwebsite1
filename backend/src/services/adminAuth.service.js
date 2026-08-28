import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import Admin from '../models/admin.model.js';
import { AdminSessionModel } from '../models/adminAuth.model.js';
import { config } from '../config/env.js';

const hash = (value) => crypto.createHash('sha256').update(value).digest('hex');

export async function beginLogin(email, password) {
  const genericError = new Error('Unable to sign in with those credentials.');
  genericError.statusCode = 401;
  const admin = await Admin.findOne({ email: String(email || '').trim().toLowerCase() });
  if (!admin || !admin.isActive || admin.role !== 'ADMIN' || !(await bcrypt.compare(String(password || ''), admin.passwordHash))) throw genericError;
  const rawToken = crypto.randomBytes(32).toString('hex');
  await AdminSessionModel.create({ adminId: admin._id, tokenHash: hash(rawToken), expiresAt: new Date(Date.now() + config.sessionTtlHours * 3600000) });
  await Admin.updateOne({ _id: admin._id }, { lastLoginAt: new Date() });
  return { rawToken, admin: { id: admin._id.toString(), email: admin.email, name: admin.name, role: admin.role } };
}

export async function getSessionAdmin(rawToken) {
  if (!rawToken) return null;
  const session = await AdminSessionModel.findOne({ tokenHash: hash(rawToken), expiresAt: { $gt: new Date() } });
  if (!session) return null;
  const admin = await Admin.findOne({ _id: session.adminId, isActive: true, role: 'ADMIN' }).select('email name role isActive');
  if (!admin) return null;
  return { session, admin: { id: admin._id.toString(), email: admin.email, name: admin.name, role: admin.role } };
}

export async function endSession(rawToken) { if (rawToken) await AdminSessionModel.deleteOne({ tokenHash: hash(rawToken) }); }
