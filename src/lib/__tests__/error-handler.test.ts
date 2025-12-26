import { AppError, captureError, handleError } from "../error-handler";

describe("AppError", () => {
  it("should create an error with message", () => {
    const error = new AppError("Test error");
    expect(error.message).toBe("Test error");
    expect(error.name).toBe("AppError");
    expect(error.code).toBeUndefined();
  });

  it("should create an error with message and code", () => {
    const error = new AppError("Test error", "ERR_001");
    expect(error.message).toBe("Test error");
    expect(error.code).toBe("ERR_001");
  });
});

describe("handleError", () => {
  it("should return the same AppError if already an AppError", () => {
    const appError = new AppError("Original error", "ERR_001");
    const result = handleError(appError);
    expect(result).toBe(appError);
  });

  it("should wrap a standard Error in an AppError", () => {
    const standardError = new Error("Standard error");
    const result = handleError(standardError);
    expect(result).toBeInstanceOf(AppError);
    expect(result.message).toBe("Standard error");
  });

  it("should return a generic AppError for unknown error types", () => {
    const result = handleError("string error");
    expect(result).toBeInstanceOf(AppError);
    expect(result.message).toBe("An unexpected error occurred");
  });
});

describe("captureError", () => {
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  afterEach(() => {
    consoleSpy.mockClear();
  });

  it("should log error without context", () => {
    captureError(new Error("Test error"));
    expect(consoleSpy).toHaveBeenCalledWith("[Error]", expect.any(AppError));
  });

  it("should log error with context", () => {
    captureError(new Error("Test error"), "API");
    expect(consoleSpy).toHaveBeenCalledWith("[API]", expect.any(AppError));
  });
});
