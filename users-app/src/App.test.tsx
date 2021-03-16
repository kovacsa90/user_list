import React from "react";
import {
  render,
  cleanup,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import MockIntersectionObserver from "./testUtils/MockIntersectionObserver";
import App from "./App";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

window.IntersectionObserver = MockIntersectionObserver;

describe("Render App", () => {
  test("render App", async () => {
    render(<App />);
    expect(screen.getByText(/Address book/i)).toBeTruthy();
    expect(screen.getByTitle(/Filter users/i)).toBeTruthy();
    expect(screen.getByTitle(/Filter settings/i)).toBeTruthy();
    await waitFor(() =>
      expect(screen.getByText(/leon.petit@example.com/i)).toBeTruthy(),
    );
    expect(screen.getByText(/beautifulgorilla884/i)).toBeTruthy();
    expect(screen.getByText(/Mathilde Chevalier/i)).toBeTruthy();
  });
});

describe("App interactions", () => {
  test("filter users", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText(/leon.petit@example.com/i)).toBeTruthy(),
    );
    fireEvent.click(screen.getByTitle(/Filter users/i));
    const firstNameField = screen.getByLabelText(/First name/i);
    const lastNameField = screen.getByLabelText(/Last name/i);
    fireEvent.change(firstNameField, { target: { value: "foo" } });
    fireEvent.change(lastNameField, { target: { value: "bar" } });
    await waitFor(() =>
      expect(screen.queryByText(/leon.petit@example.com/i)).toBeFalsy(),
    );
    expect(screen.getByText(/Clear filters to fetch more users/i)).toBeTruthy();
  });
  test("reset filter", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText(/leon.petit@example.com/i)).toBeTruthy(),
    );
    fireEvent.click(screen.getByTitle(/Filter users/i));
    const firstNameField = screen.getByLabelText(/First name/i);
    const lastNameField = screen.getByLabelText(/Last name/i);
    fireEvent.change(firstNameField, { target: { value: "foo" } });
    fireEvent.change(lastNameField, { target: { value: "bar" } });
    fireEvent.click(screen.getByText(/Reset Filter/i));
    await waitFor(() =>
      expect(screen.getByText(/leon.petit@example.com/i)).toBeTruthy(),
    );
    screen.debug();
  });
  test("go to setting view", async () => {
    render(<App />);
    await waitFor(() =>
      expect(screen.getByText(/leon.petit@example.com/i)).toBeTruthy(),
    );
    fireEvent.click(screen.getByTitle(/Filter settings/i));
    fireEvent.click(screen.getByText(/Select nationality/i));
    fireEvent.click(screen.getByText(/Swiss/i));
    fireEvent.click(screen.getByText(/Spanish/i));
    fireEvent.click(screen.getByText(/French/i));
    fireEvent.click(screen.getByText(/British/i));
    screen.debug();
  });
});
