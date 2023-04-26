import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { ScooterController } from './scooter.controller';
import { AdminAuthMiddleware } from 'src/auth/auth.middleware';
import { BcryptModule } from 'nest-bcrypt';

@Module({
  imports: [BcryptModule.register({ salt: 8 })],
  controllers: [ScooterController],
  providers: [ScooterService],
})
export class ScooterModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminAuthMiddleware)
      .forRoutes(
        { path: 'scooter', method: RequestMethod.GET },
        { path: 'scooter', method: RequestMethod.PATCH },
        { path: 'scooter', method: RequestMethod.DELETE },
        { path: 'scooter', method: RequestMethod.POST },
      );
  }
}
