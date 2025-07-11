import { Module } from '@nestjs/common';
import { AttendanceRecordsService } from './attendance-records.service';
import { AttendanceRecordsController } from './attendance-records.controller';

@Module({
  controllers: [AttendanceRecordsController],
  providers: [AttendanceRecordsService],
})
export class AttendanceRecordsModule {}
