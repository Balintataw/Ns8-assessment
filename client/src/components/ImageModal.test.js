import React from "react";
import { render } from "@testing-library/react";
import { ImageModal } from "./ImageModal";

const ImageModalProps = () => {
  return {
    onClose: jest.fn,
    isVisible: true,
    image: {
      url: "https://via.placeholder.com/150/aa8f2e",
      title: "Biff"
    }
  };
};

test("renders image", () => {
  const { getByTestId } = render(<ImageModal {...ImageModalProps()} />);
  const imgEl = getByTestId(/modal-image/i);
  expect(imgEl).toBeTruthy();
  expect(imgEl).toHaveAttribute(
    "src",
    "https://via.placeholder.com/150/aa8f2e"
  );
});
