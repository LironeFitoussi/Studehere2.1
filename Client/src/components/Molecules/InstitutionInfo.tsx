import { Skeleton } from "@/components/ui/skeleton";
import { Building2, Users, MapPin, Hash, Calendar } from "lucide-react";
import type { IInstitution } from "@/types/Institution";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

interface InstitutionInfoProps {
    isLoading: boolean;
    institution?: IInstitution;
}

export function InstitutionInfo({ isLoading, institution }: InstitutionInfoProps) {
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className="space-y-3 min-w-[300px]">
                <div className="space-y-2">
                    <Skeleton className="h-6 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
                <div className="space-y-2 pt-2">
                    <Skeleton className="h-4 w-[180px]" />
                    <Skeleton className="h-4 w-[150px]" />
                    <Skeleton className="h-4 w-[220px]" />
                </div>
            </div>
        );
    }

    if (!institution) {
        return null;
    }

    return (
        <div className="flex flex-col gap-3 min-w-[300px]">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">{institution.name}</h3>
                </div>
                <p className="text-sm text-muted-foreground pl-7">
                    {institution.hebrew_name}
                </p>
            </div>
            
            <div className="space-y-2 border-t pt-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{t(`institution.type.${institution.institution_type.toLowerCase()}`, institution.institution_type)}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Hash className="h-4 w-4" />
                    <span>{t('institution.code')}: {institution.institution_code}</span>
                </div>

                {institution.address && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{institution.address.formatted_address}</span>
                    </div>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{t('institution.member_since')}: {format(new Date(institution.created_at), 'MMM yyyy')}</span>
                </div>
            </div>
        </div>
    );
} 