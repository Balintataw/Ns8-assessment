import React from "react";

interface BackButtonProps {
  text: string;
  onClick: () => void;
}

export const BackButton = (props: BackButtonProps) => {
  const { onClick, text } = props;

  return (
    <button
      style={{
        textAlign: "center",
        cursor: "pointer",
        marginLeft: "auto",
        height: "2.6rem",
        zIndex: 10
      }}
      className="btn btn-primary"
      onClick={onClick}
    >
      <i className="fas fa-chevron-left pr-2"></i>
      {text}
    </button>
  );
};
