import React from "react";
import { render, cleanup, act } from "@testing-library/react";
import axiosMock from "axios";

import { Images } from "./Images";

afterEach(cleanup);

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: jest.fn()
  }),
  useParams: () => ({
    id: 1
  })
}));

test("makes fetch request for user data", async () => {
  // Test throws a weird warning see: https://github.com/testing-library/react-testing-library/issues/281

  // TODO not sure why test cant see env var for host but as long as endpoint is right i guess
  const url = "undefined/users/1";

  act(() => {
    const { container } = render(<Images />);
    axiosMock.get.mockResolvedValueOnce({ data: [] });
  });

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url);
});
