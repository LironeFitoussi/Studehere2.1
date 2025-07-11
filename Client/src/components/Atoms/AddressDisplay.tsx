import type { IUser } from "@/types/user.type";
import { useTranslation } from "react-i18next";

interface AddressDisplayProps {
  user: IUser;
}

export default function AddressDisplay({
  user,
}: AddressDisplayProps) {
  const { t } = useTranslation();   
  return (
    <div className="mt-1 text-muted-foreground text-sm">
      {user.addressDetails ? (
        typeof user.addressDetails === "string" ? (
          user.addressDetails
        ) : typeof user.addressDetails === "object" &&
          "formatted_address" in user.addressDetails &&
          typeof user.addressDetails.formatted_address === "string" ? (
          user.addressDetails.formatted_address
        ) : (
          t("profile.noAddress", "No address")
        )
      ) : (
        t("profile.noAddress", "No address")
      )}
    </div>
  );
}
