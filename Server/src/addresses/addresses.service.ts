import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class AddressesService {
  constructor(@InjectModel(Address.name) private addressModel: Model<Address>) {}

  async create(createAddressDto: CreateAddressDto) {
    return this.addressModel.create(createAddressDto);
  }

  findAll() {
    return this.addressModel.find();
  }

  findOne(id: string) {
    return this.addressModel.findById(id);
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.addressModel.findByIdAndUpdate(id, updateAddressDto, { new: true });
  }

  remove(id: string) {
    return this.addressModel.findByIdAndDelete(id);
  }
}
