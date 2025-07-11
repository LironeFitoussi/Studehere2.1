 
import { IsEmail, IsString, IsOptional, IsEnum, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  zip?: string;

  @IsNumber()
  @IsOptional()
  lat?: number;

  @IsNumber()
  @IsOptional()
  lng?: number;

  @IsString()
  @IsOptional()
  formatted_address?: string;

  @IsString()
  @IsOptional()
  hebrew_address?: string;

  @IsEnum(['admin', 'user', 'guest'])
  @IsOptional()
  role?: string = 'user';

  @IsString()
  @IsOptional()
  auth0Id?: string;
}
