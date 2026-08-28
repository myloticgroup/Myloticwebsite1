import app from './app.js';
import { config } from './config/env.js';
import { connectDatabase } from './config/database.js';

const port = config.port;

connectDatabase().finally(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
