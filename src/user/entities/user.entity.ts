import {
  PrimaryKey,
  Entity,
  Property,
  OneToMany,
  Collection,
  Cascade,
} from '@mikro-orm/core';
import { Transaction } from 'src/transaction/entities/transaction.entity';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
  @PrimaryKey({})
  user_id = uuid();

  @Property({
    length: 128,
  })
  full_name!: string;

  @Property({
    length: 256,
  })
  email_address!: string;

  @Property({
    length: 256,
  })
  password!: string;

  @Property()
  isAdmin!: boolean;

  private _balance!: number;

  @Property({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = parseFloat(value.toFixed(2));
  }

  //this creates the one-to-many relationship to the reservation
  @OneToMany(() => Transaction, (transaction) => transaction.user_id, {
    cascade: [Cascade.ALL],
  })
  transactions = new Collection<Transaction>(this);
}
