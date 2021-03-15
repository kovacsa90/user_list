import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { FilterProvider, useFilters } from "./FilterContext";

let consoleSpy: jest.SpyInstance;
beforeEach(() => {
  consoleSpy = jest.spyOn(console, "error");
  consoleSpy.mockImplementation(jest.fn);
});

afterEach(() => {
  consoleSpy.mockRestore();
});

const DummyComponent: React.FC = () => {
  const { filters } = useFilters();
  const firstName = filters.firstName;
  const lastName = filters.lastName;
  return <div>{`First name: ${firstName}, Last name: ${lastName}`}</div>;
};

test("useFilters throws error without FilterProvider", () => {
  expect(() => render(<DummyComponent />)).toThrow();
});

test("renders the dummy component with value from the context", () => {
  render(
    <FilterProvider
      context={{
        filters: { firstName: "John", lastName: "Doe" },
        setFilter: jest.fn(),
      }}
    >
      <DummyComponent />
    </FilterProvider>,
  );

  expect(screen.queryByText(/First name: John, Last name: Doe/i)).toBeTruthy();
});
