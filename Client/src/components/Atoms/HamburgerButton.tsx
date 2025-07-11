import React from "react";

type HamburgerButtonProps = {
  onClick: () => void;
  ariaLabel?: string;
};

const HamburgerButton: React.FC<HamburgerButtonProps> = ({ onClick, ariaLabel = "Open menu" }) => (
  <button
    className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary ml-auto"
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
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
);

export default HamburgerButton; 