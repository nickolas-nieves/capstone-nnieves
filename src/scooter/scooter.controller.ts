import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { UpdateScooterDto } from './dto/update-scooter.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('scooter')
@Controller('scooter')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Post()
  create(@Body() createScooterDto: CreateScooterDto) {
    return this.scooterService.create(createScooterDto);
  }

  @Get()
  findAll() {
    return this.scooterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scooterService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScooterDto: UpdateScooterDto) {
    return this.scooterService.update(id, updateScooterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scooterService.remove(id);
  }
}
