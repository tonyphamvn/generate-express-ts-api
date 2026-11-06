import { rateLimit } from 'express-rate-limit';
import config, { Environment } from '@/config';
import messages from '@/shared/messages';

/**
 * Limits brute-force attempts on credential endpoints (login/register).
 * Uses the in-memory store: counters are per process. When running multiple
 * instances (e.g. pm2 cluster), plug in a shared store such as rate-limit-redis.
 */
export const authRateLimiter = rateLimit({
  windowMs: config.authRateLimit.windowMs,
  limit: config.authRateLimit.max,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skip: () => config.environment === Environment.Test,
  message: { message: messages.auth.tooManyRequests },
});
