import { CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import type { IUser } from "@/types";
import AddressDisplay from "../Atoms/AddressDisplay";
import PhoneDisplay from "../Atoms/PhoneDisplay";

interface ProfileInfoProps {
    isLoading: boolean;
    user?: IUser;
}

export function ProfileInfo({ isLoading, user }: ProfileInfoProps) {
    const { t } = useTranslation();
    if (!user) return null;

    if (isLoading) {
        return (
            <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-40" />
            </div>
        );
    }
    return (
        <div className="flex-1 space-y-2">
            <CardTitle className="text-2xl font-bold">
                {`${user.firstName} ${user.lastName}`}
            </CardTitle>
            <CardDescription>
                {user.email}
            </CardDescription>
            <div className="flex gap-2 mt-2">
                <Badge variant="outline">
                    {user.role
                        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                        : t('profile.user', 'User')}
                </Badge>
            </div>
            <PhoneDisplay user={user} />
            <AddressDisplay user={user} />
        </div>
    );
} 