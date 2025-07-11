import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { EventCard } from "../Molecules/EventCard";

interface Event {
    title: string;
    date: string;
    type: string;
    course: string;
    status: string;
}

interface EventsListProps {
    events: Event[];
}

export function EventsList({ events }: EventsListProps) {
    const { t } = useTranslation();

    return (
        <Card className="m-6">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CalendarCheck className="text-primary" />
                    <CardTitle>{t('profile.events.title', 'My Academic Events')}</CardTitle>
                </div>
                <CardDescription>{t('profile.events.desc', 'Your upcoming and past academic events')}</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="pb-4">
                    <div className="grid gap-4 pb-4">
                        {events.map((event, idx) => (
                            <EventCard key={idx} event={event} />
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                        <Button variant="outline" size="sm">
                            {t('profile.events.add', 'Add Event')}
                        </Button>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
} 