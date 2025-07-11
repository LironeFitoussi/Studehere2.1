import React from "react";
import { Link } from "react-router-dom";

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const NavLink: React.FC<NavLinkProps> = ({ to, children, className = "", onClick }) => (
  <Link to={to} className={className} onClick={onClick}>
    {children}
  </Link>
);

export default NavLink; 