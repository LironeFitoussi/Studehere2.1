import { CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslation } from "react-i18next";
import type { IUser } from "@/types";

interface ProfileInfoProps {
    isLoading: boolean;
    user?: IUser;
}

export function ProfileInfo({ isLoading, user }: ProfileInfoProps) {
    const { t } = useTranslation();
    if (!user) return null;
    console.log(user);
    return (
        <div className="flex-1 space-y-2">
            <CardTitle className="text-2xl font-bold">
                {isLoading ? <Skeleton className="h-6 w-40" /> : `${user.firstName} ${user.lastName}`}
            </CardTitle>
            <CardDescription>
                {isLoading ? <Skeleton className="h-4 w-32" /> : user.email}
            </CardDescription>
            <div className="flex gap-2 mt-2">
                <Badge variant="outline">
                    {user.role
                        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                        : t('profile.user', 'User')}
                </Badge>
            </div>
            <div className="mt-2 text-muted-foreground text-sm">
                {isLoading ? <Skeleton className="h-4 w-24" /> : user.phone || t('profile.noPhone', 'No phone')}
            </div>
            <div className="mt-1 text-muted-foreground text-sm">
                {isLoading ? (
                    <Skeleton className="h-4 w-32" />
                ) : user.address
                    ? (typeof user.address === 'string'
                        ? user.address
                        : (typeof user.address === 'object' && typeof user.address === 'string'
                            ? user.address
                            : t('profile.noAddress', 'No address')))
                    : t('profile.noAddress', 'No address')}
            </div>
        </div>
    );
} 