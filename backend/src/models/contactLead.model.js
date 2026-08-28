import mongoose from 'mongoose';
import { isDbConnected } from '../config/database.js';

const contactLeads = [];
const contactLeadSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true, index: true },
  phone: String,
  company: String,
  service: { type: String, required: true },
  message: { type: String, required: true },
  consentGiven: { type: Boolean, default: false },
  status: { type: String, enum: ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'CLOSED'], default: 'NEW', index: true },
  ipAddress: String,
  userAgent: String,
  notes: String,
  submittedAt: { type: Date, default: Date.now, index: true },
}, { timestamps: true });
contactLeadSchema.set('toJSON', { transform: (_doc, ret) => { ret.id = ret._id.toString(); delete ret._id; delete ret.__v; return ret; } });
const ContactLeadDocument = mongoose.models.ContactLead || mongoose.model('ContactLead', contactLeadSchema);

export const ContactLeadModel = {
  async create(data) {
    if (isDbConnected()) return ContactLeadDocument.create(data);
    const lead = {
      id: `contact-${Date.now()}-${contactLeads.length + 1}`,
      ...data,
      status: 'NEW',
      submittedAt: new Date().toISOString(),
    };

    contactLeads.unshift(lead);
    return lead;
  },

  async findAll() {
    if (isDbConnected()) return ContactLeadDocument.find().sort({ submittedAt: -1 }).lean();
    return [...contactLeads].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  },

  async findById(id) {
    if (isDbConnected()) return ContactLeadDocument.findById(id).lean();
    return contactLeads.find((lead) => lead.id === id) || null;
  },

  async updateStatus(id, status, notes) {
    if (isDbConnected()) return ContactLeadDocument.findByIdAndUpdate(id, { status, ...(notes !== undefined ? { notes } : {}) }, { new: true }).lean();
    const target = contactLeads.find((lead) => lead.id === id);
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

export default ContactLeadModel;
