import React from "react";
import {
  render,
  cleanup,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import AddressBook from "../AddressBook";
import MockIntersectionObserver from "../../../testUtils/MockIntersectionObserver";
import { FilterProvider } from "../../../context/FilterContext";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

const filters = { firstName: "", lastName: "" };
const filtersOn = { firstName: "Levi", lastName: "" };
const setFilter = jest.fn();
const queryClient = new QueryClient();

const withEmptyFilterProviders = (
  children: React.ReactElement,
): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider context={{ filters, setFilter }}>
        {children}
      </FilterProvider>
    </QueryClientProvider>
  );
};

const withOnFilterProviders = (
  children: React.ReactElement,
): React.ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider context={{ filters: filtersOn, setFilter }}>
        {children}
      </FilterProvider>
    </QueryClientProvider>
  );
};

window.IntersectionObserver = MockIntersectionObserver;

describe("Render AddressBook", () => {
  test("render users grid", async () => {
    render(withEmptyFilterProviders(<AddressBook />));
    expect(screen.getByText(/Address book/i)).toBeTruthy();
    await waitFor(() =>
      expect(screen.getByText(/leon.petit@example.com/i)).toBeTruthy(),
    );
    expect(screen.getByText(/beautifulgorilla884/i)).toBeTruthy();
    expect(screen.getByText(/Mathilde Chevalier/i)).toBeTruthy();
  });
});

describe("AddressBook actions", () => {
  test("show details of first user", async () => {
    render(withEmptyFilterProviders(<AddressBook />));
    await waitFor(() =>
      expect(screen.getByText(/leon.petit@example.com/i)).toBeTruthy(),
    );
    fireEvent.click(screen.getAllByTitle("User details")[0]);
    await waitFor(() => expect(screen.getByText(/User details/i)).toBeTruthy());
    fireEvent.click(screen.getByText("Close"));
  });
  test("activate name filters", async () => {
    render(withOnFilterProviders(<AddressBook />));
    fireEvent.click(screen.getByTitle("Filter users"));
    screen.debug();
    expect(screen.getByText(/Clear filters to fetch more users/i)).toBeTruthy();
  });
});
