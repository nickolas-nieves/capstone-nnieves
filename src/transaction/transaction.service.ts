import { HttpException, HttpStatus, Injectable, Req } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { EntityManager } from '@mikro-orm/mysql';
import { Transaction } from './entities/transaction.entity';
import { CustomRequest } from 'src/custom-request.interface';

@Injectable()
export class TransactionService {
  constructor(private readonly em: EntityManager) {}

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transaction = this.em.create(Transaction, createTransactionDto);
    await this.em.persistAndFlush(transaction);
    return transaction;
  }

  //Returns all Transactions and returns a Promise of that type
  findAll(): Promise<Transaction[]> {
    return this.em.find(Transaction, {});
  }

  //Returns one Transaction by passed id as a Promise of that type
  findOne(id: string): Promise<Transaction> {
    return this.em.findOneOrFail(Transaction, { transaction_id: id });
  }

  //Updates all provided properties of Transaction by passed id
  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.em.findOne(Transaction, {
      transaction_id: id,
    });

    if (transaction) {
      if (updateTransactionDto.price)
        transaction.price = updateTransactionDto.price;
      if (updateTransactionDto.status)
        transaction.status = updateTransactionDto.status;

      this.em.persistAndFlush(transaction);
      return transaction;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }


  //Updates all provided properties of Transaction by passed id
  async pay(id: string, updateTransactionDto: UpdateTransactionDto, @Req() req: CustomRequest) {
    const transaction = await this.em.findOne(Transaction, {
      transaction_id: id,
    });

    if (transaction) {
      console.log(req.user)
      if (req.user.balance - transaction.price > 0){
        req.user.balance = req.user.balance - transaction.price;
        transaction.price = 0
        transaction.status = 'Paid'
        this.em.persistAndFlush(transaction);
        return transaction;
      } 
      throw new HttpException('Not Enough Money', HttpStatus.NOT_ACCEPTABLE);
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }

  //Removes Transaction by passed id and cascades
  async remove(id: string) {
    const transaction = await this.em.findOne(Transaction, {
      transaction_id: id,
    });
    if (transaction) {
      this.em.removeAndFlush(transaction);
      return transaction;
    }
    throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
  }
}
