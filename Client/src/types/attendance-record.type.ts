export interface IAttendanceRecord {
    id: string;
    studentId: string;
    courseId: string;
    date: string;
    status: 'present' | 'absent' | 'late';
  } 