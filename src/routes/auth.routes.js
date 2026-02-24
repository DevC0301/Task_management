const express = require("express");
const router = express.Router();

const {
  register,
  login,
  refresh,
  logout,
} = require("../controllers/auth.controller");

const { protect } = require("../middleware/auth.middleware");
const {loginLimiter,authLimiter} = require("../middleware/rateLimit.middleware");
const { validateRegister } = require("../validators/auth.validator");

// public routes
router.post("/register", authLimiter, validateRegister, register);
router.post("/login", loginLimiter, login);
router.post("/refresh", authLimiter,  refresh);
// protected route
router.post("/logout", protect, logout);

module.exports = router;
