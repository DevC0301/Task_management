const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refreshToken.model");
const tokenService = require("../services/token.service");
const User = require("../models/user.model");
const Blacklist = require("../models/blacklist.model");

exports.register =  async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }

    // explicitly select password
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = tokenService.generateAccessToken(user._id);
    const refreshToken = await tokenService.generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict"
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized — token missing"
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET
    );

    const saved = await RefreshToken.findOne({ token });

    if (!saved) {
      return res.status(403).json({
        success: false,
        message: "Refresh token not found or revoked"
      });
    }

    const newAccess =
      tokenService.generateAccessToken(decoded.userId);

    return res.json({
      success: true,
      accessToken: newAccess
    });

  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired refresh token"
    });
  }
};

exports.logout = async (req, res) => {
   try {
    const accessHeader = req.headers.authorization;
    const token = req.cookies.refreshToken;
    if (!token) return res.sendStatus(401);
    
    if (accessHeader){
      const accessToken = accessHeader.split(" ")[1];
      // decode to get expiry
      const decoded = jwt.decode(accessToken);

      await Blacklist.create({
        token: accessToken,
        expiresAt: new Date(decoded.exp * 1000)
      });
    }
    


    await RefreshToken.deleteOne({ token });
    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }  
  
};
