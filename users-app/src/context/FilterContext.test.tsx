import React from "react";
import { render, screen } from "@testing-library/react";
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
  const { firstName, lastName } = filters;
  return <div>{`First name: ${firstName}, Last name: ${lastName}`}</div>;
};

test("useFilters throws error without FilterProvider", () => {
  expect(() => render(<DummyComponent />)).toThrow();
});

test("render the dummy component with value from the context", () => {
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
