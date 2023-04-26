import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './create-transaction.dto';
import { User } from 'src/user/entities/user.entity';
import { Trip } from 'src/trip/entities/trip.entity';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  transaction_id: string;
  status: string;
  price: number;
  user_id: User;
  trip_id: Trip;
}
