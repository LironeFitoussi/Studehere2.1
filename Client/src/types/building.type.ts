import type { IAddress } from "./address.type";

// Building Types
export interface IBuilding {
    id: string;
    name: string;
    address_id?: string;
    address?: IAddress;
    institution_id: string;
    created_at: string;
    updated_at: string;
}
  
export interface ICreateBuildingDTO {
    name: string;
    address_id?: string;
    address?: IAddress;
}
  
export interface IUpdateBuildingDTO {
    name?: string;
}
  
export interface IUpdateBuildingAddressDTO {
    address_id?: string;
    address?: IAddress;
} 