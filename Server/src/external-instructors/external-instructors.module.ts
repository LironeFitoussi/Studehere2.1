import { Module } from '@nestjs/common';
import { ExternalInstructorsService } from './external-instructors.service';
import { ExternalInstructorsController } from './external-instructors.controller';

@Module({
  controllers: [ExternalInstructorsController],
  providers: [ExternalInstructorsService],
})
export class ExternalInstructorsModule {}
