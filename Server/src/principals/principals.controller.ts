import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrincipalsService } from './principals.service';
import { CreatePrincipalDto } from './dto/create-principal.dto';
import { UpdatePrincipalDto } from './dto/update-principal.dto';

@Controller('principals')
export class PrincipalsController {
  constructor(private readonly principalsService: PrincipalsService) {}

  @Post()
  create(@Body() createPrincipalDto: CreatePrincipalDto) {
    return this.principalsService.create(createPrincipalDto);
  }

  @Get()
  findAll() {
    return this.principalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.principalsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrincipalDto: UpdatePrincipalDto) {
    return this.principalsService.update(+id, updatePrincipalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.principalsService.remove(+id);
  }
}
