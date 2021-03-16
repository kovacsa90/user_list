import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";
import { FilterProvider } from "../../../context/FilterContext";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as Record<string, never>),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const emptyFilters = { firstName: "", lastName: "" };
const activeFilters = { firstName: "", lastName: "" };
const setFilter = jest.fn();
const withProviders = (children: React.ReactElement): React.ReactElement => {
  return (
    <FilterProvider context={{ filters: emptyFilters, setFilter }}>
      <MemoryRouter>{children}</MemoryRouter>
    </FilterProvider>
  );
};

describe("Render HeaderActions", () => {
  test("render Header", async () => {
    render(withProviders(<Header />));
    expect(screen.getByText(/Address book/i)).toBeTruthy();
    expect(screen.getByTitle("Filter users")).toBeTruthy();
    expect(screen.getByTitle("Filter settings")).toBeTruthy();
  });
  test("go to settings page", async () => {
    render(withProviders(<Header />));
    fireEvent.click(screen.getByTitle("Filter settings"));
    expect(mockHistoryPush).toHaveBeenCalledWith("/settings");
  });
  test("render Header without filter", async () => {
    render(withProviders(<Header />));
    fireEvent.click(screen.getByTitle("Filter users"));
    expect(setFilter).toHaveBeenCalledTimes(0);
  });
  test("render Header with filter", async () => {
    render(
      <FilterProvider context={{ filters: activeFilters, setFilter }}>
        <Header />
      </FilterProvider>,
    );
    fireEvent.click(screen.getByTitle("Filter users"));
    fireEvent.click(screen.getByTitle("Filter users"));
    expect(setFilter).toHaveBeenCalledTimes(1);
  });
});
