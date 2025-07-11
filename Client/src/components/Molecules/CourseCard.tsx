import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

interface CourseCardProps {
    course: {
        name: string;
        instructor: string;
        semester: string;
        status: string;
        grade: string | null;
    };
}

export function CourseCard({ course }: CourseCardProps) {
    const { t } = useTranslation();

    return (
        <Card className="flex items-center gap-4 p-4">
            <div className="flex-1">
                <div className="font-semibold">{course.name}</div>
                <div className="text-sm text-muted-foreground">
                    {t('profile.courses.instructor', 'Instructor')}: {course.instructor}
                </div>
                <div className="text-xs text-muted-foreground">
                    {t('profile.courses.semester', 'Semester')}: {course.semester}
                </div>
                <div className="text-xs text-muted-foreground">
                    {t('profile.courses.status', 'Status')}: {t(`profile.courses.status.${course.status}`, course.status)}
                </div>
                {course.grade && (
                    <div className="text-xs text-muted-foreground">
                        {t('profile.courses.grade', 'Grade')}: {course.grade}
                    </div>
                )}
            </div>
            <Badge variant={course.status === "completed" ? "secondary" : "outline"}>
                {t(`profile.courses.status.${course.status}`, course.status)}
            </Badge>
        </Card>
    );
} 