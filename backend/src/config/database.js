import mongoose from 'mongoose';
import dns from 'dns';
import { config } from './env.js';

dns.setServers(['1.1.1.1', '8.8.8.8']);

let isConnected = false;

export async function connectDatabase() {
  if (isConnected) {
    return true;
  }

  if (!config.mongoUri) {
    console.warn(
      '[Database] MONGODB_URI is not configured. Using local development storage.'
    );
    return false;
  }

  try {
    const connection = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = connection.connection.readyState === 1;

    console.info(
      `[Database] MongoDB connected: ${connection.connection.host}`
    );

    return isConnected;
  } catch (error) {
    console.warn(
      `[Database] MongoDB connection failed: ${error.message}. Using local development storage.`
    );
    return false;
  }
}

export function isDbConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

export async function disconnectDatabase() {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
  }
}