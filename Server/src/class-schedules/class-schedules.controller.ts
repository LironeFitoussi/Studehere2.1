import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClassSchedulesService } from './class-schedules.service';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';

@Controller('class-schedules')
export class ClassSchedulesController {
  constructor(private readonly classSchedulesService: ClassSchedulesService) {}

  @Post()
  create(@Body() createClassScheduleDto: CreateClassScheduleDto) {
    return this.classSchedulesService.create(createClassScheduleDto);
  }

  @Get()
  findAll() {
    return this.classSchedulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.classSchedulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClassScheduleDto: UpdateClassScheduleDto) {
    return this.classSchedulesService.update(+id, updateClassScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.classSchedulesService.remove(+id);
  }
}
