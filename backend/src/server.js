import app from './app.js';
import { config } from './config/env.js';
import { connectDatabase } from './config/database.js';

const port = config.port;

try {
  const connected = await connectDatabase();
  if (!connected) {
    throw new Error('MongoDB connection is required before starting the server.');
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
} catch (error) {
  console.error(`[Server] Startup failed: ${error.message}`);
  process.exitCode = 1;
}
