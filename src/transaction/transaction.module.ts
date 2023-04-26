import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { AdminAuthMiddleware } from 'src/auth/auth.middleware';
import { BcryptModule } from 'nest-bcrypt';

@Module({
  imports: [BcryptModule.register({ salt: 8 })],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .forRoutes(
        { path: 'transaction', method: RequestMethod.GET },
        { path: 'transaction', method: RequestMethod.PATCH },
        { path: 'transaction', method: RequestMethod.DELETE },
        { path: 'transaction', method: RequestMethod.POST },
      );

  }
}
