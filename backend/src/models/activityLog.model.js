import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  action: { type: String, required: true },
  entityType: String,
  entityId: String,
  summary: { type: String, required: true },
  ipAddress: String,
}, { timestamps: true });

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);
