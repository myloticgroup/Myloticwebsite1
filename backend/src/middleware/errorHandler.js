export const errorHandler = (error, _req, res, _next) => {
  console.error('[API Error]', error);

  const isMalformedJson = error.type === 'entity.parse.failed';
  const isValidationError = error.name === 'ValidationError';
  const statusCode = error.name === 'MulterError' || isMalformedJson || isValidationError ? 400 : error.statusCode || 500;
  const message = isMalformedJson
    ? 'Request body contains invalid JSON.'
    : isValidationError
      ? 'Request data failed validation.'
      : error.name === 'MulterError' && error.code === 'LIMIT_FILE_SIZE'
        ? 'Resume must be 10 MB or smaller.'
        : error.name === 'MulterError'
          ? 'Please upload a valid PDF or DOC/DOCX resume.'
          : error.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
  });
};
