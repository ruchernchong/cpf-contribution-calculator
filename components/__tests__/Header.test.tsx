import React from 'react';
import { render, screen } from "@testing-library/react";
import { vi, expect, describe, it } from "vitest";
import Header from "../Header";

// Mock dependencies
vi.mock("@/components/ThemeToggle", () => ({
  __esModule: true,
  default: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}));

vi.mock("lucide-react", () => ({
  HomeIcon: () => <div data-testid="home-icon">Home Icon</div>,
  InfoIcon: () => <div data-testid="info-icon">Info Icon</div>,
  CodeIcon: () => <div data-testid="code-icon">Code Icon</div>,
}));

describe("Header", () => {
  it("renders the logo with link to homepage", () => {
    render(<Header />);
    
    const logoLink = screen.getByText("CPF Calculator");
    expect(logoLink).toBeTruthy();
    expect(logoLink.closest("a")?.getAttribute("href")).toBe("/");
  });
  
  it("renders navigation links with correct icons", () => {
    render(<Header />);
    
    // Home link
    expect(screen.getByText("Home")).toBeTruthy();
    expect(screen.getByTestId("home-icon")).toBeTruthy();
    
    // About link
    expect(screen.getByText("About")).toBeTruthy();
    expect(screen.getByTestId("info-icon")).toBeTruthy();
    
    // API link
    expect(screen.getByText("API")).toBeTruthy();
    expect(screen.getByTestId("code-icon")).toBeTruthy();
  });
  
  it("renders the theme toggle component", () => {
    render(<Header />);
    expect(screen.getByTestId("theme-toggle")).toBeTruthy();
  });
});