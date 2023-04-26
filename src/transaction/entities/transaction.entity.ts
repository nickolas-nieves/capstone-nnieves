import {
  PrimaryKey,
  Entity,
  Property,
  OneToMany,
  Collection,
  Cascade,
  ManyToOne,
  OneToOne,
} from '@mikro-orm/core';
import { Trip } from 'src/trip/entities/trip.entity';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class Transaction {
  @PrimaryKey({})
  transaction_id = uuid();

  @Property({
    length: 64,
  })
  status!: string;

  @Property({
    nullable: true,
  })
  price!: number;

  //this creates the one-to-many relationship to the reservation
  @ManyToOne(() => User)
  user_id!: User;

  @OneToOne(() => Trip, (trip) => trip.transaction_id)
  trip_id!: Trip;
}
