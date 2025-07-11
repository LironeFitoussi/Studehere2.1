import { Module } from '@nestjs/common';
import { PrincipalsService } from './principals.service';
import { PrincipalsController } from './principals.controller';

@Module({
  controllers: [PrincipalsController],
  providers: [PrincipalsService],
})
export class PrincipalsModule {}
