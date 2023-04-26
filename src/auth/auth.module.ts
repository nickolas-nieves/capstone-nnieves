import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { BcryptModule } from 'nest-bcrypt';

@Module({
  imports: [BcryptModule.register({ salt: 8 })],
})
export class AuthModule {}
