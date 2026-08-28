import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import { config } from '../config/env.js';

const uploadsDir = path.resolve(process.cwd(), config.uploadsDir, 'resumes');
fs.mkdirSync(uploadsDir, { recursive: true });

const allowedMimeTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]);

const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (allowedMimeTypes.has(file.mimetype)) {
      return cb(null, true);
    }

    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'resume'));
  },
});

export const uploadResume = {
  single(fieldName) {
    const parseUpload = multerUpload.single(fieldName);

    return (req, res, next) => parseUpload(req, res, (error) => {
      if (error) return next(error);
      if (!req.file) return next();

      const extension = path.extname(req.file.originalname).toLowerCase();
      const allowedExtensions = new Set(['.pdf', '.doc', '.docx']);
      const buffer = req.file.buffer;
      const isPdf = buffer.subarray(0, 5).toString('ascii') === '%PDF-';
      const isZipDocument = buffer[0] === 0x50 && buffer[1] === 0x4b && buffer[2] === 0x03 && buffer[3] === 0x04;
      const isLegacyWord = buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0;

      if (!allowedExtensions.has(extension) || buffer.length < 4 || (!isPdf && !isZipDocument && !isLegacyWord)) {
        const validationError = new Error('Resume content does not match a supported PDF or Word document.');
        validationError.statusCode = 400;
        return next(validationError);
      }

      const safeName = path.basename(req.file.originalname).replace(/[^a-zA-Z0-9._-]/g, '_');
      const filename = `${crypto.randomBytes(16).toString('hex')}-${safeName}`;
      const targetPath = path.join(uploadsDir, filename);
      fs.writeFileSync(targetPath, buffer);
      req.file = { ...req.file, path: targetPath, filename, originalname: safeName };
      return next();
    });
  },
};
