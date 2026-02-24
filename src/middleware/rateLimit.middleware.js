const rateLimit = require("express-rate-limit");

// strict limiter for login 
// 5 attempts → blocked for 15 minutes
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // max attempts
  message: {
    success: false,
    message: "Too many login attempts — try again later"
  }
});

// general auth limiter
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: {
    success: false,
    message: "Too many requests — slow down"
  }
});