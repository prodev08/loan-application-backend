import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.LIMIT_WINDOW || '60') * 1000,
  limit: parseInt(process.env.LIMIT_MAX || '100'),
  legacyHeaders: false,
  message: 'Rate limit exceeded. Please try again later.',
});
