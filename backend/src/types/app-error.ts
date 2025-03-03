export interface AppError extends Error {
  status?: number;
}

export interface ErrorResponse {
  error: string;
}
