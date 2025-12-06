import ErrorResponse from "../utils/errorResponse.js";

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong MongoDB ID error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorResponse(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    err = new ErrorResponse(message, 400);
  }

  // JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again`;
    err = new ErrorResponse(message, 400);
  }

  // JWT expired error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again`;
    err = new ErrorResponse(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === "dev" && { stack: err.stack }),
  });
};

export default errorHandler;
