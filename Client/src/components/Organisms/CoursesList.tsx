import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { CourseCard } from "../Molecules/CourseCard";

interface Course {
    name: string;
    instructor: string;
    semester: string;
    status: string;
    grade: string | null;
}

interface CoursesListProps {
    courses: Course[];
}

export function CoursesList({ courses }: CoursesListProps) {
    const { t } = useTranslation();

    return (
        <Card className="m-6">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <BookOpen className="text-primary" />
                    <CardTitle>{t('profile.courses.title', 'My Courses')}</CardTitle>
                </div>
                <CardDescription>{t('profile.courses.desc', 'Your enrolled and completed courses')}</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="pb-4">
                    <div className="grid gap-4 pb-4">
                        {courses.map((course, idx) => (
                            <CourseCard key={idx} course={course} />
                        ))}
                    </div>
                    <div className="mt-4 text-center">
                        <Button variant="outline" size="sm">
                            {t('profile.courses.add', 'Add Course')}
                        </Button>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
} 