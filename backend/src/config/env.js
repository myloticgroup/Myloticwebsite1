import dotenv from 'dotenv';

dotenv.config();

const parseOrigins = (value) => (value || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((entry) => entry.trim())
  .filter(Boolean);

export const config = {
  port: Number(process.env.PORT) || 5000,
  corsOrigin: parseOrigins(process.env.CORS_ORIGIN),
  mongoUri: process.env.MONGODB_URI || '',
  uploadsDir: process.env.UPLOADS_DIR || 'public/uploads',
  adminBootstrapEmail: process.env.ADMIN_BOOTSTRAP_EMAIL || '',
  adminBootstrapPassword: process.env.ADMIN_BOOTSTRAP_PASSWORD || '',
  adminBootstrapName: process.env.ADMIN_BOOTSTRAP_NAME || '',
  sessionTtlHours: 8,
};
