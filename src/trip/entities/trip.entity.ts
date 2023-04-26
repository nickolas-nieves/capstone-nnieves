import {
  PrimaryKey,
  Entity,
  Property,
  OneToMany,
  Collection,
  Cascade,
  OneToOne,
  ManyToOne,
} from '@mikro-orm/core';
import { Scooter } from 'src/scooter/entities/scooter.entity';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { Location } from 'src/location/entities/location.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class Trip {
  @PrimaryKey({})
  trip_id = uuid();

  @Property({
    length: 256,
  })
  start_location!: string;

  @Property({
    length: 256,
    nullable: true,
  })
  end_location!: string;

  private _start_time!: Date;
  private _end_time!: Date;

  @Property({ type: 'datetime' })
  get start_time(): Date {
    return this._start_time;
  }

  set start_time(value: Date) {
    this._start_time = new Date(value.toISOString());
  }

  @Property({ type: 'datetime', nullable: true })
  get end_time(): Date {
    return this._end_time;
  }

  set end_time(value: Date) {
    this._end_time = new Date(value.toISOString());
  }

  @OneToOne(() => Transaction, (transaction) => transaction.trip, {
    owner: true,
  })
  transaction_id!: Transaction;

  @ManyToOne(() => Scooter)
  scooter_id!: Scooter;
}
