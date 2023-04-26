import { ApiHideProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiHideProperty()
  user_id: string;
  @ApiHideProperty()
  full_name: string;
  @ApiHideProperty()
  email_address: string;
  @ApiHideProperty()
  password: string;
  @ApiHideProperty()
  isAdmin: boolean;
  private _balance: number;

  @ApiHideProperty()
  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = parseFloat(value.toFixed(2));
  }
}
