import mongoose from 'mongoose';
import { isDbConnected } from '../config/database.js';

const consultationLeads = [];
const consultationLeadSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, index: true },
  phone: String,
  company: String,
  jobTitle: String,
  location: String,
  requirement: { type: String, required: true },
  preferredDate: String,
  preferredTime: String,
  message: String,
  consentGiven: { type: Boolean, default: true },
  status: { type: String, enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'], default: 'NEW', index: true },
  ipAddress: String,
  userAgent: String,
  notes: String,
  submittedAt: { type: Date, default: Date.now, index: true },
}, { timestamps: true });
consultationLeadSchema.set('toJSON', { transform: (_doc, ret) => { ret.id = ret._id.toString(); delete ret._id; delete ret.__v; return ret; } });
const ConsultationLeadDocument = mongoose.models.ConsultationLead || mongoose.model('ConsultationLead', consultationLeadSchema);

export const ConsultationLeadModel = {
  async create(data) {
    if (isDbConnected()) return ConsultationLeadDocument.create(data);
    const lead = {
      id: `consultation-${Date.now()}-${consultationLeads.length + 1}`,
      ...data,
      status: 'NEW',
      submittedAt: new Date().toISOString(),
    };

    consultationLeads.unshift(lead);
    return lead;
  },

  async findAll() {
    if (isDbConnected()) return ConsultationLeadDocument.find().sort({ submittedAt: -1 }).lean();
    return [...consultationLeads].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  },

  async findById(id) {
    if (isDbConnected()) return ConsultationLeadDocument.findById(id).lean();
    return consultationLeads.find((lead) => lead.id === id) || null;
  },

  async updateStatus(id, status, notes) {
    if (isDbConnected()) return ConsultationLeadDocument.findByIdAndUpdate(id, { status, ...(notes !== undefined ? { notes } : {}) }, { new: true }).lean();
    const target = consultationLeads.find((lead) => lead.id === id);
    if (!target) {
      return null;
    }

    target.status = status;
    if (notes) {
      target.notes = notes;
    }

    return target;
  },
};

export default ConsultationLeadModel;
