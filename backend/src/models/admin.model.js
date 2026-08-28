import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  name: { type: String, required: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['ADMIN'], default: 'ADMIN' },
  isActive: { type: Boolean, default: true, index: true },
  lastLoginAt: Date,
}, { timestamps: true });

const AdminDocument = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export default AdminDocument;
