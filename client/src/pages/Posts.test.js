import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Posts } from "./Posts";

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn(),
    goBack: jest.fn()
  }),
  useParams: () => ({})
}));

test("renders table", () => {
  const { getByRole } = render(<Posts />);

  expect(getByRole("table")).toBeInTheDocument();
});

test("renders back button", () => {
  const { getByText } = render(<Posts />);
  const buttonEl = getByText(/Home/i);
  expect(buttonEl).toBeInTheDocument();
});
