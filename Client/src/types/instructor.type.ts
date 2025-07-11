import type { ICourse } from "./course.type";
import type { IInstitution } from "./institution.type";
import type { IUser } from "./user.type";

export interface IInstructor {
    id: string;
    user_id: string;
    institution_id: string;
    created_at: Date;
    updated_at: Date;
    user?: IUser;
    institution?: IInstitution;
    courses?: ICourse[];
  } 