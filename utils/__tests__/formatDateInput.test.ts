import { formatDateInput } from "../formatDateInput";

describe("formatDateInput", () => {
  it("should return the date in the correct format", () => {
    expect(formatDateInput("012024", "012024")).toBe("01/2024");
  });
});
