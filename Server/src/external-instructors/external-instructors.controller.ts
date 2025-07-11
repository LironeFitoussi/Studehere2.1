import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExternalInstructorsService } from './external-instructors.service';
import { CreateExternalInstructorDto } from './dto/create-external-instructor.dto';
import { UpdateExternalInstructorDto } from './dto/update-external-instructor.dto';

@Controller('external-instructors')
export class ExternalInstructorsController {
  constructor(private readonly externalInstructorsService: ExternalInstructorsService) {}

  @Post()
  create(@Body() createExternalInstructorDto: CreateExternalInstructorDto) {
    return this.externalInstructorsService.create(createExternalInstructorDto);
  }

  @Get()
  findAll() {
    return this.externalInstructorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.externalInstructorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExternalInstructorDto: UpdateExternalInstructorDto) {
    return this.externalInstructorsService.update(+id, updateExternalInstructorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.externalInstructorsService.remove(+id);
  }
}
