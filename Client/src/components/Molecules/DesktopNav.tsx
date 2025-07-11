import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import NavLink from "@/components/Atoms/NavLink";
import type { TFunction } from "i18next";

type DesktopNavProps = {
  routes: { name: string; path: string; isForLoggedIn: boolean }[];
  location: { pathname: string };
  isAuthenticated: boolean;
  role: string;
  t: TFunction;
};

const DesktopNav: React.FC<DesktopNavProps> = ({ routes, location, isAuthenticated, role, t }) => (
  <NavigationMenu>
    <NavigationMenuList className="hidden md:flex gap-4">
      {routes.map((route) => (
        route.isForLoggedIn ? (
          isAuthenticated ? (
            <NavigationMenuItem key={route.path}>
              <NavLink
                to={route.path}
                className={`text-sm font-medium px-3 py-2 rounded-md transition ${
                  location.pathname === route.path
                    ? "bg-primary text-white"
                    : "hover:bg-muted"
                }`}
              >
                {route.name}
              </NavLink>
            </NavigationMenuItem>
          ) : null
        ) : (
          <NavigationMenuItem key={route.path}>
            <NavLink to={route.path}>{route.name}</NavLink>
          </NavigationMenuItem>
        )
      ))}
      {isAuthenticated && role === "admin" && (
        <NavigationMenuItem
          className={`text-sm font-medium px-3 py-2 rounded-md transition ${
            location.pathname.includes("/admin")
              ? "bg-primary text-white"
              : "hover:bg-muted hover:text-black"
          }`}
        >
          <NavLink to="/admin">{t("navbar.adminDashboard", { defaultValue: "Admin Dashboard" })}</NavLink>
        </NavigationMenuItem>
      )}
    </NavigationMenuList>
  </NavigationMenu>
);

export default DesktopNav; 