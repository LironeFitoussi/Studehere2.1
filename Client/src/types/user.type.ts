import type { IInstitution } from "./institution.type";

export interface InstitutionRole {
  institution_id: string;
  // Add other fields if needed
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  role: string;
  auth0Id?: string;
  active_institution?: IInstitution;
  principal?: InstitutionRole[];
  coordinator?: InstitutionRole[];
  instructor?: InstitutionRole[];
  student?: InstitutionRole[];
}

export type CreateUser = Omit<IUser, '_id'>; 