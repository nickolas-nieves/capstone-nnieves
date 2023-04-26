import { HttpException, HttpStatus, Injectable, Req, Body } from '@nestjs/common';
import { UpdateTripDto } from './dto/update-trip.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Trip } from './entities/trip.entity';
import { CreateTripDto } from './dto/create-trip.dto';
import { CreateTransactionDto } from 'src/transaction/dto/create-transaction.dto';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/user/entities/user.entity';
import { CustomRequest } from 'src/custom-request.interface';
import { Scooter } from 'src/scooter/entities/scooter.entity';

@Injectable()
export class TripService {
  constructor(private readonly em: EntityManager) {}

  async create(
    createTripDto: CreateTripDto,
    createTransactionDto: CreateTransactionDto,
    @Req() req: CustomRequest,
  ): Promise<Trip> {
    const trip = await this.em.create(Trip, createTripDto);
    const transaction = await this.em.create(Transaction, {
      ...createTransactionDto,
      trip: trip,
    });
    transaction.status = 'unpaid';
    transaction.user_id = req.user;

    await this.em.persistAndFlush(trip);
    await this.em.persistAndFlush(transaction);
    return trip;
  }

  //Returns all Trips and returns a Promise of that type
  findAll(): Promise<Trip[]> {
    return this.em.find(Trip, {});
  }

  //Returns one Trip by passed id as a Promise of that type
  findOne(id: string): Promise<Trip> {
    return this.em.findOneOrFail(Trip, { trip_id: id });
  }

  //Updates all provided properties of Trip by passed id
  async update(id: string,@Body() updateTripDto: UpdateTripDto) {
    const trip = await this.em.findOne(Trip, { trip_id: id });

    if (trip) {
      if (updateTripDto.start_location)
        trip.start_location = updateTripDto.start_location;
      if (updateTripDto.end_location)
        trip.end_location = updateTripDto.end_location;
      if (updateTripDto.start_time) trip.start_time = updateTripDto.start_time;
      if (updateTripDto.end_time) {
        const time = new Date(updateTripDto.end_time)
        trip.end_time = updateTripDto.end_time;
        trip.transaction_id.price =
          (time.getTime() - trip.start_time.getTime()) / 100000;
      }

      this.em.persistAndFlush(trip);
      return trip;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  //Removes Trip by passed id and cascades
  async remove(id: string) {
    const trip = await this.em.findOne(Trip, { trip_id: id });
    if (trip) {
      this.em.removeAndFlush(trip);
      return trip;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
