import React from "react";

type CloseButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
};

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, ariaLabel = "Close menu" }) => (
  <button
    className="mb-6 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
    onClick={onClick}
    aria-label={ariaLabel}
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

export default CloseButton; 