import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { MongoError } from 'mongodb';
import { AddressesService } from '../addresses/addresses.service';
import { AddressDetails } from '../types/address.type';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly addressesService: AddressesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // console.log('📝 Creating new user:', {
      //   email: createUserDto.email,
      //   firstName: createUserDto.firstName,
      //   lastName: createUserDto.lastName,
      //   auth0Id: createUserDto.auth0Id
      // });

      const user = await this.userModel.create(createUserDto);
      
      // console.log('✅ User created:', {
      //   id: user._id,
      //   email: user.email,
      //   auth0Id: user.auth0Id
      // });
      
      return user;
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        console.error('❌ User creation failed: Email already exists');
        throw new ConflictException('User with this email already exists');
      }
      console.error('❌ User creation failed:', error);
      throw new InternalServerErrorException('Failed to create user. Please try again.');
    }
  }

  findAll() {
    return this.userModel.find().populate('addressDetails');
  }

  async findByEmail(email: string) {
    try {
      console.log('🔍 Finding user by email:', email);
      const user = await this.userModel.findOne({ email }).populate('addressDetails');
      
      if (!user) {
        console.log('❌ User not found:', email);
        throw new NotFoundException(`User with email ${email} not found`);
      }

      console.log('✅ User found:', {
        id: user._id,
        email: user.email,
        auth0Id: user.auth0Id,
        hasAddress: !!user.addressDetails
      });
      
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('❌ Error finding user:', error);
      throw error;
    }
  }

  findOne(id: string) {
    return this.userModel.findById(id).populate('addressDetails');
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).populate('addressDetails');
  }

  async updateAddress(id: string, addressData: AddressDetails) {
    try {
      console.log('📍 Updating user address:', { userId: id, addressData });
      
      // Create the address object with the correct structure
      const addressToCreate = {
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        country: addressData.country,
        zip: addressData.zip || '',
        lat: addressData.lat,
        lng: addressData.lng,
        formatted_address: addressData.formatted_address,
        hebrew_address: addressData.hebrew_address,
      };
      
      // Create address in the addresses collection
      const createdAddress = await this.addressesService.create(addressToCreate);
      console.log('✅ Address created:', createdAddress._id);
      
      // Update user with the address reference and return populated user
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id, 
        { addressDetails: createdAddress._id },
        { new: true } // Return the updated document
      ).populate('addressDetails');
      
      console.log('✅ User updated with address reference:', updatedUser?._id);
      return updatedUser;
    } catch (error) {
      console.error('❌ Error updating user address:', error);
      throw error;
    }
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).populate('addressDetails');
  }
}
