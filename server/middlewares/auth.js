import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

export const isAdminAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { adminToken } = req.cookies;
  if (!adminToken) {
    return next(new ErrorHandler("Please login to continue", 401));
  }
  const decoded = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);
  req.admin = await Admin.findById(decoded.id);

  next();
});
