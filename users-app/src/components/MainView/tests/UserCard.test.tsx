import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import UserCard from "../UserCard";
import mockData from "../../../testUtils/MockData.json";
import { User } from "../../../api/types";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

const onInfoClick = jest.fn();
const userData = mockData.results[0] as User;

describe("Render UserCard", () => {
  test("render UserCard", async () => {
    render(<UserCard user={userData} onInfoClick={onInfoClick} />);
    expect(screen.getByTitle(/bluepanda979/i)).toBeTruthy();
    expect(screen.getByText(/Léon Petit/i)).toBeTruthy();
    expect(screen.getByText(/bluepanda979/i)).toBeTruthy();
    expect(screen.getByText(/leon.petit@example.com/i)).toBeTruthy();
    fireEvent.click(screen.getByTitle("User details"));
    expect(onInfoClick).toHaveBeenCalledTimes(1);
  });
});
