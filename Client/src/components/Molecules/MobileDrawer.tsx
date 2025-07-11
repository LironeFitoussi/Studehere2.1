import React from "react";
import CloseButton from "@/components/Atoms/CloseButton";
import NavLink from "@/components/Atoms/NavLink";
import LanguageSwitcher from "@/components/Molecules/LanguageSwitcher";
import AuthButtons from "@/components/Molecules/AuthButtons";
import type { TFunction } from "i18next";

type MobileDrawerProps = {
  routes: { name: string; path: string; isForLoggedIn: boolean }[];
  location: { pathname: string };
  isAuthenticated: boolean;
  role: string;
  t: TFunction;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  handleLogout: () => void;
  navigate: (path: string) => void;
};

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  routes,
  location,
  isAuthenticated,
  role,
  t,
  mobileOpen,
  setMobileOpen,
  handleLogout,
  navigate,
}) => (
  <>
    {/* Overlay */}
    <div
      className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
        mobileOpen
          ? "opacity-100 pointer-events-auto bg-black/40"
          : "opacity-0 pointer-events-none bg-black/40"
      }`}
      aria-hidden={!mobileOpen}
      onClick={() => setMobileOpen(false)}
    />
    {/* Drawer */}
    <nav
      className={`fixed top-0 right-0 h-full w-64 z-50 bg-white shadow-lg p-6 transition-transform duration-300 md:hidden ${
        mobileOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ pointerEvents: mobileOpen ? "auto" : "none" }}
      onClick={(e) => e.stopPropagation()}
    >
      <CloseButton onClick={() => setMobileOpen(false)} />
      <ul className="flex flex-col gap-4">
        {routes.map((route) => (
          <li key={route.path}>
            <NavLink
              to={route.path}
              className={`block text-base font-medium px-3 py-2 rounded-md transition ${
                location.pathname === route.path
                  ? "bg-primary text-white"
                  : "hover:bg-muted"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {route.name}
            </NavLink>
          </li>
        ))}
        {isAuthenticated && role === "admin" && (
          <li>
            <NavLink
              to="/admin"
              className={`block text-base font-medium px-3 py-2 rounded-md transition ${
                location.pathname.includes("/admin")
                  ? "bg-primary text-white"
                  : "hover:bg-muted hover:text-black"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {t("navbar.adminDashboard", { defaultValue: "Admin Dashboard" })}
            </NavLink>
          </li>
        )}
        {/* <li>
          <LanguageSwitcher />
        </li> */}
      </ul>
      <div className="mt-8">
        <AuthButtons
          isAuthenticated={isAuthenticated}
          onLogin={() => {
            setMobileOpen(false);
            navigate("/auth");
          }}
          onLogout={handleLogout}
          t={t}
          className="w-full"
        />
        <LanguageSwitcher />
      </div>
    </nav>
  </>
);

export default MobileDrawer; 