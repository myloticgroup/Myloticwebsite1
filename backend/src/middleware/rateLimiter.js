const requestBuckets = new Map();

const makeRateLimiter = (maxRequests, windowMs) => (req, res, next) => {
  const key = req.ip || req.headers['x-forwarded-for'] || 'unknown-client';
  const now = Date.now();
  if (requestBuckets.size > 1000) {
    for (const [bucketKey, timestamps] of requestBuckets) {
      if (!timestamps.some((timestamp) => now - timestamp < windowMs)) requestBuckets.delete(bucketKey);
    }
  }
  const previousRequests = requestBuckets.get(key) || [];
  const activeRequests = previousRequests.filter((timestamp) => now - timestamp < windowMs);

  if (activeRequests.length >= maxRequests) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please try again shortly.',
    });
  }

  activeRequests.push(now);
  requestBuckets.set(key, activeRequests);
  return next();
};

export const publicFormRateLimiter = makeRateLimiter(12, 60 * 1000);
export const adminApiRateLimiter = makeRateLimiter(60, 60 * 1000);
