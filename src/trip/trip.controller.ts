import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response, NextFunction } from 'express';
import { CreateTransactionDto } from 'src/transaction/dto/create-transaction.dto';
import { Trip } from './entities/trip.entity';
import { CustomRequest } from 'src/custom-request.interface';

@ApiTags('trip')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Post()
  async create(
    @Body() createTripDto: CreateTripDto,
    createTransactionDto: CreateTransactionDto,
    @Req() req: CustomRequest,
  ): Promise<Trip> {
    return this.tripService.create(createTripDto, createTransactionDto, req);
  }

  @Get()
  findAll() {
    return this.tripService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripService.update(id, updateTripDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tripService.remove(id);
  }
}
