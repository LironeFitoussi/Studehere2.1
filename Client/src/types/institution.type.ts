import { type IAddress } from "./address.type";
export interface IInstitution {
    id: string;
    name: string;
    address_id: string;
    institution_code: string;
    hebrew_name: string;
    slug: string;
    institution_type: string;
    created_at: string;
    updated_at: string;
    address?: IAddress;
  }
  
  export interface ICreateInstitutionDTO {
    name: string;
    hebrew_name: string;
    institution_type?: string;
    address_id?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      country: string;
      zip?: string;
      lat?: number;
      lng?: number;
      formatted_address?: string;
      hebrew_address?: string;
    };
  }
  
  export interface IUpdateInstitutionDTO {
    name?: string;
    hebrew_name?: string;
    institution_type?: string;
  } 