import React from "react";
import { render, cleanup, waitForElement, act } from "@testing-library/react";
import axiosMock from "axios";

import { Home } from "./Home";

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}));

test("renders table", () => {
  const { getByRole } = render(<Home />);
  expect(getByRole("table")).toBeInTheDocument();
});

test("makes fetch request", async () => {
  // Test throws a weird warning see: https://github.com/testing-library/react-testing-library/issues/281

  // TODO not sure why test cant see env var for host
  const url = "undefined/users/all";

  act(() => {
    axiosMock.get.mockResolvedValueOnce({ data: [] });
  });

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url);
});
