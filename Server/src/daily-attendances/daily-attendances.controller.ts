import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DailyAttendancesService } from './daily-attendances.service';
import { CreateDailyAttendanceDto } from './dto/create-daily-attendance.dto';
import { UpdateDailyAttendanceDto } from './dto/update-daily-attendance.dto';

@Controller('daily-attendances')
export class DailyAttendancesController {
  constructor(private readonly dailyAttendancesService: DailyAttendancesService) {}

  @Post()
  create(@Body() createDailyAttendanceDto: CreateDailyAttendanceDto) {
    return this.dailyAttendancesService.create(createDailyAttendanceDto);
  }

  @Get()
  findAll() {
    return this.dailyAttendancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyAttendancesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailyAttendanceDto: UpdateDailyAttendanceDto) {
    return this.dailyAttendancesService.update(+id, updateDailyAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyAttendancesService.remove(+id);
  }
}
