import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { config } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

const localOriginPattern = /^(https?:\/\/)?(localhost|127\.0\.0\.1|10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/;
const allowedOrigins = Array.isArray(config.corsOrigin) ? config.corsOrigin : [config.corsOrigin];
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || localOriginPattern.test(origin.replace(/^https?:\/\//, ''))) {
      return callback(null, true);
    }

    return callback(new Error('CORS origin not allowed.'));
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'Mylotic Website API',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', routes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use(errorHandler);

export default app;
