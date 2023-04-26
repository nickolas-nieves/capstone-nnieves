import {
  PrimaryKey,
  Entity,
  Property,
  OneToMany,
  Collection,
  Cascade,
  OneToOne,
  ManyToMany,
} from '@mikro-orm/core';
import { Trip } from 'src/trip/entities/trip.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class Scooter {
  @PrimaryKey({})
  scooter_id: string = uuid();

  @Property({
    length: 256,
  })
  current_location!: string;

  @Property({
    length: 256,
  })
  battery_charge!: number;

  @OneToMany(() => Trip, (trip) => trip.scooter_id, { cascade: [Cascade.ALL] })
  trips = new Collection<Trip>(this);

  @OneToMany(() => Feedback, (feedback) => feedback.scooter_id, {
    cascade: [Cascade.ALL],
  })
  feedbacks = new Collection<Feedback>(this);
}
