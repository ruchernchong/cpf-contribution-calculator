import { render, screen } from "@testing-library/react";
import React from "react";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import Footer from "../footer";

// Mock the current year to make tests deterministic
const mockDate = new Date(2024, 0, 1);
const originalDate = global.Date;

vi.mock("lucide-react", () => ({
  GithubIcon: () => <div data-testid="github-icon">GitHub</div>,
  HeartIcon: () => <div data-testid="heart-icon">Heart</div>,
}));

describe("Footer", () => {
  beforeAll(() => {
    // @ts-expect-error
    global.Date = class extends Date {
      constructor() {
        super();
        return mockDate;
      }
      getFullYear() {
        return 2024;
      }
    };
  });

  afterAll(() => {
    global.Date = originalDate;
  });

  it("renders disclaimer section", () => {
    render(<Footer />);
    expect(screen.getByText("Disclaimer")).toBeTruthy();
    expect(
      screen.getByText(/This calculator is an independent tool/),
    ).toBeTruthy();
  });

  it("renders quick links section with correct links", () => {
    render(<Footer />);
    expect(screen.getByText("Quick Links")).toBeTruthy();

    const aboutLink = screen.getByText("About Us");
    expect(aboutLink).toBeTruthy();
    expect(aboutLink.closest("a")?.getAttribute("href")).toBe("/about");

    const apiLink = screen.getByText("API Documentation");
    expect(apiLink).toBeTruthy();
    expect(apiLink.closest("a")?.getAttribute("href")).toBe("/api");
  });

  it("renders resources section with external links", () => {
    render(<Footer />);
    expect(screen.getByText("Resources")).toBeTruthy();

    const cpfLink = screen.getByText("CPF Official Website");
    expect(cpfLink).toBeTruthy();
    expect(cpfLink.closest("a")?.getAttribute("href")).toBe(
      "https://www.cpf.gov.sg",
    );
    expect(cpfLink.closest("a")?.getAttribute("target")).toBe("_blank");
    expect(cpfLink.closest("a")?.getAttribute("rel")).toBe(
      "noopener noreferrer",
    );

    const momLink = screen.getByText("Ministry of Manpower");
    expect(momLink).toBeTruthy();
    expect(momLink.closest("a")?.getAttribute("href")).toBe(
      "https://www.mom.gov.sg",
    );
  });

  it("displays the current year in copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/© 2024 CPF Calculator. All rights reserved./),
    ).toBeTruthy();
  });

  it("renders GitHub icon and 'Made with love' text", () => {
    render(<Footer />);
    expect(screen.getByTestId("github-icon")).toBeTruthy();
    expect(screen.getByTestId("heart-icon")).toBeTruthy();
    expect(screen.getByText(/Made with/)).toBeTruthy();
    expect(screen.getByText(/in Singapore/)).toBeTruthy();
  });
});
