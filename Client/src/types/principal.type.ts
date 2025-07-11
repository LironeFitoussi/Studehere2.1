import { type IUser } from './user.type';
import { type IInstitution } from './institution.type';

export interface IPrincipal {
    id: string;
    user_id: string;
    institution_id: string;
    created_at: Date;
    updated_at: Date;
    user?: IUser;
    institution?: IInstitution;
  } 