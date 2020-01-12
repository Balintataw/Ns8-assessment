import React from "react";
import { render } from "@testing-library/react";
import { Header } from "./Header";

test("renders title", () => {
  const { getByText } = render(<Header />);
  const headerText = getByText(/Miraculous/i);
  expect(headerText).toBeInTheDocument();
});
