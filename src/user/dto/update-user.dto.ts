import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  user_id: string;
  full_name: string;
  email_address: string;
  password: string;
  isAdmin: boolean;

  private _balance!: number;

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = parseFloat(value.toFixed(2));
  }
}
