import { Request, Response, NextFunction } from "express-serve-static-core";
import { AppError, ErrorResponse } from "../types/app-error";

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) => {
  console.log("Error", err.message);

  const statusCode = err.status || 500;

  res
    .status(statusCode)
    .json({ error: err.message || "Internal Server Error" });
};
