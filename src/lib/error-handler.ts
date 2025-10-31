export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError("An unexpected error occurred");
};

export const captureError = (error: unknown, context?: string): void => {
  const appError = handleError(error);

  if (process.env.NODE_ENV === "production") {
    // In production, you might want to send to error tracking service
    console.error(`[${context || "Error"}]`, appError.message);
  } else {
    console.error(`[${context || "Error"}]`, appError);
  }
};
