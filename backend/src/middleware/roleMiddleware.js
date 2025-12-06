import ErrorResponse from "../utils/errorResponse.js";

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorResponse("User not authenticated", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `Access denied: Only ${roles.join(
            ", "
          )} can access this resource`,
          403
        )
      );
    }

    next();
  };
};

// Alias for backward compatibility
const authorizeRoles = authorize;

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return next(new ErrorResponse("Access denied: Admin only", 403));
  }
};

// Check if user is recruiter
const isRecruiter = (req, res, next) => {
  if (req.user && req.user.role === "recruiter") {
    next();
  } else {
    return next(new ErrorResponse("Access denied: Recruiter only", 403));
  }
};

// Check if user is candidate
const isCandidate = (req, res, next) => {
  if (req.user && req.user.role === "candidate") {
    next();
  } else {
    return next(new ErrorResponse("Access denied: Candidate only", 403));
  }
};

export { authorize, authorizeRoles, isAdmin, isRecruiter, isCandidate };
