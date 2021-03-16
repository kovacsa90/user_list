import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import HeaderActions from "../HeaderActions";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

const onSearchClick = jest.fn();
const onSettingsClick = jest.fn();

describe("Render HeaderActions", () => {
  test("render action buttons", async () => {
    render(
      <HeaderActions
        onSearchClick={onSearchClick}
        onSettingsClick={onSettingsClick}
      />,
    );
    fireEvent.click(screen.getByTitle("Filter users"));
    expect(onSearchClick).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTitle("Filter settings"));
    expect(onSettingsClick).toHaveBeenCalledTimes(1);
  });
});
