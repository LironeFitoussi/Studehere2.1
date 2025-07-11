import React from "react";
import { Button } from "@/components/ui/button";
import type { TFunction } from "i18next";

type AuthButtonsProps = {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
  t: TFunction;
  className?: string;
};

const AuthButtons: React.FC<AuthButtonsProps> = ({ isAuthenticated, onLogin, onLogout, t, className = "" }) => (
  !isAuthenticated ? (
    <Button variant="outline" className={className} onClick={onLogin}>
      {t("navbar.login")}
    </Button>
  ) : (
    <Button variant="outline" className={className} onClick={onLogout}>
      {t("navbar.logout", { defaultValue: "Log Out" })}
    </Button>
  )
);

export default AuthButtons; 