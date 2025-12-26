import { GET } from "./route";

const createRequest = (birthDate?: string): Request => {
  const url = new URL("http://localhost/api/cpf/age/from-birthdate");
  if (birthDate !== undefined) {
    url.searchParams.set("birthDate", birthDate);
  }
  return new Request(url.toString());
};

describe("GET /api/cpf/age/from-birthdate", () => {
  it("should return 400 when birthDate is not provided", async () => {
    const request = createRequest();
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("birthDate is required");
  });

  it("should return 400 when birthDate format is invalid", async () => {
    const request = createRequest("1990-01");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("birthDate must be in MM/YYYY format");
  });

  it("should return 400 when birthDate is in the future", async () => {
    const futureYear = new Date().getFullYear() + 5;
    const request = createRequest(`01/${futureYear}`);
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("birthDate cannot be in the future");
  });

  it("should return age with correct structure", async () => {
    const request = createRequest("01/1990");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveProperty("birthDate");
    expect(data).toHaveProperty("age");
    expect(data.birthDate).toBe("01/1990");
    expect(typeof data.age).toBe("number");
  });

  it("should calculate age correctly", async () => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const birthYear = currentYear - 30;
    const birthMonth = currentMonth.toString().padStart(2, "0");

    const request = createRequest(`${birthMonth}/${birthYear}`);
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.age).toBe(30);
  });
});
