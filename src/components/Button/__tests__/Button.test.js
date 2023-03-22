import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "..";

test("renders Button with correct text", () => {
  const buttonText = "Click me";
  render(<Button Text={buttonText} />);
  const buttonElement = screen.getByText(buttonText);
  expect(buttonElement).toBeInTheDocument();
});

test("calls onClick function when button is clicked", () => {
  const mockOnClick = jest.fn();
  render(<Button Text="Click me" onClick={mockOnClick} />);
  const buttonElement = screen.getByText("Click me");
  fireEvent.click(buttonElement);
  expect(mockOnClick).toHaveBeenCalled();
});