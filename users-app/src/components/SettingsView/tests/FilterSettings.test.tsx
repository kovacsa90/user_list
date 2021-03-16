import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FilterSettings from "../FilterSettings";

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });
});

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

describe("Render FilterSettings", () => {
  test("render FilterSettings", async () => {
    render(<FilterSettings />);
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/Select nationality/i)).toBeTruthy();
    expect(screen.getByText(/Swiss/i)).toBeTruthy();
    expect(screen.getByText(/Spanish/i)).toBeTruthy();
    expect(screen.getByText(/French/i)).toBeTruthy();
    expect(screen.getByText(/British/i)).toBeTruthy();
  });
});

describe("FilterSettings interactions", () => {
  test("Save selection to localStorage", async () => {
    render(
      <MemoryRouter>
        <FilterSettings />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText(/Swiss/i));
    fireEvent.click(screen.getByText(/Save/i));
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      "NationalityList",
      '["CH"]',
    );
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });
  test("go back to main view", async () => {
    render(
      <MemoryRouter>
        <FilterSettings />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByText(/Back/i));
    expect(mockHistoryPush).toHaveBeenCalledWith("/");
  });
});
