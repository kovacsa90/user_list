import React from "react";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";
import NatOption from "../NatOption";

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

const onCardClick = jest.fn();

describe("Render NatOption", () => {
  test("render NatOption selected", async () => {
    render(
      <NatOption abbrv="CH" name="Swiss" isSelected onClick={onCardClick} />,
    );
    expect(screen.getByText(/CH/i)).toBeTruthy();
    expect(screen.getByText(/Swiss/i)).toBeTruthy();
    const textDiv = screen.getByText(/CH/i);
    expect(textDiv.parentElement?.className.match("selected")).toBeTruthy();
  });
  test("render NatOption NOT selected", async () => {
    render(
      <NatOption
        abbrv="CH"
        name="Swiss"
        isSelected={false}
        onClick={onCardClick}
      />,
    );
    const textDiv = screen.getByText(/CH/i);
    expect(textDiv.parentElement?.className.match("selected")).toBeFalsy();
  });
});

describe("NatOption interactions", () => {
  test("select NatOption", async () => {
    render(
      <NatOption
        abbrv="CH"
        name="Swiss"
        isSelected={false}
        onClick={onCardClick}
      />,
    );
    expect(screen.getByText(/CH/i)).toBeTruthy();
    expect(screen.getByText(/Swiss/i)).toBeTruthy();
    fireEvent.click(screen.getByText(/Swiss/i));
    expect(onCardClick).toHaveBeenCalledTimes(1);
  });
});
