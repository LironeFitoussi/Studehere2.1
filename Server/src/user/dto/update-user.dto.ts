import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(['admin', 'user', 'guest'])
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  auth0Id?: string;
  
  // Note: Address-related fields are handled separately through the address endpoint
}
