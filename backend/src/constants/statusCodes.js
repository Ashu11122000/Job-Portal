export const STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password",
  USER_ALREADY_EXISTS: "User already exists",
  USER_NOT_FOUND: "User not found",
  UNAUTHORIZED: "Not authorized to access this resource",
  FORBIDDEN: "Access denied",
  NOT_FOUND: "Resource not found",
  SERVER_ERROR: "Internal server error",
};

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Login successful",
  REGISTER_SUCCESS: "Registration successful",
  LOGOUT_SUCCESS: "Logout successful",
  PROFILE_UPDATED: "Profile updated successfully",
};
