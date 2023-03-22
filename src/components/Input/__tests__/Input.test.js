import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import Input from "..";

describe("Input component", () => {
  it("renders correctly with given props", () => {
    const mockOnChange = jest.fn();
    const mockValue = "test value";
    const mockPlaceholder = "test placeholder";
    const mockType = "text";

    render(
      <Input
        type={mockType}
        placeholder={mockPlaceholder}
        value={mockValue}
        onChange={mockOnChange}
      />
    );

    const inputElement = screen.getByPlaceholderText(mockPlaceholder);

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(mockValue);
    expect(inputElement).toHaveAttribute("type", mockType);

    userEvent.type(inputElement, "new test value");

    expect(mockOnChange).toHaveBeenCalled();
  });
});