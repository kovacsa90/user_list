import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import DetailsModal from "../DetailsModal";
import mockData from "../../../testUtils/MockData.json";
import { User } from "../../../api/types";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

const onClose = jest.fn();
const userData = mockData.results[0] as User;

describe("Render DetailsModal", () => {
  test("render modal", async () => {
    render(<DetailsModal selectedUser={userData} onClose={onClose} />);
    const avatar = screen.getByRole("img");
    expect(avatar).toHaveAttribute("alt", "Léon Petit");
    expect(screen.getByText(/User details/i)).toBeTruthy();
    expect(screen.getByText(/Léon Petit/i)).toBeTruthy();
    expect(screen.getByText(/Street: Rue Barrème/i)).toBeTruthy();
    expect(screen.getByText(/City: Toulon/i)).toBeTruthy();
    expect(screen.getByText(/State: Hautes-Alpes/i)).toBeTruthy();
    expect(screen.getByText(/Postcode: 34586/i)).toBeTruthy();
    expect(screen.getByText(/Phone: 02-58-53-08-88/i)).toBeTruthy();
    expect(screen.getByText(/Cell: 06-32-98-75-39/i)).toBeTruthy();
    fireEvent.click(screen.getByText("Close"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  test("close modal with ESC key", async () => {
    render(<DetailsModal selectedUser={userData} onClose={onClose} />);
    fireEvent.keyDown(screen.getByText(/User details/i), {
      key: "Escape",
      code: "Escape",
      keyCode: 27,
      charCode: 27,
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  test("does not close for other keys", async () => {
    render(<DetailsModal selectedUser={userData} onClose={onClose} />);
    fireEvent.keyDown(screen.getByText(/User details/i), {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      charCode: 13,
    });
    expect(onClose).toHaveBeenCalledTimes(0);
  });
});
