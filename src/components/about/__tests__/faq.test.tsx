import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FAQ from "../faq";

// Mock the UI components
vi.mock("@/components/ui/accordion", () => ({
  Accordion: ({ children }: any) => (
    <div data-testid="accordion">{children}</div>
  ),
  AccordionContent: ({ children }: any) => (
    <div data-testid="accordion-content">{children}</div>
  ),
  AccordionItem: ({ children, value }: any) => (
    <div data-testid={`accordion-item-${value}`}>{children}</div>
  ),
  AccordionTrigger: ({ children }: any) => (
    <div data-testid="accordion-trigger">{children}</div>
  ),
}));

vi.mock("@/components/ui/card", () => ({
  Card: ({ children, className }: any) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children }: any) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardHeader: ({ children }: any) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children, className }: any) => (
    <div data-testid="card-title" className={className}>
      {children}
    </div>
  ),
}));

describe("FAQ", () => {
  it("renders the FAQ component with title", () => {
    render(<FAQ />);
    expect(screen.getByTestId("card")).toBeTruthy();
    expect(screen.getByText("Frequently Asked Questions")).toBeTruthy();
  });

  it("renders the correct number of FAQ items", () => {
    render(<FAQ />);

    // Check for all 5 questions
    expect(screen.getByText("What is the CPF Income Ceiling?")).toBeTruthy();
    expect(
      screen.getByText("How is the CPF contribution calculated?"),
    ).toBeTruthy();
    expect(
      screen.getByText("What are the different CPF accounts?"),
    ).toBeTruthy();
    expect(screen.getByText("What is Additional Wage (AW)?")).toBeTruthy();
    expect(screen.getByText("How accurate is this calculator?")).toBeTruthy();
  });

  it("renders the correct answers for each question", () => {
    render(<FAQ />);

    // Check for answers
    expect(
      screen.getByText(/The CPF Income Ceiling is the maximum amount/),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /CPF contributions are calculated based on your monthly ordinary wages/,
      ),
    ).toBeTruthy();
    expect(
      screen.getByText(/The CPF consists of three main accounts/),
    ).toBeTruthy();
    expect(
      screen.getByText(/Additional Wage refers to non-regular income/),
    ).toBeTruthy();
    expect(
      screen.getByText(
        /This calculator provides estimates based on the official CPF contribution rates/,
      ),
    ).toBeTruthy();
  });

  it("renders accordion items with proper values", () => {
    render(<FAQ />);

    // Check for accordion items
    expect(screen.getByTestId("accordion-item-item-0")).toBeTruthy();
    expect(screen.getByTestId("accordion-item-item-1")).toBeTruthy();
    expect(screen.getByTestId("accordion-item-item-2")).toBeTruthy();
    expect(screen.getByTestId("accordion-item-item-3")).toBeTruthy();
    expect(screen.getByTestId("accordion-item-item-4")).toBeTruthy();
  });
});
