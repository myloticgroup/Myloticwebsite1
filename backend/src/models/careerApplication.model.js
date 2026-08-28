import mongoose from 'mongoose';
import { isDbConnected } from '../config/database.js';

const careerApplications = [];
const careerApplicationSchema = new mongoose.Schema({
  jobId: { type: String, required: true, index: true },
  jobTitle: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, index: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  linkedinUrl: String,
  githubUrl: String,
  portfolioUrl: String,
  resumeFileName: String,
  resumeStoredFileName: String,
  resumeMimeType: String,
  resumeSizeBytes: Number,
  coverNote: String,
  consentGiven: { type: Boolean, default: false },
  status: { type: String, enum: ['APPLIED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'SELECTED', 'REJECTED'], default: 'APPLIED', index: true },
  ipAddress: String,
  userAgent: String,
  internalNotes: String,
  submittedAt: { type: Date, default: Date.now, index: true },
}, { timestamps: true });
careerApplicationSchema.set('toJSON', { transform: (_doc, ret) => { ret.id = ret._id.toString(); delete ret._id; delete ret.__v; return ret; } });
const CareerApplicationDocument = mongoose.models.JobApplication || mongoose.model('JobApplication', careerApplicationSchema);

export const CareerApplicationModel = {
  async create(data) {
    if (isDbConnected()) return CareerApplicationDocument.create(data);
    const application = {
      id: `app-${Date.now()}-${careerApplications.length + 1}`,
      ...data,
      status: 'APPLIED',
      submittedAt: new Date().toISOString(),
    };

    careerApplications.unshift(application);
    return application;
  },

  async findAll() {
    if (isDbConnected()) return CareerApplicationDocument.find().sort({ submittedAt: -1 }).lean();
    return [...careerApplications].sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  },

  async findById(id) {
    if (isDbConnected()) return CareerApplicationDocument.findById(id).lean();
    return careerApplications.find((application) => application.id === id) || null;
  },

  async updateStatus(id, status, notes) {
    if (isDbConnected()) return CareerApplicationDocument.findByIdAndUpdate(id, { status, ...(notes !== undefined ? { internalNotes: notes } : {}) }, { new: true }).lean();
    const target = careerApplications.find((application) => application.id === id);
    if (!target) {
      return null;
    }

    target.status = status;
    if (notes) {
      target.internalNotes = notes;
    }

    return target;
  },
};

export default CareerApplicationModel;
