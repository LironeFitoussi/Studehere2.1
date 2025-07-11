import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/components/Atoms/Logo";
import HamburgerButton from "@/components/Atoms/HamburgerButton";
import DesktopNav from "@/components/Molecules/DesktopNav";
import MobileDrawer from "@/components/Molecules/MobileDrawer";
import AuthButtons from "@/components/Molecules/AuthButtons";
import LanguageSwitcher from "@/components/Molecules/LanguageSwitcher";

interface Route {
  name: string;
  path: string;
  isForLoggedIn: boolean;
  roles?: string[];
}

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.user);
  const { active_institution } = userState;
  
  // Determine role based on active institution
  let effectiveRole = userState.role;
  if (active_institution) {
    if (userState.principal?.some(p => p.institution_id === active_institution.id)) {
      effectiveRole = 'PRINCIPAL';
    } else if (userState.coordinator?.some(c => c.institution_id === active_institution.id)) {
      effectiveRole = 'COORDINATOR';
    } else if (userState.instructor?.some(i => i.institution_id === active_institution.id)) {
      effectiveRole = 'INSTRUCTOR';
    } else if (userState.student?.some(s => s.institution_id === active_institution.id)) {
      effectiveRole = 'STUDENT';
    }
  }

  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();

  const routes: Route[] = [
    { name: t("navbar.home"), path: "/", isForLoggedIn: false },
    { name: t("navbar.profile"), path: "/profile", isForLoggedIn: true },
    { 
      name: t("navbar.dashboard"), 
      path: "/dashboard", 
      isForLoggedIn: true,
      roles: ["ADMIN", "PRINCIPAL"]
    },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem("auth0_token");
    localStorage.removeItem("auth0_id_token");
    localStorage.removeItem("auth0_user");
    localStorage.removeItem("auth0_expires_at");
    setMobileOpen(false);
  };

  const filteredRoutes = routes.filter(route => {
    if (!route.isForLoggedIn) return true;
    if (!isAuthenticated) return false;
    if (route.roles && !route.roles.includes(effectiveRole)) return false;
    return true;
  });

  return (
    <header className="w-full border-b shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Flex row for logo and hamburger (mobile) */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Logo />
          <HamburgerButton onClick={() => setMobileOpen(true)} />
        </div>
        {/* Desktop nav */}
        <DesktopNav
          routes={filteredRoutes}
          location={location}
          isAuthenticated={isAuthenticated}
          role={effectiveRole}
          t={t}
        />
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <AuthButtons
            isAuthenticated={isAuthenticated}
            onLogin={() => navigate("/auth")}
            onLogout={handleLogout}
            t={t}
          />
          <LanguageSwitcher />
        </div>
      </div>
      {/* Mobile Drawer */}
      <MobileDrawer
        routes={filteredRoutes}
        location={location}
        isAuthenticated={isAuthenticated}
        role={effectiveRole}
        t={t}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        handleLogout={handleLogout}
        navigate={navigate}
      />
    </header>
  );
}
