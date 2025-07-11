import { Injectable } from '@nestjs/common';
import { CreateDailyAttendanceDto } from './dto/create-daily-attendance.dto';
import { UpdateDailyAttendanceDto } from './dto/update-daily-attendance.dto';

@Injectable()
export class DailyAttendancesService {
  create(createDailyAttendanceDto: CreateDailyAttendanceDto) {
    return 'This action adds a new dailyAttendance';
  }

  findAll() {
    return `This action returns all dailyAttendances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailyAttendance`;
  }

  update(id: number, updateDailyAttendanceDto: UpdateDailyAttendanceDto) {
    return `This action updates a #${id} dailyAttendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyAttendance`;
  }
}
