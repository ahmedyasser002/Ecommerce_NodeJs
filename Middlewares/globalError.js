import AppError from "../Utils/AppError.js";


export const globalError = (err, req, res, next) => {
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    err = new AppError(`Duplicate ${key} value`, 400);
  }
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};