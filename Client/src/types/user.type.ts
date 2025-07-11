import type { IInstitution } from "./institution.type";

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
}

export type CreateUser = Omit<IUser, '_id'>; 