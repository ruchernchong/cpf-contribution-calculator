import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { Header } from "../header";

// Mock dependencies
vi.mock("@hugeicons/react", () => ({
  HugeiconsIcon: ({
    icon,
    ...props
  }: {
    icon: unknown;
    "data-testid"?: string;
  }) => <div data-testid={props["data-testid"] || "hugeicon"}>Icon</div>,
}));

vi.mock("@hugeicons/core-free-icons", () => ({
  CodeIcon: "CodeIcon",
  Home01Icon: "Home01Icon",
  InformationCircleIcon: "InformationCircleIcon",
}));

describe("Header", () => {
  it("renders the logo with link to homepage", () => {
    render(<Header />);

    const logoLink = screen.getByText("SimplyCPF");
    expect(logoLink).toBeTruthy();
    expect(logoLink.closest("a")?.getAttribute("href")).toBe("/");
  });

  it("renders navigation links", () => {
    render(<Header />);

    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByText("About")).toBeTruthy();
  });
});
