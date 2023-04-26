import {
  PrimaryKey,
  Entity,
  Property,
  OneToMany,
  Collection,
  Cascade,
} from '@mikro-orm/core';
import { Trip } from 'src/trip/entities/trip.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class Location {
  @PrimaryKey({})
  location_id = uuid();

  @Property({
    length: 128,
  })
  name!: string;
}
