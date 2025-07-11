import { Injectable } from '@nestjs/common';
import { CreateClassScheduleDto } from './dto/create-class-schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class-schedule.dto';

@Injectable()
export class ClassSchedulesService {
  create(createClassScheduleDto: CreateClassScheduleDto) {
    return 'This action adds a new classSchedule';
  }

  findAll() {
    return `This action returns all classSchedules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classSchedule`;
  }

  update(id: number, updateClassScheduleDto: UpdateClassScheduleDto) {
    return `This action updates a #${id} classSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} classSchedule`;
  }
}
