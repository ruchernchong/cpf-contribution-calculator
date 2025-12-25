import { cn } from "../utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
    expect(cn("class1", { class2: true, class3: false })).toBe("class1 class2");
    expect(cn("p-4", { "bg-red-500": true, "text-white": true })).toBe(
      "p-4 bg-red-500 text-white",
    );
  });

  it("should handle conditional classes", () => {
    const result = cn(
      "base-class",
      true && "applied-class",
      false && "not-applied-class",
    );
    expect(result).toBe("base-class applied-class");
  });

  it("should handle array inputs", () => {
    const result = cn(["class1", "class2"], ["class3"]);
    expect(result).toBe("class1 class2 class3");
  });

  it("should handle null and undefined values", () => {
    const result = cn(
      "base-class",
      null,
      undefined,
      false && "not-applied-class",
    );
    expect(result).toBe("base-class");
  });

  it("should properly merge tailwind classes", () => {
    // Testing tailwind-merge functionality - last conflicting class wins
    const result = cn(
      "p-2 p-4", // should use p-4 (last wins)
      "text-blue-500 text-red-500", // should use text-red-500 (last wins)
    );
    expect(result).toBe("p-4 text-red-500");
  });
});
