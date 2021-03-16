import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { FilterProvider } from "../../../context/FilterContext";
import NameFilters from "../NameFilters";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

const filters = { firstName: "", lastName: "" };
const setFilter = jest.fn();

const withFilterProviders = (
  children: React.ReactElement,
): React.ReactElement => {
  return (
    <FilterProvider context={{ filters, setFilter }}>{children}</FilterProvider>
  );
};

describe("Render NameFilters", () => {
  test("render NameFilters", async () => {
    render(withFilterProviders(<NameFilters />));
    expect(screen.getByText(/First name/i)).toBeTruthy();
    expect(screen.getByText(/Last name/i)).toBeTruthy();
    expect(screen.getByText(/Reset Filter/i)).toBeTruthy();
  });
  test("type filter text", async () => {
    render(withFilterProviders(<NameFilters />));
    const firstNameField = screen.getByLabelText(/First name/i);
    const lastNameField = screen.getByLabelText(/Last name/i);
    fireEvent.change(firstNameField, { target: { value: "foo" } });
    fireEvent.change(lastNameField, { target: { value: "bar" } });
    expect(firstNameField).toHaveAttribute("value", "foo");
    expect(lastNameField).toHaveAttribute("value", "bar");
  });
});
