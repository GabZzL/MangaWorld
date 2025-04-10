import { ErrorProps } from "../types/manga-types";

export function createError(error: ErrorProps): never {
  const status = error.status || 500;
  const statusText = error.statusText || "Internal Server Error";
  const errorData = JSON.stringify({
    message: error.message,
  });

  console.log(errorData);

  throw new Response(errorData, {
    status,
    statusText,
  });
}

export default createError;
