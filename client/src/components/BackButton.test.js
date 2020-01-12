import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BackButton } from "./BackButton";

test("handles back button click", () => {
  const onClick = jest.fn();
  const { getByText } = render(<BackButton onClick={onClick} text="Home" />);
  const buttonEl = getByText(/Home/i);
  fireEvent.click(buttonEl);
  expect(onClick).toHaveBeenCalledTimes(1);
});
