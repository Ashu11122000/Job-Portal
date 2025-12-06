import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import ApiResponse from "../utils/apiResponse.js";
import ErrorResponse from "../utils/errorResponse.js";
import catchAsync from "../utils/catchAsync.js";
import { comparePassword } from "../utils/hashPassword.js";

// 📝 Register New User
export const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorResponse("All fields are required", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new ErrorResponse("User already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || "candidate",
  });

  const token = generateToken(user._id, user.role);

  res.status(201).json(
    new ApiResponse(201, {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    }, "Registration successful")
  );
});

// 🔑 Login User
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Email and password are required", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorResponse("Invalid email or password", 401));
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid email or password", 401));
  }

  const token = generateToken(user._id, user.role);

  res.status(200).json(
    new ApiResponse(200, {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    }, "Login successful")
  );
});
