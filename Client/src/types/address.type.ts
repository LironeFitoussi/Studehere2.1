// Address Types
export interface IAddress {
    _id?: string; // MongoDB ObjectId
    street: string;
    city: string;
    state: string;
    country: string;
    zip?: string;
    lat?: number;
    lng?: number;
    formatted_address?: string;
    hebrew_address?: string;
    created_at?: string;
    updated_at?: string;
  }
  