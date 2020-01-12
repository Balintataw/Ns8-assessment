import React, { ReactNode } from "react";
import { IPhoto } from "src/types";

export interface IModalProps {
  children?: ReactNode;
  isVisible: boolean;
  image: IPhoto;
  onClose: () => void;
}

export const ImageModal = (props: IModalProps) => {
  const { children, isVisible, onClose, image } = props;
  return isVisible ? (
    <div
      className="modal fade show"
      id="exampleModal"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-modal="true"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {image.title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-modal="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
            <img
              data-testid="modal-image"
              width={500}
              height={500}
              className="img-fluid img-thumbnail"
              src={image?.url}
              alt={image?.title}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
