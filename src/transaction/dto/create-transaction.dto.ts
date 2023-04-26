import { Trip } from 'src/trip/entities/trip.entity';
import { User } from 'src/user/entities/user.entity';

export class CreateTransactionDto {
  transaction_id: string;
  status: string;
  price: number;
  user_id: User;
  trip: Trip;
}
