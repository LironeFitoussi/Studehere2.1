import { Injectable } from '@nestjs/common';
import { CreateExternalInstructorDto } from './dto/create-external-instructor.dto';
import { UpdateExternalInstructorDto } from './dto/update-external-instructor.dto';

@Injectable()
export class ExternalInstructorsService {
  create(createExternalInstructorDto: CreateExternalInstructorDto) {
    return 'This action adds a new externalInstructor';
  }

  findAll() {
    return `This action returns all externalInstructors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} externalInstructor`;
  }

  update(id: number, updateExternalInstructorDto: UpdateExternalInstructorDto) {
    return `This action updates a #${id} externalInstructor`;
  }

  remove(id: number) {
    return `This action removes a #${id} externalInstructor`;
  }
}
