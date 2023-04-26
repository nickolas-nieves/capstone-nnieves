import {
  PrimaryKey,
  Entity,
  Property,
  OneToMany,
  Collection,
  Cascade,
  ManyToOne,
  ManyToMany,
} from '@mikro-orm/core';
import { Scooter } from 'src/scooter/entities/scooter.entity';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class Feedback {
  @PrimaryKey({})
  feedback_id = uuid();

  @Property({
    length: 128,
  })
  name!: string;

  @Property({
    length: 256,
  })
  email_address!: string;

  @Property({
    length: 1024,
  })
  message!: string;

  //this creates the one-to-many relationship to the reservation
  @ManyToOne(() => User)
  user_id!: User;

  @ManyToOne(() => Scooter)
  scooter_id!: Scooter;
}
