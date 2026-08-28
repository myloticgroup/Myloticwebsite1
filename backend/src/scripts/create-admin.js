import bcrypt from 'bcryptjs';
import Admin from '../models/admin.model.js';
import { config } from '../config/env.js';
import { connectDatabase, disconnectDatabase } from '../config/database.js';

const email = config.adminBootstrapEmail.trim().toLowerCase();
const name = config.adminBootstrapName.trim();

if (!email || !name || !config.adminBootstrapPassword) {
  console.error('Set ADMIN_BOOTSTRAP_EMAIL, ADMIN_BOOTSTRAP_NAME, and ADMIN_BOOTSTRAP_PASSWORD before creating an admin.');
  process.exitCode = 1;
} else {
  try {
    const connected = await connectDatabase();
    if (!connected) throw new Error('MongoDB is not connected. Refusing to create an admin without persistence.');
    const existing = await Admin.findOne({ email }).lean();
    if (existing) throw new Error('An admin with this email already exists.');
    await Admin.create({ email, name, passwordHash: await bcrypt.hash(config.adminBootstrapPassword, 12), role: 'ADMIN', isActive: true });
    console.log(`Admin created for ${email}.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
}