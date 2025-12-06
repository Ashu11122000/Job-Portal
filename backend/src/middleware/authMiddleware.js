import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

// 🔒 Verify Token
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized, no token", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      return next(new ErrorResponse("User not found", 404));
    }
    next();
  } catch (error) {
    console.error("Auth error:", error);
    return next(new ErrorResponse("Not authorized, token failed", 401));
  }
};

// 🧩 Role-Based Access Control
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          "Access denied: insufficient permissions",
          403
        )
      );
    }
    next();
  };
};
