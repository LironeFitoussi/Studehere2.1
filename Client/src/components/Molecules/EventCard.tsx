import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface EventCardProps {
    event: {
        title: string;
        date: string;
        type: string;
        course: string;
        status: string;
    };
}

export function EventCard({ event }: EventCardProps) {
    const { t } = useTranslation();

    return (
        <Card className="flex items-center gap-4 p-4">
            <div className="flex-1">
                <div className="font-semibold">{event.title}</div>
                <div className="text-sm text-muted-foreground">
                    {t('profile.events.course', 'Course')}: {event.course}
                </div>
                <div className="text-xs text-muted-foreground">
                    {t('profile.events.date', 'Date')}: {event.date}
                </div>
                <div className="text-xs text-muted-foreground">
                    {t('profile.events.type', 'Type')}: {event.type}
                </div>
            </div>
            <Badge variant={event.status === "completed" ? "secondary" : "outline"}>
                {t(`profile.events.status.${event.status}`, event.status)}
            </Badge>
        </Card>
    );
} 