import type { IUser } from "@/types/user.type";
import { useTranslation } from "react-i18next";

interface PhoneDisplayProps {
  user: IUser;
}

export default function PhoneDisplay({ user }: PhoneDisplayProps) {
  const { t } = useTranslation();
  return (
    <div className="mt-2 text-muted-foreground text-sm">
      {user.phone || t('profile.noPhone', 'No phone')}
    </div>
  );
}