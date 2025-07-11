import type { IAttendanceRecord } from "./attendance-record.type";
import type { ICourse } from "./course.type";
import type { IDailyAttendance } from "./daily-attendance.type";
import type { IInstitution } from "./institution.type";
import type { IUser } from "./user.type";

export interface IStudent {
    id: string;
    user_id: string;
    institution_id: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    user?: IUser;
    institution?: IInstitution;
    attendances?: IAttendanceRecord[];
    dailyAttendances?: IDailyAttendance[];
    courses?: ICourse[];
  } 