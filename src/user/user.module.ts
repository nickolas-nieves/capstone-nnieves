import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AdminAuthMiddleware, AuthMiddleware } from 'src/auth/auth.middleware';
import { BcryptModule } from 'nest-bcrypt';

@Module({
  imports: [BcryptModule.register({ salt: 8 })],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.PATCH },
        { path: 'user', method: RequestMethod.DELETE },
      );
  }
}
