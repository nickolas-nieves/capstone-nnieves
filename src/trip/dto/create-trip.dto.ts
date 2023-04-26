import { Scooter } from 'src/scooter/entities/scooter.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Location } from 'src/location/entities/location.entity';

export class CreateTripDto {
  trip_id: string;
  start_location: string;
  end_location: string;

  private _start_time: Date;
  private _end_time: Date;

  get start_time(): Date {
    return this._start_time;
  }
  set start_time(value: Date) {
    this._start_time = new Date(value.toISOString());
  }
  get end_time(): Date {
    return this._end_time;
  }
  set end_time(value: Date) {
    this._end_time = new Date(value.toISOString());
  }

  transaction_id: Transaction;
  scooter_id: Scooter;
}
