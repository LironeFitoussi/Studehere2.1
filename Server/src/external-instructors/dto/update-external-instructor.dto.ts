import { PartialType } from '@nestjs/mapped-types';
import { CreateExternalInstructorDto } from './create-external-instructor.dto';

export class UpdateExternalInstructorDto extends PartialType(CreateExternalInstructorDto) {}
