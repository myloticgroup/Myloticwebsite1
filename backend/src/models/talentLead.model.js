import mongoose from 'mongoose';
import { isDbConnected } from '../config/database.js';

const talentLeads = [];
const talentLeadSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, index: true },
  phone: String,
  skills: { type: String, required: true },
  linkedinUrl: String,
  portfolioUrl: String,
  status: { type: String, enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'ARCHIVED'], default: 'NEW', index: true },
  ipAddress: String,
  userAgent: String,
  notes: String,
  submittedAt: { type: Date, default: Date.now, index: true },
}, { timestamps: true });
talentLeadSchema.set('toJSON', { transform: (_doc, ret) => { ret.id = ret._id.toString(); delete ret._id; delete ret.__v; return ret; } });
const TalentLeadDocument = mongoose.models.TalentLead || mongoose.model('TalentLead', talentLeadSchema);

export const TalentLeadModel = {
  async create(data) {
    if (isDbConnected()) return TalentLeadDocument.create(data);
    const lead = {
      id: `talent-${Date.now()}-${talentLeads.length + 1}`,
      ...data,
      status: 'NEW',
      submittedAt: new Date().toISOString(),
    };

    talentLeads.unshift(lead);
    return lead;
  },

  async findAll() {
    if (isDbConnected()) return TalentLeadDocument.find().sort({ submittedAt: -1 }).lean();
    return [...talentLeads].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  },

  async findById(id) {
    if (isDbConnected()) return TalentLeadDocument.findById(id).lean();
    return talentLeads.find((lead) => lead.id === id) || null;
  },

  async updateStatus(id, status, notes) {
    if (isDbConnected()) return TalentLeadDocument.findByIdAndUpdate(id, { status, ...(notes !== undefined ? { notes } : {}) }, { new: true }).lean();
    const target = talentLeads.find((lead) => lead.id === id);
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

export default TalentLeadModel;
