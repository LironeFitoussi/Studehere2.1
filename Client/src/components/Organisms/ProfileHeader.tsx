import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "../Molecules/ProfileAvatar";
import { ProfileInfo } from "../Molecules/ProfileInfo";
import { InstitutionInfo } from "../Molecules/InstitutionInfo";
import { useTranslation } from "react-i18next";
import type { IUser } from "@/types"; // Fixed casing

interface ProfileHeaderProps {
    isLoading: boolean;
    user?: IUser;
}

export function ProfileHeader({ isLoading, user }: ProfileHeaderProps) {
    const { t } = useTranslation();
    if (!user) return null;
    return (
        <Card className="p-6 mx-4">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-grow">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <ProfileAvatar />
                            <ProfileInfo isLoading={isLoading} user={user} />
                        </div>
                        <div className="flex justify-end">
                            <Button variant="outline">{t('profile.edit', 'Edit Profile')}</Button>
                        </div>
                    </div>
                </div>
                {user?.active_institution && (
                    <div className="w-full md:w-auto">
                        <InstitutionInfo isLoading={isLoading} institution={user.active_institution} />
                    </div>
                )}
            </div>
        </Card>
    );
} 