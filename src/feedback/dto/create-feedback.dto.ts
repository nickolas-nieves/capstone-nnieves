import { Collection } from '@mikro-orm/core';
import { Scooter } from 'src/scooter/entities/scooter.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateFeedbackDto {
  feedback_id: string;
  name: string;
  email_address: string;
  message: string;
  user_id: User;
  scooter_id: Scooter;
}
