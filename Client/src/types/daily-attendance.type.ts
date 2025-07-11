export interface IDailyAttendance {
    id: string;
    student_id: string;
    date: string;
    status: 'present' | 'absent' | 'late';
  } 