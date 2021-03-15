import React from "react";
import { render, cleanup, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import AddressBook from "./AddressBook";
import MockIntersectionObserver from "../../testUtils/MockIntersectionObserver";
import { FilterProvider } from "../../context/FilterContext";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

const filters = { firstName: "", lastName: "" };
const setFilter = jest.fn();
const queryClient = new QueryClient();

const withProviders = (children: React.ReactElement): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider context={{ filters, setFilter }}>
        {children}
      </FilterProvider>
    </QueryClientProvider>
  );
};

window.IntersectionObserver = MockIntersectionObserver;

describe("Render AddressBook", () => {
  test("renders users grid", async () => {
    render(withProviders(<AddressBook />));
    expect(screen.getByText(/Address book/i)).toBeTruthy();
    await waitFor(() =>
      expect(screen.getByText(/leon.petit@example.com/i)).toBeTruthy(),
    );
    expect(screen.getByText(/beautifulgorilla884/i)).toBeTruthy();
    expect(screen.getByText(/Mathilde Chevalier/i)).toBeTruthy();
  });
});
