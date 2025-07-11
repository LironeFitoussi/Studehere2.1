import { Module } from '@nestjs/common';
import { DailyAttendancesService } from './daily-attendances.service';
import { DailyAttendancesController } from './daily-attendances.controller';

@Module({
  controllers: [DailyAttendancesController],
  providers: [DailyAttendancesService],
})
export class DailyAttendancesModule {}
