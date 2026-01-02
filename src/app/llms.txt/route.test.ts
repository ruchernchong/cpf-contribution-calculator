import { GET } from "./route";

describe("GET /llms.txt", () => {
  it("should return a text/plain response", async () => {
    const response = await GET();
    expect(response.headers.get("Content-Type")).toBe(
      "text/plain; charset=utf-8",
    );
  });

  it("should include the title in the response", async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain("# SimplyCPF");
  });

  it("should include API endpoints section", async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain("## API Endpoints");
  });

  it("should include developer portal section", async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain("## Developer Portal");
  });
});
