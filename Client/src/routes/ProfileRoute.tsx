import { useAuth } from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { ProfileHeader } from '@/components/Organisms/ProfileHeader';
import { CoursesList } from '@/components/Organisms/CoursesList';
import { EventsList } from '@/components/Organisms/EventsList';

export default function ProfileRoute() {
    const { isLoading } = useAuth();
    const user = useSelector((state: RootState) => state.user.currentUser);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found. Please log in again.</div>;
    }

    // Dummy data for courses
    const courses = [
        {
            name: "Introduction to Computer Science",
            instructor: "Dr. Alice Smith",
            semester: "Spring 2024",
            status: "enrolled",
            grade: null,
        },
        {
            name: "Linear Algebra",
            instructor: "Prof. John Doe",
            semester: "Fall 2023",
            status: "completed",
            grade: "A-",
        },
    ];

    // Dummy data for academic events
    const events = [
        {
            title: "CS101 Lecture",
            date: "2024-06-10",
            type: "Lecture",
            course: "Introduction to Computer Science",
            status: "upcoming",
        },
        {
            title: "Linear Algebra Final Exam",
            date: "2023-12-15",
            type: "Exam",
            course: "Linear Algebra",
            status: "completed",
        },
    ];

    return (
        <div className="max-w-3xl mx-auto py-10 space-y-10">
            <ProfileHeader isLoading={isLoading} user={user} />
            <CoursesList courses={courses} />
            <EventsList events={events} />
        </div>
    );
}
