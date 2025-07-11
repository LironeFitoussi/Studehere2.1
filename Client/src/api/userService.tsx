import axiosInstance from './axiosInstance';
import type { IUser, CreateUser } from '@/types';
import type { ApiResponseDto } from '@/types/dto';
import { User as Auth0User } from '@auth0/auth0-react';
import { AxiosError } from 'axios';

const endpoint = '/users';

export interface AddressDetails {
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  lat: number;
  lng: number;
  formatted_address: string;
  hebrew_address: string;
}

// --- CRUD API functions ---
export const getAllUsers = async (): Promise<IUser[]> => {
  const { data } = await axiosInstance.get<IUser[]>(endpoint);
  return data;
};

// Get user by email
export const getUserByEmail = async (email: string, auth0UserData?: Auth0User): Promise<ApiResponseDto<IUser>> => {
  try {
    const response = await axiosInstance.get<IUser>(`${endpoint}/email/${email}`);

    return {
      data: response.data,
      message: 'User found successfully',
      success: true
    };
  } catch (error) {
    // If we get a 404 and have Auth0 data, create the user
    if (error instanceof AxiosError && error.response?.status === 404 && auth0UserData) {
      console.log('👤 Creating new user:', auth0UserData.email);
      
      // Create new user from Auth0 data
      const newUser: CreateUser = {
        email: auth0UserData.email || '',
        firstName: auth0UserData.given_name || auth0UserData.name?.split(' ')[0] || '',
        lastName: auth0UserData.family_name || auth0UserData.name?.split(' ').slice(1).join(' ') || '',
        phone: '',
        role: 'guest',
        auth0Id: auth0UserData.sub
      };

      try {
        const createdUser = await createUser(newUser);
        return {
          data: createdUser,
          message: 'User created successfully',
          success: true
        };
      } catch (createError) {
        console.error('❌ User creation failed:', createError instanceof AxiosError ? createError.response?.data?.message : createError);
        throw createError;
      }
    }
    
    throw error;
  }
};

// Get user by regex
export const getUserRegex = async (regex: string): Promise<IUser[]> => {
  const { data } = await axiosInstance.get<IUser[]>(`${endpoint}/regex/${regex}`);
  return data;
};

// Create user
export const createUser = async (user: CreateUser): Promise<IUser> => {
  const { data } = await axiosInstance.post<IUser>(endpoint, user);
  console.log('✅ User created:', { email: data.email, id: data._id });
  return data;
};

// Update user (PATCH, partial)
export const updateUser = async (id: string, user: Partial<IUser>): Promise<IUser> => {
  const { data } = await axiosInstance.patch<IUser>(`${endpoint}/${id}`, user);
  return data;
};

// Update User's Address
export const updateUserAddress = async (id: string, address: AddressDetails): Promise<IUser> => {
  const { data } = await axiosInstance.patch<IUser>(`${endpoint}/${id}/address`, { ...address });
  return data;
};



