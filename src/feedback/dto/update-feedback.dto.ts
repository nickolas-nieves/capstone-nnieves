import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackDto } from './create-feedback.dto';
import { User } from 'src/user/entities/user.entity';
import { Collection } from '@mikro-orm/core';
import { Scooter } from 'src/scooter/entities/scooter.entity';

export class UpdateFeedbackDto extends PartialType(CreateFeedbackDto) {
  feedback_id: string;
  name: string;
  email_address: string;
  message: string;
  user_id: User;
  scooter_id?: Scooter;
}
