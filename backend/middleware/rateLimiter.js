import rateLimit from "express-rate-limit";

/**
 * Rate limiter to protect public APIs (contact form, auth, etc.)
 * Prevents spam & abuse
 */
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

export default rateLimiter;
